import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import Card from "./Card";
import SectionTitle from "./SectionTitle";
import Field from "./Field";
import { useTranslation } from "react-i18next";
import { updateUser } from "../../api/user";
import { ClipLoader } from "react-spinners";

export default function EditProfile({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) {
  const { i18n } = useTranslation();
  const langClass = i18n.language === "ar";

  const [loading, setLoading] = useState(false);

  const [userDetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
  });

  const { user } = JSON.parse(localStorage.getItem("user") as string);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        firstName: userDetail?.firstName || user?.firstName,
        lastName: userDetail?.lastName || user?.lastName,
        email: userDetail?.email || user?.email,
        dob: userDetail?.dob || user?.dob,
        phone: userDetail?.phone || user?.phone,
      };

      const response = await updateUser(payload, user._id);
      if (response?.success) {
        setLoading(false);
        // ✅ 1. Get old data (so we keep the token)
        const oldData = JSON.parse(localStorage.getItem("user") as string);

        // ✅ 2. Replace only the "user" part with fresh data
        const newData = {
          ...oldData,
          user: response.data, // this contains updated user info
        };

        // ✅ 3. Save back to localStorage
        localStorage.setItem("user", JSON.stringify(newData));

        // ✅ 4. Switch tab or refresh UI
        setTab("profile");

      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Card>
      <SectionTitle>{langClass ? "تعديل المعلومات" : "Edit Info"}</SectionTitle>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Field label={`${langClass ? "الاسم :" : "First Name :"}`}>
          <input
            className="Input border-[1px] bg-[#fff] rounded-[10px] w-full border-primary/20 px-4 py-3"
            onChange={(e) =>
              setUserDetail({ ...userDetail, firstName: e.target.value })
            }
            defaultValue={user?.firstName}
          />
        </Field>
        <Field label={`${langClass ? "كلمه المرور :" : "Last Name :"}`}>
          <input
            type="name"
            className="Input border-[1px] bg-[#fff] rounded-[10px] w-full border-primary/20 px-4 py-3"
            onChange={(e) =>
              setUserDetail({ ...userDetail, lastName: e.target.value })
            }
            defaultValue={user?.lastName}
          />
        </Field>
        <Field label={`${langClass ? "البريد الالكتروني :" : "Email :"}`}>
          <input
            className="Input border-[1px] bg-[#fff] rounded-[10px] w-full border-primary/20 px-4 py-3"
            onChange={(e) =>
              setUserDetail({ ...userDetail, email: e.target.value })
            }
            defaultValue={user?.email}
          />
        </Field>
        <Field label={`${langClass ? "تاريخ الميلاد :" : "Date Of Birth :"}`}>
          <input
            type="date"
            className="Input border-[1px] bg-[#fff] rounded-[10px] w-full border-primary/20 px-4 py-3"
            onChange={(e) =>
              setUserDetail({ ...userDetail, dob: e.target.value })
            }
            defaultValue={user?.dob?.split("T")[0]}
          />
        </Field>
        <Field label={`${langClass ? "رقم الهاتف :" : "Phone Number :"}`}>
          <input
            className="Input border-[1px] bg-[#fff] rounded-[10px] w-full border-primary/20 px-4 py-3"
            onChange={(e) =>
              setUserDetail({ ...userDetail, phone: e.target.value })
            }
            defaultValue={user?.phone}
          />
        </Field>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <button
          onClick={() => setTab("profile")}
          className="rounded-lg text-sm bg-primary_light_mode hover:bg-primary_light_mode/10 px-4 py-2 font-semibold text-primary shadow"
        >
          {langClass ? "الغاء" : "Cancel"}
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`${
            loading ? "opacity-50" : "opacity-100"
          } rounded-lg text-sm bg-primary px-4 py-2 font-semibold text-white shadow hover:bg-primary/80`}
        >
          {loading ? (
            <ClipLoader size={18} color="#fff" />
          ) : (
            <span>{langClass ? "تحديث" : "Update"}</span>
          )}
        </button>
      </div>
    </Card>
  );
}
