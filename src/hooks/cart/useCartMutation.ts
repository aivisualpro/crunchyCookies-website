// hooks/cart/useCartMutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCart,
  updateCart,
  deleteCart,
  bulkDeleteCarts,
  addItemToCart,
  addBundleToCart,
  setItemQty,
  removeItemFromCart,
  removeItemsFromCart,
} from "../../api/cart";
import { cartKeys } from "./useCart";

export function useCreateCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCart, // payload: { user, items?, deliveryCharges? }
    onSuccess: (data: any, vars: any) => {
      if (vars?.user) qc.invalidateQueries({ queryKey: cartKeys.listByUser(vars.user) });
      qc.invalidateQueries({ queryKey: cartKeys.lists() });
    },
  });
}

export function useUpdateCart() {
  const qc = useQueryClient();
  return useMutation({
    // vars: { cartId, payload }
    mutationFn: ({ cartId, payload }: any) => updateCart(cartId, payload),
    onSuccess: (data: any, vars: any) => {
      const userId = vars?.payload?.user;
      if (userId) qc.invalidateQueries({ queryKey: cartKeys.listByUser(userId) });
      if (vars?.cartId) qc.invalidateQueries({ queryKey: cartKeys.detail(vars.cartId) });
      qc.invalidateQueries({ queryKey: cartKeys.lists() });
    },
  });
}

export function useDeleteCart() {
  const qc = useQueryClient();
  return useMutation({
    // vars: { cartId, userId? }
    mutationFn: ({ cartId }: any) => deleteCart(cartId),
    onSuccess: (data: any, vars: any) => {
      if (vars?.userId) qc.invalidateQueries({ queryKey: cartKeys.listByUser(vars.userId) });
      qc.invalidateQueries({ queryKey: cartKeys.lists() });
      if (vars?.cartId) qc.invalidateQueries({ queryKey: cartKeys.detail(vars.cartId) });
    },
  });
}

export function useBulkDeleteCarts() {
  const qc = useQueryClient();
  return useMutation({
    // vars: { ids: [] }
    mutationFn: ({ ids }: any) => bulkDeleteCarts(ids),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: cartKeys.lists() });
    },
  });
}

/* ----------------------- Item-level mutations ----------------------- */

export function useAddItemToCart() {
  const qc = useQueryClient();
  return useMutation({
    // vars: { user, product, qty }
    mutationFn: addItemToCart,
    onSuccess: (_data: any, vars: any) => {
      if (vars?.user) qc.invalidateQueries({ queryKey: cartKeys.listByUser(vars.user) });
    },
  });
}

export function useAddBundleToCart() {
  const qc = useQueryClient();
  return useMutation({
    // vars: { user, items: [{product, qty}, ...] }
    mutationFn: addBundleToCart,
    onSuccess: (_data: any, vars: any) => {
      if (vars?.user) qc.invalidateQueries({ queryKey: cartKeys.listByUser(vars.user) });
    },
  });
}

export function useSetItemQty() {
  const qc = useQueryClient();
  return useMutation({
    // vars: { user, productId, qty }
    mutationFn: setItemQty,
    onSuccess: (_data: any, vars: any) => {
      if (vars?.user) qc.invalidateQueries({ queryKey: cartKeys.listByUser(vars.user) });
    },
  });
}

export function useRemoveItemFromCart() {
  const qc = useQueryClient();
  return useMutation({
    // vars: { user, productId }
    mutationFn: removeItemFromCart,
    onSuccess: (_data: any, vars: any) => {
      if (vars?.user) qc.invalidateQueries({ queryKey: cartKeys.listByUser(vars.user) });
    },
  });
}

export function useRemoveItemsFromCart() {
  const qc = useQueryClient();
  return useMutation({
    // vars: { user, productIds: [] }
    mutationFn: removeItemsFromCart,
    onSuccess: (_data: any, vars: any) => {
      if (vars?.user) qc.invalidateQueries({ queryKey: cartKeys.listByUser(vars.user) });
    },
  });
}
