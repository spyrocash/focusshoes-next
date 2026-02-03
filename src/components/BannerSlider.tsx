"use client";

import { ImageGalleryCarousel } from "@/components/ImageGalleryCarousel";

type BannerImage = {
  src: string;
  alt: string;
};

type BannerSliderProps = {
  images: BannerImage[];
};

export function BannerSlider({ images }: BannerSliderProps) {
  if (images.length === 0) return null;

  const items = images.map((image) => ({
    original: image.src,
    originalAlt: image.alt,
  }));

  return (
    <section className="mx-auto max-w-5xl sm:px-6 lg:max-w-6xl lg:px-0">
      <div className="overflow-hidden">
        <ImageGalleryCarousel
          items={items}
          additionalClass="banner-gallery"
          autoPlay
          slideInterval={4000}
          showPlayButton={false}
          showFullscreenButton={false}
          showThumbnails={false}
          showNav
          showBullets
        />
      </div>
    </section>
  );
}
