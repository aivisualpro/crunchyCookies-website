// client/src/hooks/usePaginatedSection.js
import { useEffect, useMemo, useState } from "react";

export default function usePaginatedSection(
  useQueryHook,
  { initialLimit = 4, extraParams = {} } = {}
) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  // all our product endpoints accept { page, limit, ... } now
  const q = useQueryHook({ page, limit: initialLimit, ...extraParams });

  const isInitialLoading = q?.isLoading && page === 1;
  const isFetching = !!q?.isFetching;

  // Append new page results; dedupe by _id
  useEffect(() => {
    if (!q?.isSuccess || q?.isFetching) return;

    const list = Array.isArray(q?.data?.data) ? q.data.data : [];

    setItems((prev) => {
      const next = page === 1 ? list : [...prev, ...list];
      const seen = new Set();
      return next.filter((p) => {
        const id = p?._id || p?.id;
        if (!id) return false;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
    });
  }, [q?.isSuccess, q?.isFetching, q?.data, page]);

  const hasNext = !!q?.data?.meta?.hasNext;

  const loadMore = () => {
    if (!hasNext || isFetching) return;
    setPage((p) => p + 1);
  };

  return useMemo(
    () => ({
      items,
      page,
      limit: initialLimit,
      isInitialLoading,
      isFetching,
      hasNext,
      loadMore,
      query: q,
    }),
    [items, page, initialLimit, isInitialLoading, isFetching, hasNext, q]
  );
}
