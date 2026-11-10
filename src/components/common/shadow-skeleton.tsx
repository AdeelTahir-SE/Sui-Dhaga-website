"use client";

import React from "react";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Base Skeleton block with fluid warm shimmer
 */
export function Skeleton({
  width = "100%",
  height = "16px",
  borderRadius = "8px",
  className = "",
  style = {}
}: SkeletonProps) {
  const customStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
    ...style
  };

  return <div className={`sd-skeleton-box ${className}`} style={customStyle} aria-hidden="true" />;
}

/**
 * Multi-line paragraph shimmer
 */
export function SkeletonText({
  lines = 3,
  className = ""
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="14px"
          width={i === lines - 1 ? "65%" : i % 2 === 0 ? "100%" : "85%"}
        />
      ))}
    </div>
  );
}

/**
 * 4 Top KPI Stat Cards for Customer and Tailor Dashboards / Earnings
 */
export function DashboardStatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="sd-kpi-grid-skeleton">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="sd-kpi-card-skeleton">
          <Skeleton width="48px" height="34px" borderRadius="8px" />
          <Skeleton width="110px" height="15px" />
          <Skeleton width="80px" height="12px" borderRadius="999px" />
        </div>
      ))}
    </div>
  );
}

/**
 * Grid of Cards (for Orders, Appointments, Services, Measurements, Addresses, Wishlist)
 */
