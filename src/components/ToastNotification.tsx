// src/components/ToastNotification.jsx
import React, { useEffect, useState, useRef } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const ToastNotification = ({
  open,
  type = "success", // "success" | "error"
  title,
  message,
  duration = 3000,
  onClose,
}) => {
  const [shouldRender, setShouldRender] = useState(open);   // DOM mount flag
  const [visible, setVisible] = useState(open);             // animation state
  const exitTimeoutRef = useRef(null);

  // ----- Mount / unmount with animation -----
  useEffect(() => {
    if (open) {
      // mount karo, phir next frame me visible true so CSS transition trigger ho
      setShouldRender(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      // exit animation
      setVisible(false);
      // exit duration ke baad hi DOM hatana
      exitTimeoutRef.current = setTimeout(() => {
        setShouldRender(false);
      }, 300); // ye value tailwind classes ki duration-300 se match rakho
    }

    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, [open]);

  // ----- Auto-hide after duration -----
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  // agar render hi nahi karna to null
  if (!shouldRender) return null;

  const isSuccess = type === "success";

  const icon = isSuccess ? (
    <FiCheckCircle className="text-emerald-500" size={18} />
  ) : (
    <FiXCircle className="text-rose-500" size={18} />
  );

  const defaultTitle = isSuccess ? "Action completed" : "Something went wrong";

  return (
    <div
      className={[
        "fixed left-1/2 z-50 -translate-x-1/2 pointer-events-none",
        "transition-all duration-300 ease-in-out",
        visible
          ? "bottom-8 opacity-100 translate-y-0"
          : "bottom-0 opacity-0 translate-y-5",
      ].join(" ")}
    >
      <div className={`pointer-events-auto flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${isSuccess ? "from-green-950 to-black" : "from-red-950 to-black"} rounded-md shadow-lg min-w-[360px] max-w-[360px]`}>
        <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
          {icon}
        </div>
        <div className="flex-1 text-sm text-slate-50">
          <p
            className={`font-semibold text-[13px] ${
              isSuccess ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {title || defaultTitle}
          </p>
          {message && (
            <p className="text-[13px] text-slate-200">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
