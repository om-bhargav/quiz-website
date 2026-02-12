"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function CustomSwiper({ children }: any) {
  return (
    <Swiper
      modules={[FreeMode]}
      spaceBetween={16}
      navigation
      pagination={{ clickable: true }}
      grabCursor
      freeMode={{
        enabled: true,
        sticky: true, // 👈 important
      }}
      breakpoints={{
        0: { slidesPerView: 1.5 },
        648:{slidesPerView: 2}
      }}
      className="w-full"
    >
      {Array.isArray(children) &&
        children.map((child, index) => (
          <SwiperSlide className="h-full md:min-w-[230px]" key={index}>
            {child}
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
