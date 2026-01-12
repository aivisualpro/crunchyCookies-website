"use client";
import React from 'react'
import { useRouter } from "next/navigation"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const stored = localStorage.getItem("user");
    const isAuthenticated = stored ? JSON.parse(stored) : null;

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}

export default ProtectedRoute