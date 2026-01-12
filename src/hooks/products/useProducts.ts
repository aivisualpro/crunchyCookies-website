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
};

const qk = {
  inFlowerInVases: (params: any) => ["products", "inFlowerInVases", params || {}],
  topSold: (params: any) => ["products", "topSold", params || {}],
  inChocolatesOrHandBouquets: (params: any) => ["products", "inChocOrBouquets", params || {}],
  friendsOccasion: (params: any) => ["products", "friendsOccasion", params || {}],
  inPerfumes: (params: any) => ["products", "inPerfumes", params || {}],
  inPreservedFlowers: (params: any) => ["products", "inPreservedFlowers", params || {}],
  featured: (params: any) => ["products", "featured", params || {}],
  giftDetail: (id: string) => ["products", "giftDetail", id],
};

export function useProductsInFlowerInVases(params: any) {
  return useQuery({
    queryKey: qk.inFlowerInVases(params),
    queryFn: () => getProductsInFlowerInVases(params),
    ...defaultQueryOpts,
  });
}

export function useTopSoldProducts(params: any, { enabled = true } = {}) {
  return useQuery({
    queryKey: qk.topSold(params),
    queryFn: () => getTopSoldProducts(params),
    enabled,
    ...defaultQueryOpts,
  });
}

export function useProductsInChocolatesOrHandBouquets(params: any) {
  return useQuery({
    queryKey: qk.inChocolatesOrHandBouquets(params),
    queryFn: () => getProductsInChocolatesOrHandBouquets(params),
    ...defaultQueryOpts,
  });
}

export function useProductsForFriendsOccasion(params: any) {
  return useQuery({
    queryKey: qk.friendsOccasion(params),
    queryFn: () => getProductsForFriendsOccasion(params),
    ...defaultQueryOpts,
  });
}

export function useProductsInPerfumes(params: any) {
  return useQuery({
    queryKey: qk.inPerfumes(params),
    queryFn: () => getProductsInPerfumes(params),
    ...defaultQueryOpts,
  });
}

export function useProductsInPreservedFlowers(params: any) {
  return useQuery({
    queryKey: qk.inPreservedFlowers(params),
    queryFn: () => getProductsInPreservedFlowers(params),
    ...defaultQueryOpts,
  });
}

export function useFeaturedProducts(params: any) {
  return useQuery({
    queryKey: qk.featured(params),
    queryFn: () => getFeaturedProducts(params),
    ...defaultQueryOpts,
  });
}

// 👉 returns the product object directly (not the whole API envelope)
export function useGiftDetail(id: string) {
  return useQuery({
    queryKey: qk.giftDetail(id),
    queryFn: () => getGiftDetail(id),
    ...defaultQueryOpts,
    enabled: !!id,
  });
}
