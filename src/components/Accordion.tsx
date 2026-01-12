// src/components/Faqs.jsx
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

/**
 * Color tokens (picked to match the screenshot)
 * - tweak if you want even closer matching
 */
const COLORS = {
  title: "#18C5BE",            // teal title color
  border: "#CFEFEB",           // card & row borders
  divider: "#D9F5F2",          // inner row dividers
  icon: "#18C5BE",             // chevron color
  text: "#0F172A",             // slate-900-ish for questions
  subtext: "#475569"           // slate-600-ish for answers
};

function Row({ q, a, isOpen, onToggle }) {
  return (
    <div className="select-none">
      <button
        className="w-full flex items-center justify-between gap-3 py-3 md:py-3.5"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={q.replace(/\s+/g, "-").toLowerCase()}
      >
        <span
          className="text-[15px] md:text-[15.5px] leading-snug font-medium text-slate-900"
          style={{ color: COLORS.text }}
        >
          {q}?
        </span>
        <FiChevronDown
          className={`shrink-0 transition-transform duration-200`}
          size={18}
          style={{ color: COLORS.icon }}
          aria-hidden
          {...(isOpen ? { style: { color: COLORS.icon, transform: "rotate(180deg)" } } : {})}
        />
      </button>

      <div
        id={q.replace(/\s+/g, "-").toLowerCase()}
        className="grid transition-[grid-template-rows,opacity] duration-200 ease-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-3 text-[14.5px] leading-relaxed"
             style={{ color: COLORS.subtext }}>
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ title, faqs }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="py-10 md:py-14 px-4">
      <div className="custom-container">
        {/* Title */}
        <h1
          className="text-[2rem] text-center font-medium tracking-wide mb-6 md:mb-8"
          style={{ color: COLORS.title }}
        >
          {title}
        </h1>

        {/* Card */}
        <div
          className="rounded-3xl bg-white p-4 md:p-6"
          style={{
            border: `1.5px solid ${COLORS.border}`,
            boxShadow: "0 0 0 0 rgba(0,0,0,0)"
          }}
        >
          {/* Subtle rounded inner border look */}
          <div className="rounded-3xl p-2 md:p-3">
            {/* Rows */}
            {faqs.map((item, i) => (
              <div key={i}>
                <Row
                  q={item.q}
                  a={item.a}
                  isOpen={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                />
                {i !== faqs.length - 1 && (
                  <div
                    className="w-full"
                    style={{
                      height: 1,
                      backgroundColor: COLORS.divider
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
