import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart Products/Cart";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTop";

const CartPage = () => {
  return (
    <>
      <header id="header">
        <Topbar />
        <Navbar />
      </header>

      <main id="main">
        <Cart />
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default CartPage;
