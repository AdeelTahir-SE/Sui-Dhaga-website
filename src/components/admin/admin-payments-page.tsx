"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Download,
  SlidersHorizontal,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ArrowUpRight,
  TrendingUp,
  X,
  ShieldCheck,
  ChevronDown,
  Building2,
  Wallet,
  Clock,
  RotateCcw,
  Check,
  ArrowDownLeft
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminToast } from "@/components/admin/admin-toast";
import { adminService } from "@/lib/api/admin-service";
import {
  AdminPaymentTransaction,
  AdminPayoutRequest,
  PaymentTransactionStatus,
  PaymentMethod,
  ProcessPayoutPayload,
  ProcessRefundPayload
} from "@/lib/api/admin-types";

// Helper: Payment Method Label
function formatPaymentMethod(method: PaymentMethod): string {
  switch (method) {
    case "upi":
      return "UPI";
    case "cards":
    case "credit_card":
      return "Cards";
    case "net_banking":
      return "Net Banking";
    case "wallet":
      return "Wallet";
    case "jazzcash":
      return "JazzCash";
    case "easypaisa":
      return "EasyPaisa";
    case "bank_transfer":
      return "Bank Transfer";
    default:
      return method.toUpperCase();
  }
}

// Helper: Transaction Status Badge
function TransactionStatusBadge({ status }: { status: PaymentTransactionStatus }) {
  if (status === "completed") {
    return (
      <span
        style={{
          display: "inline-block",
          background: "#DCFCE7",
          color: "#15803D",
          fontWeight: 700,
          fontSize: "0.8rem",
          padding: "3px 12px",
          borderRadius: "20px",
          whiteSpace: "nowrap"
        }}
      >
        Completed
      </span>
    );
  }
  if (status === "refund_requested") {
    return (
      <span
        style={{
          display: "inline-block",
          background: "#FEF3C7",
          color: "#D97706",
          fontWeight: 700,
          fontSize: "0.8rem",
          padding: "3px 12px",
          borderRadius: "20px",
          whiteSpace: "nowrap"
        }}
      >
        Refund Requested
      </span>
    );
  }
  if (status === "pending" || status === "in_escrow") {
    return (
      <span
        style={{
          display: "inline-block",
          background: "#FEF3C7",
          color: "#D97706",
          fontWeight: 700,
          fontSize: "0.8rem",
          padding: "3px 12px",
          borderRadius: "20px",
          whiteSpace: "nowrap"
        }}
      >
        Pending
      </span>
    );
  }
  if (status === "refunded") {
    return (
      <span
        style={{
          display: "inline-block",
          background: "#FEE2E2",
          color: "#DC2626",
          fontWeight: 700,
          fontSize: "0.8rem",
          padding: "3px 12px",
          borderRadius: "20px",
          whiteSpace: "nowrap"
        }}
      >
        Refunded
      </span>
    );
  }
  return (
    <span
      style={{
        display: "inline-block",
        background: "#F3F4F6",
        color: "#6B7280",
        fontWeight: 700,
        fontSize: "0.8rem",
        padding: "3px 12px",
        borderRadius: "20px",
        whiteSpace: "nowrap",
        textTransform: "capitalize"
      }}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

export function AdminPaymentsPage() {
  const [transactions, setTransactions] = useState<AdminPaymentTransaction[]>([]);
  const [payouts, setPayouts] = useState<AdminPayoutRequest[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTxn, setSelectedTxn] = useState<AdminPaymentTransaction | null>(null);
  const [refundModalTxn, setRefundModalTxn] = useState<AdminPaymentTransaction | null>(null);
  const [refundReason, setRefundReason] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [txns, poList] = await Promise.all([
        adminService.payments.getTransactions({
          search,
          type: typeFilter as any,
          method: methodFilter,
          status: statusFilter
        }),
        adminService.payments.getPayoutRequests()
      ]);
      setTransactions(txns);
      setPayouts(poList);
    } catch (err) {
      console.error("Failed to load payments data:", err);
      setToastMessage("Failed to load payments from API. Showing local records.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, typeFilter, methodFilter, statusFilter]);

  const handleProcessRefund = async () => {
    if (!refundModalTxn) return;
    try {
      await adminService.payments.processRefund({
        orderId: refundModalTxn.orderId,
        amount: refundModalTxn.amount,
        reason: refundReason || "Administrative refund approved by platform manager",
        refundMethod: "original_source"
      });

      setTransactions((prev) =>
        prev.map((t) => (t.id === refundModalTxn.id ? { ...t, status: "refunded" } : t))
      );
      if (selectedTxn?.id === refundModalTxn.id) {
        setSelectedTxn({ ...selectedTxn, status: "refunded" });
      }

      setToastMessage(`Refund of ₹${refundModalTxn.amount.toLocaleString("en-IN")} processed for Order #${refundModalTxn.orderNumber}`);
      setRefundModalTxn(null);
      setRefundReason("");
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to process refund");
    }
  };

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Transaction ID,Order ID,Customer,Amount,Method,Status,Date,Fee,NetPayout\n" +
      transactions
        .map(
          (t) =>
            `"${t.transactionId}","#${t.orderNumber}","${t.customerName}",${t.amount},"${t.method}","${t.status}","${t.createdAt}",${t.platformFee},${t.netPayout}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sui_dhaga_payments_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage("Payment transaction log exported to CSV.");
  };

  return (
    <div className="admin-layout-wrapper">
      {/* Sidebar with Active Payments Link */}
      <AdminSidebar activeKey="payments" />

      {/* Main Container */}
      <div className="admin-main-container">
        {/* Top Header with Search and Profile */}
        <AdminHeader onSearch={(q) => setSearch(q)} />

        <main className="admin-dashboard-body">
          {/* Page Heading matching reference image */}
          <div className="admin-page-header">
            <div className="admin-page-title-wrap">
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>
                Payments
              </h1>
              <p style={{ fontSize: "0.92rem", color: "#6B7280", margin: 0 }}>
                Monitor payments, transactions and refunds.
              </p>
            </div>
          </div>

          {/* Top 4 Summary Cards matching exact design */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "18px",
              marginBottom: "24px"
            }}
          >
            {/* Card 1: Total Revenue */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAE6DF",
                borderRadius: "14px",
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <span style={{ fontSize: "0.82rem", fontWeight: 650, color: "#6B7280" }}>Total Revenue</span>
              <h2 style={{ fontSize: "1.65rem", fontWeight: 850, color: "#111827", margin: 0 }}>
                ₹45,78,320
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "#15803D", fontWeight: 700 }}>
                <span>▲ 18.2%</span>
                <span style={{ color: "#6B7280", fontWeight: 500 }}>vs last month</span>
              </div>
            </div>

            {/* Card 2: Completed Transactions */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAE6DF",
                borderRadius: "14px",
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <span style={{ fontSize: "0.82rem", fontWeight: 650, color: "#6B7280" }}>Completed Transactions</span>
              <h2 style={{ fontSize: "1.65rem", fontWeight: 850, color: "#111827", margin: 0 }}>
                ₹41,25,900
              </h2>
              <span style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 550 }}>
                1,245 payments
              </span>
            </div>

            {/* Card 3: Pending Payouts */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAE6DF",
                borderRadius: "14px",
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <span style={{ fontSize: "0.82rem", fontWeight: 650, color: "#6B7280" }}>Pending Payouts</span>
              <h2 style={{ fontSize: "1.65rem", fontWeight: 850, color: "#111827", margin: 0 }}>
                ₹2,84,650
              </h2>
              <span style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 550 }}>
                18 payouts
              </span>
            </div>

            {/* Card 4: Refunds Issued */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAE6DF",
                borderRadius: "14px",
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <span style={{ fontSize: "0.82rem", fontWeight: 650, color: "#6B7280" }}>Refunds Issued</span>
              <h2 style={{ fontSize: "1.65rem", fontWeight: 850, color: "#111827", margin: 0 }}>
                ₹1,67,770
              </h2>
              <span style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 550 }}>
                32 refunds
              </span>
            </div>
          </div>

          {/* Filter & Control Bar matching reference image */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "20px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", flex: 1 }}>
              {/* Dropdown 1: All Transactions */}
              <div style={{ position: "relative" }}>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "10px",
                    padding: "9px 34px 9px 14px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#374151",
                    appearance: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="all">All Transactions</option>
                  <option value="payments">Payments</option>
                  <option value="refunds">Refunds</option>
                </select>
                <ChevronDown
                  size={14}
                  color="#6B7280"
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                />
              </div>

              {/* Dropdown 2: All Payment Methods */}
              <div style={{ position: "relative" }}>
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "10px",
                    padding: "9px 34px 9px 14px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#374151",
                    appearance: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="all">All Payment Methods</option>
                  <option value="upi">UPI</option>
                  <option value="cards">Cards</option>
                  <option value="net_banking">Net Banking</option>
                  <option value="wallet">Wallet</option>
                </select>
                <ChevronDown
                  size={14}
                  color="#6B7280"
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                />
              </div>

              {/* Dropdown 3: All Status */}
              <div style={{ position: "relative" }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "10px",
                    padding: "9px 34px 9px 14px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#374151",
                    appearance: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="refund_requested">Refund Requested</option>
                  <option value="refunded">Refunded</option>
                </select>
                <ChevronDown
                  size={14}
                  color="#6B7280"
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                />
              </div>

              {/* Filters Toggle Button */}
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                style={{
                  background: isFilterDrawerOpen ? "#FAF8F5" : "#FFFFFF",
                  border: isFilterDrawerOpen ? "1px solid #078B87" : "1px solid #E5E7EB",
                  color: isFilterDrawerOpen ? "#078B87" : "#374151",
                  borderRadius: "10px",
                  padding: "9px 16px",
                  fontSize: "0.88rem",
                  fontWeight: 650,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer"
                }}
              >
                <SlidersHorizontal size={15} />
                <span>Filters</span>
              </button>
            </div>

            {/* Export Button (Deep Teal) */}
            <button
              type="button"
              onClick={handleExportCsv}
              style={{
                background: "#078B87",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                padding: "9px 18px",
                fontSize: "0.9rem",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(7, 139, 135, 0.25)",
                transition: "all 0.15s ease"
              }}
            >
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>

          {/* Expandable Search / Advanced Filters */}
          {isFilterDrawerOpen && (
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAE6DF",
                borderRadius: "12px",
                padding: "16px 20px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
              }}
            >
              <div style={{ position: "relative", minWidth: "280px", maxWidth: "420px", flex: 1 }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9CA3AF",
                    pointerEvents: "none"
                  }}
                />
                <input
                  type="text"
                  placeholder="Search by Transaction ID, Order #, Customer or Tailor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    padding: "8px 12px 8px 38px",
                    fontSize: "0.85rem",
                    outline: "none"
                  }}
                />
              </div>

              {(search || typeFilter !== "all" || methodFilter !== "all" || statusFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setTypeFilter("all");
                    setMethodFilter("all");
                    setStatusFilter("all");
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#DC2626",
                    fontSize: "0.85rem",
                    fontWeight: 650,
                    cursor: "pointer",
                    marginLeft: "auto"
                  }}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          )}

          {/* Transactions Data Table matching exact design */}
          <div className="admin-table-container" style={{ marginBottom: "24px" }}>
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-th" style={{ width: "16%" }}>Transaction ID</th>
                    <th className="admin-th" style={{ width: "12%" }}>Order ID</th>
                    <th className="admin-th" style={{ width: "18%" }}>Customer</th>
                    <th className="admin-th" style={{ width: "12%" }}>Amount</th>
                    <th className="admin-th" style={{ width: "14%" }}>Method</th>
                    <th className="admin-th" style={{ width: "14%" }}>Status</th>
                    <th className="admin-th" style={{ width: "14%" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280" }}>
                        {isLoading ? "Loading payment records..." : "No transactions found matching your filters."}
                      </td>
                    </tr>
                  ) : (
                    transactions.map((txn) => (
                      <tr
                        key={txn.id}
                        onClick={() => setSelectedTxn(txn)}
                        style={{ cursor: "pointer" }}
                        title="Click to view full transaction and settlement details"
                      >
                        {/* Transaction ID Column */}
                        <td className="admin-td" style={{ fontWeight: 650, color: "#111827", fontSize: "0.9rem" }}>
                          {txn.transactionId}
                        </td>

                        {/* Order ID Column */}
                        <td className="admin-td" style={{ fontWeight: 750, color: "#0284C7", fontSize: "0.9rem" }}>
                          #{txn.orderNumber}
                        </td>

                        {/* Customer Column */}
                        <td className="admin-td" style={{ fontWeight: 650, color: "#1F2937", fontSize: "0.9rem" }}>
                          {txn.customerName}
                        </td>

                        {/* Amount Column */}
                        <td className="admin-td" style={{ fontWeight: 750, color: "#111827", fontSize: "0.92rem" }}>
                          ₹{txn.amount.toLocaleString("en-IN")}
                        </td>

                        {/* Method Column */}
                        <td className="admin-td" style={{ color: "#374151", fontSize: "0.88rem", fontWeight: 550 }}>
                          {formatPaymentMethod(txn.method)}
                        </td>

                        {/* Status Column */}
                        <td className="admin-td">
                          <TransactionStatusBadge status={txn.status} />
                        </td>

                        {/* Date Column */}
                        <td className="admin-td" style={{ color: "#4B5563", fontSize: "0.86rem", fontWeight: 500 }}>
                          {txn.createdAt}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom 3 Analytics Widgets matching exact screenshot */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px"
            }}
          >
            {/* Widget 1: Revenue This Month */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAE6DF",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <div>
                <span style={{ fontSize: "0.82rem", fontWeight: 650, color: "#6B7280" }}>Revenue This Month</span>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 850, color: "#111827", margin: "4px 0 6px" }}>
                  ₹45,78,320
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "#15803D", fontWeight: 700 }}>
                  <span>▲ 18.2%</span>
                  <span style={{ color: "#6B7280", fontWeight: 500 }}>vs last month</span>
                </div>
              </div>

              {/* Mini Bar Chart SVG */}
              <svg width="60" height="48" viewBox="0 0 60 48" fill="none">
                <rect x="4" y="32" width="7" height="16" rx="2" fill="#078B87" opacity="0.4" />
                <rect x="16" y="24" width="7" height="24" rx="2" fill="#078B87" opacity="0.6" />
                <rect x="28" y="16" width="7" height="32" rx="2" fill="#078B87" opacity="0.8" />
                <rect x="40" y="8" width="7" height="40" rx="2" fill="#078B87" />
                <rect x="52" y="2" width="7" height="46" rx="2" fill="#065F5C" />
              </svg>
            </div>

            {/* Widget 2: Top Payment Method */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAE6DF",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <div>
                <span style={{ fontSize: "0.82rem", fontWeight: 650, color: "#6B7280" }}>Top Payment Method</span>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 850, color: "#111827", margin: "4px 0 6px" }}>
                  UPI
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 550 }}>
                  62% of total transactions
                </span>
              </div>

              {/* Mini Donut Chart SVG */}
              <svg width="52" height="52" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#E5E7EB" strokeWidth="6" />
                {/* UPI Segment (62%) */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.9"
                  fill="transparent"
                  stroke="#078B87"
                  strokeWidth="6"
                  strokeDasharray="62 38"
                  strokeDashoffset="25"
                />
                {/* Cards Segment (24%) */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.9"
                  fill="transparent"
                  stroke="#7C3AED"
                  strokeWidth="6"
                  strokeDasharray="24 76"
                  strokeDashoffset="-37"
                />
                {/* Net Banking / Wallet (14%) */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.9"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="6"
                  strokeDasharray="14 86"
                  strokeDashoffset="-61"
                />
              </svg>
            </div>

            {/* Widget 3: Refund Rate */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAE6DF",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <div>
                <span style={{ fontSize: "0.82rem", fontWeight: 650, color: "#6B7280" }}>Refund Rate</span>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 850, color: "#111827", margin: "4px 0 6px" }}>
                  3.65%
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 550 }}>
                  vs total transactions
                </span>
              </div>

              {/* Mini Sparkline Curve SVG */}
              <svg width="70" height="42" viewBox="0 0 70 42" fill="none">
                <path
                  d="M2 38 L16 32 L30 35 L44 20 L58 28 L68 10"
                  stroke="#DC2626"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 38 L16 32 L30 35 L44 20 L58 28 L68 10 L68 40 L2 40 Z"
                  fill="url(#refundGrad)"
                  opacity="0.18"
                />
                <defs>
                  <linearGradient id="refundGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DC2626" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </main>
      </div>

      {/* Transaction Details / Escrow Inspection Drawer */}
      {selectedTxn && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedTxn(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px" }}>
            <div className="admin-modal-header">
              <div>
                <h2 className="admin-modal-title">Transaction Details</h2>
                <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: "2px 0 0" }}>
                  Ref: {selectedTxn.transactionId} · {selectedTxn.createdAt}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTxn(null)}
                className="admin-modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              {/* Financial Snapshot */}
              <div
                style={{
                  background: "#FAF8F5",
                  border: "1px solid #EAE6DF",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px"
                }}
              >
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 2px" }}>Order Reference</p>
                  <p style={{ fontSize: "0.95rem", fontWeight: 750, color: "#0284C7", margin: 0 }}>
                    #{selectedTxn.orderNumber}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 2px" }}>Gross Amount</p>
                  <p style={{ fontSize: "1.1rem", fontWeight: 850, color: "#111827", margin: 0 }}>
                    ₹{selectedTxn.amount.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 2px" }}>Payment Method</p>
                  <p style={{ fontSize: "0.9rem", fontWeight: 650, color: "#111827", margin: 0 }}>
                    {formatPaymentMethod(selectedTxn.method)}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 2px" }}>Settlement Status</p>
                  <TransactionStatusBadge status={selectedTxn.status} />
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 2px" }}>Customer Name</p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 650, color: "#111827", margin: 0 }}>
                    {selectedTxn.customerName}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 2px" }}>Boutique / Tailor</p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 650, color: "#111827", margin: 0 }}>
                    {selectedTxn.tailorName}
                  </p>
                </div>
              </div>

              {/* Commission & Net Settlement Breakdown */}
              <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "14px" }}>
                <p style={{ fontSize: "0.8rem", fontWeight: 750, color: "#374151", textTransform: "uppercase", margin: "0 0 8px" }}>
                  Fee & Payout Distribution
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "6px" }}>
                  <span style={{ color: "#6B7280" }}>Platform Commission:</span>
                  <strong style={{ color: "#078B87" }}>₹{selectedTxn.platformFee.toLocaleString("en-IN")}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "6px" }}>
                  <span style={{ color: "#6B7280" }}>Applicable GST / Tax:</span>
                  <strong style={{ color: "#4B5563" }}>₹{selectedTxn.taxAmount.toLocaleString("en-IN")}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", paddingTop: "6px", borderTop: "1px solid #F3F4F6" }}>
                  <span style={{ fontWeight: 700, color: "#111827" }}>Net Tailor Settlement:</span>
                  <strong style={{ fontWeight: 800, color: "#2563EB" }}>₹{selectedTxn.netPayout.toLocaleString("en-IN")}</strong>
                </div>
              </div>

              {selectedTxn.gatewayResponseCode && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "10px 14px", fontSize: "0.82rem", color: "#4B5563" }}>
                  <ShieldCheck size={16} color="#078B87" />
                  <span>Gateway Auth Code: <strong>{selectedTxn.gatewayResponseCode}</strong></span>
                </div>
              )}
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setSelectedTxn(null)}
                className="admin-btn-secondary"
              >
                Close
              </button>

              {selectedTxn.status === "refund_requested" && (
                <button
                  type="button"
                  onClick={() => {
                    setRefundModalTxn(selectedTxn);
                    setSelectedTxn(null);
                  }}
                  className="admin-btn-danger"
                >
                  <RotateCcw size={15} />
                  <span>Review & Approve Refund</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approve Refund Action Modal */}
      {refundModalTxn && (
        <div className="admin-modal-backdrop" onClick={() => setRefundModalTxn(null)}>
          <div className="admin-modal-card" style={{ maxWidth: "520px" }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <RotateCcw size={22} color="#DC2626" />
                <h2 className="admin-modal-title">Authorize Refund</h2>
              </div>
              <button
                type="button"
                onClick={() => setRefundModalTxn(null)}
                className="admin-modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              <p style={{ fontSize: "0.92rem", color: "#374151", margin: "0 0 12px", lineHeight: 1.5 }}>
                You are authorizing a full refund of{" "}
                <strong>₹{refundModalTxn.amount.toLocaleString("en-IN")}</strong> for Order{" "}
                <strong>#{refundModalTxn.orderNumber}</strong> ({refundModalTxn.customerName}). Funds will be reverted directly to their original payment source (
                {formatPaymentMethod(refundModalTxn.method)}).
              </p>

              <div className="admin-form-group">
                <label className="admin-form-label">Refund Justification / Audit Note</label>
                <textarea
                  placeholder="e.g. Customer dispute verified; boutique unable to deliver on requested timeline..."
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="admin-form-textarea"
                />
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setRefundModalTxn(null)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProcessRefund}
                className="admin-btn-danger"
              >
                <CheckCircle2 size={16} />
                <span>Confirm & Release Refund</span>
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
