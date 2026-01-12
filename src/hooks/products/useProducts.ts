// client/src/hooks/products/useProducts.js
import { useQuery } from "@tanstack/react-query";
import {
  getProductsInFlowerInVases,
  getTopSoldProducts,
  getProductsInChocolatesOrHandBouquets,
  getProductsForFriendsOccasion,
  getProductsInPerfumes,
  getProductsInPreservedFlowers,
  getFeaturedProducts,
  getGiftDetail,
} from "../../api/products";

const THIRTY_MIN = 30 * 60 * 1000;

const defaultQueryOpts = {
  staleTime: THIRTY_MIN,
  cacheTime: THIRTY_MIN,
  refetchOnWindowFocus: false,
  keepPreviousData: true,
};

const qk = {
  inFlowerInVases: (params) => ["products", "inFlowerInVases", params || {}],
  topSold: (params) => ["products", "topSold", params || {}],
  inChocolatesOrHandBouquets: (params) => ["products", "inChocOrBouquets", params || {}],
  friendsOccasion: (params) => ["products", "friendsOccasion", params || {}],
  inPerfumes: (params) => ["products", "inPerfumes", params || {}],
  inPreservedFlowers: (params) => ["products", "inPreservedFlowers", params || {}],
  featured: (params) => ["products", "featured", params || {}],
  giftDetail: (id) => ["products", "giftDetail", id],
};

export function useProductsInFlowerInVases(params) {
  return useQuery({
    queryKey: qk.inFlowerInVases(params),
    queryFn: () => getProductsInFlowerInVases(params),
    ...defaultQueryOpts,
  });
}

export function useTopSoldProducts(params, { enabled = true } = {}) {
  return useQuery({
    queryKey: qk.topSold(params),
    queryFn: () => getTopSoldProducts(params),
    enabled,
    ...defaultQueryOpts,
  });
}

export function useProductsInChocolatesOrHandBouquets(params) {
  return useQuery({
    queryKey: qk.inChocolatesOrHandBouquets(params),
    queryFn: () => getProductsInChocolatesOrHandBouquets(params),
    ...defaultQueryOpts,
  });
}

export function useProductsForFriendsOccasion(params) {
  return useQuery({
    queryKey: qk.friendsOccasion(params),
    queryFn: () => getProductsForFriendsOccasion(params),
    ...defaultQueryOpts,
  });
}

export function useProductsInPerfumes(params) {
  return useQuery({
    queryKey: qk.inPerfumes(params),
    queryFn: () => getProductsInPerfumes(params),
    ...defaultQueryOpts,
  });
}

export function useProductsInPreservedFlowers(params) {
  return useQuery({
    queryKey: qk.inPreservedFlowers(params),
    queryFn: () => getProductsInPreservedFlowers(params),
    ...defaultQueryOpts,
  });
}

export function useFeaturedProducts(params) {
  return useQuery({
    queryKey: qk.featured(params),
    queryFn: () => getFeaturedProducts(params),
    ...defaultQueryOpts,
  });
}

// 👉 returns the product object directly (not the whole API envelope)
export function useGiftDetail(id) {
  return useQuery({
    queryKey: qk.giftDetail(id),
    queryFn: () => getGiftDetail(id),
    ...defaultQueryOpts,
    enabled: !!id,
  });
}
