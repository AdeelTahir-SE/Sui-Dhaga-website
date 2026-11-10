/**
 * Client-Side Persistent Cache & In-Flight Request Deduplication Layer
 * --------------------------------------------------------------------
 * Keeps domain-scoped data cached in memory and localStorage across SPA
 * navigation and browser reloads so pages display immediately without
 * redundant network fetches or loading skeletons until underlying data
 * changes (via mutations, auth changes, cross-tab updates, or safety TTL).
 */

import { useSyncExternalStore } from "react";

export type CacheDomain =
  | "tailors"
  | "designs"
  | "community"
  | "user"
  | "orders"
  | "appointments"
  | "measurements"
  | "dashboard";

export type CacheScope = "public" | "auth";

export interface CacheEntry<T> {
  data: T;
  rev: string;
  scope: string;
  cachedAt: number;
}

export interface CacheReadOptions<T = unknown> {
  scope?: CacheScope;
  ttlMs?: number;
  forceRefresh?: boolean;
  shouldCache?: (value: T) => boolean;
}

const DEFAULT_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const CACHE_KEY_PREFIX = "sd_cache_v1:";
const REV_KEY_PREFIX = "sd_cache_rev_v1:";

const memoryCache = new Map<string, CacheEntry<unknown>>();
const inFlightRequests = new Map<string, Promise<unknown>>();
const domainListeners = new Map<CacheDomain, Set<() => void>>();
const memoryRevisions = new Map<CacheDomain, string>();
const domainTicks = new Map<CacheDomain, number>();

let revNonce = 0;
let storageListenerRegistered = false;

const ALL_DOMAINS: CacheDomain[] = [
  "tailors",
  "designs",
  "community",
  "user",
  "orders",
  "appointments",
  "measurements",
  "dashboard",
];

function fnv1aHash(input: string): string {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

/**
 * Resolves a cache scope identifier without storing sensitive raw tokens.
 */
export function resolveCacheScope(scope: CacheScope = "auth"): string {
  if (scope === "public" || typeof window === "undefined") return "public";
  const token =
    localStorage.getItem("sui_dhaga_auth_token") ||
    localStorage.getItem("sui_dhaga_admin_token") ||
    localStorage.getItem("supabase_auth_token") ||
    null;
  return token ? `u_${fnv1aHash(token)}` : "guest";
}

function buildEntryKey(domain: CacheDomain, scopeId: string, key: string): string {
  return `${CACHE_KEY_PREFIX}${domain}:${scopeId}:${key}`;
}

function ensureStorageListener(): void {
  if (storageListenerRegistered || typeof window === "undefined") return;
  storageListenerRegistered = true;

  window.addEventListener("storage", (event) => {
    if (!event.key) return;

    if (event.key.startsWith(REV_KEY_PREFIX)) {
      const domain = event.key.slice(REV_KEY_PREFIX.length) as CacheDomain;
      if (event.newValue) {
        memoryRevisions.set(domain, event.newValue);
      } else {
        memoryRevisions.delete(domain);
      }
      evictMemoryDomain(domain);
      notifyCacheDomain(domain);
      return;
    }

    if (event.key === "sui_dhaga_auth_token" || event.key === "sui_dhaga_admin_token") {
      memoryCache.clear();
      ALL_DOMAINS.forEach((d) => notifyCacheDomain(d));
    }
  });
}

function evictMemoryDomain(domain: CacheDomain): void {
  const prefix = `${CACHE_KEY_PREFIX}${domain}:`;
  for (const k of memoryCache.keys()) {
    if (k.startsWith(prefix)) {
      memoryCache.delete(k);
    }
  }
  for (const k of inFlightRequests.keys()) {
    if (k.startsWith(`${domain}:`)) {
      inFlightRequests.delete(k);
    }
  }
}

function clearStorageDomain(domain: CacheDomain): void {
  if (typeof window === "undefined") return;
  const prefix = `${CACHE_KEY_PREFIX}${domain}:`;
  try {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) {
        toRemove.push(k);
      }
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // Ignore storage read/delete errors
  }
}

/**
 * Returns the active revision token for a domain.
 */
export function getCacheRevision(domain: CacheDomain): string {
  ensureStorageListener();
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(`${REV_KEY_PREFIX}${domain}`);
      if (stored) {
        memoryRevisions.set(domain, stored);
        return stored;
      }
    } catch {
      // Fallback to in-memory revision
    }
  }
  return memoryRevisions.get(domain) || "1";
}

/**
 * Subscribe a listener to notifications whenever a domain cache changes.
 */
export function subscribeCacheDomain(domain: CacheDomain, listener: () => void): () => void {
  ensureStorageListener();
  let set = domainListeners.get(domain);
  if (!set) {
    set = new Set();
    domainListeners.set(domain, set);
  }
  set.add(listener);
  return () => {
    set?.delete(listener);
  };
}

