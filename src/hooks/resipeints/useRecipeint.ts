// src/hooks/categories/useCategories.js
import { useQuery } from "@tanstack/react-query";
import { getRecipeints } from "../../api/recipeints";

const recipeintsKey = (params = {}) => ["recipeints", params];

export function useRecipeints(params = {}) {
  return useQuery({
    queryKey: recipeintsKey(params),
    queryFn: () => getRecipeints(params),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    select: (payload) => {
      const items = Array.isArray(payload?.data) ? payload.data : [];

      const rows = items.map((it, idx) => ({
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
