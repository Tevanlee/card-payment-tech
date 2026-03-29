"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { SESSION_STORAGE } from "@/constants";

interface PaymentSessionState {
  sessionToken: string;
  amountToPay: number;

  setSession: (sessionToken: string, amountToPay: number) => void;
  clearSession: () => void;
}

/** This is a Global session store used to manage state across the app. */

export const useSessionStore = create<PaymentSessionState>()(
  persist(
    (set) => ({
      sessionToken: "",
      amountToPay: 0,

      setSession: (sessionToken, amountToPay) =>
        set({
          sessionToken,
          amountToPay,
        }),
      clearSession: () =>
        set({
          sessionToken: "",
          amountToPay: 0,
        }),
    }),
    {
      name: SESSION_STORAGE,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
