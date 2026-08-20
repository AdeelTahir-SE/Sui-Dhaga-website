"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  SlidersHorizontal,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  XCircle,
  Eye,
  Star,
  MapPin,
  Calendar,
  Phone,
  Mail,
  FileText,
  ShoppingBag,
  TrendingUp,
  Award,
  RefreshCw
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminToast } from "@/components/admin/admin-toast";
import { adminService } from "@/lib/api/admin-service";
import { AdminTailor, TailorVerificationStatus, VerifyTailorPayload } from "@/lib/api/admin-types";

// ─── Helper: Verification Badge ───────────────────────────────────────────────
function VerificationBadge({ status }: { status: TailorVerificationStatus }) {
  const config: Record<TailorVerificationStatus, { label: string; bg: string; color: string }> = {
    verified:  { label: "Verified",  bg: "#DCFCE7", color: "#15803D" },
    pending:   { label: "Pending",   bg: "#FEF3C7", color: "#D97706" },
    rejected:  { label: "Rejected",  bg: "#FEE2E2", color: "#DC2626" },
    suspended: { label: "Suspended", bg: "#F3F4F6", color: "#6B7280" }
  };
  const c = config[status];
  return (
    <span
      style={{
        display: "inline-block",
        background: c.bg,
        color: c.color,
        fontWeight: 700,
        fontSize: "0.8rem",
        padding: "3px 12px",
        borderRadius: "20px",
        whiteSpace: "nowrap"
      }}
    >
      {c.label}
    </span>
  );
}

