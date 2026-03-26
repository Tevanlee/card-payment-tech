"use client";

import { useEffect, useRef, useState } from "react";

import type { IframeEvents } from "../types/event.types";
import { CardToken, PaymentResponse } from "../types/card.types";

import { usePayments } from "./usePayments";
import { useCards } from "./useCards";

import { useCardStore } from "../store/cards";

import {
  DOMAIN,
  TARGET_URL,
  MESSAGES,
  SOURCE,
  IFRAME_STYLES,
} from "../constants";

export const useIframeEvents = () => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const iframeIsStyled = useRef(false);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<PaymentResponse | null>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [amount, setAmount] = useState(100);

  const { mockPayment } = usePayments();
  const { selectedCardToken, addSavedCard } = useCards();

  // The below allows us to target the iframe and post
  // a message via the event listener
  const sendMessage = (message: {}) => {
    iframe.current?.contentWindow?.postMessage(message, TARGET_URL);
  };

  // Here we listen for communication from the iframe payment_rovider source
  useEffect(() => {
    const handleMessageEvent = async (event: MessageEvent) => {
      if (event.origin !== DOMAIN) return;

      const data = event.data;

      if (!data) return;
      if (data.source !== SOURCE) return;

      const type: IframeEvents = data.type;

      if (type === MESSAGES.ready && !iframeIsStyled.current) {
        sendMessage({
          type: MESSAGES.addStyles,
          payload: {
            body: IFRAME_STYLES.body,
            form: IFRAME_STYLES.form,
            input: IFRAME_STYLES.input,
            customStyles: IFRAME_STYLES.custom,
          },
        });
      }

      iframeIsStyled.current = true;

      if (type === MESSAGES.stylesAdded) {
        setIsReady(true);
      }

      const payload = data?.payload;

      if (type === MESSAGES.validationError) {
        setToast(payload);
        setLoading(false);
      }

      if (type === MESSAGES.cardTokenized) {
        const data = await makeAPayment(payload.token, amount, true);

        const saveCard = useCardStore.getState().saveCard;

        if (saveCard) {
          addSavedCard(payload.token);
        }

        setToast(data);

        setLoading(false);
      }
    };

    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast]);

  const makeAPayment = async (
    token: CardToken,
    amount: number,
    failFlag: boolean,
  ): Promise<PaymentResponse> => {
    const data: PaymentResponse = await mockPayment.wardenPay({
      token: token,
      amount: amount,
    });

    return data;
  };

  const submitCardForTokenization = async () => {
    setLoading(true);

    if (selectedCardToken) {
      const data = await makeAPayment(selectedCardToken, amount, true);

      setToast(data);
      setLoading(false);

      return;
    }

    sendMessage({
      type: MESSAGES.tokenizeCard,
      payload: {},
    });
  };

  return {
    iframe,
    TARGET_URL,
    isReady,
    loading,
    toast,
    setToast,
    sendMessage,
    submitCardForTokenization,
  };
};
