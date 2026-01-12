import React from "react";
import OrdersTab from "./OrderTab";
import OngoingOrdersCard from "./OngoingOrder";
import PreviousOrdersTable from "./PreviousOrder";
import { useTranslation } from "react-i18next";

export default function OrdersPanel({ ordersTab, setOrdersTab }) {

  const { i18n } = useTranslation();
  const langClass = i18n.language === "ar";

  return (
    <div className="space-y-6">
      <div className="md:flex items-center gap-3">
        <OrdersTab active={ordersTab === "ongoing"} className="md:mb-0 mb-4" onClick={() => setOrdersTab("ongoing")} label={`${langClass ? "الطلبات الجارية" : "Ongoing Orders"}`} count={1} />
        <OrdersTab active={ordersTab === "previous"} onClick={() => setOrdersTab("previous")} label={`${langClass ? "الطلبات السابقة" : "Previous Orders"}`} count={1} />
      </div>
      <hr className="border-cyan-100" />
      {ordersTab === "ongoing" ? <OngoingOrdersCard /> : <PreviousOrdersTable />}
    </div>
  );
}
