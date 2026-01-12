// client/src/pages/HomePage.jsx
import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import FancySlick from "../components/HeroSlider";

import ProductsSection from "../components/Home Page/ProductsSection";
import GiftIdeasSection from "../components/Home Page/CategoriesSection";
import CategoriesSlider from "../components/Home Page/CategoriesSlider";
import ShowcaseProducts from "../components/Home Page/ShowcaseProducts";
import LatestCollection from "../components/Home Page/LatestCollection";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTop";

import { collections } from "../lib/homepageData";

// product hooks
import {
  useProductsInFlowerInVases,
  useTopSoldProducts,
  useProductsInChocolatesOrHandBouquets,
  useFeaturedProducts,
  useProductsInPerfumes,
  useProductsInPreservedFlowers,
  useProductsForFriendsOccasion,
} from "../hooks/products/useProducts";
import { useSubCategories } from "../hooks/categories/useSubCategories";
import { useOccasions } from "../hooks/occasions/useOccasions";
import { useBrands } from "../hooks/brands/useBrands";
import { useRecipeints } from "../hooks/resipeints/useRecipeint";

// spinner
import ClipLoader from "react-spinners/ClipLoader";

// 👇 generic pagination wrapper (correct import)
import usePaginatedSection from "../hooks/pagination/usePaginatedSelection";

// helpers
const SectionLoader = ({ height = 360, size = 44 }) => (
  <div
    style={{
      minHeight: height,
      display: "grid",
      placeItems: "center",
      padding: 24,
    }}
  >
    <ClipLoader size={size} />
  </div>
);

const HomePage = () => {
  // ----- Paginated product sections (4 at a time) -----
  const flowerVases = usePaginatedSection(useProductsInFlowerInVases);
  const chocoOrBouq = usePaginatedSection(
    useProductsInChocolatesOrHandBouquets
  );
  const featured = usePaginatedSection(useFeaturedProducts);
  const friendsOcc = usePaginatedSection(useProductsForFriendsOccasion);
  const perfumes = usePaginatedSection(useProductsInPerfumes);
  const preserved = usePaginatedSection(useProductsInPreservedFlowers);

  // Top sold as a showcase (paginated as well)
  const topSold = usePaginatedSection(useTopSoldProducts);

  // ----- Non-paginated bits (lists/metadata) -----
  const {
    data: subCategories,
    isLoading: subCatsLoading,
    isFetching: subCatsFetching,
  } = useSubCategories();

  const {
    data: occasions,
    isLoading: occLoading,
    isFetching: occFetching,
  } = useOccasions();

  const {
    data: brandsData,
    isLoading: brandsLoading,
    isFetching: brandsFetching,
  } = useBrands();

  const {
    data: recipientsData,
    isLoading: recLoading,
    isFetching: recFetching,
  } = useRecipeints();

  return (
    <>
      <header id="header">
        <Topbar />
        <Navbar />
      </header>

      <main id="main">
        <FancySlick />

        {/* Flowers Beyond Ordinary */}
        {flowerVases.isInitialLoading ? (
          <SectionLoader />
        ) : (
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

        {/* Explore Unique Gift Ideas (sub-categories) */}
        {subCatsLoading || subCatsFetching ? (
          <SectionLoader height={280} />
        ) : (
          <GiftIdeasSection
            isCategories={true}
            en_title="Explore Unique Gift Ideas"
            ar_title="استكشف أفكار هدايا فريدة"
            link="/categories"
            items={subCategories?.rows?.slice(0, 12)}
          />
        )}

        {/* Gifts For Every Moment (occasions slider) */}
        {occLoading || occFetching ? (
          <SectionLoader height={320} />
        ) : (
          <CategoriesSlider
            isOccation={true}
            en_title="Gifts For Every Moment"
            ar_title="هدايا لكل لحظة"
            items={occasions?.rows}
          />
        )}

        {/* Best Sellers (Top sold) */}
        {topSold.isInitialLoading ? (
          <SectionLoader />
        ) : (
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

        {/* House Of Delights */}
        {chocoOrBouq.isInitialLoading ? (
          <SectionLoader />
        ) : (
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

        {/* Simply Timeless (featured) */}
        {featured.isInitialLoading ? (
          <SectionLoader />
        ) : (
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

        {/* Latest & Loveliest (friends / recipients) */}
        {friendsOcc.isInitialLoading ? (
          <SectionLoader />
        ) : (
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

        {/* Perfumes */}
        {perfumes.isInitialLoading ? (
          <SectionLoader />
        ) : (
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

        {/* Preserved Flowers */}
        {preserved.isInitialLoading ? (
          <SectionLoader />
        ) : (
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

        {/* Static collections */}
        <LatestCollection
          collections={collections}
          en_title="Discover New Ideas"
          ar_title="اكتشف أفكارًا جديدة"
        />

        {/* Brands (static section style) */}
        {brandsLoading || brandsFetching ? (
          <SectionLoader height={280} />
        ) : (
          <GiftIdeasSection
            en_title="Brands You'll Love"
            link="/brands"
            ar_title="ماركات ستعجبك"
            items={brandsData?.rows}
          />
        )}

        {/* Recipients */}
        {recLoading || recFetching ? (
          <SectionLoader height={320} />
        ) : (
          <CategoriesSlider
            className="bg-[#F0E9E0] scale-[.95]"
            en_title="Gifts For Everyone"
            ar_title="هدايا للجميع"
            items={recipientsData?.rows}
          />
        )}
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default HomePage;
