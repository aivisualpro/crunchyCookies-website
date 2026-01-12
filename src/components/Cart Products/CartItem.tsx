
import React from 'react';
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

const CURRENCY = (n: number | string) => `QAR ${Number(n || 0).toLocaleString()}`;

interface CartItemProps {
  item: any;
  langClass: boolean;
  toggleSelect: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  qtyUpdating: boolean;
  removing: boolean;
  allocations: any[]; // The allocations for this specific item
  // Add props needed for allocation UI if you move that logic here too
}

export default function CartItem({
  item,
  langClass,
  toggleSelect,
  changeQty,
  removeItem,
  qtyUpdating,
  removing,
  allocations
}: CartItemProps) {
  
  return (
    <article
      className="relative flex flex-col gap-4 p-3 pl-12 rounded-2xl border border-primary/20 shadow-sm"
      style={{
        background:
          "linear-gradient(90deg, #11e7ff1f 0%, #e59eff1f 55%, #f6b4001f 100%)",
      }}
    >
      {/* checkbox */}
      <button
        aria-label="select"
        onClick={() => toggleSelect(item.id)}
        style={{
          direction: langClass ? "rtl" : "ltr",
        }}
        className={`absolute left-4 top-6 h-5 w-5 rounded border-2 ${
          item.selected ? "border-primary" : "border-primary/30"
        } grid place-items-center bg-white transition focus:outline-none`}
      >
        <span
          className={`h-3 w-3 rounded-sm ${
            item.selected ? "bg-primary" : "bg-transparent"
          } transition`}
        />
      </button>

      <div className="flex items-center gap-4">
        {/* image */}
        <img
          src={item.image}
          alt={langClass ? item.ar_title : item.en_title}
          className="h-16 w-20 object-cover rounded-xl ring-1 ring-primary/10"
        />

        {/* content */}
        <div className="flex-1">
          <h5 className="text-black md:text-base text-sm font-medium">
            {langClass ? item.ar_title : item.en_title}
          </h5>
          <div className="text-primary font-semibold text-sm mt-2">
            {CURRENCY(item.price)}
          </div>
        </div>

        {/* qty + delete */}
        <div className="flex md:flex-row flex-col items-center">
          <div className="flex md:flex-row flex-col items-center">
            <button
              onClick={() => changeQty(item.id, -1)}
              disabled={qtyUpdating || item.qty <= 1}
              className="h-6 w-6 md:h-6 md:w-6 rounded-full bg-[#fff] border border-slate-200 grid place-items-center hover:bg-[#eee] disabled:opacity-60"
            >
              <FiMinus className="text-black" />
            </button>

            <div className="md:w-8 my-1 md:my-0 font-semibold text-slate-700 text-center">
              {item.qty}
            </div>

            <button
              onClick={() => changeQty(item.id, +1)}
              disabled={
                qtyUpdating ||
                (typeof item.remainingStocks === "number" &&
                  item.remainingStocks > 0 &&
                  item.qty >= item.remainingStocks)
              }
              className="h-6 w-6 md:h-6 md:w-6 rounded-full bg-[#fff] border border-slate-200 grid place-items-center hover:bg-[#eee] disabled:opacity-60"
            >
              <FiPlus className="text-black" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            disabled={removing}
            className="text-rose-400 hover:text-rose-500 p-2 disabled:opacity-60"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {item.remainingStocks > 0 && item.qty >= item.remainingStocks && (
        <p className="text-[12px] text-rose-500 mt-1">
          Max available stock reached.
        </p>
      )}

      {/* Allocation UI could go here or be passed in children if complex */}
    </article>
  );
}
