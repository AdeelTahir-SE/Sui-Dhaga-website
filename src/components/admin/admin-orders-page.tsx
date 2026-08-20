"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Package,
  Scissors,
  Truck,
  FileText,
  User,
  Store,
  DollarSign,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminToast } from "@/components/admin/admin-toast";
import { adminService } from "@/lib/api/admin-service";
import { AdminOrder, AdminOrderStatus, UpdateOrderStatusPayload } from "@/lib/api/admin-types";

// Helper: Status Badge
function OrderStatusBadge({ status }: { status: AdminOrderStatus }) {
  if (["stitching", "cutting", "measuring", "fabric_sourcing", "quality_check"].includes(status)) {
    return (
      <span
        style={{
          display: "inline-block",
          background: "#EFF6FF",
          color: "#2563EB",
          fontWeight: 700,
          fontSize: "0.8rem",
          padding: "3px 12px",
          borderRadius: "20px",
          whiteSpace: "nowrap"
        }}
      >
        In Progress
      </span>
    );
  }
  if (["completed", "delivered"].includes(status)) {
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
  if (["pending_approval", "pending"].includes(status)) {
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
  if (status === "cancelled") {
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
          whiteSpace: "nowrap"
        }}
      >
        Cancelled
      </span>
    );
  }
  return (
    <span
      style={{
        display: "inline-block",
        background: "#F3F4F6",
        color: "#374151",
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

// Helper: Dispute Badge
function DisputeBadge({ dispute }: { dispute?: string }) {
  if (dispute === "open") {
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
        Open
      </span>
    );
  }
  if (dispute === "resolved") {
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
        Resolved
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
        whiteSpace: "nowrap"
      }}
    >
      None
    </span>
  );
}

