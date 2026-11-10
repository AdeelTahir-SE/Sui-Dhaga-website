/**
 * Tailor Booking and Appointment Management Service
 * Endpoints: /appointments/*
 */

import { apiClient } from "./client";
import { fetchWithCache, invalidateCacheDomain, stableCacheKey } from "./data-cache";
import { ApiResponse, Appointment, BookAppointmentPayload, AppointmentStatus } from "./types";

export const appointmentService = {
  /**
   * Get list of appointments for authenticated user (customer or tailor)
   */
  getAppointments: async (params?: { page?: number; limit?: number }): Promise<ApiResponse<Appointment[]>> => {
    const key = `list:${stableCacheKey(params as Record<string, unknown> | undefined)}`;
    return fetchWithCache(
      "appointments",
      key,
      () => apiClient.get<ApiResponse<Appointment[]>>("/appointments", { params }),
      {
        scope: "auth",
        shouldCache: (res) => Boolean(Array.isArray(res?.data)),
      }
    );
  },

  /**
   * Book a new tailor appointment
   */
  bookAppointment: async (payload: BookAppointmentPayload): Promise<ApiResponse<Appointment>> => {
    const formattedPayload = {
      tailorId: payload.tailorId,
      serviceId: payload.serviceId,
      appointment_date: payload.appointment_date || payload.date,
      appointment_time: payload.appointment_time || payload.time,
      notes: payload.notes,
    };
    const res = await apiClient.post<ApiResponse<Appointment>>("/appointments", formattedPayload);
    invalidateCacheDomain("appointments");
    invalidateCacheDomain("tailors");
    invalidateCacheDomain("dashboard");
    return res;
  },

  /**
   * Get appointment details by ID
   */
  getAppointmentById: async (appointmentId: string): Promise<ApiResponse<Appointment>> => {
    return fetchWithCache(
      "appointments",
      `detail:${appointmentId}`,
      () => apiClient.get<ApiResponse<Appointment>>(`/appointments/${appointmentId}`),
      {
        scope: "auth",
        shouldCache: (res) => Boolean(res?.data),
      }
    );
  },

  /**
   * Cancel or delete an appointment
   */
  cancelAppointment: async (appointmentId: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.delete<ApiResponse<null>>(`/appointments/${appointmentId}`);
    invalidateCacheDomain("appointments");
    invalidateCacheDomain("tailors");
    invalidateCacheDomain("dashboard");
    return res;
  },

  /**
   * Update appointment status (pending, confirmed, completed, cancelled)
   */
  updateStatus: async (
    appointmentId: string,
    status: AppointmentStatus
  ): Promise<ApiResponse<Appointment>> => {
    const res = await apiClient.patch<ApiResponse<Appointment>>(`/appointments/${appointmentId}/status`, { status });
    invalidateCacheDomain("appointments");
    invalidateCacheDomain("dashboard");
    return res;
  },

  /**
   * Reschedule appointment to a new date and time
   */
  reschedule: async (
    appointmentId: string,
    appointmentDate: string,
    appointmentTime: string
  ): Promise<ApiResponse<Appointment>> => {
    const res = await apiClient.patch<ApiResponse<Appointment>>(`/appointments/${appointmentId}/reschedule`, {
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
    });
    invalidateCacheDomain("appointments");
    invalidateCacheDomain("tailors");
    invalidateCacheDomain("dashboard");
    return res;
  },
};
