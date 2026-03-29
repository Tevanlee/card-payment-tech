"use client";

import type {
  PaymentResponse,
  PaymentRequest,
  CardData,
  CardToken,
} from "../types/card.types";

import { MESSAGES, STATUS } from "../constants";

import { createTokenizedCard } from "./lib/mockTokenizedCard";

import { DB } from "./lib/mockDb";

export const mockApiService = {
  getPaymentMethods: (sessionToken: string): Promise<CardData[]> => {
    if (!sessionToken) return Promise.resolve([]);

    return Promise.resolve([...DB.paymentMethods.savedCards]);
  },

  saveTokenizedCard: (token: CardToken) => {
    const { savedCards } = DB.paymentMethods;
    const newCard = createTokenizedCard(token);

    savedCards.unshift(newCard);

    return Promise.resolve(DB.paymentMethods.savedCards);
  },

  deleteSavedCard: (token: CardToken) => {
    let { savedCards } = DB.paymentMethods;
    DB.paymentMethods.savedCards = savedCards.filter(
      (card) => card.token !== token,
    );

    return Promise.resolve(savedCards);
  },

  submitPaymentToWardenPay: ({
    token,
    amount,
  }: PaymentRequest): Promise<PaymentResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!token || !amount) {
          resolve({
            message: MESSAGES.failed,
            status: STATUS.error,
          });
        }

        resolve({
          message: MESSAGES.success,
          status: STATUS.success,
        });
      }, 500);
    });
  },
};
