"use client";
import React from "react";
import { useParams } from "next/navigation";
import ProfileDashboard from "@/components/Profile/Profile";

export default function MemberPage() {
  const params = useParams();
  // params might be undefined initially during hydration or if route doesn't match, but here it should match.
  // The folder is [currentTab], so currentTab will be in params.
  const currentTab = typeof params?.currentTab === 'string' ? params.currentTab : "profile";

  return <ProfileDashboard currentTab={currentTab} />;
}
