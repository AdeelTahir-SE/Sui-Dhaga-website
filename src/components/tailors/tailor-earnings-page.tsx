"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  CreditCard,
  X,
  Check,
  Building,
  ShieldCheck
} from "lucide-react";
import { PublicNav } from "@/components/common/site-shell";
import { TailorSidebar } from "@/components/tailors/tailor-sidebar";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/tailor-earnings-view.css";

interface WithdrawalRecord {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Processing";
}

const initialWithdrawals: WithdrawalRecord[] = [
  { id: "w1", date: "10 May 2024", amount: 5000, status: "Paid" },
  { id: "w2", date: "25 Apr 2024", amount: 7000, status: "Paid" },
  { id: "w3", date: "10 Apr 2024", amount: 6000, status: "Paid" },
  { id: "w4", date: "25 Mar 2024", amount: 5000, status: "Paid" }
];

const chartPointsData = [
  { label: "5 May", amount: 800, x: 40, y: 190 },
  { label: "10 May", amount: 1950, x: 100, y: 130 },
  { label: "15 May", amount: 1200, x: 160, y: 165 },
  { label: "20 May", amount: 2850, x: 220, y: 80 },
  { label: "25 May", amount: 1800, x: 280, y: 140 },
  { label: "30 May", amount: 2400, x: 340, y: 105 }
];

const KEY_TAILOR_EARNINGS = "sui_dhaga_tailor_earnings_records";

