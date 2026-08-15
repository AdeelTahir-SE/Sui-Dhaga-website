"use client";

import React from "react";
import Link from "next/link";
import {
  Type,
  Image as ImageIcon,
  PenTool,
  MessageSquareMore,
  Sparkles,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";

export function StudioNewPage() {
  const creationMethods = [
    {
      title: "Text to Design",
      subtitle: "Describe your idea in words",
      href: "/design-studio/text-to-design",
      icon: Type
    },
    {
      title: "Image to Design",
      subtitle: "Upload a reference image",
      href: "/design-studio/image-to-design",
      icon: ImageIcon
    },
    {
      title: "Sketch to Design",
      subtitle: "Upload your hand sketch",
      href: "/design-studio/sketch-to-design",
      icon: PenTool
    },
    {
      title: "Chat with AI",
      subtitle: "Discuss and design together",
      href: "/design-studio/chat",
      icon: MessageSquareMore
    }
  ];

  return (
    <PublicShell>
      <div className="studio-root-container">
        <div className="studio-new-main-container">
          {/* Breadcrumb Navigation */}
          <nav className="studio-new-breadcrumb-row" aria-label="Breadcrumb">
            <Link href="/design-studio" className="studio-new-breadcrumb-link">
              AI Design Studio
            </Link>
            <span className="studio-new-breadcrumb-sep">&gt;</span>
            <span className="studio-new-breadcrumb-active">New Design</span>
          </nav>

          {/* Main Title & Subtitle */}
          <div className="studio-new-header-section">
            <h1 className="studio-new-main-heading">What would you like to create?</h1>
            <p className="studio-new-sub-heading">Choose a method to start your design</p>
          </div>

          {/* 4 Creation Methods Cards Grid */}
          <section className="studio-new-methods-grid" aria-label="Creation Methods">
            {creationMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Link
                  key={method.title}
                  href={method.href}
                  className="studio-new-card"
                >
                  <div className="studio-new-icon-circle">
                    <Icon size={28} strokeWidth={1.8} />
                  </div>
                  <h3 className="studio-new-card-title">{method.title}</h3>
                  <p className="studio-new-card-desc">{method.subtitle}</p>
                </Link>
              );
            })}
          </section>

          {/* Bottom Split Section: Left Inspiration Box + Right Atelier Illustration */}
          <section className="studio-new-bottom-split" aria-label="Design Inspiration">
            {/* Left Inspiration Card */}
            <div className="studio-new-inspiration-box">
              <h2 className="studio-new-inspiration-title">Need inspiration?</h2>
              <p className="studio-new-inspiration-text">
                Explore trending styles and templates.
              </p>
              <Link href="/design-studio/templates" className="studio-new-explore-btn">
                <span>Explore Templates</span>
              </Link>
            </div>

            {/* Right Fashion Designer Atelier Illustration */}
            <div className="studio-new-illustration-wrapper">
              <div className="studio-new-dots-accent" aria-hidden="true" />
              <img
                src="/images/design-studio/designer-workspace.png"
                alt="Fashion designer creating ethnic outfits at laptop atelier desk"
                className="studio-new-illustration-img"
              />
            </div>
          </section>
        </div>
      </div>
    </PublicShell>
  );
}