export function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [totalCount, setTotalCount] = useState(256);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(32);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
  const [disputeStatusFilter, setDisputeStatusFilter] = useState<string>("all");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [updateStatusModal, setUpdateStatusModal] = useState<AdminOrder | null>(null);
  const [newStatus, setNewStatus] = useState<AdminOrderStatus>("stitching");
  const [statusNote, setStatusNote] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const res = await adminService.orders.getOrders({
        search,
        status: statusFilter as any,
        paymentStatus: paymentStatusFilter,
        disputeStatus: disputeStatusFilter,
        page,
        limit: 8
      });
      setOrders(res.data);
      setTotalCount(res.total || 256);
      setTotalPages(res.totalPages || 32);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setToastMessage("Failed to load orders from API. Showing local state.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [search, statusFilter, paymentStatusFilter, disputeStatusFilter, page]);

  const handleUpdateStatus = async () => {
    if (!updateStatusModal) return;
    try {
      const updated = await adminService.orders.updateOrderStatus(updateStatusModal.id, {
        status: newStatus,
        note: statusNote || `Status updated to ${newStatus}`
      } as UpdateOrderStatusPayload);

      setOrders((prev) => prev.map((o) => (o.id === updateStatusModal.id ? updated : o)));
      if (selectedOrder?.id === updateStatusModal.id) setSelectedOrder(updated);

      setToastMessage(`Order #${updated.orderNumber} status updated to ${newStatus.replace(/_/g, " ")}`);
      setUpdateStatusModal(null);
      setStatusNote("");
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to update order status");
    }
  };

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Order ID,Customer,Tailor,Amount,Status,Dispute,Date,PaymentStatus,Category\n" +
      orders
        .map(
          (o) =>
            `"#${o.orderNumber}","${o.customerName}","${o.tailorShop}",${o.orderAmount},"${o.status}","${
              o.disputeStatus || "none"
            }","${o.placedDate}","${o.paymentStatus}","${o.category}"`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sui_dhaga_orders_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage("Orders exported to CSV successfully.");
  };

  return (
    <div className="admin-layout-wrapper">
      {/* Sidebar with Active Orders Link */}
      <AdminSidebar activeKey="orders" />

      {/* Main Content Area */}
      <div className="admin-main-container">
        {/* Top Header with Search and Profile */}
        <AdminHeader onSearch={(q) => setSearch(q)} />

        <main className="admin-dashboard-body">
          {/* Page Heading matching reference image */}
          <div className="admin-page-header">
            <div className="admin-page-title-wrap">
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>
                Orders
              </h1>
              <p style={{ fontSize: "0.92rem", color: "#6B7280", margin: 0 }}>
                View and manage all customer orders.
              </p>
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
              {/* All Status Dropdown */}
              <div style={{ position: "relative" }}>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
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
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown
                  size={14}
                  color="#6B7280"
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                />
              </div>

              {/* All Payment Status Dropdown */}
              <div style={{ position: "relative" }}>
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => {
                    setPaymentStatusFilter(e.target.value);
                    setPage(1);
                  }}
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
                  <option value="all">All Payment Status</option>
                  <option value="paid_escrow">Paid (Escrow)</option>
                  <option value="released_to_tailor">Released</option>
                  <option value="refunded">Refunded</option>
                  <option value="pending_payment">Pending</option>
                </select>
                <ChevronDown
                  size={14}
                  color="#6B7280"
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                />
              </div>

              {/* All Dispute Status Dropdown */}
              <div style={{ position: "relative" }}>
                <select
                  value={disputeStatusFilter}
                  onChange={(e) => {
                    setDisputeStatusFilter(e.target.value);
                    setPage(1);
                  }}
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
                  <option value="all">All Dispute Status</option>
                  <option value="none">None</option>
                  <option value="open">Open</option>
                  <option value="resolved">Resolved</option>
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

          {/* Expandable Advanced Filter Drawer (Search + Category) */}
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
                  placeholder="Search by Order ID, customer, tailor or item..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
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

              {(search || statusFilter !== "all" || paymentStatusFilter !== "all" || disputeStatusFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                    setPaymentStatusFilter("all");
                    setDisputeStatusFilter("all");
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

          {/* Orders Data Table matching reference design */}
          <div className="admin-table-container">
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-th" style={{ width: "12%" }}>Order ID</th>
                    <th className="admin-th" style={{ width: "16%" }}>Customer</th>
                    <th className="admin-th" style={{ width: "16%" }}>Tailor</th>
                    <th className="admin-th" style={{ width: "12%" }}>Amount</th>
                    <th className="admin-th" style={{ width: "14%" }}>Status</th>
                    <th className="admin-th" style={{ width: "10%" }}>Dispute</th>
                    <th className="admin-th" style={{ width: "12%" }}>Date</th>
                    <th className="admin-th" style={{ width: "8%", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280" }}>
                        {isLoading ? "Loading order records..." : "No orders found matching your search or filters."}
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id}>
                        {/* Order ID Column */}
                        <td className="admin-td" style={{ fontWeight: 800, color: "#111827", fontSize: "0.92rem" }}>
                          #{order.orderNumber}
                        </td>

                        {/* Customer Column */}
                        <td className="admin-td" style={{ fontWeight: 650, color: "#1F2937", fontSize: "0.9rem" }}>
                          {order.customerName}
                        </td>

                        {/* Tailor Column */}
                        <td className="admin-td" style={{ color: "#374151", fontSize: "0.88rem", fontWeight: 550 }}>
                          {order.tailorShop}
                        </td>

                        {/* Amount Column */}
                        <td className="admin-td" style={{ fontWeight: 750, color: "#111827", fontSize: "0.92rem" }}>
                          ₹{order.orderAmount.toLocaleString("en-IN")}
                        </td>

                        {/* Status Column */}
                        <td className="admin-td">
                          <OrderStatusBadge status={order.status} />
                        </td>

                        {/* Dispute Column */}
                        <td className="admin-td">
                          <DisputeBadge dispute={order.disputeStatus} />
                        </td>

                        {/* Date Column */}
                        <td className="admin-td" style={{ color: "#4B5563", fontSize: "0.88rem", fontWeight: 500 }}>
                          {order.placedDate}
                        </td>

                        {/* Actions Column (View Button) */}
                        <td className="admin-td" style={{ textAlign: "right" }}>
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            style={{
                              height: "32px",
                              padding: "0 14px",
                              fontSize: "0.82rem",
                              fontWeight: 700,
                              background: "#FFFFFF",
                              border: "1.5px solid #E5E7EB",
                              borderRadius: "8px",
                              color: "#374151",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              whiteSpace: "nowrap",
                              transition: "all 0.15s ease"
                            }}
                          >
                            <Eye size={13} />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Pagination matching exact image layout */}
            <div className="admin-pagination-bar">
              <span className="admin-pagination-info">
                Showing {orders.length > 0 ? (page - 1) * 8 + 1 : 0} to {Math.min(page * 8, totalCount)} of {totalCount} orders
              </span>

              <div className="admin-pagination-controls">
                {/* Previous Arrow */}
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="admin-pagination-arrow-btn"
                  title="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page 1 */}
                <button
                  type="button"
                  onClick={() => setPage(1)}
                  className={`admin-pagination-num-btn ${page === 1 ? "active" : ""}`}
                >
                  1
                </button>

                {/* Page 2 */}
                <button
                  type="button"
                  onClick={() => setPage(2)}
                  className={`admin-pagination-num-btn ${page === 2 ? "active" : ""}`}
                >
                  2
                </button>

                {/* Page 3 */}
                <button
                  type="button"
                  onClick={() => setPage(3)}
                  className={`admin-pagination-num-btn ${page === 3 ? "active" : ""}`}
                >
                  3
                </button>

                {/* Ellipsis */}
                <span style={{ padding: "0 4px", color: "#9CA3AF", fontSize: "0.85rem", fontWeight: 700 }}>
                  ...
                </span>

                {/* Last Page (32) */}
                <button
                  type="button"
                  onClick={() => setPage(32)}
                  className={`admin-pagination-num-btn ${page === 32 ? "active" : ""}`}
                >
                  32
                </button>

                {/* Next Arrow */}
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="admin-pagination-arrow-btn"
                  title="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Comprehensive Order Details Inspection Modal */}
      {selectedOrder && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div
            className="admin-modal-card"
            style={{ maxWidth: "680px", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header" style={{ position: "sticky", top: 0, background: "#FFFFFF", zIndex: 2 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h2 className="admin-modal-title">Order #{selectedOrder.orderNumber}</h2>
                  <OrderStatusBadge status={selectedOrder.status} />
                  <DisputeBadge dispute={selectedOrder.disputeStatus} />
                </div>
                <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: "2px 0 0" }}>
                  Placed on {selectedOrder.placedDate} · Category: {selectedOrder.category}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="admin-modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              {/* Dispute Alert Banner if Open */}
              {selectedOrder.disputeStatus === "open" && (
                <div
                  style={{
                    background: "#FFF5F5",
                    border: "1.5px solid #FECACA",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px"
                  }}
                >
                  <ShieldAlert size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 750, color: "#DC2626", margin: "0 0 2px" }}>
                      Active Dispute Opened on this Order
                    </p>
                    <p style={{ fontSize: "0.82rem", color: "#7F1D1D", margin: 0 }}>
                      {selectedOrder.specialInstructions || "Customer reported a quality or measurement dispute. Funds remain safely secured in platform escrow."}
                    </p>
                  </div>
                </div>
              )}

              {/* Parties Grid (Customer & Tailor) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {/* Customer Info Card */}
                <div style={{ background: "#FAF8F5", border: "1px solid #EAE6DF", borderRadius: "10px", padding: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <User size={15} color="#078B87" />
                    <span style={{ fontSize: "0.8rem", fontWeight: 750, color: "#374151", textTransform: "uppercase" }}>Customer</span>
                  </div>
                  <p style={{ fontSize: "0.95rem", fontWeight: 750, color: "#111827", margin: "0 0 2px" }}>{selectedOrder.customerName}</p>
                  <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: "0 0 2px" }}>{selectedOrder.customerEmail}</p>
                  <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: 0 }}>{selectedOrder.customerPhone} · {selectedOrder.customerCity}</p>
                </div>

                {/* Tailor Info Card */}
                <div style={{ background: "#FAF8F5", border: "1px solid #EAE6DF", borderRadius: "10px", padding: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <Store size={15} color="#078B87" />
                    <span style={{ fontSize: "0.8rem", fontWeight: 750, color: "#374151", textTransform: "uppercase" }}>Boutique / Tailor</span>
                  </div>
                  <p style={{ fontSize: "0.95rem", fontWeight: 750, color: "#111827", margin: "0 0 2px" }}>{selectedOrder.tailorShop}</p>
                  <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: "0 0 2px" }}>Owner: {selectedOrder.tailorName}</p>
                  <p style={{ fontSize: "0.82rem", color: "#078B87", fontWeight: 650, margin: 0 }}>Est. Delivery: {selectedOrder.expectedDeliveryDate}</p>
                </div>
              </div>

              {/* Item Title & Fabric Specs */}
              <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <Scissors size={15} color="#078B87" />
                  <span style={{ fontSize: "0.8rem", fontWeight: 750, color: "#374151", textTransform: "uppercase" }}>Garment & Fabric Specifications</span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#111827", margin: "0 0 6px" }}>
                  {selectedOrder.itemTitle}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "0.84rem" }}>
                  <div>
                    <span style={{ color: "#6B7280" }}>Fabric Type: </span>
                    <strong style={{ color: "#111827" }}>{selectedOrder.fabricDetails.fabricType}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#6B7280" }}>Color: </span>
                    <strong style={{ color: "#111827" }}>{selectedOrder.fabricDetails.color}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#6B7280" }}>Provided By: </span>
                    <strong style={{ textTransform: "capitalize", color: "#111827" }}>{selectedOrder.fabricDetails.providedBy}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#6B7280" }}>Length: </span>
                    <strong style={{ color: "#111827" }}>{selectedOrder.fabricDetails.lengthMeters} meters</strong>
                  </div>
                </div>
              </div>

              {/* 3D Measurements Table */}
              {selectedOrder.measurements && selectedOrder.measurements.length > 0 && (
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 750, color: "#374151", textTransform: "uppercase", margin: "0 0 8px" }}>
                    Verified Body Measurements (Inches)
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                    {selectedOrder.measurements.map((m) => (
                      <div
                        key={m.key}
                        style={{
                          background: "#F9FAFB",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          textAlign: "center"
                        }}
                      >
                        <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 2px" }}>{m.label}</p>
                        <p style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", margin: 0 }}>
                          {m.value}&quot;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Financial Breakdown */}
              <div
                style={{
                  background: "#FAF8F5",
                  border: "1px solid #EAE6DF",
                  borderRadius: "10px",
                  padding: "14px",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  textAlign: "center"
                }}
              >
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 2px" }}>Order Total</p>
                  <p style={{ fontSize: "1.15rem", fontWeight: 850, color: "#111827", margin: 0 }}>
                    ₹{selectedOrder.orderAmount.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 2px" }}>Platform Commission</p>
                  <p style={{ fontSize: "1.15rem", fontWeight: 850, color: "#078B87", margin: 0 }}>
                    ₹{selectedOrder.platformCommission.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0 0 2px" }}>Tailor Payout</p>
                  <p style={{ fontSize: "1.15rem", fontWeight: 850, color: "#2563EB", margin: 0 }}>
                    ₹{selectedOrder.tailorPayout.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Production Milestone Timeline */}
              {selectedOrder.timeline && (
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 750, color: "#374151", textTransform: "uppercase", margin: "0 0 10px" }}>
                    Production Pipeline Progress
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {selectedOrder.timeline.map((step, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          background: step.completed ? "#F0FDF4" : "#FFFFFF",
                          border: step.completed ? "1px solid #BBF7D0" : "1px solid #E5E7EB",
                          borderRadius: "8px",
                          padding: "10px 14px"
                        }}
                      >
                        {step.completed ? (
                          <CheckCircle2 size={18} color="#15803D" style={{ flexShrink: 0 }} />
                        ) : (
                          <Clock size={18} color="#9CA3AF" style={{ flexShrink: 0 }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: "0.88rem", fontWeight: 700, color: step.completed ? "#15803D" : "#374151", margin: 0 }}>
                            {step.step}
                          </p>
                          {step.note && <p style={{ fontSize: "0.78rem", color: "#6B7280", margin: "2px 0 0" }}>{step.note}</p>}
                        </div>
                        {step.date && (
                          <span style={{ fontSize: "0.78rem", color: "#6B7280", fontWeight: 550 }}>
                            {step.date}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="admin-modal-footer" style={{ position: "sticky", bottom: 0, background: "#FFFFFF", zIndex: 2 }}>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="admin-btn-secondary"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  setUpdateStatusModal(selectedOrder);
                  setNewStatus(selectedOrder.status);
                  setSelectedOrder(null);
                }}
                className="admin-btn-primary"
              >
                <Scissors size={15} />
                <span>Update Milestone Status</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Milestone Status Modal */}
      {updateStatusModal && (
        <div className="admin-modal-backdrop" onClick={() => setUpdateStatusModal(null)}>
          <div className="admin-modal-card" style={{ maxWidth: "500px" }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">Update Milestone #{updateStatusModal.orderNumber}</h2>
              <button
                type="button"
                onClick={() => setUpdateStatusModal(null)}
                className="admin-modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Select Current Production Stage</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as AdminOrderStatus)}
                  className="admin-form-select"
                >
                  <option value="pending_approval">Pending Approval</option>
                  <option value="measuring">Measuring & 3D Confirmation</option>
                  <option value="fabric_sourcing">Fabric & Zari Sourcing</option>
                  <option value="cutting">Pattern Cutting</option>
                  <option value="stitching">Hand Stitching & Embroidery (In Progress)</option>
                  <option value="quality_check">Quality Check & Ironing (QC)</option>
                  <option value="ready_for_dispatch">Ready for Dispatch</option>
                  <option value="out_for_delivery">Out for Courier Delivery</option>
                  <option value="delivered">Delivered to Customer</option>
                  <option value="completed">Completed & Escrow Released</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Audit / Milestone Note</label>
                <textarea
                  placeholder="e.g. Master tailor completed embroidery work; sent to QC room..."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="admin-form-textarea"
                />
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setUpdateStatusModal(null)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateStatus}
                className="admin-btn-primary"
              >
                <CheckCircle2 size={16} />
                <span>Save Stage Update</span>
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
