"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import liff from "@line/liff";
import { isMobile } from "react-device-detect";
import type { Product } from "@/mocks/products";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { toast } from "react-hot-toast";
import { XIcon } from "./icons";
import { formatNumber } from "@/i18n/locales";
import { useTranslations } from "@/i18n/useTranslations";
import { useUi } from "@/components/layout/UiProvider";
import { CONTACT } from "@/data/contact";
import { ImageGalleryCarousel } from "@/components/ImageGalleryCarousel";
import { useSearchParams } from "next/navigation";
import { buildLiffUrl, buildChatWithOAUrl } from "@/lib/line";

type Props = {
  product: Product;
  onClose?: () => void;
};

export function ProductDetailContent({ product, onClose }: Props) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  // const [quantity, setQuantity] = useState(1);
  const [sending, setSending] = useState(false);
  const { locale } = useUi();
  const t = useTranslations();
  const searchParams = useSearchParams();

  const liffReady = useStoreState((state) => state.liff.ready);
  const liffInitializing = useStoreState((state) => state.liff.initializing);
  const liffInitError = useStoreState((state) => state.liff.error);
  const initLiff = useStoreActions((actions) => actions.liff.initLiff);
  const lastInitErrorRef = useRef<string | null>(null);

  const liffId = process.env.NEXT_PUBLIC_PRODUCT_DETAIL_LIFF_ID;

  const priceDisplay = formatNumber(Number(product.price), locale);
  const messageArray = [
    t("productOrderTitle"),
    `${t("productOrderSku")}: ${product.id}`,
    `${t("productOrderSize")}: EU ${selectedSize}`,
    `${t("productOrderPrice")}: ฿${priceDisplay}`,
  ];

  const messageText = messageArray.join("\n");

  const encodedMessageText = encodeURIComponent(messageText);

  const translateLiffError = (error: string) => {
    if (error === "โหมดพัฒนา: ปิดการเชื่อมต่อ LIFF") return t("productLiffDevDisabled");
    if (error === "ยังไม่ได้ตั้งค่า LIFF ID") return t("productLiffMissing");
    if (error === "ไม่สามารถเริ่มต้น LIFF ได้") return t("productLiffInitFail");
    return error;
  };

  useEffect(() => {
    setSending(false);
    setSelectedSize(null);
    setSelectedColorIndex(0);
  }, [product.id]);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   if (!isMobile) return;
  //   const liffState = searchParams?.get("liff.state");
  //   if (liffState) return;
  //   if (!liffId) return;
  //   if (liff.isInClient()) return;
  //   if (window.sessionStorage.getItem("liff_redirected") === "1") return;
  //   const liffUrl = buildLiffUrl(liffId, { id: product.id });
  //   window.sessionStorage.setItem("liff_redirected", "1");
  //   window.location.href = liffUrl;
  // }, [isMobile, liffId, product.id, searchParams]);

  useEffect(() => {
    const liffState = searchParams?.get("liff.state");
    if (liffState) {
      initLiff({ liffId });
    }
  }, [initLiff, liffId, searchParams]);

  useEffect(() => {
    if (liffInitError && liffInitError !== lastInitErrorRef.current) {
      toast.error(translateLiffError(liffInitError));
      lastInitErrorRef.current = liffInitError;
    }
  }, [liffInitError, t]);

  const handleSendOrder = async () => {
    if (!selectedSize) {
      toast.error(t("productSelectSizeError"));
      return;
    }
    if (!liffId) {
      toast.error(t("productLiffMissing"));
      return;
    }
    if (!isMobile) {
      alert("กรุณาสแกน QR Code ด้านล่างเพื่อสั่งซื้อผ่าน LINE");
      return;
    }

    setSending(true);

    try {
      if (!liff.isInClient()) {
        toast(t("productRedirectToLine"));
        const url = buildChatWithOAUrl(CONTACT.lineId, encodedMessageText);
        window.location.href = url;
        window.setTimeout(() => {
          toast.error(t("productRedirectFallback"));
          window.location.href = CONTACT.lineUrl;
        }, 2000);
        return;
      }

      if (!liffReady) {
        const ready = await initLiff({ withLoginOnExternalBrowser: true, liffId });
        if (!ready) {
          toast.error(liffInitError ? translateLiffError(liffInitError) : t("productLiffInitFail"));
          return;
        }
      }

      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      await liff.sendMessages([{ type: "text", text: messageText }]);
      toast.success(t("productMessageSent"));
      liff.closeWindow();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t("productMessageFailed");
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  const showClose = Boolean(onClose);
  const colors = product.colors ?? [];
  // const showColors = colors.length > 1;
  const selectedColor = colors[selectedColorIndex];
  // const liffUrl = liffId ? buildLiffUrl(liffId, { id: product.id }) : null;
  const url = buildChatWithOAUrl(CONTACT.lineId, encodedMessageText);
  const qrCodeUrl = url
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${url}`
    : null;
  const galleryImages = selectedColor?.image
    ? [selectedColor.image, ...product.images.filter((img) => img !== selectedColor.image)]
    : product.images;

  return (
    <div className="relative bg-[var(--surface)] text-[var(--foreground)]">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-veil)] px-4 py-3 backdrop-blur">
        {showClose ? (
          <button
            onClick={onClose}
            className="bg-white/10 p-2 transition hover:bg-white/20"
            aria-label={t("productCloseLabel")}
          >
            <XIcon className="h-5 w-5" />
          </button>
        ) : (
          <Link href={`/${locale}`} className="bg-white/10 p-2 transition hover:bg-white/20">
            <XIcon className="h-5 w-5" />
          </Link>
        )}
        <div className="text-sm text-[var(--muted)]">รหัส: {product.id}</div>
        <div className="w-9" />
      </header>

      <div className="mx-auto w-full max-w-5xl lg:max-w-6xl lg:px-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8">
          <section className="relative bg-[var(--surface)] lg:rounded-2xl lg:border lg:border-[var(--border)] lg:overflow-hidden">
            <ImageGalleryCarousel
              additionalClass="product-gallery"
              showThumbnails
              showBullets={false}
              showPlayButton={false}
              showFullscreenButton={false}
              showNav
              items={galleryImages.map((src, i) => ({
                original: src,
                thumbnail: src,
                originalAlt: `${product.name} - ${t("productImageLabel")} ${i + 1}`,
                thumbnailAlt: `${product.name} - ${t("productImageLabel")} ${i + 1}`,
              }))}
            />
          </section>

          <section className="space-y-4 p-4 lg:pt-6">
            <div>
              <div className="mb-1 text-sm text-[var(--muted)]">{product.category}</div>
              <h2 className="text-xl font-semibold text-[var(--foreground)]">
                รหัส: {product.id}
              </h2>
            </div>

            <div className="flex items-end gap-2">
              {/* <span className="text-3xl font-bold text-[var(--primary)]"> */}
              <span className="text-3xl font-bold text-[var(--muted)]">
                ฿{formatNumber(Number(product.price), locale)}
              </span>
              {/* <span className="mb-1 text-lg text-[var(--muted)] line-through">
                ฿{Number(product.price) * 1.3}
              </span> */}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-[var(--foreground)]">
                {t("productMaterialLabel")}
              </span>
              <span className="text-[var(--muted)]">{product.material}</span>
            </div>

            <div>
              <h3 className="mb-2 font-medium text-[var(--foreground)]">
                {t("productDetailsTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{product.description}</p>
            </div>

            {colors.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-[var(--foreground)]">{t("productColorTitle")}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColorIndex(index)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
                        index === selectedColorIndex
                          ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)]"
                          : "border-[var(--border)] text-[var(--muted)]"
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-white/30"
                        style={{ backgroundColor: color.swatch }}
                        aria-hidden="true"
                      />
                      {color.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="font-medium text-[var(--foreground)]">
                {t("productSelectSizeTitle")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                      selectedSize === size
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)]"
                        : "border-[var(--border)] text-[var(--muted)] hover:border-white/20"
                    }`}
                  >
                    EU {size}
                  </button>
                ))}
              </div>
            </div>

            {/* <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-white/10">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-white hover:bg-white/10"
                  aria-label="ลดจำนวน"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <div className="px-4 py-2 text-sm font-semibold">{quantity}</div>
                <button
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="px-3 py-2 text-white hover:bg-white/10"
                  aria-label="เพิ่มจำนวน"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="text-sm text-[var(--muted)]">พร้อมส่ง</div>
            </div> */}

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 flex-col gap-3">
                <button
                  type="button"
                  onClick={handleSendOrder}
                  disabled={sending || liffInitializing}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-3 text-[var(--primary-foreground)] shadow-sm transition hover:bg-[#9f1c1d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending
                    ? t("productSending")
                    : liffInitializing
                      ? t("productConnectingLine")
                      : t("productSendButton")}
                </button>
                {!isMobile && qrCodeUrl && (
                  <div className="flex flex-col items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)]/60 p-3">
                    <img
                      src={qrCodeUrl}
                      alt={`${product.name} LINE QR`}
                      className="h-36 w-36"
                      loading="lazy"
                    />
                    <span className="text-xs text-[var(--muted)]">
                      สแกน QR Code เพื่อสั่งซื้อผ่าน LINE
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <a
                  href={`tel:${CONTACT.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-4 py-3 text-[var(--foreground)] transition hover:border-white/30"
                >
                  {t("contactPhone")}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
