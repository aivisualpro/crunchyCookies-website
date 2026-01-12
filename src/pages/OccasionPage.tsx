import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTop";
import { ClipLoader } from "react-spinners";
import GiftIdeasSection from "../components/Home Page/CategoriesSection";
import { useOccasions } from "../hooks/occasions/useOccasions";

const OccasionPage = () => {
  const { data: occasions, isLoading, isFetching } = useOccasions();

  return (
    <>
      <header id="header">
        <Topbar />
        <Navbar />
      </header>

      <main id="main">
        {isLoading || isFetching ? (
          <div className="h-[calc(100vh-220px)] flex justify-center items-center">
            <ClipLoader />
          </div>
        ) : (
          <GiftIdeasSection
            isOccasion={true}
            isPage={true}
            en_title="Explore Unique Gift Ideas"
            ar_title="استكشف أفكار هدايا فريدة"
            items={occasions?.rows}
          />
        )}
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default OccasionPage;
