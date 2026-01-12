import React from "react";
import ProductCard from "../ProductCard";
import { MdOutlineArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useWishlist } from "../../hooks/wishlist/useWishlistQuery";

const WishlistGifts = ({ isEmbedded = false }: { isEmbedded?: boolean }) => {
  const { i18n } = useTranslation();
  const langClass = i18n.language === "ar";

  const params = useParams();
  const id = params?.id as string;
  const { data: wishlist } = useWishlist(id);

  const items = wishlist?.data || [];

  return (
    <section id="wishlist" className={isEmbedded ? "pb-4" : "pt-4 pb-10"}>
      <div className={isEmbedded ? "" : "custom-container"}>
        {!isEmbedded && (
          <>
            <Link href={"/"}>
              <div className="bg-[#0fb5bb25] p-2 inline-block rounded-full mb-4">
                {langClass ? (
                  <MdArrowForwardIos
                    size={24}
                    className="cursor-pointer text-primary"
                  />
                ) : (
                  <MdOutlineArrowBackIos
                    size={24}
                    className="cursor-pointer text-primary"
                  />
                )}
              </div>
            </Link>

            <h2 className="text-[2rem] lg:text-[2.5rem] text-primary">
              {langClass ? "المفضلة" : "Favourites"}
            </h2>
          </>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${isEmbedded ? "" : "mt-10"}`}>
          {items.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-16">
              <p className="text-gray-600 text-sm md:text-base">
                {langClass
                  ? "لا توجد منتجات في قائمة المفضلة."
                  : "No products in wishlist."}
            </p>
            </div>
          ) : (
            items.map((item: any) => (
              <ProductCard key={item.id || item._id} product={item?.product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default WishlistGifts;
