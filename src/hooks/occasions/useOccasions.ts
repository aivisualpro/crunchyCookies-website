// src/hooks/categories/useCategories.js
import { useQuery } from "@tanstack/react-query";
import { getOccasions } from "../../api/occasions";

const occasionsKey = (params: any = {}) => ["occasions", params];

export function useOccasions(params: any = {}) {
  return useQuery({
    queryKey: occasionsKey(params),
    queryFn: () => getOccasions(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    select: (payload: any) => {
      const items = Array.isArray(payload?.data) ? payload.data : [];

      const rows = items.map((it: any, idx: number) => ({
        id: it._id || it.id || idx,
        name: it.name || "",
        ar_name: it.ar_name || "",
        slug: it.slug || "",
        image: it.image || "",
      }));

      return {
        rows,
        success: payload?.success ?? true,
        message: payload?.message ?? "",
      };
    },
  });
}
