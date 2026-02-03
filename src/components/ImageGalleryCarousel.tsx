"use client";

import ImageGallery from "react-image-gallery";

type GalleryImage = {
  src: string;
  alt: string;
};

type ImageGalleryCarouselProps = {
  images: GalleryImage[];
  additionalClass?: string;
  autoPlay?: boolean;
  slideInterval?: number;
  showPlayButton?: boolean;
  showFullscreenButton?: boolean;
  showThumbnails?: boolean;
  showNav?: boolean;
  showBullets?: boolean;
};

export function ImageGalleryCarousel({
  images,
  additionalClass,
  autoPlay = true,
  slideInterval = 4000,
  showPlayButton = false,
  showFullscreenButton = false,
  showThumbnails = false,
  showNav = true,
  showBullets = true,
}: ImageGalleryCarouselProps) {
  if (images.length === 0) return null;

  const items = images.map((image) => ({
    original: image.src,
    thumbnail: image.src,
    originalAlt: image.alt,
    thumbnailAlt: image.alt,
  }));

  return (
    <ImageGallery
      items={items}
      additionalClass={additionalClass}
      autoPlay={autoPlay}
      slideInterval={slideInterval}
      showPlayButton={showPlayButton}
      showFullscreenButton={showFullscreenButton}
      showThumbnails={showThumbnails}
      showNav={showNav}
      showBullets={showBullets}
    />
  );
}
