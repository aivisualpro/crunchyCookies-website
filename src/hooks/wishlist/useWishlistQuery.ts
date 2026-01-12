import { useQuery } from "@tanstack/react-query";
import { getWishlistByUser } from "../../api/wishlist";

export const useWishlist = (userId: string) => {
  return useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => getWishlistByUser(userId),
    enabled: !!userId,
  });
};
