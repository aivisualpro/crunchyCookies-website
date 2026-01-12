"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-16 right-4 md:bottom-4 z-50 flex h-12 w-12 items-center justify-center
        rounded-full bg-primary hover:bg-primary/70 text-white shadow-lg
        transition-all duration-300 ease-in-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}
      `}
    >
      <FaArrowUp />
    </button>
  );
}
