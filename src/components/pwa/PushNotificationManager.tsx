"use client";

import { useEffect, useState } from "react";
import { sendNotification, subscribeUser, unsubscribeUser } from "@/app/actions";
import { useTranslations } from "@/i18n/useTranslations";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export function PushNotificationManager() {
  const t = useTranslations();
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    const supported = "serviceWorker" in navigator && "PushManager" in window;
    setIsSupported(supported);

    if (!supported) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then(async (registration) => {
        const existingSubscription = await registration.pushManager.getSubscription();
        setSubscription(existingSubscription);
      })
      .catch((error) => {
        console.error("Service worker registration failed", error);
        setStatus(t("pwaStatusServiceWorkerFail"));
      });
  }, [t]);

  const handleSubscribe = async () => {
    if (!isSupported) return;
    setStatus(null);
    setIsWorking(true);

    try {
      if (Notification.permission === "denied") {
        setStatus(t("pwaStatusAllowNotification"));
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus(t("pwaStatusPermissionDenied"));
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!vapidKey) {
        setStatus(t("pwaStatusMissingVapid"));
        return;
      }

      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      await subscribeUser(JSON.parse(JSON.stringify(newSubscription)));
      setSubscription(newSubscription);
      setStatus(t("pwaStatusSubscribed"));
    } catch (error) {
      console.error("Push subscription failed", error);
      setStatus(t("pwaStatusSubscribeFailed"));
    } finally {
      setIsWorking(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!subscription) return;
    setStatus(null);
    setIsWorking(true);

    try {
      await unsubscribeUser(JSON.parse(JSON.stringify(subscription)));
      await subscription.unsubscribe();
      setSubscription(null);
      setStatus(t("pwaStatusUnsubscribed"));
    } catch (error) {
      console.error("Unsubscribe failed", error);
      setStatus(t("pwaStatusUnsubscribeFailed"));
    } finally {
      setIsWorking(false);
    }
  };

  const handleSend = async () => {
    setStatus(null);
    setIsWorking(true);

    try {
      await sendNotification(message);
      setStatus(t("pwaStatusSendSuccess"));
      setMessage("");
    } catch (error) {
      console.error("Send notification failed", error);
      setStatus(t("pwaStatusSendFailed"));
    } finally {
      setIsWorking(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--foreground)] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
      <h3 className="text-base font-semibold">{t("pwaTitle")}</h3>
      <p className="mt-1 text-xs text-[var(--muted)]">
        {t("pwaDescription")}
      </p>

      <div className="mt-3 space-y-2">
        {subscription ? (
          <button
            type="button"
            onClick={handleUnsubscribe}
            disabled={isWorking}
            className="w-full rounded-full border border-white/10 px-3 py-2 text-xs font-semibold transition hover:bg-white/5 disabled:opacity-60"
          >
            {t("pwaUnsubscribe")}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubscribe}
            disabled={isWorking}
            className="w-full rounded-full bg-[var(--primary)] px-3 py-2 text-xs font-semibold text-black transition hover:bg-[var(--primary)]/80 disabled:opacity-60"
          >
            {t("pwaSubscribe")}
          </button>
        )}

        <div className="space-y-2 rounded-xl border border-white/5 bg-[var(--surface-veil)] p-3">
          <p className="text-xs text-[var(--muted)]">{t("pwaTestTitle")}</p>
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t("pwaPlaceholder")}
            className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-xs outline-none focus:border-[var(--primary)]"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isWorking || !subscription}
            className="w-full rounded-full border border-white/10 px-3 py-2 text-xs font-semibold transition hover:bg-white/5 disabled:opacity-60"
          >
            {t("pwaSendTest")}
          </button>
        </div>
      </div>

      {status && <p className="mt-3 text-xs text-[var(--muted)]">{status}</p>}
    </div>
  );
}
