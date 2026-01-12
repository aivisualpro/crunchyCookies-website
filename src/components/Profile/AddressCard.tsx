import React from "react";
import { useTranslation } from "react-i18next";

const AddressCard = ({ en_title, en_address, ar_title, ar_address, onEdit, onDelete }) => {

  const { i18n } = useTranslation();
  const langClass = i18n.language === "ar";

  return (
    <div className="address-card flex justify-between items-center p-4 mb-4 bg-primary_light_mode border border-primary/30 rounded-lg">
      <div>
        <div className="font-semibold text-lg text-primary">{langClass ? ar_title : en_title}</div>
        <div className="text-black">{langClass ? ar_address : en_address}</div>
      </div>
      <div className="flex space-x-2 gap-2">
        <button
          onClick={onEdit}
          className="bg-primary hover:bg-primary/70 text-white font-medium px-4 py-2 rounded-lg text-sm"
        >
          {langClass ? "تعديل" : "Edit"}
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-500/70 text-white font-medium px-4 py-2 rounded-lg text-sm"
        >
          {langClass ? "حذف" : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
