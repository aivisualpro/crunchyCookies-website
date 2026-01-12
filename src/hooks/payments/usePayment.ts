// src/hooks/categories/useCategories.js
import { useQuery } from "@tanstack/react-query";
import { getPaymentByUserId, getStripeSessionDetails } from "../../api/payments";

const userPaymentsKey = (userId: string) => ["payments", "user", userId];
const receiptKey = (sessionId: string) => ["payments", "receipt", sessionId];

export function usePaymentsByUser(userId: string) {
  return useQuery({
    queryKey: userPaymentsKey(userId),
    queryFn: () => getPaymentByUserId(userId),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    select: (payload: any) => {
      const items = Array.isArray(payload?.data) ? payload.data : [];

      const rows = items.map((it: any, idx: number) => ({
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

export function usePaymentReciept(sessionId: string) {
  return useQuery({
    queryKey: receiptKey(sessionId),
    queryFn: () => getStripeSessionDetails(sessionId),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    select: (payload: any) => {
      const items = Array.isArray(payload?.data) ? payload.data : [];

      return {
        rows: items,
        success: payload?.success ?? true,
        message: payload?.message ?? "",
      };
    },
  });
}
