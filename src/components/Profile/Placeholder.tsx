import React from "react";

export default function Placeholder({ title, subtitle }) {
  return (
    <div className="flex items-center justify-center p-8 text-center">
      <div className="space-y-4">
        <h2 className="text-2xl text-primary">{title}</h2>
        <p className="text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}
