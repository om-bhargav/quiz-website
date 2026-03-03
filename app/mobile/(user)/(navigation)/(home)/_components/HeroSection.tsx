"use client";
import ErrorLoading from "@/components/ErrorLoading";
import { HomeQuizCardSkeleton } from "@/components/QuizCard";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import { useState, useEffect } from "react";
import useSWR from "swr";
interface Slide {
  id: string;
  title: string;
  mainHeadline: string;
  subtitle: string;
  image: string;
}

const INTERVAL_MS = 4500;

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const { data, isLoading, isValidating, error } = useSWR(
    "/api/banner",
    fetcher,
    { revalidateIfStale: false, revalidateOnFocus: false }
  );
  const loading = isLoading || isValidating;
  const SLIDES = data?.data ?? [];
  useEffect(() => {
    if (!loading) {
      const t = setInterval(() => {
        setIndex((i) => (i + 1) % SLIDES.length);
      }, INTERVAL_MS);
      return () => clearInterval(t);
    }
  }, [loading]);

  return (
    <ErrorLoading loading={loading} error={error} loadingCard={HeroSectionSkeleton} loadingCount={1}>
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
          {SLIDES.map((s: Slide) => (
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
                <p className="text-[24px] font-[900] leading-tight mt-0.5">
                  {s.mainHeadline}
                </p>
                <p className="text-[11px] font-[700] text-black/60 mt-1">
                  {s.subtitle}
                </p>
              </div>

              {/* Image with no background – depth via drop-shadow only */}
              <div
                className="relative z-10 w-[120px] h-[120px] flex-shrink-0 flex items-center justify-center"
                style={{
                  filter:
                    "drop-shadow(4px 4px 0px rgba(0,0,0,0.25)) drop-shadow(0 12px 24px rgba(0,0,0,0.2))",
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
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {SLIDES.map((_: any, i: number) => (
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
    </ErrorLoading>
  );
}

export function HeroSectionSkeleton() {
  return (
    <div
      className="
        relative
        h-[200px]
        rounded-[16px]
        border-[3px] border-black
        overflow-hidden
        bg-card
      "
      style={{ boxShadow: "8px 8px 0px #000000" }}
    >
      <div className="flex h-full items-center pl-5 pr-2">
        {/* Left Text Block */}
        <div className="flex-1 space-y-3">
          {/* Small title */}
          <Skeleton className="h-3 w-20 rounded-md" />

          {/* Main headline */}
          <Skeleton className="h-7 w-3/4 rounded-md" />

          {/* Subtitle */}
          <Skeleton className="h-3 w-1/2 rounded-md" />
        </div>

        {/* Right Image Skeleton */}
        <div className="relative w-[120px] h-[120px] flex-shrink-0 flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      </div>

      {/* Bottom Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        <Skeleton className="h-2 w-6 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
      </div>
    </div>
  );
}
