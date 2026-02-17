"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

// Images chosen for "floating" depth effect - subject-focused, not full-bleed
const SLIDES = [
  {
    id: 1,
    title: "Last week's top winner",
    prize: "₹10,00,000",
    sub: "Priya S. won the Mega Quiz",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80",
  },
  {
    id: 2,
    title: "Biggest prize pool",
    prize: "₹25,00,000",
    sub: "IPL Championship Quiz",
    image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=400&q=80",
  },
  {
    id: 3,
    title: "Join & win real cash",
    prize: "₹50 – ₹10L",
    sub: "Play now, pay entry, win big",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e2c?w=400&q=80",
  },
];

const INTERVAL_MS = 4500;

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="relative h-[200px] rounded-[16px] border-[3px] border-black overflow-hidden"
      style={{ boxShadow: "8px 8px 0px #000000" }}
    >
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-out"
        style={{
          width: `${SLIDES.length * 100}%`,
          transform: `translateX(-${index * (100 / SLIDES.length)}%)`,
        }}
      >
        {SLIDES.map((s) => (
          <div
            key={s.id}
            className="relative flex items-center pl-5 pr-2 flex-1 min-w-0 bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-50"
            style={{ width: `${100 / SLIDES.length}%` }}
          >
            {/* Text block – left */}
            <div className="flex-1 min-w-0 z-10">
              <p className="text-[11px] font-[800] uppercase text-black/70 tracking-wide">
                {s.title}
              </p>
              <p className="text-[24px] font-[900] leading-tight mt-0.5">{s.prize}</p>
              <p className="text-[11px] font-[700] text-black/60 mt-1">{s.sub}</p>
            </div>

            {/* Image with no background – depth via drop-shadow only */}
            <div
              className="relative z-10 w-[120px] h-[120px] flex-shrink-0 flex items-center justify-center"
              style={{
                filter: "drop-shadow(4px 4px 0px rgba(0,0,0,0.25)) drop-shadow(0 12px 24px rgba(0,0,0,0.2))",
              }}
            >
              <Image
                src={s.image}
                alt=""
                fill
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-black" : "w-2 bg-black/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