export function CardsGridSkeleton({
  count = 6,
  cardHeight = 220
}: {
  count?: number;
  cardHeight?: number;
}) {
  return (
    <div className="sd-cards-grid-skeleton">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="sd-item-card-skeleton" style={{ minHeight: `${cardHeight}px` }}>
          <div className="flex items-center gap-3">
            <Skeleton width="48px" height="48px" borderRadius="12px" />
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton width="60%" height="16px" />
              <Skeleton width="40%" height="12px" />
            </div>
            <Skeleton width="70px" height="24px" borderRadius="999px" />
          </div>
          <div className="flex flex-col gap-2 my-2">
            <Skeleton width="90%" height="13px" />
            <Skeleton width="75%" height="13px" />
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-[#F5F2EC]">
            <Skeleton width="80px" height="20px" />
            <Skeleton width="90px" height="32px" borderRadius="8px" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Table Shimmer Rows (for Orders, Appointments, Reviews, Payouts)
 */
export function TableSkeleton({
  rows = 5,
  cols = 5
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="sd-table-skeleton-wrap">
      <div className="sd-table-skeleton-header">
        {Array.from({ length: cols }).map((_, c) => (
          <div key={c} className="flex-1">
            <Skeleton width="70%" height="16px" />
          </div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="sd-table-skeleton-row">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="flex-1 flex items-center gap-2">
              {c === 0 && <Skeleton width="34px" height="34px" borderRadius="8px" />}
              <Skeleton width={c === 0 ? "65%" : "80%"} height="14px" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Tailor Comparison Matrix Shimmer Placeholder
 */
export function TailorsCompareSkeleton() {
  return (
    <div className="sd-compare-matrix-skeleton">
      <div className="flex flex-col gap-6">
        <div style={{ height: "100px" }} />
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} width="120px" height="20px" />
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, col) => (
        <div key={col} className="flex flex-col gap-6 items-center">
          <div className="flex flex-col items-center gap-2 w-full pb-4 border-b border-[#EFECE6]">
            <Skeleton width="72px" height="72px" borderRadius="50%" />
            <Skeleton width="130px" height="18px" />
            <Skeleton width="80px" height="14px" />
          </div>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="w-full flex justify-center">
              <Skeleton width="70%" height="18px" />
            </div>
          ))}
          <Skeleton width="120px" height="38px" borderRadius="10px" className="mt-2" />
        </div>
      ))}
    </div>
  );
}

/**
 * Profile Header Shimmer
 */
export function ProfileHeaderSkeleton() {
  return (
    <div className="sd-skeleton-card-bg flex items-center gap-6 mb-8">
      <Skeleton width="96px" height="96px" borderRadius="50%" />
      <div className="flex-1 flex flex-col gap-3">
        <Skeleton width="240px" height="26px" />
        <Skeleton width="160px" height="16px" />
        <div className="flex gap-4 mt-1">
          <Skeleton width="100px" height="14px" />
          <Skeleton width="120px" height="14px" />
        </div>
      </div>
    </div>
  );
}

/**
 * Notifications list shimmer
 */
export function NotificationListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="sd-skeleton-card-bg flex items-start gap-4 p-4 rounded-xl"
        >
          <Skeleton width="42px" height="42px" borderRadius="50%" className="flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Skeleton width="160px" height="16px" />
              <Skeleton width="60px" height="12px" />
            </div>
            <Skeleton width="85%" height="14px" />
            <Skeleton width="60%" height="14px" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 4-Column Design Studio Grid Shimmer (Studio Home, My Designs, Templates)
 */
export function StudioDesignsGridSkeleton({
  count = 4,
  variant = "home"
}: {
  count?: number;
  variant?: "home" | "my-designs" | "templates";
}) {
  const gridClass =
    variant === "my-designs"
      ? "studio-my-designs-4col-grid"
      : variant === "templates"
      ? "studio-templates-4col-grid"
      : "studio-recent-grid";
  const isCompact = variant !== "home";

  return (
    <div className={gridClass} aria-busy="true" aria-label="Loading studio designs">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`sd-studio-card-skeleton ${isCompact ? "compact" : ""}`}
        >
          <Skeleton
            width="100%"
            height="auto"
            borderRadius={isCompact ? "10px" : "0px"}
            className={`sd-studio-thumb-skeleton ${isCompact ? "compact" : ""}`}
          />
          <div className={`sd-studio-meta-skeleton ${isCompact ? "compact" : ""}`}>
            <Skeleton width="78%" height="16px" />
            {variant === "templates" ? (
              <Skeleton width="100%" height="34px" borderRadius="8px" style={{ marginTop: "4px" }} />
            ) : (
              <Skeleton width="52%" height="12px" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * AI Suggestions Horizontal Strip Shimmer (Studio Home)
 */
export function StudioSuggestionsRowSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="studio-suggestions-row" aria-busy="true" aria-label="Loading AI suggestions">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="studio-suggestion-card" style={{ cursor: "default" }}>
          <div className="studio-suggestion-thumb">
            <Skeleton width="100%" height="100%" borderRadius="0px" />
          </div>
          <div className="studio-suggestion-info" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Skeleton width="80%" height="14px" />
            <Skeleton width="60%" height="11px" />
          </div>
        </div>
      ))}
      <div className="studio-cta-idea-card" style={{ gap: "14px", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Skeleton width="85%" height="20px" />
          <Skeleton width="100%" height="13px" />
          <Skeleton width="75%" height="13px" />
        </div>
        <Skeleton width="100%" height="40px" borderRadius="10px" />
      </div>
    </div>
  );
}

/**
 * AI Generation Result Gallery Shimmer (Text, Image, Sketch to Design)
 */
export function StudioGalleryResultSkeleton({
  thumbs = 3,
  layout = "text"
}: {
  thumbs?: number;
  layout?: "text" | "image";
}) {
  const layoutClass = layout === "image" ? "studio-image-gallery-layout" : "studio-text-gallery-layout";
  const mainFrameClass = layout === "image" ? "studio-image-main-frame" : "studio-text-main-frame";
  const thumbsColClass = layout === "image" ? "studio-image-thumbs-column" : "studio-text-thumbs-column";
  const thumbBoxClass = layout === "image" ? "studio-image-thumb-box" : "studio-text-thumb-box";

  return (
    <div className={layoutClass} aria-busy="true" aria-label="Loading design preview">
      <div className={mainFrameClass}>
        <Skeleton width="100%" height="100%" borderRadius="14px" />
      </div>
      <div className={thumbsColClass}>
        {Array.from({ length: thumbs }).map((_, idx) => (
          <div key={idx} className={thumbBoxClass} style={{ aspectRatio: "3 / 3.8" }}>
            <Skeleton width="100%" height="100%" borderRadius="10px" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * AI Chat Variations Grid Shimmer (Studio Chat)
 */
export function StudioChatVariationsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="studio-chat-variations-3col-grid" aria-busy="true" aria-label="Loading variations">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="studio-chat-variation-item" style={{ cursor: "default" }}>
          <Skeleton width="100%" height="100%" borderRadius="14px" />
        </div>
      ))}
    </div>
  );
}

/**
 * 3-Column Interactive Editor Skeleton (Studio Editor)
 */
export function StudioEditorSkeleton() {
  return (
    <div className="studio-editor-3col-grid" aria-busy="true" aria-label="Loading design editor">
      {/* Left Tool Rail Skeleton */}
      <aside className="studio-editor-left-tools-bar" style={{ gap: "10px" }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", padding: "8px 4px" }}>
            <Skeleton width="28px" height="28px" borderRadius="8px" />
            <Skeleton width="56px" height="10px" />
          </div>
        ))}
      </aside>

      {/* Center Canvas Stage Skeleton */}
      <main className="studio-editor-center-canvas-wrap">
        <div className="studio-editor-angles-strip">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} width="58px" height="72px" borderRadius="10px" />
          ))}
        </div>
        <div className="studio-editor-canvas-stage" style={{ padding: "32px", flexDirection: "column", justifyContent: "space-between" }}>
          <Skeleton width="300px" height="400px" borderRadius="14px" />
          <Skeleton width="320px" height="44px" borderRadius="999px" />
        </div>
      </main>

      {/* Right Inspector Panels Skeleton */}
      <aside className="studio-editor-right-inspector" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="sd-skeleton-card-bg" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <Skeleton width="120px" height="18px" />
          <Skeleton width="100%" height="44px" borderRadius="10px" />
          <Skeleton width="100%" height="36px" borderRadius="10px" />
        </div>
        <div className="sd-skeleton-card-bg" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <Skeleton width="130px" height="18px" />
          <div style={{ display: "flex", gap: "10px" }}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} width="28px" height="28px" borderRadius="50%" />
            ))}
          </div>
        </div>
        <div className="sd-skeleton-card-bg" style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <Skeleton width="140px" height="18px" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} width="100%" height="64px" borderRadius="10px" />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

