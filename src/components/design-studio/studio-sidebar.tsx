"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  PenTool,
  FolderHeart,
  Layers,
  Sparkles,
  Compass,
  Trash2,
  HelpCircle,
  Settings,
  Wand2
} from "lucide-react";

interface StudioSidebarProps {
  activeTab?: string;
}

export function StudioSidebar({ activeTab }: StudioSidebarProps) {
  const pathname = usePathname();

  const isCurrent = (path: string, key?: string) => {
    if (activeTab && key) {
      return activeTab.toLowerCase() === key.toLowerCase();
    }
    if (path === "/design-studio") {
      return pathname === "/design-studio";
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className="studio-sidebar-nav" aria-label="Design Studio Navigation">
      {/* Studio Header Label */}
      <div className="studio-sidebar-header">
        <h2 className="studio-sidebar-title">
          <Wand2 size={20} color="#078B87" />
          <span>AI Design Studio</span>
        </h2>
      </div>

      {/* Main Studio Navigation Links */}
      <nav className="studio-sidebar-menu-list">
        <Link
          href="/design-studio"
          className={`studio-sidebar-item ${isCurrent("/design-studio", "home") ? "active" : ""}`}
        >
          <Home size={18} />
          <span>Studio Home</span>
        </Link>

        <Link
          href="/design-studio/new"
          className={`studio-sidebar-item ${isCurrent("/design-studio/new", "new") ? "active" : ""}`}
        >
          <PenTool size={18} />
          <span>New Design</span>
        </Link>

        <Link
          href="/design-studio/my-designs"
          className={`studio-sidebar-item ${isCurrent("/design-studio/my-designs", "my-designs") ? "active" : ""}`}
        >
          <FolderHeart size={18} />
          <span>My Designs</span>
        </Link>

        <Link
          href="/design-studio/templates"
          className={`studio-sidebar-item ${isCurrent("/design-studio/templates", "templates") ? "active" : ""}`}
        >
          <Layers size={18} />
          <span>Templates</span>
        </Link>

        <Link
          href="/design-studio/chat"
          className={`studio-sidebar-item ${isCurrent("/design-studio/chat", "chat") ? "active" : ""}`}
        >
          <Sparkles size={18} />
          <span>AI Assistant</span>
        </Link>

        <Link
          href="/design-studio/templates?tab=inspiration"
          className={`studio-sidebar-item ${isCurrent("/design-studio/templates?tab=inspiration", "inspiration") ? "active" : ""}`}
        >
          <Compass size={18} />
          <span>Inspiration</span>
        </Link>

        <Link
          href="/design-studio/my-designs?filter=trash"
          className={`studio-sidebar-item ${isCurrent("/design-studio/my-designs?filter=trash", "trash") ? "active" : ""}`}
        >
          <Trash2 size={18} />
          <span>Trash</span>
        </Link>
      </nav>

      {/* Bottom Footer Section of Sidebar */}
      <div className="studio-sidebar-footer-menu">
        <Link href="/faqs" className="studio-sidebar-item">
          <HelpCircle size={18} />
          <span>Help & Support</span>
        </Link>

        <Link href="/customer/dashboard" className="studio-sidebar-item">
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