/**
 * Notify active listeners for a domain without erasing cached server responses.
 */
export function notifyCacheDomain(domain: CacheDomain): void {
  domainTicks.set(domain, (domainTicks.get(domain) ?? 0) + 1);
  const set = domainListeners.get(domain);
  if (!set) return;
  set.forEach((listener) => {
    try {
      listener();
    } catch (err) {
      console.error(`[DataCache] Listener error in domain "${domain}":`, err);
    }
  });
}

function isEntryValid<T>(
  entry: CacheEntry<T> | undefined | null,
  expectedRev: string,
  expectedScope: string,
  ttlMs: number
): entry is CacheEntry<T> {
  if (!entry) return false;
  if (entry.rev !== expectedRev) return false;
  if (entry.scope !== expectedScope) return false;
  if (Date.now() - entry.cachedAt > ttlMs) return false;
  return true;
}

/**
 * Synchronously reads a valid CacheEntry from memory or localStorage.
 * Always returns the same object reference across consecutive reads until modified.
 */
export function getCachedEntry<T>(
  domain: CacheDomain,
  key: string,
  options?: Pick<CacheReadOptions<T>, "scope" | "ttlMs">
): CacheEntry<T> | null {
  if (typeof window === "undefined") return null;
  ensureStorageListener();

  const scopeId = resolveCacheScope(options?.scope);
  const ttlMs = options?.ttlMs ?? DEFAULT_CACHE_TTL_MS;
  const rev = getCacheRevision(domain);
  const storageKey = buildEntryKey(domain, scopeId, key);

  const memEntry = memoryCache.get(storageKey) as CacheEntry<T> | undefined;
  if (isEntryValid(memEntry, rev, scopeId, ttlMs)) {
    return memEntry;
  }

  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (isEntryValid(parsed, rev, scopeId, ttlMs)) {
      memoryCache.set(storageKey, parsed);
      return parsed;
    }
    localStorage.removeItem(storageKey);
  } catch {
    // Ignore corrupt or inaccessible cache storage
  }

  return null;
}

/**
 * Convenience getter returning cached payload directly if valid.
 */
export function getCachedValue<T>(
  domain: CacheDomain,
  key: string,
  options?: Pick<CacheReadOptions<T>, "scope" | "ttlMs">
): T | undefined {
  return getCachedEntry<T>(domain, key, options)?.data;
}

/**
 * Writes a value to both in-memory cache and localStorage and notifies subscribers.
 */
export function setCachedValue<T>(
  domain: CacheDomain,
  key: string,
  data: T,
  options?: Pick<CacheReadOptions<T>, "scope">
): void {
  if (typeof window === "undefined") return;
  ensureStorageListener();

  const scopeId = resolveCacheScope(options?.scope);
  const rev = getCacheRevision(domain);
  const storageKey = buildEntryKey(domain, scopeId, key);
  const entry: CacheEntry<T> = {
    data,
    rev,
    scope: scopeId,
    cachedAt: Date.now(),
  };

  memoryCache.set(storageKey, entry);

  try {
    localStorage.setItem(storageKey, JSON.stringify(entry));
  } catch {
    // Prune older cache entries if storage quota is tight
    try {
      const cacheKeys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(CACHE_KEY_PREFIX)) cacheKeys.push(k);
      }
      cacheKeys.slice(0, Math.ceil(cacheKeys.length / 2)).forEach((k) => localStorage.removeItem(k));
      localStorage.setItem(storageKey, JSON.stringify(entry));
    } catch {
      // Fallback safely to in-memory cache only
    }
  }

  notifyCacheDomain(domain);
}

/**
 * Updates all active cached entries inside a domain whose key passes predicate.
 * Useful for keeping lists & detail caches in sync after likes/saves/edits without re-fetching.
 */
