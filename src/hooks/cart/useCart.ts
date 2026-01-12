// hooks/cart/useCart.js
import { useQuery } from "@tanstack/react-query";
import {
  getCarts,
  getCartById,
  getCartByUser,
} from "../../api/cart";

// Centralized query keys
export const cartKeys = {
  all: ["cart"],
  lists: () => ["cart", "lists"],
  listByUser: (userId) => ["cart", "lists", "user", userId],
  details: () => ["cart", "detail"],
  detail: (id) => ["cart", "detail", id],
};

/* ----------------------------- READ HOOKS ----------------------------- */

// Get all carts (admin/debug)
export function useCarts() {
  return useQuery({
    queryKey: cartKeys.lists(),
    queryFn: getCarts,
    staleTime: 5 * 60 * 1000,
  });
}

// Get single cart by cartId
export function useCartById(cartId) {
  return useQuery({
    queryKey: cartKeys.detail(cartId),
    queryFn: () => getCartById(cartId),
    enabled: !!cartId,
    staleTime: 5 * 60 * 1000,
  });
}

// Get cart by userId
export function useCartByUser(userId) {
  return useQuery({
    queryKey: cartKeys.listByUser(userId),
    queryFn: () => getCartByUser(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}
