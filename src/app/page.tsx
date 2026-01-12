'use client';

import React from "react";
import FancySlick from "@/components/HeroSlider";
import ProductsSection from "@/components/Home Page/ProductsSection";
import GiftIdeasSection from "@/components/Home Page/CategoriesSection";
import CategoriesSlider from "@/components/Home Page/CategoriesSlider";
import ShowcaseProducts from "@/components/Home Page/ShowcaseProducts";
import LatestCollection from "@/components/Home Page/LatestCollection";
import { collections } from "@/lib/homepageData";

import {
  useProductsInFlowerInVases,
  useTopSoldProducts,
  useProductsInChocolatesOrHandBouquets,
  useFeaturedProducts,
  useProductsInPerfumes,
  useProductsInPreservedFlowers,
  useProductsForFriendsOccasion,
} from "@/hooks/products/useProducts";
import { useSubCategories } from "@/hooks/categories/useSubCategories";
import { useOccasions } from "@/hooks/occasions/useOccasions";
import { useBrands } from "@/hooks/brands/useBrands";
import { useRecipeints } from "@/hooks/resipeints/useRecipeint";

import ClipLoader from "react-spinners/ClipLoader";
import usePaginatedSection from "@/hooks/pagination/usePaginatedSelection";

const SectionLoader = ({ height = 360, size = 44 }: { height?: number, size?: number }) => (
  <div
    style={{
      minHeight: height,
      display: "grid",
      placeItems: "center",
      padding: 24,
    }}
  >
    <ClipLoader size={size} color="#0FB4BB" />
  </div>
);

export default function HomePage() {
  const flowerVases = usePaginatedSection(useProductsInFlowerInVases);
  const chocoOrBouq = usePaginatedSection(useProductsInChocolatesOrHandBouquets);
  const featured = usePaginatedSection(useFeaturedProducts);
  const friendsOcc = usePaginatedSection(useProductsForFriendsOccasion);
  const perfumes = usePaginatedSection(useProductsInPerfumes);
  const preserved = usePaginatedSection(useProductsInPreservedFlowers);
  const topSold = usePaginatedSection(useTopSoldProducts);

  const { data: subCategories, isLoading: subCatsLoading } = useSubCategories();
  const { data: occasions, isLoading: occLoading } = useOccasions();
  const { data: brandsData, isLoading: brandsLoading } = useBrands();
  const { data: recipientsData, isLoading: recLoading } = useRecipeints();

  return (
    <>
      <FancySlick />

      {flowerVases.isInitialLoading ? <SectionLoader /> : (
        <ProductsSection
          en_title="Flowers Beyond Ordinary"
          ar_title="زهور تتجاوز العادي"
          products={flowerVases.items}
          footerButton={{
            visible: flowerVases.hasNext,
            loading: flowerVases.isFetching,
            onClick: flowerVases.loadMore,
            label: "Load more",
          }}
        />
      )}

      {subCatsLoading ? <SectionLoader height={280} /> : (
        <GiftIdeasSection
          isCategories={true}
          en_title="Explore Unique Gift Ideas"
          ar_title="استكشف أفكار هدايا فريدة"
          link="/categories"
          items={subCategories?.rows?.slice(0, 12)}
        />
      )}

      {occLoading ? <SectionLoader height={320} /> : (
        <CategoriesSlider
          isOccation={true}
          en_title="Gifts For Every Moment"
          ar_title="هدايا لكل لحظة"
          items={occasions?.rows}
        />
      )}

      {topSold.isInitialLoading ? <SectionLoader /> : (
        <ShowcaseProducts
          products={topSold.items}
          en_title="Best Sellers"
          ar_title="الأكثر مبيعًا"
          footerButton={{
            visible: topSold.hasNext,
            loading: topSold.isFetching,
            onClick: topSold.loadMore,
            label: "Load more",
          }}
        />
      )}

      {chocoOrBouq.isInitialLoading ? <SectionLoader /> : (
        <ProductsSection
          en_title="House Of Delights"
          ar_title="بيت المسرات"
          products={chocoOrBouq.items}
          footerButton={{
            visible: chocoOrBouq.hasNext,
            loading: chocoOrBouq.isFetching,
            onClick: chocoOrBouq.loadMore,
            label: "Load more",
          }}
        />
      )}

      {featured.isInitialLoading ? <SectionLoader /> : (
        <ProductsSection
          en_title="Simply Timeless"
          ar_title="ببساطة خالد"
          products={featured.items}
          footerButton={{
            visible: featured.hasNext,
            loading: featured.isFetching,
            onClick: featured.loadMore,
            label: "Load more",
          }}
        />
      )}

      {friendsOcc.isInitialLoading ? <SectionLoader /> : (
        <ProductsSection
          en_title="Latest & Loveliest"
          ar_title="الأحدث والأجمل"
          isRecipient={true}
          products={friendsOcc.items}
          footerButton={{
            visible: friendsOcc.hasNext,
            loading: friendsOcc.isFetching,
            onClick: friendsOcc.loadMore,
            label: "Load more",
          }}
        />
      )}

      {perfumes.isInitialLoading ? <SectionLoader /> : (
        <ProductsSection
          en_title="Perfumes For Every Personality"
          ar_title="عطور لكل شخصية"
          products={perfumes.items}
          footerButton={{
            visible: perfumes.hasNext,
            loading: perfumes.isFetching,
            onClick: perfumes.loadMore,
            label: "Load more",
          }}
        />
      )}

      {preserved.isInitialLoading ? <SectionLoader /> : (
        <ProductsSection
          en_title="Forever Beautiful"
          ar_title="جميلة إلى الأبد"
          products={preserved.items}
          footerButton={{
            visible: preserved.hasNext,
            loading: preserved.isFetching,
            onClick: preserved.loadMore,
            label: "Load more",
          }}
        />
      )}

      <LatestCollection
        collections={collections}
        en_title="Discover New Ideas"
        ar_title="اكتشف أفكارًا جديدة"
      />

      {brandsLoading ? <SectionLoader height={280} /> : (
        <GiftIdeasSection
          en_title="Brands You'll Love"
          link="/brands"
          ar_title="ماركات ستعجبك"
          items={brandsData?.rows}
        />
      )}

      {recLoading ? <SectionLoader height={320} /> : (
        <CategoriesSlider
          className="bg-[#F0E9E0] scale-[.95]"
          en_title="Gifts For Everyone"
          ar_title="هدايا للجميع"
          items={recipientsData?.rows}
        />
      )}
    </>
  );
}
