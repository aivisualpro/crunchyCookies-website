import React from "react";

export default function SectionTitle({ children, action }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-primary">{children}</h2>
        {action && <div>{action}</div>} {/* Render action button if provided */}
      </div>
      <hr className="mt-3 border-primary/30" />
    </div>
  );
}
