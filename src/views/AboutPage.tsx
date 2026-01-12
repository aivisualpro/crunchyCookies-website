import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutBanner from "../components/About Us/AboutBanner";
import HowToPlaceOrder from "../components/About Us/HowToPlaceOrder";
import { aboutCollections } from "../lib/about";
import LatestCollection from "../components/Home Page/LatestCollection";
import Contact from "../components/Contact Us/Contact";
import Clients from "../components/About Us/Clients";
import ScrollToTopButton from "../components/ScrollToTop";

const AboutPage = () => {
  return (
    <>
      <header id="header">
        <Topbar />
        <Navbar />
      </header>

      <main id="main">
        <AboutBanner />
        <HowToPlaceOrder />
        <LatestCollection
          collections={aboutCollections}
          en_title="Our Catalog"
          ar_title="الكتالوج الخاص بنا"
        />
        <Contact />
        <Clients />
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default AboutPage;
