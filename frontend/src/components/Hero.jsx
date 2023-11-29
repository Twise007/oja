import React from "react";
import { heroBanner } from "../data";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "../index.css";

const Hero = () => {
  return (
    <Swiper
      modules={[EffectFade, Pagination, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}

      pagination={{
        clickable: true,
      }}
      scrollbar={{ draggable: true }}
      effect={"fade"}
      speed={700}
      slidesPerView={1}
      loop
      className="mySwiper"
    >
      <div>
        {heroBanner.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative object-contain min-h-screen hero"
              style={{
                backgroundImage: `url(${banner.image})`,
                objectFit: "cover",
              }}
            >
              <div className="bg-opacity-50 hero-overlay"></div>
              <div className="absolute text-xl capitalize text-cl-white left-10">
                <p className="">{banner.desc}</p>
                <h2 className="py-1 text-5xl font-semibold">
                  {banner.heading}
                </h2>

                <button className="p-1 px-4 mt-8 border rounded-lg hover:bg-cl-acn">
                  View Product
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
};

export default Hero;
