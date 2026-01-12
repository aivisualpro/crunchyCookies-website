import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProfilePanel from "./ProfilePanal";
import OrdersPanel from "./OrderPanal";
import Placeholder from "./Placeholder";
import { IoIosArrowBack } from "react-icons/io";
import MyAddresses from "./MyAddresses";
import EditProfile from "./EditProfile";
import EditAddress from "./EditAddress";
import Link from "next/link";
import { MdArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Transactions from "./Transactions";
import WishlistGifts from "../Wishlist/WishlistGifts";

export default function ProfileDashboard({ currentTab = "profile" }) {
  const [tab, setTab] = useState(currentTab);
  const [ordersTab, setOrdersTab] = useState("ongoing");

  const { i18n } = useTranslation();
  const langClass = i18n.language === "ar";

  return (
    <section className="w-full py-4 min-h-screen">
      <div className="custom-container">
        <Link href={"/"}>
          <div className="bg-[#0fb5bb25] p-2 inline-block rounded-full">
            {langClass ? (
              <MdArrowForwardIos
                size={24}
                className="cursor-pointer text-primary"
              />
            ) : (
              <MdOutlineArrowBackIos
                size={24}
                className="cursor-pointer text-primary"
              />
            )}
          </div>
        </Link>
        <div className="my-4">
          <h1 className="text-3xl text-primary">{langClass ? "حساب تعريفي" : "Profile"}</h1>
        </div>

        <div className="mx-auto lg:flex gap-6 items-start my-10 ">
          {/* Sidebar */}
          <div className="lg:min-w-[30%] xl:min-w-[25%] 2xl:min-w-[20%] lg:mb-0 mb-4">
            <Sidebar tab={tab} setTab={setTab} />
          </div>

          {/* Main Panel */}
          <div className="lg:min-w-[70%] xl:min-w-[75%] 2xl:min-w-[80%]">
            {tab === "profile" && <ProfilePanel tab={tab} setTab={setTab} />}
            {tab === "orders" && (
              <OrdersPanel ordersTab={ordersTab} setOrdersTab={setOrdersTab} />
            )}
            {tab === "transactions" && (
              <Transactions />
            )}
            {tab === "wishlist" && <WishlistGifts isEmbedded={true} />}
            {tab === "edit" && <EditProfile tab={tab} setTab={setTab} />}
            {tab === "invoices" && (
              <Placeholder
                title={`${langClass ? "فواتيري" : "My Invoices"}`}
                subtitle={`${langClass ? "لا يوجد فواتير" : "No invoices to display."}`}
              />
            )}
            {tab === "addresses" && <MyAddresses tab={tab} setTab={setTab} />}
            {tab === "editAddress" && <EditAddress tab={tab} setTab={setTab} />}
          </div>
        </div>
      </div>
    </section>
  );
}