// ─── Helper: Account Status Badge ─────────────────────────────────────────────
function AccountStatusBadge({ status }: { status: "active" | "inactive" | "suspended" }) {
  const config: Record<string, { label: string; bg: string; color: string }> = {
    active:    { label: "Active",   bg: "#DCFCE7", color: "#15803D" },
    inactive:  { label: "Inactive", bg: "#F3F4F6", color: "#6B7280" },
    suspended: { label: "Suspended",bg: "#FEE2E2", color: "#DC2626" }
  };
  const c = config[status] ?? config.inactive;
  return (
    <span
      style={{
        display: "inline-block",
        background: c.bg,
        color: c.color,
        fontWeight: 700,
        fontSize: "0.8rem",
        padding: "3px 12px",
        borderRadius: "20px",
        whiteSpace: "nowrap"
      }}
    >
      {c.label}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function AdminTailorsPage() {
  const [tailors, setTailors] = useState<AdminTailor[]>([]);
  const [totalCount, setTotalCount] = useState(67);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [search, setSearch] = useState("");
  const [verificationFilter, setVerificationFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTailor, setSelectedTailor] = useState<AdminTailor | null>(null);
  const [approveModal, setApproveModal] = useState<AdminTailor | null>(null);
  const [rejectModal, setRejectModal] = useState<AdminTailor | null>(null);
  const [actionNote, setActionNote] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Load tailors from service (API-ready) ───────────────────────────────────
  const loadTailors = async () => {
    try {
      setIsLoading(true);
      const res = await adminService.tailors.getTailors({
        search,
        verificationStatus: verificationFilter as any,
        accountStatus: statusFilter as any,
        page,
        limit: 7
      });
      setTailors(res.data);
      setTotalCount(res.total || 67);
      setTotalPages(res.totalPages || 10);
    } catch (err) {
      console.error("Failed to load tailors:", err);
      setToastMessage("Failed to load tailors. Showing local records.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadTailors(); }, [search, verificationFilter, statusFilter, page]);

  // ── Approve handler ─────────────────────────────────────────────────────────
  const handleApprove = async () => {
    if (!approveModal) return;
    try {
      const updated = await adminService.tailors.verifyTailor(approveModal.id, {
        status: "verified",
        notes: actionNote || "Approved by admin after document review."
      } as VerifyTailorPayload);
      setTailors(prev => prev.map(t => t.id === approveModal.id ? updated : t));
      if (selectedTailor?.id === approveModal.id) setSelectedTailor(updated);
      setToastMessage(`✓ ${approveModal.shopName} has been approved and is now Verified.`);
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to approve tailor. Please try again.");
    } finally {
      setApproveModal(null);
      setActionNote("");
    }
  };

  // ── Reject handler ──────────────────────────────────────────────────────────
  const handleReject = async () => {
    if (!rejectModal) return;
    if (!actionNote.trim()) {
      setToastMessage("Please provide a rejection reason before confirming.");
      return;
    }
    try {
      const updated = await adminService.tailors.verifyTailor(rejectModal.id, {
        status: "rejected",
        notes: actionNote
      } as VerifyTailorPayload);
      setTailors(prev => prev.map(t => t.id === rejectModal.id ? updated : t));
      if (selectedTailor?.id === rejectModal.id) setSelectedTailor(updated);
      setToastMessage(`${rejectModal.shopName} verification has been rejected.`);
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to reject tailor. Please try again.");
    } finally {
      setRejectModal(null);
      setActionNote("");
    }
  };

  // ── CSV Export ──────────────────────────────────────────────────────────────
  const handleExport = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      "ID,Shop Name,Owner,Email,Phone,City,Province,Verification,AccountStatus,Rating,Orders,Earnings\n" +
      tailors
        .map(t =>
          `"${t.id}","${t.shopName}","${t.ownerName}","${t.email}","${t.phone}","${t.city}","${t.province}","${t.verificationStatus}","${t.accountStatus}",${t.rating},${t.completedOrders},${t.totalEarnings}`
        )
        .join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", `sui_dhaga_tailors_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage("Tailors list exported to CSV.");
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="admin-layout-wrapper">
      <AdminSidebar activeKey="tailors" />

      <div className="admin-main-container">
        <AdminHeader onSearch={(q) => setSearch(q)} />

        <main className="admin-dashboard-body">
          {/* Page Header */}
          <div className="admin-page-header">
            <div className="admin-page-title-wrap">
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>
                Tailors
              </h1>
              <p style={{ fontSize: "0.92rem", color: "#6B7280", margin: 0 }}>
                Manage and verify tailors on the platform.
              </p>
            </div>
          </div>

          {/* Filter & Control Bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", flex: 1 }}>
              {/* Search */}
              <div style={{ position: "relative", minWidth: "280px", maxWidth: "400px", flex: 1 }}>
                <Search size={17} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
                <input
                  type="text"
                  placeholder="Search tailor name, email or phone..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "9px 14px 9px 40px", fontSize: "0.88rem", background: "#FFFFFF", color: "#111827", outline: "none", boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}
                />
              </div>

              {/* All Status Dropdown */}
              <div style={{ position: "relative" }}>
                <select
                  value={statusFilter}
                  onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                  style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "9px 32px 9px 14px", fontSize: "0.88rem", fontWeight: 600, color: "#374151", appearance: "none", cursor: "pointer" }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown size={14} color="#6B7280" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>

              {/* All Verification Dropdown */}
              <div style={{ position: "relative" }}>
                <select
                  value={verificationFilter}
                  onChange={e => { setVerificationFilter(e.target.value); setPage(1); }}
                  style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "9px 32px 9px 14px", fontSize: "0.88rem", fontWeight: 600, color: "#374151", appearance: "none", cursor: "pointer" }}
                >
                  <option value="all">All Verification</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown size={14} color="#6B7280" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              </div>

              {/* Filters toggle */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(f => !f)}
                style={{ background: isFilterOpen ? "#FAF8F5" : "#FFFFFF", border: isFilterOpen ? "1px solid #078B87" : "1px solid #E5E7EB", color: isFilterOpen ? "#078B87" : "#374151", borderRadius: "10px", padding: "9px 16px", fontSize: "0.88rem", fontWeight: 650, display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
              >
                <SlidersHorizontal size={15} />
                <span>Filters</span>
              </button>
            </div>

            {/* Export */}
            <button
              type="button"
              onClick={handleExport}
              style={{ background: "#078B87", color: "#FFFFFF", border: "none", borderRadius: "10px", padding: "9px 18px", fontSize: "0.9rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer", boxShadow: "0 2px 6px rgba(7,139,135,0.25)" }}
            >
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>

          {/* Table */}
          <div className="admin-table-container">
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-th" style={{ width: "22%" }}>Tailor</th>
                    <th className="admin-th" style={{ width: "20%" }}>Business Name</th>
                    <th className="admin-th" style={{ width: "18%" }}>Location</th>
                    <th className="admin-th" style={{ width: "12%" }}>Verification</th>
                    <th className="admin-th" style={{ width: "10%" }}>Status</th>
                    <th className="admin-th" style={{ width: "18%", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280" }}>
                        Loading tailor directory...
                      </td>
                    </tr>
                  ) : tailors.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280" }}>
                        No tailors found matching your filters.
                      </td>
                    </tr>
                  ) : tailors.map(tailor => (
                    <tr key={tailor.id}>
                      {/* Tailor Identity */}
                      <td className="admin-td">
                        <div className="admin-user-cell">
                          <img src={tailor.avatar} alt={tailor.ownerName} className="admin-user-avatar" />
                          <div>
                            <p className="admin-user-info-name">{tailor.ownerName}</p>
                            <p className="admin-user-info-sub">{tailor.username || `@${tailor.ownerName.toLowerCase().replace(/\s+/g, "")}`}</p>
                          </div>
                        </div>
                      </td>

                      {/* Shop Name */}
                      <td className="admin-td" style={{ fontSize: "0.9rem", fontWeight: 600, color: "#111827" }}>
                        {tailor.shopName}
                      </td>

                      {/* Location */}
                      <td className="admin-td" style={{ fontSize: "0.88rem", color: "#374151" }}>
                        {tailor.city}, {tailor.province}
                      </td>

                      {/* Verification Badge */}
                      <td className="admin-td">
                        <VerificationBadge status={tailor.verificationStatus} />
                      </td>

                      {/* Account Status Badge */}
                      <td className="admin-td">
                        <AccountStatusBadge status={tailor.accountStatus} />
                      </td>

                      {/* Actions */}
                      <td className="admin-td" style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", position: "relative" }}>
                          {/* View button */}
                          <button
                            type="button"
                            onClick={() => setSelectedTailor(tailor)}
                            style={{ height: "32px", padding: "0 14px", fontSize: "0.82rem", fontWeight: 700, background: "#FFFFFF", border: "1.5px solid #E5E7EB", borderRadius: "8px", color: "#374151", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap", transition: "all 0.15s" }}
                          >
                            <Eye size={13} />
                            <span>View</span>
                          </button>

                          {/* Approve (✓) — only for pending/rejected */}
                          {(tailor.verificationStatus === "pending" || tailor.verificationStatus === "rejected") && (
                            <button
                              type="button"
                              onClick={() => { setApproveModal(tailor); setActionNote("Approved by admin after document review."); }}
                              title="Approve"
                              style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1.5px solid #BBF7D0", background: "#F0FDF4", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" }}
                            >
                              <CheckCircle2 size={16} color="#15803D" />
                            </button>
                          )}

                          {/* Reject (✕) — only for pending/verified */}
                          {(tailor.verificationStatus === "pending" || tailor.verificationStatus === "verified") && (
                            <button
                              type="button"
                              onClick={() => { setRejectModal(tailor); setActionNote(""); }}
                              title="Reject"
                              style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1.5px solid #FECACA", background: "#FFF5F5", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" }}
                            >
                              <XCircle size={16} color="#DC2626" />
                            </button>
                          )}

                          {/* 3-dot more menu for verified tailors */}
                          {tailor.verificationStatus === "verified" && (
                            <div style={{ position: "relative" }}>
                              <button
                                type="button"
                                onClick={() => setActiveMenuId(activeMenuId === tailor.id ? null : tailor.id)}
                                style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1.5px solid #E5E7EB", background: activeMenuId === tailor.id ? "#F3F4F6" : "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1.1rem", color: "#374151", transition: "all 0.15s" }}
                              >
                                ⋮
                              </button>
                              {activeMenuId === tailor.id && (
                                <div
                                  ref={menuRef}
                                  style={{ position: "absolute", right: 0, top: "36px", background: "#FFFFFF", border: "1px solid #EAE6DF", borderRadius: "10px", boxShadow: "0 10px 25px rgba(0,0,0,0.12)", zIndex: 80, width: "180px", padding: "6px", display: "flex", flexDirection: "column", gap: "2px" }}
                                >
                                  {[
                                    { label: "View Full Profile", onClick: () => { setSelectedTailor(tailor); setActiveMenuId(null); }, color: "#374151" },
                                    { label: "Toggle Featured", onClick: () => { setActiveMenuId(null); setToastMessage(`Featured status updated for ${tailor.shopName}`); }, color: "#374151" },
                                    { label: "Reject Verification", onClick: () => { setRejectModal(tailor); setActionNote(""); setActiveMenuId(null); }, color: "#DC2626" }
                                  ].map(item => (
                                    <button
                                      key={item.label}
                                      type="button"
                                      onClick={item.onClick}
                                      style={{ background: "transparent", border: "none", padding: "8px 12px", fontSize: "0.84rem", fontWeight: 600, color: item.color, display: "flex", alignItems: "center", cursor: "pointer", borderRadius: "6px", width: "100%", textAlign: "left" }}
                                    >
                                      {item.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="admin-pagination-bar">
              <span className="admin-pagination-info">
                Showing {tailors.length > 0 ? (page - 1) * 7 + 1 : 0} to {Math.min(page * 7, totalCount)} of {totalCount} tailors
              </span>
              <div className="admin-pagination-controls">
                <button type="button" disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="admin-pagination-arrow-btn"><ChevronLeft size={16} /></button>
                {[1, 2, 3].map(n => (
                  <button key={n} type="button" onClick={() => setPage(n)} className={`admin-pagination-num-btn ${page === n ? "active" : ""}`}>{n}</button>
                ))}
                <span style={{ padding: "0 4px", color: "#9CA3AF", fontSize: "0.85rem", fontWeight: 700 }}>...</span>
                <button type="button" onClick={() => setPage(10)} className={`admin-pagination-num-btn ${page === 10 ? "active" : ""}`}>10</button>
                <button type="button" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="admin-pagination-arrow-btn"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── Approve Modal ───────────────────────────────────────────────────── */}
      {approveModal && (
        <div className="admin-modal-backdrop" onClick={() => setApproveModal(null)}>
          <div className="admin-modal-card" style={{ maxWidth: "500px" }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle2 size={22} color="#15803D" />
                <h2 className="admin-modal-title">Approve Tailor Verification</h2>
              </div>
              <button type="button" onClick={() => setApproveModal(null)} className="admin-modal-close-btn"><X size={20} /></button>
            </div>
            <div className="admin-modal-body">
              {/* Tailor summary card */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "#FAF8F5", border: "1px solid #EAE6DF", borderRadius: "12px", padding: "14px 16px", marginBottom: "16px" }}>
                <img src={approveModal.avatar} alt={approveModal.ownerName} style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <p style={{ fontSize: "1rem", fontWeight: 800, margin: "0 0 2px", color: "#111827" }}>{approveModal.shopName}</p>
                  <p style={{ fontSize: "0.84rem", color: "#6B7280", margin: 0 }}>{approveModal.ownerName} · {approveModal.city}, {approveModal.province}</p>
                  <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                    <VerificationBadge status={approveModal.verificationStatus} />
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "0.92rem", color: "#374151", margin: "0 0 14px" }}>
                Approving this tailor will grant them <strong>Verified</strong> status, enabling them to receive orders, appear in search results, and access platform payouts.
              </p>
              <div className="admin-form-group">
                <label className="admin-form-label">Approval Note (optional)</label>
                <textarea
                  value={actionNote}
                  onChange={e => setActionNote(e.target.value)}
                  className="admin-form-textarea"
                  placeholder="e.g. Documents verified via physical inspection..."
                />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" onClick={() => setApproveModal(null)} className="admin-btn-secondary">Cancel</button>
              <button
                type="button"
                onClick={handleApprove}
                style={{ background: "#15803D", color: "#FFFFFF", border: "none", borderRadius: "10px", padding: "10px 20px", fontSize: "0.9rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
              >
                <CheckCircle2 size={16} />
                Confirm Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reject Modal ────────────────────────────────────────────────────── */}
      {rejectModal && (
        <div className="admin-modal-backdrop" onClick={() => setRejectModal(null)}>
          <div className="admin-modal-card" style={{ maxWidth: "500px" }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <XCircle size={22} color="#DC2626" />
                <h2 className="admin-modal-title">Reject Tailor Verification</h2>
              </div>
              <button type="button" onClick={() => setRejectModal(null)} className="admin-modal-close-btn"><X size={20} /></button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "#FFF5F5", border: "1px solid #FECACA", borderRadius: "12px", padding: "14px 16px", marginBottom: "16px" }}>
                <img src={rejectModal.avatar} alt={rejectModal.ownerName} style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <p style={{ fontSize: "1rem", fontWeight: 800, margin: "0 0 2px", color: "#111827" }}>{rejectModal.shopName}</p>
                  <p style={{ fontSize: "0.84rem", color: "#6B7280", margin: 0 }}>{rejectModal.ownerName} · {rejectModal.city}, {rejectModal.province}</p>
                </div>
              </div>
              <p style={{ fontSize: "0.92rem", color: "#374151", margin: "0 0 14px" }}>
                Rejecting this tailor will mark their verification as <strong>Rejected</strong>. They will be notified with the reason you provide below and can resubmit corrected documents.
              </p>
              <div className="admin-form-group">
                <label className="admin-form-label">Rejection Reason <span style={{ color: "#DC2626" }}>*</span></label>
                <textarea
                  value={actionNote}
                  onChange={e => setActionNote(e.target.value)}
                  className="admin-form-textarea"
                  placeholder="e.g. Submitted CNIC has expired. Please upload a valid identity document..."
                  required
                />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button type="button" onClick={() => setRejectModal(null)} className="admin-btn-secondary">Cancel</button>
              <button type="button" onClick={handleReject} className="admin-btn-danger">
                <XCircle size={16} />
                <span>Confirm Reject</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Tailor Detail Drawer ─────────────────────────────────────────────── */}
      {selectedTailor && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedTailor(null)}>
          <div
            className="admin-modal-card"
            style={{ maxWidth: "620px", maxHeight: "90vh", overflowY: "auto" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="admin-modal-header" style={{ position: "sticky", top: 0, background: "#FFFFFF", zIndex: 2 }}>
              <h2 className="admin-modal-title">Tailor Profile</h2>
              <button type="button" onClick={() => setSelectedTailor(null)} className="admin-modal-close-btn"><X size={20} /></button>
            </div>

            <div className="admin-modal-body">
              {/* Hero Banner */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
                <img src={selectedTailor.avatar} alt={selectedTailor.ownerName} style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "2px solid #E5E7EB" }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 2px", color: "#111827" }}>{selectedTailor.shopName}</h3>
                  <p style={{ fontSize: "0.88rem", color: "#6B7280", margin: "0 0 8px" }}>{selectedTailor.username || `@${selectedTailor.ownerName.toLowerCase().replace(/\s+/g, "")}`}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    <VerificationBadge status={selectedTailor.verificationStatus} />
                    <AccountStatusBadge status={selectedTailor.accountStatus} />
                    {selectedTailor.isFeatured && (
                      <span style={{ background: "#FEF9C3", color: "#CA8A04", fontWeight: 700, fontSize: "0.78rem", padding: "3px 10px", borderRadius: "20px" }}>
                        ★ Featured
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                    <Star size={16} color="#FBBF24" fill="#FBBF24" />
                    <span style={{ fontWeight: 800, fontSize: "1rem" }}>{selectedTailor.rating.toFixed(1)}</span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: "2px 0 0" }}>{selectedTailor.reviewsCount} reviews</p>
                </div>
              </div>

              {/* Info Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "#FAF8F5", border: "1px solid #EAE6DF", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
                {[
                  { label: "Owner Name",   val: selectedTailor.ownerName },
                  { label: "Email",        val: selectedTailor.email },
                  { label: "Phone",        val: selectedTailor.phone },
                  { label: "City",         val: `${selectedTailor.city}, ${selectedTailor.province}` },
                  { label: "Experience",   val: `${selectedTailor.experienceYears} years` },
                  { label: "Joined",       val: selectedTailor.joinedDate },
                  { label: "Commission",   val: `${selectedTailor.commissionRate}% (${selectedTailor.commissionTier})` },
                  { label: "Total Earned", val: `₹ ${selectedTailor.totalEarnings.toLocaleString("en-IN")}` }
                ].map(row => (
                  <div key={row.label}>
                    <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 2px", fontWeight: 600 }}>{row.label}</p>
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#111827", margin: 0 }}>{row.val}</p>
                  </div>
                ))}
              </div>

              {/* Stats Row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
                {[
                  { icon: <ShoppingBag size={18} color="#078B87" />, label: "Orders Completed", val: selectedTailor.completedOrders },
                  { icon: <RefreshCw size={18} color="#2563EB" />,   label: "Active Orders",     val: selectedTailor.activeOrders },
                  { icon: <Award size={18} color="#CA8A04" />,        label: "Specialties",       val: selectedTailor.specialties.length }
                ].map(s => (
                  <div key={s.label} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "12px 14px", textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>{s.icon}</div>
                    <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111827", margin: "0 0 2px" }}>{s.val}</p>
                    <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Specialties */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", margin: "0 0 8px" }}>Specialties</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedTailor.specialties.map(s => (
                    <span key={s} style={{ background: "#EEF2FF", color: "#3730A3", fontSize: "0.8rem", fontWeight: 600, padding: "4px 12px", borderRadius: "20px" }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Documents */}
              {selectedTailor.documents.length > 0 && (
                <div style={{ marginBottom: "16px" }}>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", margin: "0 0 8px" }}>Submitted Documents</p>
                  {selectedTailor.documents.map(doc => (
                    <div key={doc.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "10px 14px", marginBottom: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <FileText size={16} color="#6B7280" />
                        <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#111827" }}>{doc.title}</span>
                      </div>
                      {doc.verified ? (
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#15803D", background: "#DCFCE7", padding: "2px 10px", borderRadius: "12px" }}>Verified</span>
                      ) : (
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#D97706", background: "#FEF3C7", padding: "2px 10px", borderRadius: "12px" }}>Pending Review</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Admin Notes */}
              {selectedTailor.verificationNotes && (
                <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "10px", padding: "12px 14px" }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#15803D", margin: "0 0 4px" }}>Admin Verification Note</p>
                  <p style={{ fontSize: "0.88rem", color: "#374151", margin: 0 }}>{selectedTailor.verificationNotes}</p>
                </div>
              )}
            </div>

            <div className="admin-modal-footer" style={{ position: "sticky", bottom: 0, background: "#FFFFFF", zIndex: 2 }}>
              <button type="button" onClick={() => setSelectedTailor(null)} className="admin-btn-secondary">Close</button>
              {(selectedTailor.verificationStatus === "pending" || selectedTailor.verificationStatus === "rejected") && (
                <button
                  type="button"
                  onClick={() => { setApproveModal(selectedTailor); setSelectedTailor(null); setActionNote("Approved after document review."); }}
                  style={{ background: "#15803D", color: "#FFFFFF", border: "none", borderRadius: "10px", padding: "10px 18px", fontSize: "0.9rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
                >
                  <CheckCircle2 size={16} />
                  Approve
                </button>
              )}
              {(selectedTailor.verificationStatus === "pending" || selectedTailor.verificationStatus === "verified") && (
                <button type="button" onClick={() => { setRejectModal(selectedTailor); setSelectedTailor(null); setActionNote(""); }} className="admin-btn-danger">
                  <XCircle size={16} />
                  <span>Reject</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
}
