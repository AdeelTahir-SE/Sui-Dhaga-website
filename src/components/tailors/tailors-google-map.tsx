"use client";

import React, { useState } from "react";
import { X, Maximize2 } from "lucide-react";
import { TailorItem } from "@/lib/tailors-data";

interface TailorsGoogleMapProps {
  tailors?: TailorItem[];
  hoveredTailorId?: string | null;
  selectedTailorId?: string | null;
  locationQuery?: string;
  onSelectTailor?: (id: string | null) => void;
  onCloseMap?: () => void;
  isModal?: boolean;
}

export function TailorsGoogleMap({
  locationQuery = "Faisalabad, Pakistan",
  onCloseMap,
  isModal = false
}: TailorsGoogleMapProps) {
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);

  // Dynamic Google Maps embed URL centered on active location query
  const targetQuery = locationQuery.trim() !== "" ? locationQuery : "Faisalabad, Pakistan";
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(targetQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`google-map-container ${isModal || isFullscreenModal ? "fullscreen-modal" : ""}`}>
      {/* Top Header Bar */}
      <div className="google-map-top-bar">
        <div className="map-top-actions">
          {!isModal && (
            <button
              className="map-icon-btn"
              onClick={() => setIsFullscreenModal(!isFullscreenModal)}
              title={isFullscreenModal ? "Exit Fullscreen" : "Fullscreen Map"}
            >
              <Maximize2 size={15} />
            </button>
          )}
          {onCloseMap && (
            <button
              className="map-icon-btn close-btn"
              onClick={onCloseMap}
              title="Close Map"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Actual Live Google Maps iframe */}
      <div className="google-map-iframe-wrapper">
        <iframe
          key={targetQuery}
          title={`Google Maps - ${targetQuery}`}
          src={googleMapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
