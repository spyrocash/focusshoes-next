"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import liff from "@line/liff";
import type { Product } from "@/mocks/products";
import { useStoreActions } from "@/stores/hooks";
import { toast } from "react-hot-toast";
import { XIcon } from "./icons";
import { formatNumber } from "@/i18n/locales";
import { useTranslations } from "@/i18n/useTranslations";
import { useUi } from "@/components/layout/UiProvider";
import { CONTACT } from "@/data/contact";
import { ImageGalleryCarousel } from "@/components/ImageGalleryCarousel";
import { useSearchParams } from "next/navigation";

type Props = {
  product: Product;
  onClose?: () => void;
};

export function ProductDetailContent({ product, onClose }: Props) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  // const [quantity, setQuantity] = useState(1);
  const [sending, setSending] = useState(false);
  const [liffInitializing, setLiffInitializing] = useState(false);
  const [liffInitError, setLiffInitError] = useState<string | null>(null);
  const { locale } = useUi();
  const t = useTranslations();
  const searchParams = useSearchParams();

  const setProfile = useStoreActions((actions) => actions.liff.setProfile);
  const setProfileError = useStoreActions((actions) => actions.liff.setProfileError);
  const liffReadyRef = useRef(false);
  const lastInitErrorRef = useRef<string | null>(null);

  const liffId = process.env.NEXT_PUBLIC_PRODUCT_DETAIL_LIFF_ID;

  const loadProfile = useCallback(async () => {
    setProfileError(null);
    if (!liff.isLoggedIn()) {
      setProfile(null);
      return false;
    }

    try {
      const profile = await liff.getProfile();
      setProfile({
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage,
      });
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "ไม่สามารถดึงโปรไฟล์ได้";
      setProfileError(message);
      return false;
    }
  }, [setProfile, setProfileError]);

  const initLiff = useCallback(
    async (options?: { withLoginOnExternalBrowser?: boolean }) => {
      if (process.env.NODE_ENV === "development") {
        setLiffInitError("โหมดพัฒนา: ปิดการเชื่อมต่อ LIFF");
        return false;
      }

      if (!liffId) {
        setLiffInitError("ยังไม่ได้ตั้งค่า LIFF ID");
        return false;
      }

      if (liffReadyRef.current) return true;
      if (liffInitializing) return false;

      setLiffInitializing(true);
      setLiffInitError(null);

      try {
        await liff.init({
          liffId,
          withLoginOnExternalBrowser: options?.withLoginOnExternalBrowser ?? false,
        });
        liffReadyRef.current = true;
        if (liff.isLoggedIn()) {
          await loadProfile();
        }
        return true;
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "ไม่สามารถเริ่มต้น LIFF ได้";
        setLiffInitError(message);
        return false;
      } finally {
        setLiffInitializing(false);
      }
    },
    [liffId, liffInitializing, loadProfile],
  );

  const translateLiffError = (error: string) => {
    if (error === "โหมดพัฒนา: ปิดการเชื่อมต่อ LIFF") return t("productLiffDevDisabled");
    if (error === "ยังไม่ได้ตั้งค่า LIFF ID") return t("productLiffMissing");
    if (error === "ไม่สามารถเริ่มต้น LIFF ได้") return t("productLiffInitFail");
    return error;
  };

  useEffect(() => {
    setSending(false);
    setSelectedSize(null);
  }, [product.id]);

  useEffect(() => {
    const liffState = searchParams?.get("liff.state");
    if (liffState) {
      initLiff();
    }
  }, [initLiff, searchParams]);

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

    setSending(true);

    try {
      if (!liffReadyRef.current) {
        const ready = await initLiff({ withLoginOnExternalBrowser: true });
        if (!ready) {
          toast.error(liffInitError ? translateLiffError(liffInitError) : t("productLiffInitFail"));
          return;
        }
      }

      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      const priceDisplay = formatNumber(Number(product.price), locale);
      const messageText = [
        t("productOrderTitle"),
        `${t("productOrderItem")}: ${product.name}`,
        `${t("productOrderCategory")}: ${product.category}`,
        `${t("productOrderPrice")}: ฿${priceDisplay}`,
        `${t("productOrderSize")}: EU ${selectedSize}`,
        `${t("productOrderSku")}: ${product.id}`,
      ].join("\n");

      if (liff.isInClient()) {
        await liff.sendMessages([{ type: "text", text: messageText }]);
        toast.success(t("productMessageSent"));
        liff.closeWindow();
        return;
      }

      if (liff.isApiAvailable("shareTargetPicker")) {
        const result = await liff.shareTargetPicker([{ type: "text", text: messageText }]);
        if (result) {
          toast.success(t("productMessageSent"));
        } else {
          toast(t("productMessageCanceled"));
        }
        return;
      }

      toast.error(t("productMessageUnsupported"));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t("productMessageFailed");
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  const showClose = Boolean(onClose);

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
        <div className="text-sm text-[var(--muted)]">{product.name}</div>
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
              items={product.images.map((src, i) => ({
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
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{product.name}</h2>
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
              <button
                type="button"
                onClick={handleSendOrder}
                disabled={sending || liffInitializing}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-3 text-[var(--primary-foreground)] shadow-sm transition hover:bg-[#9f1c1d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending
                  ? t("productSending")
                  : liffInitializing
                    ? t("productConnectingLine")
                    : t("productSendButton")}
              </button>
              <a
                href={`tel:${CONTACT.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-4 py-3 text-[var(--foreground)] transition hover:border-white/30"
              >
                {t("productCallButton")}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
