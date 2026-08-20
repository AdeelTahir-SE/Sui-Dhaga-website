"use client";

import React, { useState, useEffect } from "react";
import {
  Scale,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  IndianRupee,
  User,
  Scissors,
  X,
  MessageSquare
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminToast } from "@/components/admin/admin-toast";
import { adminService } from "@/lib/api/admin-service";
import { AdminDispute, ResolveDisputePayload } from "@/lib/api/admin-types";

export function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<AdminDispute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDispute, setSelectedDispute] = useState<AdminDispute | null>(null);
  const [resolutionType, setResolutionType] = useState<ResolveDisputePayload["resolution"]>("refund_partial");
  const [refundAmountVal, setRefundAmountVal] = useState<number>(0);
  const [decisionNotesVal, setDecisionNotesVal] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadDisputes = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.disputes.getDisputes();
      setDisputes(data);
    } catch (err) {
      console.error("Failed to load disputes:", err);
      setToastMessage("Failed to load disputes from API.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDisputes();
  }, []);

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute) return;
    try {
      const updated = await adminService.disputes.resolveDispute(selectedDispute.id, {
        resolution: resolutionType,
        refundAmount: refundAmountVal,
        decisionNotes: decisionNotesVal || "Mediated and resolved by platform administrator"
      });

      setDisputes((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
      setSelectedDispute(null);
      setToastMessage(`Dispute ${updated.disputeNumber} has been resolved.`);
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to resolve dispute.");
    }
  };

  return (
    <div className="admin-layout-wrapper">
      <AdminSidebar activeKey="disputes" />

      <div className="admin-main-container">
        <AdminHeader />

        <main className="admin-dashboard-body">
          {/* Header */}
          <div className="admin-page-header">
            <div className="admin-page-title-wrap">
              <h1>Dispute Resolution Desk</h1>
              <p>Fair mediation between customers and tailoring boutiques. Review fitting claims, photo evidence and authorize escrow refunds.</p>
            </div>
          </div>

          {/* Table */}
          <div className="admin-table-container">
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-th">Dispute Case</th>
                    <th className="admin-th">Order #</th>
                    <th className="admin-th">Customer</th>
                    <th className="admin-th">Tailor Partner</th>
                    <th className="admin-th">Claimed Amount</th>
                    <th className="admin-th">Status</th>
                    <th className="admin-th" style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {disputes.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}>
                        {isLoading ? "Loading disputes..." : "No disputes found."}
                      </td>
                    </tr>
                  ) : (
                    disputes.map((dsp) => (
                      <tr key={dsp.id}>
                        <td className="admin-td">
                          <span style={{ fontWeight: 800, color: "#DC2626" }}>{dsp.disputeNumber}</span>
                          <p style={{ fontWeight: 650, color: "#111111", margin: "2px 0 0", fontSize: "0.88rem" }}>
                            {dsp.title}
                          </p>
                          <span style={{ fontSize: "0.75rem", color: "#6B7280", textTransform: "capitalize" }}>
                            Reason: {dsp.reason.replace("_", " ")}
                          </span>
                        </td>
                        <td className="admin-td">
                          <span style={{ fontWeight: 700, color: "#078B87" }}>{dsp.orderNumber}</span>
                        </td>
                        <td className="admin-td">
                          <div className="admin-user-cell">
                            <img
                              src={dsp.customerAvatar}
                              alt={dsp.customerName}
                              className="admin-user-avatar"
                            />
                            <div>
                              <p className="admin-user-info-name">{dsp.customerName}</p>
                              <p className="admin-user-info-sub">Opened {dsp.openedDate}</p>
                            </div>
                          </div>
                        </td>
                        <td className="admin-td">
                          <p style={{ fontWeight: 700, margin: 0 }}>{dsp.tailorName}</p>
                        </td>
                        <td className="admin-td" style={{ fontWeight: 800 }}>
                          Rs {dsp.disputedAmount.toLocaleString("en-PK")}
                        </td>
                        <td className="admin-td">
                          <span
                            className={`admin-status-badge ${
                              dsp.status.startsWith("resolved")
                                ? "badge-active"
                                : dsp.status === "under_review"
                                ? "badge-pending"
                                : "badge-suspended"
                            }`}
                          >
                            <span style={{ textTransform: "capitalize" }}>{dsp.status.replace("_", " ")}</span>
                          </span>
                        </td>
                        <td className="admin-td" style={{ textAlign: "right" }}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDispute(dsp);
                              setRefundAmountVal(dsp.disputedAmount);
                            }}
                            className="admin-btn-primary"
                            style={{ padding: "6px 12px", fontSize: "0.82rem" }}
                          >
                            <Scale size={14} />
                            <span>Mediate</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Mediation Modal */}
      {selectedDispute && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedDispute(null)}>
          <div className="admin-modal-card" style={{ maxWidth: "760px" }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h2 className="admin-modal-title">Mediate Case {selectedDispute.disputeNumber}</h2>
                <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "2px 0 0" }}>
                  Order: {selectedDispute.orderNumber} • Disputed Sum: Rs {selectedDispute.disputedAmount.toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDispute(null)}
                className="admin-modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              {/* Customer Claim */}
              <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "12px", padding: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <User size={16} color="#DC2626" />
                  <strong style={{ fontSize: "0.9rem", color: "#991B1B" }}>
                    Customer Statement ({selectedDispute.customerName})
                  </strong>
                </div>
                <p style={{ fontSize: "0.88rem", color: "#7F1D1D", margin: 0 }}>
                  "{selectedDispute.customerStatement}"
                </p>
              </div>

              {/* Tailor Counter-Statement */}
              {selectedDispute.tailorStatement && (
                <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "12px", padding: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <Scissors size={16} color="#2563EB" />
                    <strong style={{ fontSize: "0.9rem", color: "#1E40AF" }}>
                      Tailor Rebuttal ({selectedDispute.tailorName})
                    </strong>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "#1E3A8A", margin: 0 }}>
                    "{selectedDispute.tailorStatement}"
                  </p>
                </div>
              )}

              {/* Decision Form */}
              <form onSubmit={handleResolve} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Administrative Resolution</label>
                  <select
                    value={resolutionType}
                    onChange={(e) => setResolutionType(e.target.value as any)}
                    className="admin-form-select"
                  >
                    <option value="refund_full">100% Full Refund to Customer (Debit Escrow)</option>
                    <option value="refund_partial">Partial Refund & Partial Payout</option>
                    <option value="release_to_tailor">Release 100% Escrow to Tailor (Claim Dismissed)</option>
                    <option value="dismiss">Dismiss Dispute Without Settlement</option>
                  </select>
                </div>

                {resolutionType === "refund_partial" && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">Customer Refund Sum (PKR)</label>
                    <input
                      type="number"
                      max={selectedDispute.disputedAmount}
                      value={refundAmountVal}
                      onChange={(e) => setRefundAmountVal(Number(e.target.value))}
                      className="admin-form-input"
                    />
                  </div>
                )}

                <div className="admin-form-group">
                  <label className="admin-form-label">Final Mediation Ruling & Notes</label>
                  <textarea
                    required
                    placeholder="Provide official rationale for dispute resolution..."
                    value={decisionNotesVal}
                    onChange={(e) => setDecisionNotesVal(e.target.value)}
                    className="admin-form-textarea"
                  />
                </div>

                <button type="submit" className="admin-btn-primary" style={{ justifyContent: "center" }}>
                  <CheckCircle2 size={16} />
                  <span>Execute Ruling & Settle Funds</span>
                </button>
              </form>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setSelectedDispute(null)}
                className="admin-btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
