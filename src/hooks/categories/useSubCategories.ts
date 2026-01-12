// src/hooks/categories/useCategories.js
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/categories";

const categoriesKey = (params = {}) => ["subCategories", params];

export function useSubCategories(params = {}) {
  return useQuery({
    queryKey: categoriesKey(params),
    queryFn: () => getCategories(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    select: (payload) => {
      const items = Array.isArray(payload?.data) ? payload.data : [];

      const rows = items.map((it, idx) => ({
        id: it._id || it.id || idx,
        name: it.name || "",
        ar_name: it.ar_name || "",
        image: it.image || it.imageUrl || "",
        slug: it.slug || "",
        parent: it?.parent?.name || "",
      }));

      return {
        rows,
        success: payload?.success ?? true,
        message: payload?.message ?? "",
      };
    },
  });
}
