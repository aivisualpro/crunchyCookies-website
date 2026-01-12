import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDashboard from "../components/Profile/Profile";
import ScrollToTopButton from "../components/ScrollToTop";
import { useParams } from "next/navigation";

const ProfilePage = () => {

  const params = useParams();
  const currentTab = params?.currentTab as string | undefined;

  return (
    <>
      <header id="header">
        <Topbar />
        <Navbar />
      </header>

      <main id="main">
        <ProfileDashboard currentTab={currentTab}/>
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default ProfilePage;
