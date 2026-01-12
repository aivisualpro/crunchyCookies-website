// src/components/ProductCard.jsx
import React, { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useCartFlag } from "../context/CartContext";

import ToastNotification from "./ToastNotification";

// wishlist hooks
import { useWishlist } from "../hooks/wishlist/useWishlistQuery";
import {
  useAddWishlist,
  useDeleteWishlist,
} from "../hooks/wishlist/useWishlistMutation";

// cart hooks
import { useCartByUser } from "../hooks/cart/useCart";
import {
  useAddItemToCart,
  useRemoveItemFromCart,
} from "../hooks/cart/useCartMutation";

interface ProductCardProps {
  data?: any;
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data, product }) => {
  const { i18n } = useTranslation();
  const langClass = i18n.language === "ar" ? "ar" : "en";

  const { setUpdate } = useCartFlag();

  const [user, setUser] = useState<any>(null);

  // ---- toast state (reusable component) ----
  const [toastState, setToastState] = useState({
    open: false,
    type: "success", // "success" | "error"
    message: "",
  });

  const showToast = (message: string, type: string = "success") => {
    setToastState({ open: true, type, message });
  };

  // Load logged-in user from localStorage
  useEffect(() => {
    try {
      const storedStr = localStorage.getItem("user");
      const stored = storedStr ? JSON.parse(storedStr) : null;
      if (stored?.user) setUser(stored.user);
    } catch {}
  }, []);

  const userId = user?._id;

  /* --------------------------- Wishlist logic --------------------------- */
  const { data: wishlistRes } = useWishlist(userId);
  const wishlistItems = wishlistRes?.data || [];

  const isLiked = useMemo(
    () =>
      wishlistItems.some(
        (w: any) => String(w?.product?._id) === String(product?._id)
      ),
    [wishlistItems, product?._id]
  );

  const { mutateAsync: addWishlist, isPending: addPending } =
    useAddWishlist(userId);
  const { mutateAsync: deleteWishlist, isPending: delPending } =
    useDeleteWishlist(userId);

  const handleToggleWishlist = async () => {
    if (!userId) {
      showToast(
        langClass === "ar"
          ? "الرجاء تسجيل الدخول لقائمة الرغبات"
          : "Please login to use wishlist",
        "error"
      );
      return;
    }
    try {
      if (isLiked) {
        await deleteWishlist({ user: userId, product: product?._id });
        setUpdate((u) => !u);
        showToast(
          langClass === "ar"
            ? "تمت الإزالة من المفضلة"
            : "Removed from wishlist",
          "success"
        );
      } else {
        await addWishlist({ user: userId, product: product?._id });
        setUpdate((u) => !u);
        showToast(
          langClass === "ar" ? "أضيفت إلى المفضلة" : "Added to wishlist",
          "success"
        );
      }
    } catch {
      showToast(
        langClass === "ar" ? "حدث خطأ، حاول مجددًا" : "Something went wrong",
        "error"
      );
    }
  };

  /* ----------------------------- Cart logic ---------------------------- */
  const {
    data: cartRes,
    isLoading: cartLoading,
    isFetching: cartFetching,
  } = useCartByUser(userId);

  const cartItems = useMemo(
    () =>
      cartRes?.data?.items && Array.isArray(cartRes.data.items)
        ? cartRes.data.items
        : [],
    [cartRes]
  );

  const inCart = useMemo(() => {
    const id = String(product?._id);
    return cartItems.some(
      (it: any) => String(it?.product?._id ?? it?.product) === id
    );
  }, [cartItems, product?._id]);

  const { mutateAsync: addItemToCart, isPending: addItemPending } =
    useAddItemToCart();
  const { mutateAsync: removeItemFromCart, isPending: removeItemPending } =
    useRemoveItemFromCart();

  const handleAddToCart = async () => {
    if (!userId) {
      showToast(
        langClass === "ar"
          ? "الرجاء تسجيل الدخول لإضافة إلى السلة"
          : "Please login to add to cart",
        "error"
      );
      return;
    }
    try {
      await addItemToCart({ user: userId, product: product._id, qty: 1 });
      setUpdate((u) => !u);
      showToast(
        langClass === "ar" ? "أُضيفت إلى السلة" : "Added to cart",
        "success"
      );
    } catch {
      showToast(
        langClass === "ar"
          ? "تعذر الإضافة، حاول مرة أخرى"
          : "Could not add, try again",
        "error"
      );
    }
  };

  const handleRemoveFromCart = async () => {
    if (!userId) return;
    try {
      await removeItemFromCart({ user: userId, productId: product._id });
      setUpdate((u) => !u);
      showToast(
        langClass === "ar" ? "أُزيلت من السلة" : "Removed from cart",
        "success"
      );
    } catch {
      showToast(
        langClass === "ar"
          ? "تعذر الإزالة، حاول مرة أخرى"
          : "Could not remove, try again",
        "error"
      );
    }
  };

  const resolvingCart = cartLoading || cartFetching;
  const btnDisabled = resolvingCart || addItemPending || removeItemPending;

  const safeTitleEn = product?.title || "";
  const safeTitleAr = product?.ar_title || "";

  // helper (robust to ids or populated objects)
  const hasEnoughTypeStock = useMemo(() => {
    const carry = Number(product?.totalPieceCarry || 0);

    if (!Array.isArray(product?.type) || product.type.length === 0) return true;

    return product.type.some((t: any) => {
      const rem = Number(
        (t && typeof t === "object" ? t.remainingStock : null) ?? Infinity
      );
      return rem > carry;
    });
  }, [product?.type, product?.totalPieceCarry]);

  const isOutOfStock =
    (data?.stockStatus || product?.stockStatus) === "out_of_stock";

  const canAddToCart = !isOutOfStock && hasEnoughTypeStock;

  /* -------------------------- Pricing helpers -------------------------- */
  const basePrice = Number(product?.price || 0);
  const discountedPrice = Number(
    product?.priceAfterDiscount != null
      ? product.priceAfterDiscount
      : Math.max(0, basePrice - Number(product?.discount || 0))
  );

  // kya actually discount hai? (numeric level pe)
  const hasNumericDiscount =
    Number.isFinite(basePrice) &&
    Number.isFinite(discountedPrice) &&
    basePrice > 0 &&
    discountedPrice >= 0 &&
    discountedPrice < basePrice;

  // percentage calculate karo (sirf jab numeric discount ho)
  const discountPercent = hasNumericDiscount
    ? Math.round(((basePrice - discountedPrice) / basePrice) * 100)
    : 0;

  // UI sirf tab dikhana jab % >= 1 ho
  const showDiscountUi = hasNumericDiscount && discountPercent > 0;

  const discountLabel =
    langClass === "ar" ? `${discountPercent}% خصم` : `${discountPercent}% OFF`;

  return (
    <>
      {/* Global toast for this card */}
      <ToastNotification
        open={toastState.open}
        type={toastState.type}
        title={toastState.type === "success" ? "Success" : "Oops!"}
        message={toastState.message}
        duration={3000}
        onClose={() =>
          setToastState((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />

      <div className="relative bg-primary_light_mode rounded-[35px] border-[1px] border-primary/30 flex flex-col items-center transition-shadow duration-300 p-4 overflow-hidden">
        {/* Discount badge (ribbon style) */}
        {showDiscountUi && (
          <div className="absolute top-4 -left-12 z-10">
            <div className="bg-[#ff4b5c] text-white text-[11px] font-semibold px-16 py-1.5 -rotate-[45deg] shadow-md tracking-wide">
              {discountLabel}
            </div>
          </div>
        )}

        <Link href={`/gift-detail/${product?._id}`} className="w-full">
          <img
            src={product?.featuredImage}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-[35px] mb-3"
          />
        </Link>

        {/* wishlist button */}
        <div className="absolute top-[calc(100%-92%)] right-[calc(100%-92%)]">
          <button
            className="bg-white p-2 rounded-full disabled:opacity-60"
            onClick={handleToggleWishlist}
            disabled={addPending || delPending}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isLiked ? (
              <FaHeart size={20} className="text-primary" />
            ) : (
              <FiHeart size={20} className="text-primary" />
            )}
          </button>
        </div>

        <div className="card-content w-full">
          {/* Price row with original + discounted */}
          <div className="flex items-baseline gap-2">
            <p className="text-primary font-semibold text-xl flex items-center">
              QAR{" "}
              <span className="text-2xl ps-1">
                {(hasNumericDiscount ? discountedPrice : basePrice).toLocaleString()}
              </span>
            </p>

            {showDiscountUi && (
              <span className="text-xs text-slate-500 line-through">
                QAR {basePrice.toLocaleString()}
              </span>
            )}
          </div>

          <h5
            className={`text-black ${
              langClass === "ar" ? "text-[18px]" : "text-[14px]"
            } mt-1`}
          >
            {langClass === "en"
              ? safeTitleEn.slice(0, 30)
              : safeTitleAr.slice(0, 25)}{" "}
            {safeTitleEn.length > 30 || safeTitleAr.length > 30 ? "..." : ""}
          </h5>

          <div className="card-content-btn flex justify-end">
            {resolvingCart ? (
              <Button
                disabled
                label={langClass === "ar" ? "جاري التحقق..." : "Checking..."}
                isBgColor={true}
              />
            ) : canAddToCart ? (
              inCart ? (
                <Button
                  onClick={handleRemoveFromCart}
                  disabled={btnDisabled}
                  label={
                    langClass === "ar"
                      ? "إزالة من السلة"
                      : "Remove From Cart"
                  }
                  bgColor="bg-red-500 hover:bg-red-600"
                  isBgColor={true}
                />
              ) : (
                <Button
                  onClick={handleAddToCart}
                  disabled={btnDisabled}
                  label={langClass === "ar" ? "أضف إلى السلة" : "Add to cart"}
                />
              )
            ) : (
              <Button
                disabled
                label={langClass === "ar" ? "إنتهى من المخزن" : "Out Of Stock"}
                isBgColor={true}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;