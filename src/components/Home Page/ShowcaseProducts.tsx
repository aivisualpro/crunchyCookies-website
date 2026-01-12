// BestSellersSection.js (ShowcaseProducts)
import React, { useEffect, useMemo, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import Button from "../Button";
import { useTranslation } from "react-i18next";
import { FaHeart } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getWishlistByUser } from "../../api/wishlist";
import { useAddWishlist, useDeleteWishlist } from "../../hooks/wishlist/useWishlistMutation";

import ClipLoader from "react-spinners/ClipLoader";

interface ShowcaseProps {
  products: any[];
  en_title: string;
  ar_title: string;
  footerButton?: {
    visible: boolean;
    loading?: boolean;
    onClick?: () => void;
    label?: string;
  };
}

const ShowcaseProducts: React.FC<ShowcaseProps> = ({ products, en_title, ar_title, footerButton }) => {
  const { i18n } = useTranslation();
  const langClass = i18n.language === "ar" ? "ar" : "en";

  // logged-in user
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    try {
      const item = localStorage.getItem("user");
      if (item) {
        const stored = JSON.parse(item);
        if (stored?.user) setUser(stored.user);
      }
    } catch {}
  }, []);
  const userId = user?._id;

  // toast
  const [toastMsg, setToastMsg] = useState("");
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 1800);
  };

  // fetch wishlist for current user
  const { data: wishlistRes } = useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => getWishlistByUser(userId || ""),
    enabled: !!userId,
  });
  const wishlistItems = wishlistRes?.data || [];

  // mutation hooks
  const { mutateAsync: addWishlist, isPending: addPending } = useAddWishlist(userId || "");
  const { mutateAsync: deleteWishlist, isPending: delPending } = useDeleteWishlist(userId || "");

  // helper: is this product liked?
  const isProductLiked = (prodId: string) =>
    wishlistItems.some((w: any) => String(w?.product?._id) === String(prodId));

  // toggle handler
  const handleToggleWishlist = async (prod: any) => {
    if (!userId) {
      showToast(langClass === "ar" ? "الرجاء تسجيل الدخول لقائمة الرغبات" : "Please login to use wishlist");
      return;
    }
    try {
      if (isProductLiked(prod?._id)) {
        await deleteWishlist({ user: userId, product: prod?._id });
        showToast(langClass === "ar" ? "تمت الإزالة من المفضلة" : "Removed from wishlist");
      } else {
        await addWishlist({ user: userId, product: prod?._id });
        showToast(langClass === "ar" ? "أضيفت إلى المفضلة" : "Added to wishlist");
      }
    } catch {
      showToast(langClass === "ar" ? "حدث خطأ، حاول مجددًا" : "Something went wrong");
    }
  };

  return (
    <section className="py-10 px-4">
      {/* bottom toast */}
      {toastMsg && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-full shadow-lg z-50">
          {toastMsg}
        </div>
      )}

      <div className="custom-container relative">
        <div className="flex md:flex-row flex-col items-center justify-between mb-10">
          <h2 className="text-center text-[1.3rem] md:text-[1.5rem] lg:text-[1.8rem] xl:text-[2.5rem] tracking-wide text-primary">
            {langClass === "ar" ? ar_title : en_title}
          </h2>
          {/* <Button
            label={`${langClass === "ar" ? "شاهد المزيد" : "See more"}`}
            href="/filters/chocolate"
          /> */}
        </div>

        <div className="md:block hidden absolute bottom-[-7%] left-0 w-full bg-[#0fb5bb25] rounded-[25px] md:h-[500px] lg:h-[200px] xl:h-[250px] border-[1px] border-primary"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:px-0 xl:px-2 2xl:px-6">
          {products.map((product, idx) => {
            const liked = isProductLiked(product?._id);
            const titleEn = product?.title || product?.en_title || "";
            const titleAr = product?.ar_title || "";
            return (
              <div key={product?._id || product?.id || idx} className="relative">
                <img
                  src={product?.featuredImage}
                  alt={langClass === "ar" ? titleAr || titleEn : titleEn || titleAr}
                  className="w-full object-cover lg:h-[325px] 2xl:h-[400px] rounded-[35px]"
                />

                <div className="absolute w-full h-full top-0 left-0 bg-black/30 rounded-[35px]"></div>

                <div className="absolute top-[5%] right-[5%]">
                  <button
                    className="bg-white p-2 rounded-full disabled:opacity-60"
                    onClick={() => handleToggleWishlist(product)}
                    disabled={addPending || delPending}
                    aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {liked ? (
                      <FaHeart size={20} className="text-primary" />
                    ) : (
                      <FiHeart size={20} className="text-primary" />
                    )}
                  </button>
                </div>

                <div className="absolute bottom-0 w-full p-4 flex items-center justify-between">
                  <div>
                    <h5 className="text-lg text-white font-medium">
                      {langClass === "ar" ? titleAr || titleEn : titleEn || titleAr}
                    </h5>
                    {/* If you have counts localized, show them; otherwise omit */}
                    {product?.en_count || product?.ar_count ? (
                      <h6 className="text-lg text-white font-medium">
                        {langClass === "ar" ? product?.ar_count : product?.en_count}
                      </h6>
                    ) : null}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <Link
                      href={`/gift-detail/${product?._id}`}
                      className="bg-primary hover:bg-primary/70 rounded-full p-2"
                    >
                      {langClass === "ar" ? (
                        <IoIosArrowBack size={28} className="text-white" />
                      ) : (
                        <IoIosArrowForward size={28} className="text-white" />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {footerButton?.visible && (
          <div className="flex flex-col items-center justify-center mt-8 gap-3">
            <Button
              onClick={footerButton.onClick}
              label={
                footerButton.loading
                  ? langClass === "ar"
                    ? "جاري التحميل..."
                    : "Loading..."
                  : footerButton.label || (langClass === "ar" ? "تحميل المزيد" : "Load more")
              }
              disabled={footerButton.loading}
            />
          </div>
        )}
        <div className="text-center mt-4">
          <ClipLoader size={30} color="#000" loading={footerButton?.loading} />
        </div>
      </div>
    </section>
  );
};

export default ShowcaseProducts;
