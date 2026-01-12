import React from "react";

export default function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <div className="text-primary font-semibold">{label}</div>
      {children}
    </div>
  );
}
