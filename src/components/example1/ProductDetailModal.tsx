"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import liff from "@line/liff";
import type { Product } from "@/components/products/data";
import { useStoreActions, useStoreState } from "@/store/hooks";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  // MinusIcon,
  // PlusIcon,
  XIcon,
} from "./icons";

type Props = {
  product: Product;
  onClose: () => void;
};

export function ProductDetailModal({ product, onClose }: Props) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  // const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const [sendStatus, setSendStatus] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const liffReady = useStoreState((state) => state.liff.ready);
  const liffInitializing = useStoreState((state) => state.liff.initializing);
  const liffInitError = useStoreState((state) => state.liff.error);
  const initLiff = useStoreActions((actions) => actions.liff.initLiff);

  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  useEffect(() => {
    setSendStatus(null);
    setSendError(null);
    setSending(false);
    setSelectedSize(null);
    setIndex(0);
  }, [product.id]);

  const changeImage = (delta: number) => {
    setIndex((prev) => {
      const next = (prev + delta + product.images.length) % product.images.length;
      return next;
    });
  };

  const handleSendOrder = async () => {
    if (!selectedSize) {
      setSendError("กรุณาเลือกไซส์ก่อนสั่งซื้อ");
      return;
    }
    if (!liffId) {
      setSendError("ยังไม่ได้ตั้งค่า LIFF ID");
      return;
    }

    setSending(true);
    setSendStatus(null);
    setSendError(null);

    try {
      if (!liffReady) {
        const ready = await initLiff();
        if (!ready) {
          setSendError(liffInitError ?? "ไม่สามารถเริ่มต้น LIFF ได้");
          return;
        }
      }

      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      const priceDisplay = Number(product.price).toLocaleString("th-TH");
      const messageText = [
        "สั่งซื้อสินค้า",
        `สินค้า: ${product.name}`,
        `หมวดหมู่: ${product.category}`,
        `ราคา: ฿${priceDisplay}`,
        `ไซส์: EU ${selectedSize}`,
        `รหัสสินค้า: ${product.id}`,
      ].join("\n");

      if (liff.isInClient()) {
        await liff.sendMessages([{ type: "text", text: messageText }]);
        setSendStatus("ส่งข้อความเรียบร้อยแล้ว");
        return;
      }

      if (liff.isApiAvailable("shareTargetPicker")) {
        const result = await liff.shareTargetPicker([{ type: "text", text: messageText }]);
        if (result) {
          setSendStatus("ส่งข้อความเรียบร้อยแล้ว");
        } else {
          setSendStatus("ยกเลิกการส่งข้อความ");
        }
        return;
      }

      setSendError("ไม่สามารถส่งข้อความได้ในเบราว์เซอร์นี้");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "ส่งข้อความไม่สำเร็จ กรุณาลองใหม่";
      setSendError(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur" onClick={onClose} />

      <div className="relative h-full w-full overflow-y-auto border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-veil)] px-4 py-3 backdrop-blur">
          <button
            onClick={onClose}
            className="bg-white/10 p-2 transition hover:bg-white/20"
            aria-label="ปิด"
          >
            <XIcon className="h-5 w-5" />
          </button>
          <div className="text-sm text-[var(--muted)]">{product.name}</div>
          <div className="w-9" />
        </header>

        <div className="relative bg-[var(--surface)]">
          <div className="relative aspect-square">
            <Image
              src={product.images[index]}
              alt={`${product.name} - รูปที่ ${index + 1}`}
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
                aria-label="ก่อนหน้า"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => changeImage(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/80"
                aria-label="ถัดไป"
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
                  alt={`${product.name} thumb ${i + 1}`}
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
              ฿{Number(product.price).toLocaleString("th-TH")}
            </span>
            {/* <span className="mb-1 text-lg text-[var(--muted)] line-through">
              ฿{Number(product.price) * 1.3}
            </span> */}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-[var(--foreground)]">วัสดุ:</span>
            <span className="text-[var(--muted)]">{product.material}</span>
          </div>

          <div>
            <h3 className="mb-2 font-medium text-[var(--foreground)]">รายละเอียดสินค้า</h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {product.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-[var(--foreground)]">เลือกไซส์</h3>
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
                ? "กำลังส่ง..."
                : liffInitializing
                  ? "กำลังเชื่อมต่อ LINE..."
                  : "สั่งซื้อผ่าน LINE"}
            </button>
            <a
              href="tel:+66926644624"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-4 py-3 text-[var(--foreground)] transition hover:border-white/30"
            >
              โทรสอบถาม
            </a>
          </div>
          {(sendStatus || sendError || liffInitError) && (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-veil)] px-3 py-2 text-xs">
              {sendStatus && <div className="text-[var(--primary)]">{sendStatus}</div>}
              {sendError && <div className="text-red-400">{sendError}</div>}
              {!sendError && liffInitError && (
                <div className="text-red-400">{liffInitError}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
