"use client";

import { useEffect, useRef } from "react";
import { StoreProvider } from "easy-peasy";
import { Toaster, toast } from "react-hot-toast";
import { useOneSignal } from "@/hooks/use-onesignal";
import { store } from "@/store";
import { useStoreActions, useStoreState } from "@/store/hooks";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider store={store}>
      <Toaster />
      <TemplateShell>{children}</TemplateShell>
    </StoreProvider>
  );
}

function TemplateShell({ children }: { children: React.ReactNode }) {
  useOneSignal();
  const initLiff = useStoreActions((actions) => actions.liff.initLiff);
  // const liffError = useStoreState((state) => state.liff.error);
  // const lastErrorRef = useRef<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      initLiff();
    }
  }, [initLiff]);

  // useEffect(() => {
  //   if (liffError && liffError !== lastErrorRef.current) {
  //     toast.error(liffError);
  //     lastErrorRef.current = liffError;
  //   }
  // }, [liffError]);

  return children;
}
