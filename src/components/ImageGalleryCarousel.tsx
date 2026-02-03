"use client";

import ImageGallery from "react-image-gallery";
import type { ReactImageGalleryProps } from "react-image-gallery";

type ImageGalleryCarouselProps = ReactImageGalleryProps;

export function ImageGalleryCarousel({
  items,
  autoPlay = true,
  slideInterval = 4000,
  showPlayButton = false,
  showFullscreenButton = false,
  showThumbnails = false,
  showNav = true,
  showBullets = true,
  ...rest
}: ImageGalleryCarouselProps) {
  if (!items || items.length === 0) return null;

  return (
    <ImageGallery
      items={items}
      autoPlay={autoPlay}
      slideInterval={slideInterval}
      showPlayButton={showPlayButton}
      showFullscreenButton={showFullscreenButton}
      showThumbnails={showThumbnails}
      showNav={showNav}
      showBullets={showBullets}
      {...rest}
    />
  );
}
