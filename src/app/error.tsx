"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center text-[var(--foreground)]">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">เกิดข้อผิดพลาด</p>
      <h1 className="mt-3 text-2xl font-semibold">ขออภัย มีบางอย่างผิดปกติ</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {error?.message || "กรุณาลองใหม่อีกครั้ง"}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-medium text-[var(--primary-foreground)] transition hover:bg-[#9f1c1d]"
        >
          ลองใหม่
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-5 py-2 text-sm font-medium transition hover:border-white/30"
        >
          กลับหน้าหลัก
        </a>
      </div>
    </main>
  );
}
