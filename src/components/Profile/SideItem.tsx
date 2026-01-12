import React from "react";

export default function SideItem({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
        active ? "focus:outline-none border-transparent bg-teal-500 text-white shadow" : "border-cyan-200/70 bg-white text-slate-700 hover:bg-cyan-50",
      ].join(" ")}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
