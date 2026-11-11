"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { authService, getDashboardRouteForRole, userService } from "@/lib/api";

interface CallbackParams {
  accessToken: string | null;
  refreshToken: string | null;
  code: string | null;
  error: string | null;
}

const inFlightCallbacks = new Map<string, Promise<string>>();

function readCallbackParams(): CallbackParams {
  const queryParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const pick = (key: string) => queryParams.get(key) || hashParams.get(key);

  return {
    accessToken: pick("access_token") || pick("token"),
    refreshToken: pick("refresh_token"),
    code: pick("code"),
    error: pick("error_description") || pick("error"),
  };
}

async function completeGoogleSession(params: CallbackParams): Promise<string> {
  const { accessToken, refreshToken, code } = params;
  const payload: Record<string, string> = {};

  if (accessToken) {
    payload.accessToken = accessToken;
    payload.access_token = accessToken;
  }
  if (refreshToken) {
    payload.refreshToken = refreshToken;
    payload.refresh_token = refreshToken;
  }
  if (code) {
    payload.code = code;
  }

  const res = await authService.loginWithGoogle(payload);
  if (res?.success === false) {
    throw new Error(res.message || "Google authentication failed.");
  }

  let user = res?.data?.user || authService.getStoredUser();
  if (!user?.role) {
    try {
      const meRes = await userService.getMe();
      if (meRes?.data) {
        user = meRes.data;
      }
    } catch {
      // Fall back to default customer dashboard if profile fetch is unavailable
    }
  }

  return getDashboardRouteForRole(user?.role);
}

function runDedupedCallback(params: CallbackParams): Promise<string> {
  const key = params.accessToken || params.code || "";
  const existing = inFlightCallbacks.get(key);
  if (existing) return existing;

  const promise = completeGoogleSession(params).finally(() => {
    inFlightCallbacks.delete(key);
  });
  inFlightCallbacks.set(key, promise);
  return promise;
}

async function processCallback(): Promise<string> {
  const params = readCallbackParams();
  if (params.error) {
    throw new Error(params.error);
  }
  if (!params.accessToken && !params.code) {
    throw new Error("Missing authentication credentials. Please try signing in with Google again.");
  }
  return runDedupedCallback(params);
}

export function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let active = true;

    processCallback()
      .then((destination) => {
        if (!active) return;
        window.history.replaceState(null, "", "/auth/callback");
        setStatus("success");
        router.replace(destination);
      })
      .catch((err: unknown) => {
        if (!active) return;
        window.history.replaceState(null, "", "/auth/callback");
        setStatus("error");
        setErrorMessage(
          err instanceof Error && err.message
            ? err.message
            : "Unable to complete Google sign-in. Please try again."
        );
      });

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <PublicShell footer={false}>
      <div
        className="auth-page-container auth-page-login"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "112px 20px 48px",
        }}
      >
        <Image className="auth-edge-teal" src="/images/auth/edge-teal.png" alt="" aria-hidden="true" width={360} height={360} style={{ height: "auto" }} />
        <Image className="auth-edge-coral-forgot" src="/images/auth/edge-coral.png" alt="" aria-hidden="true" width={360} height={360} style={{ height: "auto" }} />

        <div
          className="form-card form-card-login"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "460px",
            minHeight: "auto",
            margin: 0,
            padding: "40px 36px",
            textAlign: "center",
          }}
        >
          {status === "loading" && (
            <>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
                <Loader2 className="animate-spin" size={42} color="#078b87" />
              </div>
              <h2 style={{ marginBottom: "10px" }}>Completing Google Sign-In...</h2>
              <p className="form-intro" style={{ marginBottom: 0 }}>
                Please wait while we verify your account and set up your session.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
                <CheckCircle2 size={44} color="#16a34a" />
              </div>
              <h2 style={{ marginBottom: "10px" }}>Signed in successfully!</h2>
              <p className="form-intro" style={{ marginBottom: 0 }}>
                Redirecting you to your Sui Dhaga dashboard...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
                <AlertCircle size={44} color="#dc2626" />
              </div>
              <h2 style={{ marginBottom: "12px" }}>Google Sign-In Failed</h2>
              <div
                role="alert"
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  color: "#991B1B",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "22px",
                  lineHeight: 1.5,
                }}
              >
                {errorMessage}
              </div>
              <Link
                href="/auth/login"
                className="btn primary submit-btn"
                style={{ textDecoration: "none", width: "100%" }}
              >
                Back to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </PublicShell>
  );
}
