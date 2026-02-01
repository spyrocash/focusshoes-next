"use server";

import webPush, { type PushSubscription } from "web-push";

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
const vapidSubject = process.env.VAPID_SUBJECT ?? "mailto:admin@focusshoes-th.com";

if (!vapidPublicKey || !vapidPrivateKey) {
  console.warn("Missing VAPID keys: set NEXT_PUBLIC_VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY.");
} else {
  webPush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
}

declare global {
  var pushSubscriptions: PushSubscription[] | undefined;
}

const getSubscriptions = () => {
  if (!globalThis.pushSubscriptions) {
    globalThis.pushSubscriptions = [];
  }
  return globalThis.pushSubscriptions;
};

export async function subscribeUser(subscription: PushSubscription) {
  const subscriptions = getSubscriptions();
  const alreadySubscribed = subscriptions.some(
    (stored) => stored.endpoint === subscription.endpoint,
  );

  if (!alreadySubscribed) {
    subscriptions.push(subscription);
  }

  return { success: true };
}

export async function unsubscribeUser(subscription: PushSubscription) {
  const subscriptions = getSubscriptions();
  const nextSubscriptions = subscriptions.filter(
    (stored) => stored.endpoint !== subscription.endpoint,
  );
  globalThis.pushSubscriptions = nextSubscriptions;

  return { success: true };
}

export async function sendNotification(message: string) {
  const subscriptions = getSubscriptions();

  if (!vapidPublicKey || !vapidPrivateKey) {
    throw new Error("VAPID keys are not configured.");
  }

  const payload = JSON.stringify({
    title: "Focus Shoes",
    body: message || "มีข้อความแจ้งเตือนใหม่",
    url: "/",
  });

  await Promise.allSettled(
    subscriptions.map((subscription) => webPush.sendNotification(subscription, payload)),
  );

  return { success: true };
}
