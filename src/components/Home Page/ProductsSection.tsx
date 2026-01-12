// client/src/components/Home Page/ProductsSection.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import Button from "../Button";
import { useTranslation } from "react-i18next";
import ClipLoader from "react-spinners/ClipLoader"; // ✅ default import

interface ProductsSectionProps {
  isRecipient?: boolean;
  en_title: string;
  ar_title: string;
  products: any[];
  footerButton?: {
    visible: boolean;
    onClick?: () => void;
    loading?: boolean;
    label?: string;
  };
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  isRecipient = false,
  en_title,
  ar_title,
  products,
  footerButton,
}) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const [categories, setCategories] = useState("");

  useEffect(() => {
    if (!products || products.length === 0) {
      setCategories("");
      return;
    }

    const first = products[0];
    const cats = first?.categories;

    const map = isRecipient
      ? "friends"
      : cats?.map((category: any) => category?.slug).join(",") || "";

    setCategories(map);
  }, [products, isRecipient]);



  return (
    <section className="py-10">
      <div className="custom-container relative">
        {/* Section Title */}
        <div className="flex md:flex-row flex-col items-center justify-between mb-10">
          <h2 className="text-center text-[1.3rem] md:text-[1.5rem] lg:text-[1.8rem] xl:text-[2.5rem] tracking-wide text-primary">
            {isAr ? ar_title : en_title}
          </h2>

          {/* See more link */}
          {categories && (
            <Button
              href={`/filters/${
                isRecipient ? "recipient" : "subCategory"
              }/${categories}`}
              label={isAr ? "شاهد المزيد" : "See more"}
            />
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Load More + Spinner */}
        {footerButton?.visible && (
          <div className="flex flex-col items-center justify-center mt-8 gap-3">
            <Button
              onClick={footerButton.onClick}
              label={
                footerButton.loading
                  ? isAr
                    ? "جاري التحميل..."
                    : "Loading..."
                  : footerButton.label || (isAr ? "تحميل المزيد" : "Load more")
              }
              disabled={footerButton.loading}
            />

            {/* Spinner — always mounted, visibility via loading prop */}
          </div>
        )}
        <div className="text-center mt-4">
          <ClipLoader size={30} color="#000" loading={footerButton?.loading} />
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
