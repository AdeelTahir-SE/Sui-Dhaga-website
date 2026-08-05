"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  X,
  Sparkles,
  ChevronDown,
  Globe,
  Lock,
  Users,
  CheckCircle,
  Plus
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { createCommunityPostApi } from "@/lib/community-data";

const DEFAULT_PREVIEW_IMAGES = [
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80"
];

export function CommunityCreatePostPage() {
  const router = useRouter();

  // Form State
  const [uploadedImages, setUploadedImages] = useState<string[]>(DEFAULT_PREVIEW_IMAGES);
  const [caption, setCaption] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>(["Anarkali", "Wedding", "Embroidery"]);
  const [visibility, setVisibility] = useState<"Public" | "Followers" | "Private">("Public");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Character & Tag Limits
  const MAX_CAPTION_CHARS = 500;
  const MAX_TAGS = 10;

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Add sample image on drop
    const sampleImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80";
    setUploadedImages((prev) => [...prev, sampleImg]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In web app demo, convert selected files to object URLs or add sample photo
      const sampleImg = URL.createObjectURL(e.target.files[0]);
      setUploadedImages((prev) => [...prev, sampleImg]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Tag Add / Remove
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const cleanTag = tagInput.trim().replace(/^#/, "");
      if (tags.length < MAX_TAGS && !tags.includes(cleanTag)) {
        setTags([...tags, cleanTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Publish Post Form Submission
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedImages.length === 0) {
      alert("Please upload at least one image of your design.");
      return;
    }

    setIsSubmitting(true);

    const postPayload = {
      content: caption.trim() || "Check out my new outfit design creation!",
      images: uploadedImages,
      tags: tags.length > 0 ? tags : ["CustomDesign", "Fashion"],
      author: "You",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    };

    const res = await createCommunityPostApi(postPayload);
    setIsSubmitting(false);

    if (res.success) {
      router.push("/community");
    }
  };

  return (
    <PublicShell>
      <div className="community-create-page-root">
        {/* Left Hero Yellow Ribbon Accent */}
        <div className="create-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="community-create-container">
          {/* Breadcrumb Navigation */}
          <nav className="tailors-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <Link href="/community">Community</Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <span className="current">Create Post</span>
          </nav>

          {/* Page Heading Title Block */}
          <div className="create-header-block">
            <h1 className="create-main-title">
              Share your creation <span className="sparkle-emoji">✨</span>
            </h1>
            <p className="create-subtitle">
              Inspire others with your unique design and craftsmanship.
            </p>
          </div>

          {/* Main Card Form Layout */}
          <section className="create-post-card" aria-label="Create Post Form">
            <form onSubmit={handlePublish} className="create-post-main-form">
              {/* 1. Upload Design Section */}
              <div className="create-form-section">
                <label className="section-label">Upload Design</label>
                
                {/* Drag & Drop Upload Zone Box */}
                <div
                  className={`upload-dropzone-box ${isDragging ? "dragging" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="design-file-input"
                    accept="image/*"
                    multiple
                    className="file-input-hidden"
                    onChange={handleFileSelect}
                  />
                  <label htmlFor="design-file-input" className="dropzone-label">
                    <div className="cloud-icon-circle">
                      <UploadCloud size={28} className="cloud-icon" />
                    </div>
                    <span className="dropzone-primary-text">
                      Click to upload or drag and drop
                    </span>
                    <span className="dropzone-sub-text">PNG, JPG up to 10MB</span>
                  </label>
                </div>

                {/* Uploaded Image Previews Strip */}
                {uploadedImages.length > 0 && (
                  <div className="uploaded-thumbnails-strip">
                    {uploadedImages.map((imgUrl, idx) => (
                      <div key={idx} className="preview-thumb-card">
                        <img src={imgUrl} alt={`Uploaded design ${idx + 1}`} />
                        <button
                          type="button"
                          className="remove-thumb-btn"
                          onClick={() => handleRemoveImage(idx)}
                          title="Remove image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Caption Section */}
              <div className="create-form-section">
                <label className="section-label">Caption</label>
                <textarea
                  rows={4}
                  maxLength={MAX_CAPTION_CHARS}
                  placeholder="Write about your design, the story behind it, fabrics used, or any tips..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="caption-textarea"
                />
                <div className="char-counter-row">
                  <span>{caption.length}/{MAX_CAPTION_CHARS}</span>
                </div>
              </div>

              {/* 3. Tags Section */}
              <div className="create-form-section">
                <label className="section-label">Tags</label>
                <div className="tags-input-wrapper">
                  <input
                    type="text"
                    placeholder="Add tags (e.g. #Anarkali, #Wedding, #Embroidery) and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    disabled={tags.length >= MAX_TAGS}
                    className="tags-input"
                  />
                </div>

                {/* Tags Counter & Rendered Chips */}
                <div className="tags-meta-row">
                  <div className="tags-chips-list">
                    {tags.map((t) => (
                      <span key={t} className="created-tag-pill">
                        #{t}
                        <button
                          type="button"
                          className="remove-tag-x"
                          onClick={() => handleRemoveTag(t)}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <span className="tags-counter">{tags.length}/{MAX_TAGS}</span>
                </div>
              </div>

              {/* 4. Visibility Section */}
              <div className="create-form-section">
                <label className="section-label">Visibility</label>
                <div className="visibility-select-wrapper">
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as any)}
                    className="visibility-select"
                  >
                    <option value="Public">Public</option>
                    <option value="Followers">Followers Only</option>
                    <option value="Private">Private (Only Me)</option>
                  </select>
                  <ChevronDown size={16} className="select-arrow-icon" />
                </div>
                <p className="visibility-help-text">
                  {visibility === "Public"
                    ? "Anyone on Sui Dhâga can see and comment on this post"
                    : visibility === "Followers"
                    ? "Only your followers can see this post in their feed"
                    : "Only visible to you on your profile"}
                </p>
              </div>

              {/* 5. Publish Post Button */}
              <div className="create-form-submit-row">
                <button
                  type="submit"
                  disabled={isSubmitting || uploadedImages.length === 0}
                  className="publish-post-main-btn"
                >
                  {isSubmitting ? "Publishing Post..." : "Publish Post"}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Bottom Corner Brand Transparent PNG Motif */}
        <div className="create-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
