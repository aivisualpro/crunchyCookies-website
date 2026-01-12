import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border ${className} w-full justify-center flex flex-col border-primary/30 bg-primary_light_mode p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
