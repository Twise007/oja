import React from "react";
import "../index.css";
import { heroBanner } from "../data";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Slider = () => {
  return;
  <Swiper
    modules={[EffectFade, Pagination, Autoplay]}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    effect={"fade"}
    speed={800}
    slidesPerView={1}
    loop
  >
    <div>
      {heroBanner.map((banner, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-[90vh] hero relative rounded-2xl mb-4 object-contain"
            style={{
              backgroundImage: `url(${banner.image})`,
              objectFit: "cover",
            }}
          >
            <div className="hero-overlay bg-opacity-30 rounded-2xl"></div>
            <div className="absolute text-xl text-white capitalize left-10">
              <h5 className="py-1">{banner.heading}</h5>
              <p className="py-1">

              </p>
              <button className="p-1 px-4 mt-8 border rounded-l hover:bg-cl-acn">
                View Product
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </div>
  </Swiper>;
};

export default Slider;
