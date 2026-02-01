"use client";

import { useEffect } from "react";
import { StoreProvider } from "easy-peasy";
import { useOneSignal } from "@/hooks/use-onesignal";
import { store } from "@/store";
import { useStoreActions } from "@/store/hooks";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider store={store}>
      <TemplateShell>{children}</TemplateShell>
    </StoreProvider>
  );
}

function TemplateShell({ children }: { children: React.ReactNode }) {
  useOneSignal();
  const initLiff = useStoreActions((actions) => actions.liff.initLiff);

  useEffect(() => {
    initLiff();
  }, [initLiff]);

  return children;
}
