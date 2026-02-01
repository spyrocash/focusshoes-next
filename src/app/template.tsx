"use client";

import { useOneSignal } from "@/hooks/use-onesignal";

export default function Template({ children }: { children: React.ReactNode }) {
  useOneSignal();

  return children;
}
