"use client";
import React, { useEffect, useState } from "react";
import { TbTruckDelivery, TbMapPin } from "react-icons/tb";
import { PiGlobeHemisphereWestLight, PiShoppingBagBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const countries = ["Qatar"];

export default function Topbar() {
  const { t, i18n } = useTranslation("translation");
  const [selected, setSelected] = useState("Qatar");
  const [user, setUser] = useState<any>(null);

  // sync html dir
  useEffect(() => {
    const dir = t("dir") || "ltr";
    document.documentElement.dir = dir;
  }, [i18n.language, t]);

  // read user from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) {
        setUser(null);
        return;
      }

      const parsed = JSON.parse(raw);

      // backend ne jo structure dikhaya:
      // { token: "...", user: { firstName, lastName, ... } }
      const u = parsed.user || parsed;

      if (u && (u.firstName || u.firstname)) {
        setUser(u);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      setUser(null);
    }
  }, []);

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  const firstName =
    user?.firstName ||
    user?.firstname ||
    ""; // safe fallback

  return (
    <nav className="top_navigation_bar py-1.5 bg-light_gray w-full border-b border-gray-100">
      <div className="custom-container mx-auto px-4">
        <div className="flex items-center justify-between text-[11px]">
          {/* Left feature items */}
          <ul className="md:flex items-center gap-6 text-neutral-600 hidden">
            <li className="flex items-center gap-1.5">
              <TbTruckDelivery className="text-[14px] text-primary" />
              <span>
                {t("topBar.expressDelivery")}
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <TbMapPin className="text-[14px] text-primary" />
              <span>
                {t("topBar.address")}
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <PiShoppingBagBold className="text-[14px] text-primary" />
              <span>
                {t("topBar.premium")}
              </span>
            </li>
          </ul>

          {/* Right controls */}
          <div className="flex md:flex-row flex-col items-center gap-2 ml-auto">
            {/* Language pill */}
            <button
              onClick={() =>
                changeLanguage(i18n.language === "ar" ? "en" : "ar")
              }
              className="flex items-center bg-transparent gap-1.5 rounded-full px-2 py-1 hover:bg-white transition"
            >
              <span className="font-medium">
                {i18n.language === "ar" ? "English" : "العربية"}
              </span>
              <PiGlobeHemisphereWestLight
                className="text-[14px]"
                style={{ color: "#0FB4BB" }}
              />
            </button>

            {/* User / Login line separator */}
            <div className="h-3 w-[1px] bg-gray-300 hidden md:block"></div>

            {/* User / Login */}
            {user ? (
              <div className="flex items-center gap-1 text-primary font-medium">
                {i18n.language === "ar"
                  ? `مرحباً، ${firstName}`
                  : `Hello, ${firstName}`}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
