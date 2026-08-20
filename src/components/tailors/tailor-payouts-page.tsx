"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Building,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldCheck,
  ArrowUpRight,
  Download
} from "lucide-react";
import { PublicNav } from "@/components/common/site-shell";
import { TailorSidebar } from "@/components/tailors/tailor-sidebar";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/tailor-payouts-view.css";

export interface TailorPayoutRecord {
  id: string;
  referenceNo: string;
  date: string;
  amount: number;
  method: "Bank Transfer" | "UPI";
  bankAccount: string;
  utrNumber: string;
  status: "Paid" | "Processing" | "Pending";
}

const initialPayouts: TailorPayoutRecord[] = [
  {
    id: "pay-1",
    referenceNo: "WD-10892",
    date: "10 May 2024",
    amount: 5000,
    method: "Bank Transfer",
    bankAccount: "HDFC Bank (•••• 8766)",
    utrNumber: "UTR20240510891234",
    status: "Paid"
  },
  {
    id: "pay-2",
    referenceNo: "WD-10854",
    date: "25 Apr 2024",
    amount: 7000,
    method: "Bank Transfer",
    bankAccount: "HDFC Bank (•••• 8766)",
    utrNumber: "UTR20240425783421",
    status: "Paid"
  },
  {
    id: "pay-3",
    referenceNo: "WD-10790",
    date: "10 Apr 2024",
    amount: 6000,
    method: "UPI",
    bankAccount: "vermastudios@okhdfcbank",
    utrNumber: "UPI20240410492109",
    status: "Paid"
  },
  {
    id: "pay-4",
    referenceNo: "WD-10732",
    date: "25 Mar 2024",
    amount: 5000,
    method: "Bank Transfer",
    bankAccount: "HDFC Bank (•••• 8766)",
    utrNumber: "UTR20240325129048",
    status: "Paid"
  },
  {
    id: "pay-5",
    referenceNo: "WD-10689",
    date: "10 Mar 2024",
    amount: 4500,
    method: "UPI",
    bankAccount: "vermastudios@okhdfcbank",
    utrNumber: "UPI20240310882190",
    status: "Paid"
  },
  {
    id: "pay-6",
    referenceNo: "WD-10620",
    date: "25 Feb 2024",
    amount: 8200,
    method: "Bank Transfer",
    bankAccount: "HDFC Bank (•••• 8766)",
    utrNumber: "UTR20240225771239",
    status: "Paid"
  },
  {
    id: "pay-7",
    referenceNo: "WD-10570",
    date: "10 Feb 2024",
    amount: 6500,
    method: "Bank Transfer",
    bankAccount: "HDFC Bank (•••• 8766)",
    utrNumber: "UTR20240210349812",
    status: "Paid"
  }
];

const KEY_TAILOR_PAYOUTS = "sui_dhaga_tailor_payouts_list";

export function TailorPayoutsPage() {
  const [payouts, setPayouts] = useState<TailorPayoutRecord[]>(initialPayouts);
  const [showAll, setShowAll] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<TailorPayoutRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(KEY_TAILOR_PAYOUTS);
        if (saved) {
          setPayouts(JSON.parse(saved));
        } else {
          localStorage.setItem(KEY_TAILOR_PAYOUTS, JSON.stringify(initialPayouts));
        }
      } catch (e) {
        console.warn("Failed to load payouts from localStorage:", e);
      }
    }
  }, []);

  const displayedPayouts = showAll ? payouts : payouts.slice(0, 5);

  return (
    <div className="tpy-layout-wrapper">
      {/* Top Navbar */}
      <PublicNav />

      <div className="tpy-body-container">
        {/* Left Navigation Sidebar */}
        <TailorSidebar activeKey="payouts" />

        {/* Main Content Area */}
        <main className="tpy-main-content">
          {/* Header Area */}
          <div className="tpy-header">
            <h1 className="tpy-title">Withdrawal History</h1>
          </div>

          {/* Table Card matching exact reference image */}
          <div className="tpy-table-card">
            <div className="tpy-table-scroll">
              <table className="tpy-table">
                <thead>
                  <tr>
                    <th className="tpy-th" style={{ width: "25%" }}>Date</th>
                    <th className="tpy-th" style={{ width: "25%" }}>Amount</th>
                    <th className="tpy-th" style={{ width: "30%" }}>Method</th>
                    <th className="tpy-th" style={{ width: "20%" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedPayouts.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedPayout(row)}
                      style={{ cursor: "pointer" }}
                      title="Click to view payout receipt"
                    >
                      {/* Date */}
                      <td className="tpy-td">
                        <span className="tpy-date">{row.date}</span>
                      </td>

                      {/* Amount */}
                      <td className="tpy-td">
                        <span className="tpy-amount">
                          ₹{row.amount.toLocaleString("en-IN")}
                        </span>
                      </td>

                      {/* Method */}
                      <td className="tpy-td">
                        <span className="tpy-method">{row.method}</span>
                      </td>

                      {/* Status */}
                      <td className="tpy-td">
                        <span className="tpy-paid-badge">{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Button matching exact design */}
            <button
              type="button"
              onClick={() => {
                setShowAll(!showAll);
                setToastMessage(showAll ? "Showing recent withdrawals." : "Expanded all transaction history.");
              }}
              className="tpy-btn-view-all"
            >
              {showAll ? "Show Less" : "View All Transactions"}
            </button>
          </div>
        </main>
      </div>

      {/* Transaction Details Modal */}
      {selectedPayout && (
        <div
          className="tpy-modal-backdrop"
          onClick={() => setSelectedPayout(null)}
        >
          <div
            className="tpy-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tpy-modal-header">
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#111827" }}>
                  Payout Receipt
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: "2px 0 0" }}>
                  Ref: {selectedPayout.referenceNo}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPayout(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="tpy-modal-body">
              <div style={{ background: "#F0FDF4", padding: "16px", borderRadius: "12px", border: "1px solid #BBF7D0", textAlign: "center" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#166534" }}>Transferred Amount</span>
                <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#15803D", margin: "4px 0" }}>
                  ₹{selectedPayout.amount.toLocaleString("en-IN")}
                </h2>
                <span className="tpy-paid-badge" style={{ marginTop: "4px" }}>
                  ✓ Settled & Paid
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ color: "#6B7280" }}>Settlement Date</span>
                  <span style={{ fontWeight: 700, color: "#111827" }}>{selectedPayout.date}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ color: "#6B7280" }}>Payment Channel</span>
                  <span style={{ fontWeight: 700, color: "#111827" }}>{selectedPayout.method}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ color: "#6B7280" }}>Destination</span>
                  <span style={{ fontWeight: 700, color: "#111827" }}>{selectedPayout.bankAccount}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ color: "#6B7280" }}>Bank UTR Reference</span>
                  <span style={{ fontWeight: 700, color: "#078B87", fontFamily: "monospace" }}>
                    {selectedPayout.utrNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="tpy-modal-footer">
              <button
                type="button"
                onClick={() => setToastMessage("Downloading PDF Payout Tax Invoice...")}
                style={{
                  background: "#078B87",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  fontSize: "0.88rem",
                  fontWeight: 750,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Download size={15} />
                <span>Download Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Alert */}
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
