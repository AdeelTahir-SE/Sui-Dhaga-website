"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
  Check,
  Scissors,
  User,
  Calendar,
  DollarSign,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { PublicNav } from "@/components/common/site-shell";
import { TailorSidebar } from "@/components/tailors/tailor-sidebar";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/tailor-orders-view.css";

export type TailorOrderStatus = "new" | "in_progress" | "completed" | "cancelled";

export interface TailorOrderItem {
  id: string;
  orderNumber: string; // e.g. "SD1256"
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAvatar: string;
  itemTitle: string;
  category: string;
  fabricDetails: string;
  amount: number; // e.g. 2000
  date: string;
  expectedDelivery: string;
  status: TailorOrderStatus;
  measurementsSummary?: string;
  notes?: string;
}

const initialOrdersList: TailorOrderItem[] = [
  {
    id: "ord-1",
    orderNumber: "SD1256",
    customerName: "Neha Verma",
    customerPhone: "+91 98765-11223",
    customerEmail: "neha.verma@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Custom Anarkali Suit",
    category: "Women's Formal",
    fabricDetails: "Mulberry Silk with Resham Embroidery (Customer Provided)",
    amount: 2000,
    date: "10 May 2024",
    expectedDelivery: "20 May 2024",
    status: "in_progress",
    measurementsSummary: "Chest: 36\", Waist: 28\", Length: 52\"",
    notes: "Requires flared umbrella cut skirt."
  },
  {
    id: "ord-2",
    orderNumber: "SD1257",
    customerName: "Pooja Mehta",
    customerPhone: "+91 98112-33445",
    customerEmail: "pooja.mehta@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Lehenga Set",
    category: "Bridal Wear",
    fabricDetails: "Silk Organza & Micro-Velvet",
    amount: 3500,
    date: "09 May 2024",
    expectedDelivery: "24 May 2024",
    status: "new",
    measurementsSummary: "Bust: 34\", Waist: 27\", Lehenga Length: 42\"",
    notes: "Awaiting final confirmation of can-can volume."
  },
  {
    id: "ord-3",
    orderNumber: "SD1258",
    customerName: "Rohan Singh",
    customerPhone: "+91 99001-22334",
    customerEmail: "rohan.singh@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Sherwani Stitching",
    category: "Men's Formal",
    fabricDetails: "Pure Banarasi Jamawar in Antique Gold",
    amount: 3800,
    date: "08 May 2024",
    expectedDelivery: "18 May 2024",
    status: "in_progress",
    measurementsSummary: "Chest: 40\", Waist: 34\", Sherwani Length: 38\"",
    notes: "Handmade metal buttons requested."
  },
  {
    id: "ord-4",
    orderNumber: "SD1259",
    customerName: "Ayesha Khan",
    customerPhone: "+91 98334-55667",
    customerEmail: "ayesha.khan@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Kurta Set",
    category: "Casual & Semi-Formal",
    fabricDetails: "Pure Lawn Cotton with Lace Details",
    amount: 1200,
    date: "06 May 2024",
    expectedDelivery: "12 May 2024",
    status: "completed",
    measurementsSummary: "Chest: 38\", Length: 40\", Sleeves: 21\""
  },
  {
    id: "ord-5",
    orderNumber: "SD1260",
    customerName: "Sneha Das",
    customerPhone: "+91 98450-99887",
    customerEmail: "sneha.das@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Blouse Stitching",
    category: "Ethnic Wear",
    fabricDetails: "Raw Silk with Deep Sweetheart Neck",
    amount: 800,
    date: "05 May 2024",
    expectedDelivery: "09 May 2024",
    status: "new"
  },
  {
    id: "ord-6",
    orderNumber: "SD1261",
    customerName: "Karan Malhotra",
    customerPhone: "+91 98223-44556",
    customerEmail: "karan.malhotra@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Linen Tuxedo Waistcoat",
    category: "Men's Formal",
    fabricDetails: "Italian Irish Linen",
    amount: 2200,
    date: "04 May 2024",
    expectedDelivery: "14 May 2024",
    status: "in_progress"
  },
  {
    id: "ord-7",
    orderNumber: "SD1262",
    customerName: "Meera Iyer",
    customerPhone: "+91 98110-77889",
    customerEmail: "meera.iyer@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Chikankari Suit Set",
    category: "Casual Wear",
    fabricDetails: "Georgette with shadow work",
    amount: 1500,
    date: "03 May 2024",
    expectedDelivery: "08 May 2024",
    status: "completed"
  },
  {
    id: "ord-8",
    orderNumber: "SD1263",
    customerName: "Vikram Singh",
    customerPhone: "+91 98770-33221",
    customerEmail: "vikram.singh@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Tailored Nehru Jacket",
    category: "Men's Formal",
    fabricDetails: "Tussar Matka Silk",
    amount: 2800,
    date: "02 May 2024",
    expectedDelivery: "10 May 2024",
    status: "in_progress"
  },
  {
    id: "ord-9",
    orderNumber: "SD1264",
    customerName: "Ananya Das",
    customerPhone: "+91 98441-22334",
    customerEmail: "ananya.das@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Banarasi Saree Designer Blouse",
    category: "Bridal Wear",
    fabricDetails: "Katan Silk with Gold Latkans",
    amount: 1100,
    date: "01 May 2024",
    expectedDelivery: "05 May 2024",
    status: "new"
  },
  {
    id: "ord-10",
    orderNumber: "SD1265",
    customerName: "Zainab Rashid",
    customerPhone: "+91 98552-33441",
    customerEmail: "zainab.rashid@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Organza Sharara Set",
    category: "Women's Formal",
    fabricDetails: "Organza with Gota Patti Border",
    amount: 3200,
    date: "28 Apr 2024",
    expectedDelivery: "06 May 2024",
    status: "completed"
  },
  {
    id: "ord-11",
    orderNumber: "SD1266",
    customerName: "Rahul Verma",
    customerPhone: "+91 98112-99881",
    customerEmail: "rahul.verma@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Kurta & Churidar Set",
    category: "Men's Ethnic",
    fabricDetails: "Mulberry Silk",
    amount: 1800,
    date: "25 Apr 2024",
    expectedDelivery: "02 May 2024",
    status: "in_progress"
  },
  {
    id: "ord-12",
    orderNumber: "SD1267",
    customerName: "Farhan Ali",
    customerPhone: "+91 98991-33221",
    customerEmail: "farhan.ali@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    itemTitle: "Prince Coat Fitting",
    category: "Alterations",
    fabricDetails: "Velvet Waistcoat",
    amount: 600,
    date: "20 Apr 2024",
    expectedDelivery: "22 Apr 2024",
    status: "cancelled"
  }
];

