'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MemberPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  useEffect(() => {
    // Redirect to the default tab (profile)
    if (id) {
      router.replace(`/member/${id}/profile`);
    }
  }, [id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Redirecting...</div>
    </div>
  );
}
