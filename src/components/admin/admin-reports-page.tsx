"use client";

import React, { useState } from "react";
import {
  FileBarChart,
  Download,
  Calendar,
  IndianRupee,
  Scissors,
  Users,
  CheckCircle2,
  Filter
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminToast } from "@/components/admin/admin-toast";

export function AdminReportsPage() {
  const [reportType, setReportType] = useState("financial");
  const [dateRange, setDateRange] = useState("this_month");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleGenerateAndDownload = () => {
    let filename = `sui_dhaga_${reportType}_report_${new Date().toISOString().split("T")[0]}.csv`;
    let headers = "Metric,Category,Volume,PKR_Amount,Growth\n";
    let rows = "";

    if (reportType === "financial") {
      rows =
        "Gross Orders Volume,Sales,5672,45788320,+18.3%\n" +
        "Platform Commission Retained,Revenue,5672,549398,+14.2%\n" +
        "Artisan Payouts Settled,Settlements,5120,40294340,+19.1%\n" +
        "Dispute Refunds,Deductions,12,68500,-4.5%\n";
    } else if (reportType === "tailors") {
      rows =
        "Rekha Bridal Haute Couture,Karachi,310 Orders,4280000,Rating 4.95\n" +
        "Master Aslam Bespoke,Lahore,142 Orders,1845000,Rating 4.90\n" +
        "Royal Drapers,Islamabad,92 Orders,1120000,Rating 4.80\n";
    } else {
      rows =
        "Total Customers,Punjab,8940,68%,+12%\n" +
        "Total Customers,Sindh,2410,18%,+15%\n" +
        "Total Customers,Islamabad/KPK,1495,14%,+22%\n";
    }

    const csvData = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvData);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage(`Generated and downloaded ${filename}`);
  };

  return (
    <div className="admin-layout-wrapper">
      <AdminSidebar activeKey="reports" />

      <div className="admin-main-container">
        <AdminHeader />

        <main className="admin-dashboard-body">
          <div className="admin-page-header">
            <div className="admin-page-title-wrap">
              <h1>Business Analytics & Tax Reports</h1>
              <p>Generate financial statements, tailor commission summaries, sales tax audits, and operational CSV exports.</p>
            </div>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #EAE6DF",
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0 }}>Configure Report Export</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Report Category</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="admin-form-select"
                >
                  <option value="financial">Financial Gross Volume & Commission Audit</option>
                  <option value="tailors">Artisan Boutique Performance & Payouts</option>
                  <option value="users">User Acquisition & Geographic Distribution</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Reporting Period</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="admin-form-select"
                >
                  <option value="this_month">Current Month (May 2024)</option>
                  <option value="last_month">Previous Month (April 2024)</option>
                  <option value="q1">Q1 2024 Financial Quarter</option>
                  <option value="ytd">Year to Date (2024)</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={handleGenerateAndDownload}
                className="admin-btn-primary"
              >
                <Download size={16} />
                <span>Generate & Download CSV</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
