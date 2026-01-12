import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWishlist, deleteWishlist } from '../../api/wishlist';

export function useAddWishlist(userId: any) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: any) => createWishlist(vars), // { user, product }
    retry: 0,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wishlist', userId] }),
  });
}

export function useDeleteWishlist(userId: any) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: any) => deleteWishlist(vars), // { user, product }
    retry: 0,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wishlist', userId] }),
  });
}