export function TailorEarningsPage() {
  const [totalEarnings, setTotalEarnings] = useState(48650);
  const [monthlyEarnings, setMonthlyEarnings] = useState(38250);
  const [completedOrders, setCompletedOrders] = useState(42);
  const [pendingPayments, setPendingPayments] = useState(6400);

  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>(initialWithdrawals);
  const [selectedPoint, setSelectedPoint] = useState(chartPointsData[3]); // 20 May (₹2,850) matching screenshot
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("5000");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(KEY_TAILOR_EARNINGS);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.withdrawals) setWithdrawals(parsed.withdrawals);
          if (parsed.totalEarnings) setTotalEarnings(parsed.totalEarnings);
          if (parsed.monthlyEarnings) setMonthlyEarnings(parsed.monthlyEarnings);
        }
      } catch (e) {
        console.warn("Failed to load earnings from localStorage:", e);
      }
    }
  }, []);

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(withdrawAmount);
    if (amountNum <= 0 || amountNum > monthlyEarnings) {
      setToastMessage("Please enter an amount within your available balance.");
      return;
    }

    const newRecord: WithdrawalRecord = {
      id: `w-${Date.now()}`,
      date: "Just now",
      amount: amountNum,
      status: "Paid"
    };

    const updatedWithdrawals = [newRecord, ...withdrawals];
    const newMonthly = monthlyEarnings - amountNum;
    setWithdrawals(updatedWithdrawals);
    setMonthlyEarnings(newMonthly);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          KEY_TAILOR_EARNINGS,
          JSON.stringify({
            withdrawals: updatedWithdrawals,
            totalEarnings,
            monthlyEarnings: newMonthly
          })
        );
      } catch (err) {
        console.warn(err);
      }
    }

    setIsWithdrawModalOpen(false);
    setToastMessage(`🎉 Payout of ₹${amountNum.toLocaleString("en-IN")} initiated to your verified bank account!`);
  };

  return (
    <div className="ter-layout-wrapper">
      {/* Top Navbar */}
      <PublicNav />

      <div className="ter-body-container">
        {/* Left Navigation Sidebar */}
        <TailorSidebar activeKey="earnings" />

        {/* Main Content Area */}
        <main className="ter-main-content">
          {/* Header Area */}
          <div className="ter-header">
            <h1 className="ter-title">Earnings Overview</h1>
          </div>

          {/* 1. Top 4 Overview KPI Cards matching reference image */}
          <div className="ter-kpi-grid">
            <div className="ter-kpi-card">
              <span className="ter-kpi-val">₹{totalEarnings.toLocaleString("en-IN")}</span>
              <span className="ter-kpi-label">Total Earnings</span>
            </div>

            <div className="ter-kpi-card">
              <span className="ter-kpi-val">₹{monthlyEarnings.toLocaleString("en-IN")}</span>
              <span className="ter-kpi-label">This Month</span>
            </div>

            <div className="ter-kpi-card">
              <span className="ter-kpi-val">{completedOrders}</span>
              <span className="ter-kpi-label">Completed Orders</span>
            </div>

            <div className="ter-kpi-card">
              <span className="ter-kpi-val">₹{pendingPayments.toLocaleString("en-IN")}</span>
              <span className="ter-kpi-label">Pending Payments</span>
            </div>
          </div>

          {/* 2. Middle Row: 2-Column Split (Chart + Withdrawal History) */}
          <div className="ter-main-grid">
            {/* Left Card: Earnings Chart */}
            <div className="ter-chart-card">
              <div className="ter-chart-header">
                <h2 className="ter-card-title">Earnings Chart</h2>
                <select className="ter-select-filter" defaultValue="this_month">
                  <option value="this_month">This Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="quarter">Last 3 Months</option>
                  <option value="year">This Year</option>
                </select>
              </div>

              {/* Interactive SVG Chart matching reference visual */}
              <div className="ter-chart-wrap">
                <svg
                  className="ter-svg-chart"
                  viewBox="0 0 380 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Horizontal Grid Guidelines */}
                  <line x1="40" y1="40" x2="360" y2="40" stroke="#F3F4F6" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="90" x2="360" y2="90" stroke="#F3F4F6" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="140" x2="360" y2="140" stroke="#F3F4F6" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="190" x2="360" y2="190" stroke="#F3F4F6" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="215" x2="360" y2="215" stroke="#E5E7EB" strokeWidth="1" />

                  {/* Y-Axis Value Labels */}
                  <text x="10" y="44" fill="#9CA3AF" fontSize="10" fontWeight="600">₹40K</text>
                  <text x="10" y="94" fill="#9CA3AF" fontSize="10" fontWeight="600">₹30K</text>
                  <text x="10" y="144" fill="#9CA3AF" fontSize="10" fontWeight="600">₹20K</text>
                  <text x="10" y="194" fill="#9CA3AF" fontSize="10" fontWeight="600">₹10K</text>
                  <text x="24" y="218" fill="#9CA3AF" fontSize="10" fontWeight="600">0</text>

                  {/* X-Axis Date Labels */}
                  <text x="35" y="232" fill="#6B7280" fontSize="9" fontWeight="600">5 May</text>
                  <text x="90" y="232" fill="#6B7280" fontSize="9" fontWeight="600">10 May</text>
                  <text x="150" y="232" fill="#6B7280" fontSize="9" fontWeight="600">15 May</text>
                  <text x="210" y="232" fill="#6B7280" fontSize="9" fontWeight="600">20 May</text>
                  <text x="270" y="232" fill="#6B7280" fontSize="9" fontWeight="600">25 May</text>
                  <text x="330" y="232" fill="#6B7280" fontSize="9" fontWeight="600">30 May</text>

                  {/* Chart Line Path */}
                  <path
                    d="M40 190 L100 130 L160 165 L220 80 L280 140 L340 105"
                    stroke="#078B87"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points on Line */}
                  {chartPointsData.map((pt, idx) => {
                    const isSelected = selectedPoint.label === pt.label;
                    return (
                      <g
                        key={idx}
                        onClick={() => setSelectedPoint(pt)}
                        style={{ cursor: "pointer" }}
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? 6 : 4}
                          fill={isSelected ? "#078B87" : "#078B87"}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Tooltip Box matching screenshot */}
                {selectedPoint && (
                  <div
                    className="ter-tooltip-box"
                    style={{
                      left: `${(selectedPoint.x / 380) * 100}%`,
                      top: `${(selectedPoint.y / 240) * 100}%`
                    }}
                  >
                    <span className="ter-tooltip-date">{selectedPoint.label}</span>
                    <span className="ter-tooltip-amount">₹{selectedPoint.amount.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>

              {/* Request Withdrawal Button */}
              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(true)}
                className="ter-btn-withdraw"
              >
                Request Withdrawal
              </button>
            </div>

            {/* Right Card: Withdrawal History */}
            <div className="ter-history-card">
              <h2 className="ter-card-title">Withdrawal History</h2>

              <div className="ter-history-list">
                {withdrawals.map((item) => (
                  <div key={item.id} className="ter-history-item">
                    <span className="ter-hist-date">{item.date}</span>
                    <div className="ter-hist-right">
                      <span className="ter-hist-amount">₹{item.amount.toLocaleString("en-IN")}</span>
                      <span className="ter-paid-badge">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Request Withdrawal Modal */}
      {isWithdrawModalOpen && (
        <div
          className="ter-modal-backdrop"
          onClick={() => setIsWithdrawModalOpen(false)}
        >
          <div
            className="ter-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ter-modal-header">
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111827", margin: 0 }}>
                Request Payout Withdrawal
              </h3>
              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit}>
              <div className="ter-modal-body">
                <div style={{ background: "#F0FDF4", padding: "14px", borderRadius: "12px", border: "1px solid #BBF7D0" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#166534" }}>Available for Instant Payout</span>
                  <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "#15803D", margin: "2px 0 0" }}>
                    ₹{monthlyEarnings.toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                    Withdrawal Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="500"
                    max={monthlyEarnings}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 800 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                    Destination Bank Account
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", background: "#FAF8F5" }}>
                    <Building size={18} color="#078B87" />
                    <div>
                      <p style={{ fontSize: "0.88rem", fontWeight: 750, color: "#111827", margin: 0 }}>
                        HDFC Bank / Verma Stitch Studio
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: 0 }}>
                        Account ending in •••• 8766 (Verified)
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#15803D", fontSize: "0.8rem", fontWeight: 650 }}>
                  <ShieldCheck size={16} />
                  <span>Direct NEFT / IMPS Bank Transfer in 15-30 minutes</span>
                </div>
              </div>

              <div className="ter-modal-footer">
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    padding: "8px 18px",
                    fontWeight: 700,
                    color: "#374151",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    background: "#078B87",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 22px",
                    fontWeight: 750,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <Check size={16} />
                  <span>Confirm Withdrawal</span>
                </button>
              </div>
            </form>
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
