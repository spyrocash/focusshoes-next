"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

export const useOneSignal = () => {
  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      OneSignal.init({
        appId: "d7996da4-2d9e-4723-99d3-e47132a32ce2",
        // You can add other initialization options here
        notifyButton: {
          enable: true,
          prenotify: false,
          showCredit: false,
          text: {
            "tip.state.unsubscribed": "Subscribe to notifications",
            "tip.state.subscribed": "You're subscribed to notifications",
            "tip.state.blocked": "You've blocked notifications",
            "message.prenotify": "Click to subscribe to notifications",
            "message.action.subscribing": "Thanks for subscribing!", // Add this
            "message.action.subscribed": "Thanks for subscribing!",
            "message.action.resubscribed": "You're subscribed to notifications",
            "message.action.unsubscribed": "You won't receive notifications again",
            "dialog.main.title": "Manage Site Notifications",
            "dialog.main.button.subscribe": "SUBSCRIBE",
            "dialog.main.button.unsubscribe": "UNSUBSCRIBE",
            "dialog.blocked.title": "Unblock Notifications",
            "dialog.blocked.message": "Follow these instructions to allow notifications:",
          },
        },
      });
    }
  }, []);
};
