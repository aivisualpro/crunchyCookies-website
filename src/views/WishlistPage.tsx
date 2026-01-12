import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import WishlistGifts from "../components/Wishlist/WishlistGifts";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTop";

const WishlistPage = () => {
    return (
        <>
            <header id="header">
                <Topbar />
                <Navbar />
            </header>

            <main id="main">
                <WishlistGifts />
            </main>

            <Footer />
            <ScrollToTopButton />
        </>
    );
};

export default WishlistPage;
