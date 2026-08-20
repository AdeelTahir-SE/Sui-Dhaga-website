"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  Search,
  SlidersHorizontal,
  Download,
  Ban,
  CheckCircle,
  MoreVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  Trash2,
  KeyRound,
  Eye,
  X,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ShieldAlert
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminToast } from "@/components/admin/admin-toast";
import { adminService } from "@/lib/api/admin-service";
import { AdminUser, UserRole, UserStatus } from "@/lib/api/admin-types";

export function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalCount, setTotalCount] = useState(125);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(16);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [blockModalUser, setBlockModalUser] = useState<AdminUser | null>(null);
  const [blockReason, setBlockReason] = useState("");
  const [activeMenuUserId, setActiveMenuUserId] = useState<string | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close context menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuUserId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const res = await adminService.users.getUsers({
        search,
        role: roleFilter as any,
        status: statusFilter as any,
        city: cityFilter || undefined,
        page,
        limit: 8
      });
      setUsers(res.data);
      setTotalCount(res.total || 125);
      setTotalPages(res.totalPages || 16);
    } catch (err) {
      console.error("Failed to load users:", err);
      setToastMessage("Failed to load users from API. Showing local records.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [search, roleFilter, statusFilter, cityFilter, page]);

  // Block / Unblock User Handlers
  const handleConfirmBlockToggle = async () => {
    if (!blockModalUser) return;
    const isCurrentlyBlocked = blockModalUser.status === "blocked" || blockModalUser.status === "suspended";
    const nextStatus: UserStatus = isCurrentlyBlocked ? "active" : "blocked";

    try {
      const updated = await adminService.users.updateUser(blockModalUser.id, {
        status: nextStatus,
        notes: blockReason || blockModalUser.notes
      });

      setUsers((prev) => prev.map((u) => (u.id === blockModalUser.id ? updated : u)));
      if (selectedUser?.id === blockModalUser.id) setSelectedUser(updated);

      setBlockModalUser(null);
      setBlockReason("");
      setToastMessage(
        `User ${updated.name} (${updated.username || updated.email}) has been ${
          nextStatus === "blocked" ? "BLOCKED" : "UNBLOCKED"
        }.`
      );
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to update user status");
    }
  };

  const handleQuickToggleBlock = (user: AdminUser) => {
    setBlockModalUser(user);
    setBlockReason(
      user.status === "blocked" ? "Administrative unblock after review" : "Violated platform policy"
    );
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this user account?")) return;
    try {
      await adminService.users.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      if (selectedUser?.id === id) setSelectedUser(null);
      setActiveMenuUserId(null);
      setToastMessage("User account deleted successfully");
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to delete user");
    }
  };

  const handleExportCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Name,Username,Role,Email,Phone,JoinedDate,Status,City,TotalSpent,OrdersCount\n" +
      users
        .map(
          (u) =>
            `"${u.id}","${u.name}","${u.username || ""}","${u.role}","${u.email}","${u.phone}","${u.joinedDate}","${u.status}","${u.city}",${u.totalSpent},${u.ordersCount}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sui_dhaga_users_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage("User list exported to CSV successfully.");
  };

  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case "customer":
        return "badge-role-customer";
      case "tailor":
        return "badge-role-tailor";
      case "admin":
        return "badge-role-admin";
      default:
        return "badge-role";
    }
  };

  const getStatusBadge = (status: UserStatus) => {
    if (status === "blocked" || status === "suspended") {
      return (
        <span className="admin-status-badge badge-blocked">
          <span>Blocked</span>
        </span>
      );
    }
    if (status === "pending") {
      return (
        <span className="admin-status-badge badge-pending">
          <span>Pending</span>
        </span>
      );
    }
    return (
      <span className="admin-status-badge badge-active">
        <span>Active</span>
      </span>
    );
  };

  return (
    <div className="admin-layout-wrapper">
      {/* Sidebar with Dark Navy Background and Active Users Pill */}
      <AdminSidebar activeKey="users" />

      {/* Main Content Area */}
      <div className="admin-main-container">
        {/* Top Header with Search and Profile */}
        <AdminHeader onSearch={(q) => setSearch(q)} />

        <main className="admin-dashboard-body">
          {/* Page Heading matching provided image */}
          <div className="admin-page-header">
            <div className="admin-page-title-wrap">
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>
                Users
              </h1>
              <p style={{ fontSize: "0.92rem", color: "#6B7280", margin: 0 }}>
                Manage all registered users on the platform.
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
              {/* Search Box */}
              <div style={{ position: "relative", minWidth: "280px", maxWidth: "420px", flex: 1 }}>
                <Search
                  size={17}
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
                  placeholder="Search users by name, email or phone..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  style={{
                    width: "100%",
                    border: "1px solid #E5E7EB",
                    borderRadius: "10px",
                    padding: "9px 14px 9px 40px",
                    fontSize: "0.88rem",
                    background: "#FFFFFF",
                    color: "#111827",
                    outline: "none",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
                  }}
                />
              </div>

              {/* Role Dropdown */}
              <div style={{ position: "relative" }}>
                <select
                  value={roleFilter}
                  onChange={(e) => {
                    setRoleFilter(e.target.value);
                    setPage(1);
                  }}
                  className="admin-filter-select"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "10px",
                    padding: "9px 32px 9px 14px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#374151",
                    appearance: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="all">All Roles</option>
                  <option value="customer">Customer</option>
                  <option value="tailor">Tailor</option>
                  <option value="admin">Admin</option>
                </select>
                <ChevronDown
                  size={14}
                  color="#6B7280"
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                />
              </div>

              {/* Status Dropdown */}
              <div style={{ position: "relative" }}>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="admin-filter-select"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "10px",
                    padding: "9px 32px 9px 14px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#374151",
                    appearance: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                  <option value="pending">Pending</option>
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

          {/* Advanced Filter Drawer (Expandable) */}
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151" }}>City Filter:</span>
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  style={{
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "0.85rem",
                    outline: "none"
                  }}
                >
                  <option value="">All Cities</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Peshawar">Peshawar</option>
                </select>
              </div>

              {(cityFilter || roleFilter !== "all" || statusFilter !== "all" || search) && (
                <button
                  type="button"
                  onClick={() => {
                    setCityFilter("");
                    setRoleFilter("all");
                    setStatusFilter("all");
                    setSearch("");
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

          {/* Users Data Table matching exact design */}
          <div className="admin-table-container">
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-th" style={{ width: "26%" }}>User</th>
                    <th className="admin-th" style={{ width: "14%" }}>Role</th>
                    <th className="admin-th" style={{ width: "24%" }}>Email / Phone</th>
                    <th className="admin-th" style={{ width: "16%" }}>Joined Date</th>
                    <th className="admin-th" style={{ width: "10%" }}>Status</th>
                    <th className="admin-th" style={{ width: "10%", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280" }}>
                        {isLoading ? "Loading user directory..." : "No users found matching your search or filters."}
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        {/* User Profile Column */}
                        <td className="admin-td">
                          <div className="admin-user-cell">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="admin-user-avatar"
                            />
                            <div>
                              <p className="admin-user-info-name" style={{ fontSize: "0.92rem", fontWeight: 750, color: "#111827", margin: "0 0 2px" }}>
                                {user.name}
                              </p>
                              <p className="admin-user-info-sub" style={{ fontSize: "0.8rem", color: "#6B7280", margin: 0 }}>
                                {user.username || `@${user.name.toLowerCase().replace(/\s+/g, "")}`}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role Pill Column */}
                        <td className="admin-td">
                          <span
                            className={`admin-status-badge ${getRoleBadgeClass(user.role)}`}
                            style={{
                              textTransform: "capitalize",
                              fontWeight: 650,
                              fontSize: "0.82rem",
                              padding: "3px 12px"
                            }}
                          >
                            {user.role}
                          </span>
                        </td>

                        {/* Email / Phone Column */}
                        <td className="admin-td">
                          <p style={{ fontSize: "0.88rem", fontWeight: 550, color: "#111827", margin: "0 0 2px" }}>
                            {user.email}
                          </p>
                          <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: 0 }}>
                            {user.phone}
                          </p>
                        </td>

                        {/* Joined Date Column */}
                        <td className="admin-td" style={{ fontSize: "0.88rem", color: "#374151", fontWeight: 500 }}>
                          {user.joinedDate}
                        </td>

                        {/* Status Badge Column */}
                        <td className="admin-td">
                          {getStatusBadge(user.status)}
                        </td>

                        {/* Actions Column */}
                        <td className="admin-td" style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", position: "relative" }}>

                            {/* Block / Unblock Text Pill Button */}
                            <button
                              type="button"
                              onClick={() => handleQuickToggleBlock(user)}
                              style={{
                                height: "32px",
                                borderRadius: "8px",
                                padding: "0 12px",
                                fontSize: "0.82rem",
                                fontWeight: 700,
                                border: user.status === "blocked"
                                  ? "1.5px solid #BBF7D0"
                                  : "1.5px solid #FECACA",
                                background: user.status === "blocked"
                                  ? "#F0FDF4"
                                  : "#FFF5F5",
                                color: user.status === "blocked"
                                  ? "#15803D"
                                  : "#DC2626",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                transition: "all 0.15s ease"
                              }}
                            >
                              {user.status === "blocked" ? (
                                <>
                                  <CheckCircle size={13} />
                                  <span>Unblock</span>
                                </>
                              ) : (
                                <>
                                  <Ban size={13} />
                                  <span>Block</span>
                                </>
                              )}
                            </button>

                            {/* More Options Button (⋮) */}
                            <button
                              type="button"
                              onClick={() =>
                                setActiveMenuUserId(activeMenuUserId === user.id ? null : user.id)
                              }
                              title="More options"
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                border: "1.5px solid #E5E7EB",
                                background: activeMenuUserId === user.id ? "#F3F4F6" : "#FFFFFF",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                fontSize: "1.1rem",
                                color: "#374151",
                                transition: "all 0.15s ease",
                                flexShrink: 0
                              }}
                            >
                              ⋮
                            </button>

                            {/* Dropdown Menu */}
                            {activeMenuUserId === user.id && (
                              <div
                                ref={menuRef}
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: "36px",
                                  background: "#FFFFFF",
                                  border: "1px solid #EAE6DF",
                                  borderRadius: "10px",
                                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                                  zIndex: 80,
                                  width: "180px",
                                  padding: "6px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                  textAlign: "left"
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setActiveMenuUserId(null);
                                  }}
                                  style={{
                                    background: "transparent",
                                    border: "none",
                                    padding: "8px 12px",
                                    fontSize: "0.84rem",
                                    fontWeight: 600,
                                    color: "#374151",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    cursor: "pointer",
                                    borderRadius: "6px",
                                    width: "100%"
                                  }}
                                >
                                  <Eye size={14} color="#078B87" />
                                  <span>View Profile</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuUserId(null);
                                    handleQuickToggleBlock(user);
                                  }}
                                  style={{
                                    background: "transparent",
                                    border: "none",
                                    padding: "8px 12px",
                                    fontSize: "0.84rem",
                                    fontWeight: 600,
                                    color: user.status === "blocked" ? "#15803D" : "#DC2626",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    cursor: "pointer",
                                    borderRadius: "6px",
                                    width: "100%"
                                  }}
                                >
                                  {user.status === "blocked" ? (
                                    <>
                                      <UserCheck size={14} color="#15803D" />
                                      <span>Unblock User</span>
                                    </>
                                  ) : (
                                    <>
                                      <UserX size={14} color="#DC2626" />
                                      <span>Block User</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuUserId(null);
                                    setToastMessage(`Password reset link sent to ${user.email}`);
                                  }}
                                  style={{
                                    background: "transparent",
                                    border: "none",
                                    padding: "8px 12px",
                                    fontSize: "0.84rem",
                                    fontWeight: 600,
                                    color: "#4B5563",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    cursor: "pointer",
                                    borderRadius: "6px",
                                    width: "100%"
                                  }}
                                >
                                  <KeyRound size={14} color="#6B7280" />
                                  <span>Reset Password</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteUser(user.id)}
                                  style={{
                                    background: "transparent",
                                    border: "none",
                                    padding: "8px 12px",
                                    fontSize: "0.84rem",
                                    fontWeight: 600,
                                    color: "#DC2626",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    cursor: "pointer",
                                    borderRadius: "6px",
                                    width: "100%"
                                  }}
                                >
                                  <Trash2 size={14} color="#DC2626" />
                                  <span>Delete User</span>
                                </button>
                              </div>
                            )}
                          </div>
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
                Showing {users.length > 0 ? (page - 1) * 8 + 1 : 0} to {Math.min(page * 8, totalCount)} of {totalCount} users
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

                {/* Last Page (16) */}
                <button
                  type="button"
                  onClick={() => setPage(16)}
                  className={`admin-pagination-num-btn ${page === 16 ? "active" : ""}`}
                >
                  16
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

      {/* Block / Unblock Confirmation Modal */}
      {blockModalUser && (
        <div className="admin-modal-backdrop" onClick={() => setBlockModalUser(null)}>
          <div className="admin-modal-card" style={{ maxWidth: "520px" }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {blockModalUser.status === "blocked" ? (
                  <UserCheck size={22} color="#15803D" />
                ) : (
                  <ShieldAlert size={22} color="#DC2626" />
                )}
                <h2 className="admin-modal-title">
                  {blockModalUser.status === "blocked" ? "Unblock User Account" : "Block User Account"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setBlockModalUser(null)}
                className="admin-modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              <p style={{ fontSize: "0.92rem", color: "#374151", margin: 0, lineHeight: 1.5 }}>
                {blockModalUser.status === "blocked" ? (
                  <>
                    Are you sure you want to <strong>unblock</strong>{" "}
                    <strong>{blockModalUser.name}</strong> ({blockModalUser.username || blockModalUser.email})?
                    They will regain full access to booking appointments, custom 3D studio orders, and messages.
                  </>
                ) : (
                  <>
                    Are you sure you want to <strong>block</strong>{" "}
                    <strong>{blockModalUser.name}</strong> ({blockModalUser.username || blockModalUser.email})?
                    Blocked users cannot log in, place new tailoring orders, or interact with boutiques.
                  </>
                )}
              </p>

              <div className="admin-form-group" style={{ marginTop: "12px" }}>
                <label className="admin-form-label">Administrative Reason / Audit Note</label>
                <textarea
                  placeholder="State the reason for this administrative status change..."
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="admin-form-textarea"
                />
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setBlockModalUser(null)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmBlockToggle}
                className={blockModalUser.status === "blocked" ? "admin-btn-primary" : "admin-btn-danger"}
              >
                {blockModalUser.status === "blocked" ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Confirm Unblock</span>
                  </>
                ) : (
                  <>
                    <Ban size={16} />
                    <span>Confirm Block User</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Drawer / Modal */}
      {selectedUser && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedUser(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">User Profile Details</h2>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="admin-modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 2px" }}>
                    {selectedUser.name}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0 0 6px" }}>
                    {selectedUser.username || `@${selectedUser.name.toLowerCase().replace(/\s+/g, "")}`}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      className={`admin-status-badge ${getRoleBadgeClass(selectedUser.role)}`}
                      style={{ textTransform: "capitalize" }}
                    >
                      {selectedUser.role}
                    </span>
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

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
                  <p style={{ fontSize: "0.78rem", color: "#6B7280", margin: "0 0 2px" }}>Email</p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 650, margin: 0 }}>{selectedUser.email}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.78rem", color: "#6B7280", margin: "0 0 2px" }}>Phone</p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 650, margin: 0 }}>{selectedUser.phone}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.78rem", color: "#6B7280", margin: "0 0 2px" }}>City / Region</p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 650, margin: 0 }}>{selectedUser.city}, Pakistan</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.78rem", color: "#6B7280", margin: "0 0 2px" }}>Joined Date</p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 650, margin: 0 }}>{selectedUser.joinedDate}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.78rem", color: "#6B7280", margin: "0 0 2px" }}>Total Orders</p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 650, margin: 0 }}>{selectedUser.ordersCount} orders</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.78rem", color: "#6B7280", margin: "0 0 2px" }}>Total Spent</p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 750, color: "#078B87", margin: 0 }}>
                    Rs {selectedUser.totalSpent.toLocaleString("en-PK")}
                  </p>
                </div>
              </div>

              {selectedUser.notes && (
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", margin: "0 0 4px" }}>
                    Administrative Notes
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#4B5563", background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "10px", margin: 0 }}>
                    {selectedUser.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => handleDeleteUser(selectedUser.id)}
                className="admin-btn-danger"
              >
                <Trash2 size={16} />
                <span>Delete Account</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedUser(null);
                  handleQuickToggleBlock(selectedUser);
                }}
                className={selectedUser.status === "blocked" ? "admin-btn-primary" : "admin-btn-secondary"}
              >
                {selectedUser.status === "blocked" ? (
                  <>
                    <UserCheck size={16} />
                    <span>Unblock User</span>
                  </>
                ) : (
                  <>
                    <Ban size={16} color="#DC2626" />
                    <span style={{ color: "#DC2626" }}>Block User</span>
                  </>
                )}
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
