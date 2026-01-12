import React from "react";
import AddressCard from "./AddressCard";
import { useTranslation } from "react-i18next";

const MyAddresses = ({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) => {

  const {i18n} = useTranslation();
  const langClass = i18n.language === "ar";

  const editAddress = () => {
    setTab("editAddress");
  }

  return (
    <div className="my-addresses">
      <h2 className="text-2xl mb-4 text-primary">{langClass ? "عناويني" : "My Addresses"}</h2>
      <AddressCard
        en_title="Office"
        en_address="Ava Johnson – Suite 402, Willow Tower, 15 Market Street, Downtown, Toronto, ON"
        ar_title="مكتب"
        ar_address="آفا جونسون - جناح 402، برج ويلو، 15 شارع ماركت، وسط المدينة، تورنتو، أونتاريو"
        onEdit={editAddress}
      />
      <AddressCard
        en_title="Home"
        en_address="Liam Carter – #78, Pinecrest Avenue, Sector 12, Sydney, NSW 2000"
        ar_title="بيت"
        ar_address="ليام كارتر - رقم 78، شارع باينكريست، القطاع 12، سيدني، نيو ساوث ويلز 2000"
        onEdit={editAddress}
      />
    </div>
  );
};

export default MyAddresses;
