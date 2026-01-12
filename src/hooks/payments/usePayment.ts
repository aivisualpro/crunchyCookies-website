// src/hooks/categories/useCategories.js
import { useQuery } from "@tanstack/react-query";
import { getPaymentByUserId, getStripeSessionDetails } from "../../api/payments";

const paymentsKey = (params = {}) => ["payments", params];

export function usePaymentsByUser(params = {}) {
  return useQuery({
    queryKey: paymentsKey(params),
    queryFn: () => getPaymentByUserId(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    select: (payload) => {
      const items = Array.isArray(payload?.data) ? payload.data : [];

      const rows = items.map((it, idx) => ({
        id: it._id || it.id || idx,
        sessionId: it.sessionId || "",
        userId: it.userId || "",
        createdAt: it.createdAt || "",
      }));

      return {
        rows,
        success: payload?.success ?? true,
        message: payload?.message ?? "",
      };
    },
  });
}

export function usePaymentReciept(params = {}) {
  return useQuery({
    queryKey: paymentsKey(params),
    queryFn: () => getStripeSessionDetails(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    select: (payload) => {
      const items = Array.isArray(payload?.data) ? payload.data : [];

      return {
        rows: items,
        success: payload?.success ?? true,
        message: payload?.message ?? "",
      };
    },
  });
}
