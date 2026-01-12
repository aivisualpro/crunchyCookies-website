import { useQuery } from "@tanstack/react-query";
import {
  getOnGoingOrderByUser,
  getPreviousOrder,
} from "../../api/order";

// cache keys kept tiny to avoid unnecessary rerenders
const ongoingKey = (userId) => ["orders:ongoing", userId];
const historyKey = (userId) => ["orders:history", userId];


export function useOngoingOrder({
  userId,
  refetchInterval = false, // e.g. 10000 for 10s live updates
} = {}) {
  return useQuery({
    queryKey: ongoingKey(userId),
    queryFn: () => getOnGoingOrderByUser(userId),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 min
    gcTime: 10 * 60 * 1000,    // 1 hr
    refetchInterval,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });
}

export function usePreviousOrder({ userId } = {}) {
  return useQuery({
    queryKey: historyKey(userId),
    queryFn: () => getPreviousOrder(userId),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    keepPreviousData: true,
  });
}
