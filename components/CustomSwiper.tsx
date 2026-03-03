"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
export default function CustomSwiper({ children }: any) {
  return (
    <div className="grid">
    <Swiper
      modules={[FreeMode]}
      spaceBetween={15}
      grabCursor
      freeMode={{
        enabled: true,
        sticky: true, // 👈 important
      }}
      breakpoints={{
        0: { slidesPerView: 3 },
      }}
      className="py-2! w-full justify-center items-center"
    >
      {Array.isArray(children) &&
        children.map((child, index) => (
          <SwiperSlide className="w-full items-center flex justify-center max-w-[110px]!" key={index}>
            {child}
          </SwiperSlide>
        ))}
    </Swiper>
    </div>
  );
}