const KEY_TAILOR_ORDERS = "sui_dhaga_tailor_orders_list";

import { useRouter } from "next/navigation";

export function TailorOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<TailorOrderItem[]>(initialOrdersList);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<TailorOrderItem | null>(null);
  const [newStatus, setNewStatus] = useState<TailorOrderStatus>("in_progress");
  const [statusNote, setStatusNote] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(KEY_TAILOR_ORDERS);
        if (saved) {
          setOrders(JSON.parse(saved));
        } else {
          localStorage.setItem(KEY_TAILOR_ORDERS, JSON.stringify(initialOrdersList));
        }
      } catch (e) {
        console.warn("Failed to load orders from localStorage:", e);
      }
    }
  }, []);

  const saveOrdersToStorage = (updated: TailorOrderItem[]) => {
    setOrders(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(KEY_TAILOR_ORDERS, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save orders to localStorage:", e);
      }
    }
  };

  // Filter orders by tab
  const filteredOrders = orders.filter((ord) => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return ord.status === "new";
    if (activeTab === "in_progress") return ord.status === "in_progress";
    if (activeTab === "completed") return ord.status === "completed";
    if (activeTab === "cancelled") return ord.status === "cancelled";
    return true;
  });

  const countByStatus = {
    all: orders.length,
    new: orders.filter((o) => o.status === "new").length,
    in_progress: orders.filter((o) => o.status === "in_progress").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length
  };

  const handleOpenOrder = (ord: TailorOrderItem) => {
    router.push(`/tailor/orders/${ord.orderNumber.replace("#", "")}`);
  };

  const handleSaveStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const updated = orders.map((o) =>
      o.id === selectedOrder.id
        ? {
            ...o,
            status: newStatus,
            notes: statusNote
          }
        : o
    );

    saveOrdersToStorage(updated);
    setSelectedOrder({ ...selectedOrder, status: newStatus, notes: statusNote });
    setToastMessage(`✓ Order #${selectedOrder.orderNumber} status updated to ${newStatus.replace("_", " ").toUpperCase()}`);
    setSelectedOrder(null);
  };

  return (
    <div className="tor-layout-wrapper">
      {/* Top Navbar */}
      <PublicNav />

      <div className="tor-body-container">
        {/* Left Navigation Sidebar */}
        <TailorSidebar activeKey="orders" />

        {/* Main Content Area */}
        <main className="tor-main-content">
          {/* Header Area */}
          <div className="tor-header">
            <h1 className="tor-title">Manage Orders</h1>
          </div>

          {/* Filter Tabs matching exact design */}
          <div className="tor-tabs-row">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`tor-tab-btn ${activeTab === "all" ? "active" : ""}`}
            >
              All Orders ({countByStatus.all})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("new")}
              className={`tor-tab-btn ${activeTab === "new" ? "active" : ""}`}
            >
              New ({countByStatus.new})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("in_progress")}
              className={`tor-tab-btn ${activeTab === "in_progress" ? "active" : ""}`}
            >
              In Progress ({countByStatus.in_progress})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("completed")}
              className={`tor-tab-btn ${activeTab === "completed" ? "active" : ""}`}
            >
              Completed ({countByStatus.completed})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("cancelled")}
              className={`tor-tab-btn ${activeTab === "cancelled" ? "active" : ""}`}
            >
              Cancelled ({countByStatus.cancelled})
            </button>
          </div>

          {/* Order Cards Container matching exact design */}
          <div className="tor-orders-container">
            {filteredOrders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280" }}>
                No orders found in this category.
              </div>
            ) : (
              filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => handleOpenOrder(ord)}
                  className="tor-order-row"
                  title="Click to view details & update milestone status"
                >
                  {/* Left Group: Avatar + Order ID + Customer */}
                  <div className="tor-order-left">
                    <img
                      src={ord.customerAvatar}
                      alt={ord.customerName}
                      className="tor-avatar"
                    />
                    <div className="tor-id-name">
                      <p className="tor-order-number">Order #{ord.orderNumber}</p>
                      <p className="tor-customer-name">{ord.customerName}</p>
                    </div>
                  </div>

                  {/* Garment Title */}
                  <p className="tor-garment-title">{ord.itemTitle}</p>

                  {/* Price */}
                  <p className="tor-price">₹{ord.amount.toLocaleString("en-IN")}</p>

                  {/* Date */}
                  <p className="tor-date">{ord.date}</p>

                  {/* Status Badge */}
                  <div>
                    {ord.status === "in_progress" && (
                      <span className="tor-badge-in-progress">In Progress</span>
                    )}
                    {ord.status === "new" && (
                      <span className="tor-badge-new">New</span>
                    )}
                    {ord.status === "completed" && (
                      <span className="tor-badge-completed">Completed</span>
                    )}
                    {ord.status === "cancelled" && (
                      <span className="tor-badge-cancelled">Cancelled</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Order Details & Status Update Modal */}
      {selectedOrder && (
        <div className="tor-modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="tor-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="tor-modal-header">
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "#111827" }}>
                  Order #{selectedOrder.orderNumber}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: "2px 0 0" }}>
                  Placed on {selectedOrder.date} · Est. Delivery: {selectedOrder.expectedDelivery}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveStatusUpdate}>
              <div className="tor-modal-body">
                {/* Customer Snapshot */}
                <div
                  style={{
                    background: "#FAF8F5",
                    border: "1px solid #EAE6DF",
                    borderRadius: "12px",
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px"
                  }}
                >
                  <img
                    src={selectedOrder.customerAvatar}
                    alt={selectedOrder.customerName}
                    style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <p style={{ fontSize: "0.95rem", fontWeight: 750, color: "#111827", margin: "0 0 2px" }}>
                      {selectedOrder.customerName}
                    </p>
                    <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: 0 }}>
                      {selectedOrder.customerPhone} · {selectedOrder.customerEmail}
                    </p>
                  </div>
                </div>

                {/* Garment Details */}
                <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "14px 18px" }}>
                  <p style={{ fontSize: "0.78rem", fontWeight: 750, color: "#374151", textTransform: "uppercase", margin: "0 0 6px" }}>
                    Garment Specifications
                  </p>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#111827", margin: "0 0 6px" }}>
                    {selectedOrder.itemTitle}
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: "0 0 4px" }}>
                    <strong>Category: </strong>{selectedOrder.category}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: "0 0 4px" }}>
                    <strong>Fabric: </strong>{selectedOrder.fabricDetails}
                  </p>
                  {selectedOrder.measurementsSummary && (
                    <p style={{ fontSize: "0.85rem", color: "#078B87", fontWeight: 650, margin: 0 }}>
                      <strong>Measurements: </strong>{selectedOrder.measurementsSummary}
                    </p>
                  )}
                </div>

                {/* Amount & Status Selector */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                      Order Amount
                    </label>
                    <input
                      type="text"
                      disabled
                      value={`₹${selectedOrder.amount.toLocaleString("en-IN")}`}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "0.95rem", fontWeight: 800, background: "#F9FAFB", color: "#111827" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                      Production Stage / Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as TailorOrderStatus)}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem", background: "#FFFFFF", fontWeight: 650 }}
                    >
                      <option value="new">New (Awaiting confirmation)</option>
                      <option value="in_progress">In Progress (Stitching / QC)</option>
                      <option value="completed">Completed (Ready for pickup / delivered)</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Status Note */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                    Milestone Progress Note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Master artisan finished hand embroidery; inner lining attached..."
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div className="tor-modal-footer">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    padding: "10px 18px",
                    fontWeight: 700,
                    color: "#374151",
                    cursor: "pointer"
                  }}
                >
                  Close
                </button>

                <button
                  type="submit"
                  style={{
                    background: "#078B87",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 22px",
                    fontWeight: 750,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <Check size={16} />
                  <span>Update Order Status</span>
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
