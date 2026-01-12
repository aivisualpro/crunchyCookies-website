import React from "react";

export default function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-primary font-semibold">{label}</div>
      {children}
    </div>
  );
}
