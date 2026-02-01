"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import liff from "@line/liff";
import type { Product } from "@/mocks/products";
import { useStoreActions, useStoreState } from "@/stores/hooks";
import { toast } from "react-hot-toast";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "./icons";
import { LOCALE_META } from "@/i18n/locales";
import { useTranslations } from "@/i18n/useTranslations";
import { useUi } from "@/components/layout/UiProvider";

type Props = {
  product: Product;
  onClose?: () => void;
};

export function ProductDetailContent({ product, onClose }: Props) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  // const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const [sending, setSending] = useState(false);
  const { locale } = useUi();
  const t = useTranslations();

  const liffReady = useStoreState((state) => state.liff.ready);
  const liffInitializing = useStoreState((state) => state.liff.initializing);
  const liffInitError = useStoreState((state) => state.liff.error);
  const initLiff = useStoreActions((actions) => actions.liff.initLiff);
  const lastInitErrorRef = useRef<string | null>(null);

  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  const translateLiffError = (error: string) => {
    if (error === "โหมดพัฒนา: ปิดการเชื่อมต่อ LIFF") return t("productLiffDevDisabled");
    if (error === "ยังไม่ได้ตั้งค่า LIFF ID") return t("productLiffMissing");
    if (error === "ไม่สามารถเริ่มต้น LIFF ได้") return t("productLiffInitFail");
    return error;
  };

  useEffect(() => {
    setSending(false);
    setSelectedSize(null);
    setIndex(0);
  }, [product.id]);

  useEffect(() => {
    if (liffInitError && liffInitError !== lastInitErrorRef.current) {
      toast.error(translateLiffError(liffInitError));
      lastInitErrorRef.current = liffInitError;
    }
  }, [liffInitError, t]);

  const changeImage = (delta: number) => {
    setIndex((prev) => {
      const next = (prev + delta + product.images.length) % product.images.length;
      return next;
    });
  };

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
      if (!liffReady) {
        const ready = await initLiff();
        if (!ready) {
          toast.error(liffInitError ? translateLiffError(liffInitError) : t("productLiffInitFail"));
          return;
        }
      }

      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      const priceDisplay = new Intl.NumberFormat(LOCALE_META[locale].numberLocale).format(
        Number(product.price),
      );
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
      const message =
        error instanceof Error ? error.message : t("productMessageFailed");
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
          <Link
            href="/"
            className="bg-white/10 p-2 transition hover:bg-white/20"
          >
            <XIcon className="h-5 w-5" />
          </Link>
        )}
        <div className="text-sm text-[var(--muted)]">{product.name}</div>
        <div className="w-9" />
      </header>

      <div className="relative bg-[var(--surface)]">
        <div className="relative aspect-square">
          <Image
            src={product.images[index]}
            alt={`${product.name} - ${t("productImageLabel")} ${index + 1}`}
            fill
            sizes="(max-width:768px) 100vw, 600px"
            className="object-cover"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <>
            <button
              onClick={() => changeImage(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/80"
              aria-label={t("productPreviousLabel")}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => changeImage(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/80"
              aria-label={t("productNextLabel")}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white backdrop-blur-sm">
              {index + 1} / {product.images.length}
            </div> */}
          </>
        )}
        <div className="flex gap-2 overflow-x-auto bg-[var(--surface)] px-4 py-3">
          {product.images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIndex(i)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border ${
                i === index ? "border-[var(--primary)]" : "border-[var(--border)]"
              }`}
            >
              <Image
                src={src}
                alt={`${product.name} ${t("productImageLabel")} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <div className="mb-1 text-sm text-[var(--muted)]">{product.category}</div>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{product.name}</h2>
        </div>

        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-[var(--primary)]">
            ฿{new Intl.NumberFormat(LOCALE_META[locale].numberLocale).format(Number(product.price))}
          </span>
          {/* <span className="mb-1 text-lg text-[var(--muted)] line-through">
            ฿{Number(product.price) * 1.3}
          </span> */}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-[var(--foreground)]">{t("productMaterialLabel")}</span>
          <span className="text-[var(--muted)]">{product.material}</span>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-[var(--foreground)]">
            {t("productDetailsTitle")}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--muted)]">{product.description}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-[var(--foreground)]">{t("productSelectSizeTitle")}</h3>
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
            href="tel:+66926644624"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-4 py-3 text-[var(--foreground)] transition hover:border-white/30"
          >
            {t("productCallButton")}
          </a>
        </div>
      </div>
    </div>
  );
}
