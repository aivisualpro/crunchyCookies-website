import React from "react";
import { FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import {
  FaWhatsapp,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function Contact() {

  const { i18n } = useTranslation();
  const langClass = i18n.language === "ar";

  return (
    <section className="w-full pt-4 pb-10">
      <div className="custom-container">
        <div className="rounded-[22px] border border-primary bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6">
          <div className="lg:flex gap-8">
            {/* Left Panel */}
            <div
              style={{
                background:
                  "linear-gradient(90deg, #11e7ff1f 0%, #e59eff1f 55%, #f6b4001f 100%)",
              }}
              className="lg:w-[35%] lg:h-auto min-h-[400px] flex flex-col justify-between relative overflow-hidden rounded-[18px] bg-gradient-to-br from-cyan-50 to-amber-50 p-6 sm:p-8 text-teal-600"
            >
              {/* pastel circles via pseudo elements */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-12 -right-6 h-32 w-32 rounded-full bg-[#11e7ff1f] blur-0" />
                <div className="absolute -bottom-12 -right-6 h-32 w-32 rounded-full bg-[#f6b4001f]" />
                <div className="absolute -left-6 -bottom-12 h-32 w-32 rounded-full bg-[#e59eff1f]" />
              </div>

              <div className="contact-label">
                <h3 className="relative z-[1] text-3xl text-primary">
                  {langClass ? "اتصل بنا" : "Contact us"}
                </h3>
                <p className="relative z-[1] mt-2 text-black">
                  {langClass ? "قل شيئا لبدء محادثة مباشرة!" : "Say something to start a live chat!"}
                </p>
              </div>

              <ul className="relative z-[1] mt-6 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <span className="flex items-center justify-center rounded-full bg-primary text-white">
                    <FiPhone size={32} className="font-semibold p-2" />
                  </span>
                  <span className="text-primary font-medium">
                    0097444198680
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex items-center justify-center rounded-full bg-primary text-white">
                    <FaWhatsapp size={32} className="font-semibold p-2" />
                  </span>
                  <span className="text-primary font-medium">+97444447331</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex items-center justify-center rounded-full bg-primary text-white">
                    <FiMapPin size={32} className="font-semibold p-2" />
                  </span>
                  <span className="text-primary font-medium">
                    Office 502, Al Mana Business Tower C Ring Road, Doha
                  </span>
                </li>
              </ul>

              {/* Socials */}
              <div className="flex gap-2 text-2xl text-cyan-600">
                <a href="#" className="bg-cyan-600 p-1 rounded-full">
                  <FaLinkedin size={16} className="text-white" />
                </a>
                <a href="#" className="bg-[#0E7CEB] p-1 rounded-full">
                  <FaFacebook size={16} className="text-white" />
                </a>
                <a href="#" className="bg-black p-1 rounded-full">
                  <FaXTwitter size={16} className="text-white" />
                </a>
                <a href="#" className="bg-[#F43940] p-1 rounded-full">
                  <FaInstagram size={16} className="text-white" />
                </a>
                <a href="#" className="bg-[#3ccd40] p-1 rounded-full">
                  <FaWhatsapp size={16} className="text-white" />
                </a>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:w-[65%] lg:mt-0 mt-8">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-primary font-semibold">
                    {langClass ? "الاسم الأول:" : "First name"}
                  </label>
                  <input
                    type="text"
                    placeholder={langClass ? "أدخل الاسم" : "Enter name"}
                    className="h-11 w-full rounded-lg border border-teal-200/60 bg-cyan-50/50 px-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-primary font-semibold">
                    {langClass ? "الهاتف:" : "Phone:"}
                  </label>
                  <input
                    type="number"
                    placeholder={langClass ? "أدخل رقم الهاتف" : "Enter Phone Number"}
                    className="h-11 w-full rounded-lg border border-teal-200/60 bg-cyan-50/50 px-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-primary font-semibold">
                    {langClass ? "البريد الالكتروني:" : "Email:"}
                  </label>
                  <input
                    type="email"
                    placeholder="@gmail.com"
                    className="h-11 w-full rounded-lg border border-teal-200/60 bg-cyan-50/50 px-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-primary font-semibold">
                    {langClass ? "الموضوع:" : "Subject:"}
                  </label>
                  <input
                    type="text"
                    placeholder={`${langClass ? "أدخل الموضوع" : "Enter subject"}`}
                    className="h-11 w-full rounded-lg border border-teal-200/60 bg-cyan-50/50 px-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-primary font-semibold">
                    {langClass ? "الرسالة:" : "Message:"}
                  </label>
                  <textarea
                    rows={6}
                    placeholder={langClass ? "اكتب رسالتك" : "Write your message"}
                    className="w-full rounded-lg border border-teal-200/60 bg-cyan-50/50 p-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/80 focus:outline-none"
                  >
                    <FiSend className="h-4 w-4" />
                    {langClass ? "يرسل" : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
