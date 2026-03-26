"use client";

import type {
  PaymentResponse,
  PaymentRequest,
  CardData,
  CardToken,
} from "../types/card.types";

import { DB } from "./lib/mockDb";
import { createTokenizedCard } from "./lib/mockTokenizedCard";

export const mockApiService = {
  getSavedCards: (): Promise<CardData[]> => {
    return Promise.resolve([...DB.savedCards]);
  },

  saveTokenizedCard: (token: CardToken) => {
    const newCard = createTokenizedCard(token);

    DB.savedCards.unshift(newCard);

    return Promise.resolve(DB.savedCards);
  },

  deleteSavedCard: (token: CardToken) => {
    DB.savedCards = DB.savedCards.filter((card) => card.token !== token);

    return Promise.resolve(DB.savedCards);
  },

  submitPaymentToWardenPay: ({
    token,
    amount,
  }: PaymentRequest): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!token || !amount) {
          resolve({
            message: "Payment failed.",
            status: "error",
          });
        }

        resolve({
          message: "Payment successful.",
          status: "success",
        });
      }, 500);
    });
  },
};
