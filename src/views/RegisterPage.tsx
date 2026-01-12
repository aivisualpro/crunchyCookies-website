import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTop";
import Register from "../components/Auth/Register";

const RegisterPage = () => {
  return (
    <>
      <header id="header">
        <Topbar />
        <Navbar />
      </header>

      <main id="main">
        <Register />
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default RegisterPage;
