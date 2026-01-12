import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTop";
import PartnerWithUs from "../components/PartnerWithUs";

const PartnerWithUsPage = () => {
  return (
    <>
      <header id="header">
        <Topbar />
        <Navbar />
      </header>

      <main id="main">
        <PartnerWithUs />
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default PartnerWithUsPage;
