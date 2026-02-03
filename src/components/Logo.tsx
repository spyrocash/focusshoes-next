import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)]">
      <Image
        src="/logo.png"
        alt="Focus Shoes"
        fill
        sizes="56px"
        className="object-contain p-1"
        priority
      />
    </div>
  );
}
