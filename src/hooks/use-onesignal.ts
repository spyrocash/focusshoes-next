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
        },
      });
    }
  }, []);
};
