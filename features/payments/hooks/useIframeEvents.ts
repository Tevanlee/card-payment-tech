"use client";

import { Ref, useEffect, useRef, useState } from "react";
import type { IframeEvents } from "../types/event.types";
import { PaymentResponse } from "../types/card.types";

import { usePayments } from "./usePayments";
import { useCards } from "./useCards";

import { useCardStore } from "../store/cards.store";
import { useSessionStore } from "@/store/session.store";

import { TARGET_URL, EVENTS, SOURCE, IFRAME_STYLES } from "../constants";

/** The main source of truth for handling message
 * events to and from the HPP card details iframe.
 */

export const useIframeEvents = () => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const iframeIsStyled = useRef(false);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<PaymentResponse | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const { mockPayment } = usePayments();
  const { selectedCardToken, addSavedCard } = useCards();
  const { amountToPay } = useSessionStore();

  const sendMessage = (message: {}) => {
    iframe.current?.contentWindow?.postMessage(message, TARGET_URL);
  };

  const sendCardDetailsForTokenization = async () => {
    setLoading(true);

    if (selectedCardToken) {
      const data = await mockPayment.makeAPayment({
        token: selectedCardToken,
        amount: amountToPay,
      });

      setToast(data);
      setLoading(false);

      return;
    }

    sendMessage({ type: EVENTS.tokenizeCard, payload: {} });
  };

  useEffect(() => {
    const handleMessageEvent = async (event: MessageEvent) => {
      if (event.origin !== TARGET_URL) return;

      const data = event.data;

      if (!data || data.source !== SOURCE) return;

      const type: IframeEvents = data.type;
      const payload = data.payload;

      if (type === EVENTS.ready && !iframeIsStyled.current) {
        sendMessage({
          type: EVENTS.addStyles,
          payload: {
            body: IFRAME_STYLES.body,
            form: IFRAME_STYLES.form,
            input: IFRAME_STYLES.input,
            customStyles: IFRAME_STYLES.custom,
          },
        });
        iframeIsStyled.current = true;
      }

      if (type === EVENTS.stylesAdded) {
        setIsReady(true);
      }

      if (type === EVENTS.validationError) {
        setToast(payload);
        setLoading(false);
      }

      if (type === EVENTS.cardTokenized) {
        const saveCard = useCardStore.getState().saveCard;
        const amountToPay = useSessionStore.getState().amountToPay;

        const data = await mockPayment.makeAPayment({
          token: payload.token,
          amount: amountToPay,
        });

        if (saveCard) addSavedCard(payload.token);

        setToast(data);
        setLoading(false);
      }
    };

    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  }, [isReady]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!isReady) return;

    sendMessage({
      type: EVENTS.paymentMethodSelected,
      payload: { selected: selectedCardToken || null },
    });
  }, [selectedCardToken, isReady]);

  return {
    iframe,
    TARGET_URL,
    isReady,
    loading,
    toast,
    amountToPay: amountToPay.toFixed(2),
    setToast,
    sendMessage,
    sendCardDetailsForTokenization,
  };
};
