"use client";

import { mockApiService } from "../api/mockApiService";

import type { PaymentRequest, PaymentResponse } from "../types/card.types";

export const usePayments = () => {
  const mockPayment = {
    wardenPay: async (payload: PaymentRequest): Promise<PaymentResponse> => {
      const data = await mockApiService.submitPaymentToWardenPay({
        token: payload.token,
        amount: payload.amount,
      });

      return data;
    },
  };
  return {
    mockPayment,
  };
};
