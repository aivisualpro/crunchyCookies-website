// client/src/pages/GiftDetail/FrequentlyBuyGifts.jsx
import React, { useMemo, useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import ClipLoader from "react-spinners/ClipLoader";

import { useCartByUser } from "../../hooks/cart/useCart";
import {
  useAddBundleToCart,
  useRemoveItemsFromCart,
} from "../../hooks/cart/useCartMutation";

const FrequentlyBuyGifts = ({ data, product, userId, onToast }) => {
  const { i18n } = useTranslation();
  const langAr = i18n.language === "ar";

  // fetch cart to know if both items are already there
  const { data: cartRes, isLoading: loadingCart } = useCartByUser(userId);
  const cartItems = useMemo(
    () =>
      cartRes?.data?.items && Array.isArray(cartRes.data.items)
        ? cartRes.data.items
        : [],
    [cartRes]
  );

  const hasInCart = (pid) =>
    cartItems.some(
      (it) => String(it?.product?._id ?? it?.product) === String(pid)
    );

  const bothInCart = (suggested) =>
    hasInCart(data?._id) && hasInCart(suggested?._id);

  const { mutateAsync: addBundle } = useAddBundleToCart();
  const { mutateAsync: removeBoth } = useRemoveItemsFromCart();

  // 🔹 per-card busy state: { [suggestedId]: 'add' | 'remove' }
  const [busy, setBusy] = useState({});

  const setBusyFor = (id, mode) =>
    setBusy((s) => ({ ...s, [id]: mode }));
  const clearBusyFor = (id) =>
    setBusy((s) => {
      const next = { ...s };
      delete next[id];
      return next;
    });

  const handleAddBoth = async (suggested) => {
    if (!userId) return;
    const sid = String(suggested._id);
    try {
      setBusyFor(sid, "add");
      await addBundle({
        user: userId,
        items: [
          { product: data._id, qty: 1 },
          { product: suggested._id, qty: 1 },
        ],
      });
      onToast?.(langAr ? "تمت إضافة المنتجين إلى السلة" : "Both items added to cart");
    } catch (e) {
      onToast?.(langAr ? "تعذر الإضافة" : "Could not add");
    } finally {
      clearBusyFor(sid);
    }
  };

  const handleRemoveBoth = async (suggested) => {
    if (!userId) return;
    const sid = String(suggested._id);
    try {
      setBusyFor(sid, "remove");
      await removeBoth({
        user: userId,
        productIds: [data._id, suggested._id],
      });
      onToast?.(langAr ? "تمت إزالة المنتجين من السلة" : "Both items removed from cart");
    } catch (e) {
      onToast?.(langAr ? "تعذر الإزالة" : "Could not remove");
    } finally {
      clearBusyFor(sid);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 p-6">
      {product?.map((p, index) => {
        const total = Number(data?.price || 0) + Number(p?.price || 0);
        const totalText = isNaN(total) ? "" : total.toLocaleString();
        const alreadyBoth = bothInCart(p);

        const sid = String(p._id);
        const isAdding = busy[sid] === "add";
        const isRemoving = busy[sid] === "remove";
        const thisBtnDisabled =
          !userId || loadingCart || isAdding || isRemoving;

        return (
          <div
            key={index}
            className="p-4 rounded-lg border border-primary/30"
            style={{
              background:
                "linear-gradient(90deg, #11e7ff1f 0%, #e59eff1f 55%, #f6b4001f 100%)",
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="w-[45%]">
                <img
                  src={data?.featuredImage}
                  alt={data?.title}
                  className="w-full 2xl:h-32 lg:h-28 md:h-24 h-28 object-cover rounded-lg"
                />
                <h5 className={`text-black font-medium mt-3 ${langAr ? "text-[.8rem]" : "text-[.65rem]"}`}>
                  {langAr ? (data?.ar_title || "").slice(0, 30) : (data?.title || "").slice(0, 30)}...
                </h5>
              </div>
              <div className="w-[10%] grid place-items-center">
                <FaPlus size={20} />
              </div>
              <div className="w-[45%]">
                <img
                  src={p?.featuredImage}
                  alt={p?.title}
                  className="w-full 2xl:h-32 lg:h-28 md:h-24 h-28 object-cover rounded-lg"
                />
                <h5 className={`text-black font-medium mt-3 ${langAr ? "text-[.8rem]" : "text-[.65rem]"}`}>
                  {langAr ? (p?.ar_title || "").slice(0, 30) : (p?.title || "").slice(0, 30)}...
                </h5>
              </div>
            </div>

            <div className="mt-4">
              {alreadyBoth ? (
                <button
                  onClick={() => handleRemoveBoth(p)}
                  disabled={thisBtnDisabled}
                  className="flex items-center justify-center font-medium text-sm mt-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg w-full disabled:opacity-60 min-h-[40px]"
                >
                  {isRemoving ? (
                    <ClipLoader size={18} color="#fff" />
                  ) : (
                    <>
                      <IoBagHandleOutline className={`${langAr ? "ml-2" : "mr-2"}`} />
                      {langAr ? "إزالة المنتجين من السلة" : "Remove Both From Cart"}
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleAddBoth(p)}
                  disabled={thisBtnDisabled}
                  className="flex items-center justify-center font-medium text-sm mt-4 bg-primary hover:bg-primary/70 text-white p-2 rounded-lg w-full disabled:opacity-60 min-h-[40px]"
                >
                  {isAdding || loadingCart ? (
                    <ClipLoader size={18} color="#fff" />
                  ) : (
                    <>
                      <IoBagHandleOutline className={`${langAr ? "ml-2" : "mr-2"}`} />
                      {langAr ? "إضافة كلاهما إلى السلة" : "Add Both to Cart"}{" "}
                      {totalText ? `QAR ${totalText}` : ""}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FrequentlyBuyGifts;
