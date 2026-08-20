"use client";

import React, { useState } from "react";
import { Search, Bell, AlertTriangle, ChevronDown } from "lucide-react";

interface AdminHeaderProps {
  onSearch?: (query: string) => void;
}

export function AdminHeader({ onSearch }: AdminHeaderProps) {
  const [searchVal, setSearchVal] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="admin-top-header">
      {/* Search Bar */}
      <div className="admin-search-wrapper">
        <Search size={18} className="admin-search-icon" />
        <input
          type="text"
          placeholder="Search anything..."
          value={searchVal}
          onChange={handleSearchChange}
          className="admin-search-input"
        />
      </div>

      {/* Header Actions */}
      <div className="admin-header-actions">
        {/* System Alerts */}
        <button
          type="button"
          className="admin-header-icon-btn"
          title="System Warnings & Disputes (12)"
        >
          <AlertTriangle size={18} />
          <span className="admin-notif-dot" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="admin-header-icon-btn"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="admin-notif-dot" />
        </button>

        {/* Admin Profile */}
        <div className="admin-user-profile-chip">
          <img
            src="/images/design-studio/reference-cream-anarkali.jpg"
            alt="Admin Profile"
            className="admin-avatar-img"
          />
          <span className="admin-profile-name">Admin</span>
          <ChevronDown size={14} color="#6B7280" />
        </div>
      </div>
    </header>
  );
}
