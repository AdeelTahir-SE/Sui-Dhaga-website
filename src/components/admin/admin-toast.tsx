"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export function AdminToast({
  message,
  type = "success",
  onClose,
  duration = 3500
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case "error":
        return <AlertCircle size={18} color="#EF4444" />;
      case "info":
        return <Info size={18} color="#3B82F6" />;
      default:
        return <CheckCircle2 size={18} color="#10B981" />;
    }
  };

  return (
    <div className="admin-toast-banner" role="status" aria-live="polite">
      {getIcon()}
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "#9CA3AF",
          cursor: "pointer",
          marginLeft: "8px",
          display: "flex",
          alignItems: "center"
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
