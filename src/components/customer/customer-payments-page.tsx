"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CreditCard,
  Plus,
  ShieldCheck,
  Check,
  Trash2,
  ChevronRight,
  Sparkles,
  X,
  Smartphone,
  Lock,
  ArrowUpRight,
  Clock
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { CardsGridSkeleton, TableSkeleton } from "@/components/common/shadow-skeleton";
import "@/styles/pages/customer-dashboard.css";
import "@/styles/pages/customer-account-views.css";

export interface PaymentMethodItem {
  id: string;
  type: "card" | "wallet" | "cod";
  provider: "Visa" | "MasterCard" | "JazzCash" | "EasyPaisa" | "SadaPay" | "Cash on Delivery";
  accountTitle: string;
  accountNumberMasked: string;
  expiry?: string;
  isDefault: boolean;
}

export interface PaymentTransactionItem {
  id: string;
  date: string;
  title: string;
  tailorName: string;
  amount: string;
  status: "Completed" | "Escrow Secured" | "Refunded";
  paymentMethod: string;
}

const initialPaymentMethods: PaymentMethodItem[] = [
  {
    id: "pm-1",
    type: "card",
    provider: "Visa",
    accountTitle: "Ayesha Khan",
    accountNumberMasked: "•••• •••• •••• 4242",
    expiry: "08/27",
    isDefault: true,
  },
  {
    id: "pm-2",
    type: "wallet",
    provider: "JazzCash",
    accountTitle: "Ayesha Khan",
    accountNumberMasked: "+92 300 ••••567",
    isDefault: false,
  },
];

const initialTransactions: PaymentTransactionItem[] = [
  {
    id: "txn-101",
    date: "20 May, 2024",
    title: "Anarkali Suit Stitching Advance",
    tailorName: "Rekha Tailors",
    amount: "Rs. 2,000",
    status: "Escrow Secured",
    paymentMethod: "Visa •••• 4242"
  },
  {
    id: "txn-102",
    date: "14 May, 2024",
    title: "Designer Blouse Stitching",
    tailorName: "Stitch Craft",
    amount: "Rs. 1,200",
    status: "Completed",
    paymentMethod: "JazzCash"
  },
  {
    id: "txn-103",
    date: "28 Apr, 2024",
    title: "Bespoke 2-Piece Suit Trial",
    tailorName: "Heritage Bespoke",
    amount: "Rs. 3,500",
    status: "Completed",
    paymentMethod: "Visa •••• 4242"
  }
];

