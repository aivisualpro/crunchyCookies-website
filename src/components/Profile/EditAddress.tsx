import React from "react";
import { FiEdit2 } from "react-icons/fi";
import Card from "./Card";
import SectionTitle from "./SectionTitle";
import Field from "./Field";

export default function EditAddress({ tab, setTab }) {
  return (
    <Card>
      <SectionTitle
      >
        Edit Info
      </SectionTitle>

      <div className="mt-6 flex items-center gap-4">
        <div className="w-[30%]">
          <Field label="Name :">
            <input className="Input border-[1px] bg-[#fff] rounded-[10px] w-full border-primary/20 px-4 py-3" defaultValue="Office" />
          </Field>
        </div>
        <div className="w-[70%]">
          <Field label="Address :">
            <input type="text" className="Input border-[1px] bg-[#fff] rounded-[10px] w-full border-primary/20 px-4 py-3" defaultValue="Ava Johnson – Suite 402, Willow Tower, 15 Market Street, Downtown, Toronto, ON" />
          </Field>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <button onClick={() => setTab("addresses")} className="rounded-lg text-sm bg-primary_light_mode hover:bg-primary_light_mode/10 px-4 py-2 font-semibold text-primary shadow">
          Cancel
        </button>
        <button className="rounded-lg text-sm bg-primary px-4 py-2 font-semibold text-white shadow hover:bg-primary/80">
          Update
        </button>
      </div>

    </Card>
  );
}
