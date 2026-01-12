import React from 'react'
import { Outlet, Navigate } from "next/navigation"

const ProtectedRoute = () => {

    const isAuthenticated = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            {isAuthenticated ? <Outlet /> : <Navigate href={'/login'} />}
        </>
    )
}

export default ProtectedRoute