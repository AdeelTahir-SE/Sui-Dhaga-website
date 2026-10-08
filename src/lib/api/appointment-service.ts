/**
 * Tailor Booking and Appointment Management Service
 * Endpoints: /appointments/*
 */

import { apiClient } from "./client";
import { ApiResponse, Appointment, BookAppointmentPayload, AppointmentStatus } from "./types";

export const appointmentService = {
  /**
   * Get list of appointments for authenticated user (customer or tailor)
   */
  getAppointments: async (params?: { page?: number; limit?: number }): Promise<ApiResponse<Appointment[]>> => {
    return apiClient.get<ApiResponse<Appointment[]>>("/appointments", { params });
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
    return apiClient.post<ApiResponse<Appointment>>("/appointments", formattedPayload);
  },

  /**
   * Get appointment details by ID
   */
  getAppointmentById: async (appointmentId: string): Promise<ApiResponse<Appointment>> => {
    return apiClient.get<ApiResponse<Appointment>>(`/appointments/${appointmentId}`);
  },

  /**
   * Cancel or delete an appointment
   */
  cancelAppointment: async (appointmentId: string): Promise<ApiResponse<null>> => {
    return apiClient.delete<ApiResponse<null>>(`/appointments/${appointmentId}`);
  },

  /**
   * Update appointment status (pending, confirmed, completed, cancelled)
   */
  updateStatus: async (
    appointmentId: string,
    status: AppointmentStatus
  ): Promise<ApiResponse<Appointment>> => {
    return apiClient.patch<ApiResponse<Appointment>>(`/appointments/${appointmentId}/status`, { status });
  },

  /**
   * Reschedule appointment to a new date and time
   */
  reschedule: async (
    appointmentId: string,
    appointmentDate: string,
    appointmentTime: string
  ): Promise<ApiResponse<Appointment>> => {
    return apiClient.patch<ApiResponse<Appointment>>(`/appointments/${appointmentId}/reschedule`, {
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
    });
  },
};
