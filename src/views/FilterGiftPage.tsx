import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import FilterGifts from "../components/Filter Products/FilterGifts";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTop";

const FilterGiftPage = () => {
    return (
        <>
            <header id="header">
                <Topbar />
                <Navbar />
            </header>

            <main id="main">
                <FilterGifts />
            </main>

            <Footer />
            <ScrollToTopButton />
        </>
    );
};

export default FilterGiftPage;