export function CustomerPaymentsPage() {
  const [methods, setMethods] = useState<PaymentMethodItem[]>([]);
  const [transactions] = useState<PaymentTransactionItem[]>(initialTransactions);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Modal Form State
  const [methodType, setMethodType] = useState<"card" | "wallet">("card");
  const [cardHolder, setCardHolder] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [walletProvider, setWalletProvider] = useState<"JazzCash" | "EasyPaisa" | "SadaPay">("JazzCash");
  const [walletPhone, setWalletPhone] = useState<string>("");
  const [walletTitle, setWalletTitle] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sui_dhaga_customer_payment_methods");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setMethods(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch {}
    }

    const hasToken = typeof window !== "undefined" && !!localStorage.getItem("sui_dhaga_auth_token");
    if (hasToken) {
      setMethods([]);
    } else {
      setMethods(initialPaymentMethods);
    }
    setIsLoading(false);
  }, []);

  const saveMethods = (list: PaymentMethodItem[]) => {
    setMethods(list);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sui_dhaga_customer_payment_methods", JSON.stringify(list));
      } catch {}
    }
  };

  const handleSetDefault = (id: string) => {
    const updated = methods.map((m) => ({
      ...m,
      isDefault: m.id === id,
    }));
    saveMethods(updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Remove this payment method?")) return;
    const remaining = methods.filter((m) => m.id !== id);
    if (remaining.length > 0 && !remaining.some((m) => m.isDefault)) {
      remaining[0].isDefault = true;
    }
    saveMethods(remaining);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newMethod: PaymentMethodItem;
    if (methodType === "card") {
      const last4 = cardNumber.replace(/\D/g, "").slice(-4) || "1234";
      newMethod = {
        id: `pm-${Date.now()}`,
        type: "card",
        provider: "Visa",
        accountTitle: cardHolder.trim() || "Cardholder",
        accountNumberMasked: `•••• •••• •••• ${last4}`,
        expiry: cardExpiry.trim() || "12/28",
        isDefault: isDefault || methods.length === 0,
      };
    } else {
      const maskedPhone = walletPhone.length > 6
        ? `${walletPhone.slice(0, 5)} ••••${walletPhone.slice(-3)}`
        : walletPhone;
      newMethod = {
        id: `pm-${Date.now()}`,
        type: "wallet",
        provider: walletProvider,
        accountTitle: walletTitle.trim() || "Account Holder",
        accountNumberMasked: maskedPhone,
        isDefault: isDefault || methods.length === 0,
      };
    }

    let updated = [...methods, newMethod];
    if (newMethod.isDefault) {
      updated = updated.map((m) => ({
        ...m,
        isDefault: m.id === newMethod.id,
      }));
    }

    saveMethods(updated);
    setIsModalOpen(false);

    // Reset Form
    setCardHolder("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setWalletPhone("");
    setWalletTitle("");
  };

  return (
    <PublicShell>
      <div className="customer-page-root">
        {/* Ribbon Accent */}
        <div className="measurements-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="customer-page-container">
          <div className="customer-page-layout-grid">
            <CustomerSidebar active="payments" />

            <main className="customer-main-feed-area">
              {/* Breadcrumb */}
              <nav className="customer-breadcrumb-nav" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight size={14} />
                <Link href="/customer/dashboard">Dashboard</Link>
                <ChevronRight size={14} />
                <span className="crumb-current">Payment Methods</span>
              </nav>

              {/* Header */}
              <div className="customer-header-row">
                <div>
                  <h1 className="customer-page-title">Payment Methods & Wallet</h1>
                  <p className="customer-page-subtitle">
                    Manage secure debit/credit cards, mobile wallets, and escrow payment protection.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary-sd"
                >
                  <Plus size={16} />
                  <span>Add Payment Method</span>
                </button>
              </div>

              {/* Escrow Guarantee Banner */}
              <div
                style={{
                  background: "linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%)",
                  borderRadius: "16px",
                  border: "1px solid #99f6e4",
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "28px"
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "#078b87",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#0f766e", margin: "0 0 3px 0" }}>
                    Sui Dhāga Tailor Escrow Protection
                  </h4>
                  <p style={{ fontSize: "13px", color: "#134e4a", margin: 0, lineHeight: 1.5 }}>
                    Your payments are held securely in escrow and only disbursed to your tailor once your trial fitting is approved and you are completely satisfied with the craftsmanship.
                  </p>
                </div>
              </div>

              {/* Saved Methods List */}
              <div className="customer-section-card" style={{ marginBottom: "32px" }}>
                <div className="customer-card-header">
                  <h2 className="customer-card-title">
                    <CreditCard size={18} color="#078b87" />
                    <span>Saved Payment Methods</span>
                  </h2>
                </div>

                {isLoading ? (
                  <CardsGridSkeleton count={2} cardHeight={160} />
                ) : methods.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "36px 16px", color: "#64748b" }}>
                    <CreditCard size={36} style={{ color: "#cbd5e1", margin: "0 auto 12px" }} />
                    <p style={{ fontSize: "14px", margin: "0 0 16px 0" }}>No payment methods saved yet.</p>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="btn-primary-sd"
                    >
                      <Plus size={15} /> Add Debit/Credit Card or Wallet
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
                    {methods.map((pm) => (
                      <div
                        key={pm.id}
                        style={{
                          background: pm.isDefault
                            ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
                            : "#ffffff",
                          color: pm.isDefault ? "#ffffff" : "#1e293b",
                          border: pm.isDefault ? "none" : "1px solid #e2e8f0",
                          borderRadius: "16px",
                          padding: "20px",
                          boxShadow: pm.isDefault ? "0 8px 24px rgba(15, 23, 42, 0.25)" : "0 2px 8px rgba(0,0,0,0.04)",
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "160px"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "0.5px" }}>
                            {pm.provider}
                          </span>
                          {pm.isDefault && (
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                background: "rgba(255,255,255,0.18)",
                                color: "#ffffff",
                                padding: "2px 8px",
                                borderRadius: "10px",
                                fontSize: "11px",
                                fontWeight: 600
                              }}
                            >
                              <Check size={12} /> Default
                            </span>
                          )}
                        </div>

                        <div>
                          <div style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "1.5px", margin: "14px 0 6px 0" }}>
                            {pm.accountNumberMasked}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", opacity: 0.8 }}>
                            <span>{pm.accountTitle}</span>
                            {pm.expiry && <span>Exp: {pm.expiry}</span>}
                          </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "12px", borderTop: pm.isDefault ? "1px solid rgba(255,255,255,0.15)" : "1px solid #f1f5f9" }}>
                          {!pm.isDefault ? (
                            <button
                              type="button"
                              onClick={() => handleSetDefault(pm.id)}
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#078b87",
                                fontSize: "12px",
                                fontWeight: 600,
                                cursor: "pointer",
                                padding: 0
                              }}
                            >
                              Set default
                            </button>
                          ) : (
                            <span style={{ fontSize: "11.5px", opacity: 0.8 }}>Primary payment method</span>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(pm.id)}
                            title="Remove"
                            style={{
                              background: "transparent",
                              border: "none",
                              color: pm.isDefault ? "#f87171" : "#ef4444",
                              cursor: "pointer",
                              padding: "4px"
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Payment Transactions */}
              <div className="customer-section-card">
                <div className="customer-card-header">
                  <h2 className="customer-card-title">
                    <Clock size={18} color="#078b87" />
                    <span>Recent Payment Transactions</span>
                  </h2>
                </div>

                {isLoading ? (
                  <TableSkeleton rows={3} cols={6} />
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                          <th style={{ padding: "12px 14px" }}>Date</th>
                          <th style={{ padding: "12px 14px" }}>Description</th>
                          <th style={{ padding: "12px 14px" }}>Tailor</th>
                          <th style={{ padding: "12px 14px" }}>Method</th>
                          <th style={{ padding: "12px 14px" }}>Amount</th>
                          <th style={{ padding: "12px 14px" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((txn) => (
                          <tr key={txn.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "14px", color: "#64748b" }}>{txn.date}</td>
                            <td style={{ padding: "14px", fontWeight: 600, color: "#1e293b" }}>{txn.title}</td>
                            <td style={{ padding: "14px", color: "#475569" }}>{txn.tailorName}</td>
                            <td style={{ padding: "14px", color: "#64748b" }}>{txn.paymentMethod}</td>
                            <td style={{ padding: "14px", fontWeight: 700, color: "#078b87" }}>{txn.amount}</td>
                            <td style={{ padding: "14px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "4px 10px",
                                  borderRadius: "12px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  background: txn.status === "Completed" ? "#f0fdf4" : txn.status === "Escrow Secured" ? "#eff6ff" : "#fef2f2",
                                  color: txn.status === "Completed" ? "#166534" : txn.status === "Escrow Secured" ? "#1d4ed8" : "#b91c1c"
                                }}
                              >
                                {txn.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>

        {/* Modal: Add Payment Method */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              padding: "20px"
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                width: "100%",
                maxWidth: "480px",
                padding: "28px"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                  Add Payment Method
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Segmented type selector */}
              <div style={{ display: "flex", gap: "8px", background: "#f8fafc", padding: "4px", borderRadius: "10px", marginBottom: "20px" }}>
                <button
                  type="button"
                  onClick={() => setMethodType("card")}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: "pointer",
                    background: methodType === "card" ? "#078b87" : "transparent",
                    color: methodType === "card" ? "#fff" : "#64748b"
                  }}
                >
                  <CreditCard size={15} /> Card (Visa / MC)
                </button>

                <button
                  type="button"
                  onClick={() => setMethodType("wallet")}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: "pointer",
                    background: methodType === "wallet" ? "#078b87" : "transparent",
                    color: methodType === "wallet" ? "#fff" : "#64748b"
                  }}
                >
                  <Smartphone size={15} /> JazzCash / EasyPaisa
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {methodType === "card" ? (
                  <>
                    <div style={{ marginBottom: "14px" }}>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="e.g. Ayesha Khan"
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                      />
                    </div>

                    <div style={{ marginBottom: "14px" }}>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                        Card Number *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 •••• •••• 4242"
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "18px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                          Expiry (MM/YY) *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="08/27"
                          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                          CVV *
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ marginBottom: "14px" }}>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                        Select Mobile Wallet *
                      </label>
                      <select
                        value={walletProvider}
                        onChange={(e) => setWalletProvider(e.target.value as any)}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                      >
                        <option value="JazzCash">JazzCash Mobile Account</option>
                        <option value="EasyPaisa">EasyPaisa Mobile Account</option>
                        <option value="SadaPay">SadaPay Wallet</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: "14px" }}>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={walletTitle}
                        onChange={(e) => setWalletTitle(e.target.value)}
                        placeholder="Name registered on wallet"
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                      />
                    </div>

                    <div style={{ marginBottom: "18px" }}>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={walletPhone}
                        onChange={(e) => setWalletPhone(e.target.value)}
                        placeholder="e.g. 03001234567"
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                      />
                    </div>
                  </>
                )}

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#334155", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                      style={{ width: "16px", height: "16px", accentColor: "#078b87" }}
                    />
                    <span>Set as primary payment method</span>
                  </label>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-outline-sd"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-sd"
                  >
                    Save Payment Method
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PublicShell>
  );
}