export function updateCachedDomainEntries<T>(
  domain: CacheDomain,
  predicate: (keySuffix: string) => boolean,
  updater: (current: T, keySuffix: string) => T
): void {
  if (typeof window === "undefined") return;
  ensureStorageListener();

  const rev = getCacheRevision(domain);
  const domainPrefix = `${CACHE_KEY_PREFIX}${domain}:`;
  const touchedKeys = new Set<string>();

  for (const [fullKey, entry] of memoryCache.entries()) {
    if (!fullKey.startsWith(domainPrefix)) continue;
    const remainder = fullKey.slice(domainPrefix.length);
    const colonIdx = remainder.indexOf(":");
    if (colonIdx === -1) continue;
    const entryScope = remainder.slice(0, colonIdx);
    const keySuffix = remainder.slice(colonIdx + 1);
    if (!predicate(keySuffix)) continue;
    const typed = entry as CacheEntry<T>;
    if (typed.rev !== rev) continue;

    const updated: CacheEntry<T> = {
      data: updater(typed.data, keySuffix),
      rev,
      scope: entryScope,
      cachedAt: typed.cachedAt,
    };
    memoryCache.set(fullKey, updated);
    touchedKeys.add(fullKey);
    try {
      localStorage.setItem(fullKey, JSON.stringify(updated));
    } catch {
      // Ignore storage write error
    }
  }

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const fullKey = localStorage.key(i);
      if (!fullKey || !fullKey.startsWith(domainPrefix) || touchedKeys.has(fullKey)) continue;
      const remainder = fullKey.slice(domainPrefix.length);
      const colonIdx = remainder.indexOf(":");
      if (colonIdx === -1) continue;
      const keySuffix = remainder.slice(colonIdx + 1);
      if (!predicate(keySuffix)) continue;
      const raw = localStorage.getItem(fullKey);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as CacheEntry<T>;
      if (parsed.rev !== rev) continue;

      const updated: CacheEntry<T> = {
        data: updater(parsed.data, keySuffix),
        rev,
        scope: parsed.scope,
        cachedAt: parsed.cachedAt,
      };
      memoryCache.set(fullKey, updated);
      localStorage.setItem(fullKey, JSON.stringify(updated));
    }
  } catch {
    // Ignore storage iteration error
  }

  notifyCacheDomain(domain);
}

/**
 * Invalidates an entire cache domain so subsequent reads fetch fresh data once.
 */
export function invalidateCacheDomain(domain: CacheDomain): void {
  revNonce += 1;
  const nextRev = `${Date.now().toString(36)}_${revNonce}`;
  memoryRevisions.set(domain, nextRev);
  evictMemoryDomain(domain);

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`${REV_KEY_PREFIX}${domain}`, nextRev);
    } catch {
      // Ignore storage write error
    }
    clearStorageDomain(domain);
  }

  notifyCacheDomain(domain);
}

/**
 * Clears all domain caches (used on login, logout, or account switch).
 */
export function invalidateAllCaches(): void {
  ALL_DOMAINS.forEach((domain) => invalidateCacheDomain(domain));
}

/**
 * Executes `fetcher` only if no valid cached value exists (or `forceRefresh` is true),
 * deduplicating concurrent in-flight calls for the same key.
 */
export async function fetchWithCache<T>(
  domain: CacheDomain,
  key: string,
  fetcher: () => Promise<T>,
  options?: CacheReadOptions<T>
): Promise<T> {
  if (!options?.forceRefresh) {
    const cached = getCachedEntry<T>(domain, key, options);
    if (cached) {
      return cached.data;
    }
  }

  const scopeId = resolveCacheScope(options?.scope);
  const rev = getCacheRevision(domain);
  const flightKey = `${domain}:${scopeId}:${rev}:${key}`;

  const existingFlight = inFlightRequests.get(flightKey) as Promise<T> | undefined;
  if (existingFlight) {
    return existingFlight;
  }

  const promise = fetcher()
    .then((result) => {
      const allowCache = options?.shouldCache ? options.shouldCache(result) : result !== undefined;
      if (allowCache) {
        setCachedValue(domain, key, result, options);
      }
      return result;
    })
    .finally(() => {
      inFlightRequests.delete(flightKey);
    });

  inFlightRequests.set(flightKey, promise);
  return promise;
}

/**
 * Produces a canonical deterministic cache key suffix from filter objects.
 */
export function stableCacheKey(obj?: Record<string, unknown>): string {
  if (!obj) return "{}";
  const entries = Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .sort(([a], [b]) => a.localeCompare(b));
  return JSON.stringify(Object.fromEntries(entries));
}

/**
 * SSR & Hydration-safe React hook returning the active CacheEntry synchronously on client navigation
 * without triggering ESLint set-state-in-effect warnings.
 */
export function useCachedEntry<T>(
  domain: CacheDomain,
  key: string,
  options?: Pick<CacheReadOptions<T>, "scope" | "ttlMs">
): CacheEntry<T> | null {
  const scope = options?.scope;
  const ttlMs = options?.ttlMs;

  return useSyncExternalStore(
    (listener) => subscribeCacheDomain(domain, listener),
    () => getCachedEntry<T>(domain, key, { scope, ttlMs }),
    () => null
  );
}

/**
 * Subscribes a React component to re-render when a cache domain's revision or local overrides notify.
 */
export function useCacheRevision(domain: CacheDomain): string {
  return useSyncExternalStore(
    (listener) => subscribeCacheDomain(domain, listener),
    () => getCacheRevision(domain),
    () => "1"
  );
}

/**
 * SSR & Hydration-safe tick counter that increments whenever a domain is populated, mutated, or invalidated.
 * Returns -1 on server / initial hydration and >= 0 on the client.
 */
export function useCacheTick(domain: CacheDomain): number {
  return useSyncExternalStore(
    (listener) => subscribeCacheDomain(domain, listener),
    () => domainTicks.get(domain) ?? 0,
    () => -1
  );
}
