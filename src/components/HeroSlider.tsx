import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import { flushSync } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

export default function CenterModeCarousel({
  autoplay = true,
  interval = 5000, // 15s — apki value rakhni ho to 150000 bhi ok
  pauseOnHover = false,
}) {
  const items = [
    {
      id: "bannerOne",
      src: "/images/Hero Slider/banner-one.jpg",
      en_title: "Gift That Speaks From The Heart",
      ar_title: "هدية تتحدث من القلب",
      en_description:
        "Express your emotions with the perfect gift that conveys your deepest thoughts. Thoughtful, elegant, and full of love.",
      ar_description:
        "عبّر عن مشاعرك بالهدية المثالية التي تنقل أعمق أفكارك. مدروسة، أنيقة ومليئة بالحب.",
      en_buttonLabel: "Explore Collection",
      ar_buttonLabel: "اكتشف المجموعة",
    },
    {
      id: "bannerTwo",
      src: "/images/Hero Slider/banner-two.jpg",
      en_title: "Say It With Flowers",
      ar_title: "عبّر بالزهور",
      en_description:
        "Flowers have a language of their own. Send a beautiful bouquet that says more than words can express.",
      ar_description:
        "للزهور لغة خاصة بها. أرسل باقة جميلة تعبّر أكثر مما تستطيع الكلمات قوله.",
      en_buttonLabel: "Explore Collection",
      ar_buttonLabel: "اكتشف المجموعة",
    },
    {
      id: "bannerThree",
      src: "/images/Hero Slider/banner-three.avif",
      en_title: "Celebrate Love",
      ar_title: "احتفل بالحب",
      en_description:
        "Whether it’s love, admiration, or gratitude, flowers are the best way to express how much someone means to you.",
      ar_description:
        "سواء كان حبًا، إعجابًا أو امتنانًا، الزهور هي أفضل وسيلة للتعبير عن مدى أهمية شخص ما بالنسبة لك.",
      en_buttonLabel: "Explore Collection",
      ar_buttonLabel: "اكتشف المجموعة",
    },
    {
      id: "bannerFour",
      src: "/images/Hero Slider/banner-four.avif",
      en_title: "Make A Statement",
      ar_title: "كن مميزًا",
      en_description:
        "Make every occasion unforgettable with bold, stunning floral arrangements that leave a lasting impression.",
      ar_description:
        "اجعل كل مناسبة لا تُنسى مع تنسيقات زهور جريئة ومذهلة تترك انطباعًا دائمًا.",
      en_buttonLabel: "Explore Collection",
      ar_buttonLabel: "اكتشف المجموعة",
    },
    {
      id: "bannerFive",
      src: "/images/Hero Slider/banner-five.avif",
      en_title: "The Perfect Gift",
      ar_title: "الهدية المثالية",
      en_description:
        "The perfect gift for any occasion – beautiful flowers that brighten any room and warm any heart.",
      ar_description:
        "الهدية المثالية لأي مناسبة – زهور جميلة تُضيء أي غرفة وتُبهج أي قلب.",
      en_buttonLabel: "Explore Collection",
      ar_buttonLabel: "اكتشف المجموعة",
    },
  ];

  

  const { i18n } = useTranslation();
  const langClass = i18n.language === "ar" ? "ar" : "en";
  const isRTL = i18n.language === "ar";

  const n = items.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward

  // single timer
  const timeoutRef = useRef<number | null>(null);
  const clearTimer = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const step = (delta: number) => {
    flushSync(() => setDir(delta > 0 ? 1 : -1));
    setCurrent((c) => (c + delta + n) % n);
  };

  const goNext = () => {
    clearTimer();
    const delta = isRTL ? 1 : 1; // RTL me visually "next" left ko jata hai
    step(delta);
  };

  const goPrev = () => {
    clearTimer();
    const delta = isRTL ? 1 : 1;
    step(delta);
  };

  // Autoplay (exactly every `interval` after last change)
  useEffect(() => {
    clearTimer();
    if (!autoplay || paused) return;
    const delta = isRTL ? 1 : 1;
    timeoutRef.current = window.setTimeout(() => {
      step(delta);
    }, interval);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, paused, interval, current, n, isRTL]);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const hoverHandlers = pauseOnHover
    ? {
        onMouseEnter: () => setPaused(true),
        onMouseLeave: () => setPaused(false),
      }
    : {};

  // Visible window: center ±2
  const visible = useMemo(() => {
    const order = [-2, -1, 0, 1, 2].map((k) => (current + k + n) % n);
    return order.map((realIdx, j) => {
      const rel = j - 2; // [-2, -1, 0, 1, 2]
      let cls = "far";
      if (rel === -2) cls = "lt2";
      else if (rel === -1) cls = "lt1";
      else if (rel === 0) cls = "slick-center";
      else if (rel === 1) cls = "gt1";
      else if (rel === 2) cls = "gt2";
      return { slideId: realIdx, cls, ...items[realIdx] };
    });
  }, [current, n, items]);

  return (
    <section className="hero_slider py-5">
      <div
        className="cmc-wrap custom-container mx-auto px-4 lg:block hidden"
        data-paused={paused ? "1" : "0"}
        {...hoverHandlers}
      >
        <button className="nav prev" onClick={goPrev} aria-label="Previous">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path
              d="M15 6l-6 6 6 6"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* dir drives directional easing via [data-dir] */}
        <div className="track" data-dir={dir} data-lang={langClass}>
          {visible.map(
            ({
              slideId,
              src,
              cls,
              en_title,
              ar_title,
              en_description,
              ar_description,
            }) => (
              <div
                className={`z-2 relative slide ${cls} ${langClass}`}
                key={slideId}
              >
                <img
                  src={src}
                  className="absolute top-0 left-0 rounded-[35px] w-full h-full object-cover"
                  alt=""
                />
                <div className="overlay rounded-[35px] absolute top-0 left-0 w-full h-full bg-black/30 z-[0]" />
                <div className="slider-content flex flex-col ms-auto justify-center max-w-sm p-4 z-[2]">
                  <h5 className="text-white font-medium text-[1.7rem]">
                    {langClass === "en" ? en_title : ar_title}
                  </h5>
                  <p
                    className={`${
                      langClass === "ar" ? "text-[18px]" : "text-[14px]"
                    } py-1`}
                  >
                    {langClass === "en" ? en_description : ar_description}
                  </p>
                  {/* <div className="slider-content-btn">
                    <Button
                      label={
                        langClass === "en" ? en_buttonLabel : ar_buttonLabel
                      }
                    />
                  </div> */}
                </div>
              </div>
            )
          )}
        </div>

        <button className="nav next" onClick={goNext} aria-label="Next">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Tablet & Mobile View */}
      <div className="custom-container lg:hidden block">
        <Swiper autoplay={{ delay: 3000 }} navigation={true} modules={[Navigation]} loop={true} className="mySwiper overflow-hidden">
          {items?.map(
            ({
              id,
              src,
              en_title,
              ar_title,
              en_description,
              ar_description
            }) => (
              <SwiperSlide key={id}>
                <div className={`relative z-[5]`}>
                  <img src={src} className="w-full min-h-[300px] object-cover rounded-[35px]" alt="" />
                  <div className="overlay absolute rounded-[35px] top-0 left-0 w-full h-full bg-black/40 z-[0]" />
                  <div className="absolute top-1/2 md:text-start text-center -translate-y-1/2 sm:right-12 slider-content flex flex-col justify-center sm:max-w-sm p-4 z-[2]">
                    <h5 className="text-white font-medium text-[1.7rem] md:px-0 px-4">
                      {langClass === "en" ? en_title : ar_title}
                    </h5>
                    <p
                      className={`${
                        langClass === "ar" ? "text-[18px]" : "text-[14px]"
                      } py-1 text-white sm:px-0 px-8`}
                    >
                      {langClass === "en" ? en_description : ar_description}
                    </p>
                    {/* <div className="slider-content-btn">
                      <Button
                        label={
                          langClass === "en" ? en_buttonLabel : ar_buttonLabel
                        }
                      />
                    </div> */}
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
}