/**
 * 2-Column Tech Pack Export Skeleton (Studio Export)
 */
export function StudioExportSkeleton() {
  return (
    <div className="studio-export-2col-grid" aria-busy="true" aria-label="Loading tech pack">
      {/* Left Card Skeleton */}
      <div className="studio-export-left-card">
        <div className="studio-export-left-top-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} width="100%" height="34px" borderRadius="8px" />
            ))}
          </div>
          <div style={{ aspectRatio: "3 / 3.8" }}>
            <Skeleton width="100%" height="100%" borderRadius="14px" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Skeleton width="75%" height="22px" />
            <Skeleton width="55%" height="14px" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                <Skeleton width="40%" height="14px" />
                <Skeleton width="50%" height="14px" />
              </div>
            ))}
          </div>
        </div>
        <div className="studio-export-instructions-box" style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "20px" }}>
          <Skeleton width="160px" height="18px" />
          <Skeleton width="85%" height="14px" />
          <Skeleton width="70%" height="14px" />
          <Skeleton width="78%" height="14px" />
        </div>
      </div>

      {/* Right Card Skeleton */}
      <div className="studio-export-right-card" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <Skeleton width="180px" height="22px" style={{ marginBottom: "14px" }} />
          <TableSkeleton rows={4} cols={5} />
        </div>
        <div>
          <Skeleton width="140px" height="20px" style={{ marginBottom: "12px" }} />
          <div style={{ display: "flex", gap: "12px" }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} width="34px" height="34px" borderRadius="50%" />
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Skeleton width="100%" height="120px" borderRadius="14px" />
          <Skeleton width="100%" height="120px" borderRadius="14px" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <Skeleton width="100%" height="46px" borderRadius="12px" />
          <Skeleton width="100%" height="46px" borderRadius="12px" />
        </div>
      </div>
    </div>
  );
}

