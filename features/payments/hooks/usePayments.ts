"use client";

import { mockApiService } from "../api/mockApiService";

import type {
  CardToken,
  PaymentRequest,
  PaymentResponse,
} from "../types/card.types";

/** This hook exposes an object with functions
 * to mock payments using our mockApiServices (external Api's).  */

export const usePayments = () => {
  const mockPayment = {
    wardenPay: async (payload: PaymentRequest): Promise<PaymentResponse> => {
      const data = await mockApiService.submitPaymentToWardenPay({
        token: payload.token,
        amount: payload.amount,
      });

      return data;
    },
    makeAPayment: async (payload: PaymentRequest): Promise<PaymentResponse> => {
      return await mockPayment.wardenPay(payload);
    },
  };
  return {
    mockPayment,
  };
};
