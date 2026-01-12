// src/components/PartnerWithUs.jsx
import React, { useState } from "react";
import { FiChevronDown, FiUpload } from "react-icons/fi";
import { useSubCategories } from "../hooks/categories/useSubCategories";

const COLORS = {
  teal: "#18C5BE",
  border: "#CFEFEB",
  divider: "#D9F5F2",
  softBg: "#F5FEFD",
  text: "#0F172A",
  hint: "#6B7280",
};

const countries = ["Pakistan", "Qatar", "UAE", "Saudi Arabia", "USA", "UK"];
const cities = ["Doha", "Al Khor", "Al Wakrah", "Al Rayyan", "Masaleed", "Dukhan"];
const countryCodes = [
  "Pakistan (+92)",
  "Qatar (+974)",
  "UAE (+971)",
  "KSA (+966)",
];

function Label({ children }) {
  return (
    <label className="block text-[13.5px] mb-2" style={{ color: COLORS.text }}>
      {children} :
    </label>
  );
}

function BaseField({ children }) {
  return (
    <div
      className="rounded-xl bg-white"
      style={{ border: `1px solid ${COLORS.border}` }}
    >
      {children}
    </div>
  );
}

function TextInput({ placeholder, type = "text" }) {
  return (
    <BaseField>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl outline-none text-[14.5px] placeholder-gray-400"
      />
    </BaseField>
  );
}

function SelectLike({ placeholder = "Select", items = [] }) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");

  return (
    <div className="relative">
      <BaseField>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left"
        >
          <span
            className={`text-[14.5px] ${
              val ? "text-slate-900" : "text-gray-400"
            }`}
          >
            {val || placeholder}
          </span>
          <FiChevronDown size={18} style={{ color: COLORS.teal }} />
        </button>
      </BaseField>

      {open && (
        <div
          className="absolute z-10 mt-2 w-full rounded-xl bg-white overflow-hidden"
          style={{ border: `1px solid ${COLORS.border}` }}
        >
          {items.map((it) => (
            <button
              key={it}
              type="button"
              onClick={() => {
                setVal(it);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-[14px] hover:bg-slate-50"
            >
              {it}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function UploadBox({ hint }) {
  return (
    <div
      className="rounded-2xl p-4 md:p-5"
      style={{
        border: `1px solid ${COLORS.border}`,
        background: COLORS.softBg,
      }}
    >
      {hint && <p className="text-[12.5px] mb-3 text-gray-500">{hint}</p>}
      <div className="flex items-center justify-center">
        <label
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/70 px-5 py-2.5 rounded-lg text-white cursor-pointer"
        >
          <FiUpload />
          <span>Upload File</span>
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}

function Pill({ label }) {
  const [checked, setChecked] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setChecked((v) => !v)}
      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[14px] transition
                  ${checked ? "bg-teal-50" : "bg-white"}`}
      style={{ border: `1px solid ${COLORS.border}` }}
    >
      <span
        className={`inline-block w-4 h-4 rounded-full border`}
        style={{
          borderColor: COLORS.teal,
          background: checked ? COLORS.teal : "transparent",
        }}
      />
      <span className="text-slate-700">{label}</span>
    </button>
  );
}

export default function PartnerWithUs() {
  const { data: categories, isLoading, isFetching } = useSubCategories();

  return (
    <section className="py-10 md:py-14 px-4">
      <div className="custom-container">
        {/* Card */}
        <div
          className="rounded-3xl p-5 md:p-8 bg-white"
          // style={{ border: `1.5px solid ${COLORS.border}` }}
        >
          {/* Inner soft container */}
          <div
            className="rounded-3xl p-6 md:p-8"
            style={{
              border: `1px solid ${COLORS.border}`,
              background: COLORS.softBg,
            }}
          >
            {/* Title */}
            <div className="text-center mb-6 md:mb-8">
              <h2
                className="text-[22px] md:text-[26px] font-medium"
                style={{ color: COLORS.teal }}
              >
                Partner With us
              </h2>
              <p className="mt-2 text-gray-500 text-[13.5px] md:text-[14px] max-w-2xl mx-auto">
                Do you have an amazing brand? Expose your product with us and
                contact us now. Please provide your info and we will contact you
                to discuss more!
              </p>
            </div>

            {/* Grid form */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <Label>First name / Last name</Label>
                  <TextInput placeholder="Enter Full name" />
                </div>
                <div>
                  <Label>Company/brand name</Label>
                  <TextInput placeholder="Enter name" />
                </div>
                <div>
                  <Label>Website</Label>
                  <TextInput placeholder="Enter URL" type="url" />
                </div>

                <div>
                  <Label>Social media account</Label>
                  <TextInput placeholder="Enter URL" type="url" />
                </div>
                <div>
                  <Label>Country</Label>
                  <SelectLike placeholder="Select" items={countries} />
                </div>
                <div>
                  <Label>Location City</Label>
                  <SelectLike placeholder="Select" items={cities} />
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <TextInput placeholder="Enter contact" />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <SelectLike
                    placeholder="Select"
                    items={["info@brand.com", "sales@brand.com"]}
                  />
                </div>
                <div>
                  <Label>Country Code</Label>
                  <SelectLike
                    placeholder="Pakistan (+92)"
                    items={countryCodes}
                  />
                </div>
              </div>

              {/* Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label>Company/brand profile</Label>
                  <UploadBox />
                </div>
                <div>
                  <Label>Product list</Label>
                  <UploadBox hint="(PDF, Excel, or Word document) Please include SKUs, images, descriptions, prices if possible" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <Label>Category</Label>
                <div className="flex flex-wrap gap-3">
                  {categories?.rows?.map((c) => (
                    <Pill key={c?.slug} label={c?.name} />
                  ))}
                </div>
              </div>

              {/* Other */}
              <div>
                <Label>Other</Label>
                <BaseField>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="w-full px-4 py-3 rounded-xl outline-none text-[14.5px] placeholder-gray-400 bg-white"
                  />
                </BaseField>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-lg text-[14.5px]"
                  style={{
                    background: "#E9FAF8",
                    color: COLORS.teal,
                    border: `1px solid ${COLORS.border}`,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg text-white text-[14.5px] bg-primary hover:bg-primary/70"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
