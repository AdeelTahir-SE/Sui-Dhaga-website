/**
 * Media and Document File Upload Service
 * Endpoints: /uploads/*, /media/*
 */

import { apiClient, API_BASE_URL } from "./client";
import { ApiResponse } from "./types";

export interface UploadImageResult {
  url: string;
  filePath?: string;
  bucket?: string;
}

export const uploadService = {
  /**
   * Upload a single image file (JPEG, PNG, WebP, GIF, SVG)
   */
  uploadImage: async (
    imageFile: File | Blob,
    folder: string = "general"
  ): Promise<ApiResponse<UploadImageResult>> => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("folder", folder);
    return apiClient.post<ApiResponse<UploadImageResult>>("/uploads/image", formData);
  },

  /**
   * Upload image by Data URI or URL
   */
  uploadImageDataUri: async (
    dataUriOrUrl: string,
    folder: string = "general"
  ): Promise<ApiResponse<UploadImageResult>> => {
    return apiClient.post<ApiResponse<UploadImageResult>>("/uploads/image", {
      image: dataUriOrUrl,
      folder,
    });
  },

  /**
   * Helper to resolve media URL
   */
  getMediaUrl: (bucket: string, filePath: string): string => {
    const cleanBase = API_BASE_URL.replace(/\/+$/, "");
    return `${cleanBase}/media/${bucket}/${filePath}`;
  },
};
