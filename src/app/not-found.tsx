export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center text-[var(--foreground)]">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">404</p>
      <h1 className="mt-3 text-2xl font-semibold">ไม่พบหน้านี้</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        ลองกลับไปที่หน้าหลักหรือใช้เมนูเพื่อค้นหาสินค้า
      </p>
      <a
        href="/"
        className="mt-6 inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2 text-sm font-medium transition hover:border-white/30"
      >
        กลับหน้าหลัก
      </a>
    </main>
  );
}
