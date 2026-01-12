import React from "react";
import {
  AiOutlineClose,
  AiOutlineRight,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineInfoCircle,
  AiOutlinePhone,
  AiOutlineGift,
  AiOutlineLogout,
  AiOutlineLeft,
} from "react-icons/ai";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function MenuListBox({ dir = "ltr", onClose, onLinkClick }) {
  const { i18n } = useTranslation();
  const langClass = i18n.language === "ar";

  const items = [
    { 
      en_label: "Flowers",         
      ar_label: "الزهور",    
      icon: "/images/menu/icon (1).png",      
      to: "/filters/subCategory/flowers-in-vases",        
    },
    { 
      en_label: "Watches",    
      ar_label: "الساعات",    
      icon: "/images/menu/icon (6).png",       
      to: "/filters/subCategory/watches",    
    },
    { 
      en_label: "Chocolates",     
      ar_label: "الشوكولاتة",   
      icon: "/images/menu/icon (4).png",       
      to: "/filters/subCategory/chocolates",                    
    },
    { 
      en_label: "Perfumes",   
      ar_label: "العطور",       
      icon: "/images/menu/icon (3).png", 
      to: "/filters/subCategory/perfumes",                  
    },
    { 
      en_label: "Cakes",
      ar_label: "الكيك", 
      to: "/filters/subCategory/cakes",  
      icon: "/images/menu/icon (2).png", 
    },
    { 
      en_label: "Skin Care",
      ar_label: "العناية بالبشرة", 
      to: "/filters/subCategory/skin-body-care",  
      icon: "/images/menu/icon (5).png", 
    },
  ];
  

  // Slide from left on LTR, from right on RTL
  const side = dir === "rtl" ? "right-0" : "left-0";
  const fromX = dir === "rtl" ? 360 : -360;

  return (
    <motion.aside
      className={`fixed top-20 md:top-48 lg:top-20 xl:top-48 ${side} z-50 w-[22rem] max-w-[92vw]`}
      role="dialog"
      aria-label={langClass ? "قائمة طعام" : "Menu"}
      initial={{ x: fromX, opacity: 0.8 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: fromX, opacity: 0.8 }}
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative rounded-br-xl rounded-tr-xl border border-primary bg-cyan-50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-6">
          <h2 className="text-3xl text-primary">{langClass ? "قائمة طعام" : "Menu"}</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full bg-white text-black shadow border border-primary/10 w-8 h-8"
            aria-label="Close"
          >
            <AiOutlineClose className="text-base" />
          </button>
        </div>

        {/* List */}
        <div className="flex h-full flex-col gap-3 overflow-y-auto px-4 pb-6">
          {items.map((it) => (
            <Link href={it.to} key={it.to} onClick={onLinkClick}>
              <div className="w-full rounded-xl border border-primary/30 bg-white/60 px-4 py-3 shadow-sm hover:bg-white transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-700">
                    <span className="text-[18px]">
                      <img src={it.icon} className="w-6 h-6" alt={it.en_label} />
                    </span>
                    <span className="font-medium text-lg">
                      {langClass ? it.ar_label : it.en_label}
                    </span>
                  </div>
                  {langClass ? (
                    <AiOutlineLeft className="text-primary" />
                  ) : (
                    <AiOutlineRight className="text-primary" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
