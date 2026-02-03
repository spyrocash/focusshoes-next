"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

type BannerImage = {
  src: string;
  alt: string;
};

type BannerSliderProps = {
  images: BannerImage[];
};

export function BannerSlider({ images }: BannerSliderProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [images.length]);

  const change = (delta: number) => {
    setIndex((prev) => (prev + delta + images.length) % images.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    change(deltaX > 0 ? -1 : 1);
  };

  if (images.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:max-w-6xl lg:px-0">
      <div
        className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-44 sm:h-56 lg:h-64">
          {images.map((image, i) => (
            <div
              key={image.src}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width:768px) 100vw, 1024px"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => change(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/75"
              aria-label="Previous banner"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => change(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/75"
              aria-label="Next banner"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 w-2 rounded-full ${
                    i === index ? "bg-white" : "bg-white/40"
                  }`}
                  aria-label={`Go to banner ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
