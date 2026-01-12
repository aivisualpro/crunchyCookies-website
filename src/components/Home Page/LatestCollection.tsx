import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "../Button";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LatestCollection = ({ collections, en_title, ar_title }) => {
  const { i18n } = useTranslation();
  const langClass = i18n.language === "ar";

  const location = usePathname();

  return (
    <section className="py-10">
      <div className="custom-container">
        <div className="flex md:flex-row flex-col items-center justify-between mb-10">
          <h2 className="text-center text-[1.3rem] md:text-[1.5rem] lg:text-[1.8rem] xl:text-[2.5rem] tracking-wide text-primary">
            {langClass ? ar_title : en_title}
          </h2>
          {/* {location.pathname === "/about" ? null : <Button label={`${langClass ? "شاهد المزيد" : "See More"}`} href="/filters/chocolate" />} */}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections?.map((item, index) => (
            <div
              key={item.id}
              className="relative flex flex-col items-cente bg-white rounded-lg"
            >
              <img
                src={item.image}
                alt={item.en_title}
                className="w-full object-cover rounded-[35px]"
              />
              <div
                style={{ borderBottomRightRadius: "20px" }}
                className="curve-effect absolute top-0 left-0 text-white z-10 text-lg font-semibold px-4 py-2 bg-white"
              >
                {/* <div className="absolute w-[1.25rem] h-[1.25rem] bg-white top-0 -right-[5px]" style={{ borderTopLeftRadius: "16px", borderBottomRightRadius: "32px" }}></div> */}
                <p className="lg:text-[1.2rem] xl:text-[1.5rem] text-primary">
                  {langClass ? item.ar_title : item.en_title}
                </p>
                <div className="curve_three"></div>
              </div>
              <Link href={`/filters/subCategory/${index === 0 ? "collections" : index === 1 ? "express-delivery" : "fresh-flowers-every-week"}`}>
                <div
                  className="curve_effect_two flex items-center justify-center absolute bottom-0 right-0 bg-white pl-4 pt-[12px] pb-[10px]"
                  style={{ borderTopLeftRadius: "30px" }}
                >
                  <div className="bg-[#0fb5bb2e] hover:bg-[#0fb5bb12] p-2 rounded-full cursor-pointer">
                    <AiOutlineArrowRight size={24} color="#00B5B8" />
                    <div className="curve_four"></div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
