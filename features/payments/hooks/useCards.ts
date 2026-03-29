"use client";

import { use, useCallback, useEffect, useState } from "react";

import { mockApiService } from "../api/mockApiService";

import { useSessionStore } from "@/store/session.store";
import { useCardStore } from "../store/cards.store";

import type { CardToken } from "../types/card.types";

/** This hook gives us the ability to handle
 * saved payment methods (savedCards) */

export const useCards = () => {
  const {
    saveCard,
    savedCards,
    selectedCardToken,

    setSavedCards,
    setSelectedCard,
    toggleSaveCard,
  } = useCardStore();

  const selectACard = (token: CardToken) => {
    if (selectedCardToken === token) return setSelectedCard(null);

    setSelectedCard(token);
  };

  const addSavedCard = useCallback(async (token: CardToken) => {
    const updatedCards = await mockApiService.saveTokenizedCard(token);

    setSavedCards(updatedCards);
    setSelectedCard(token);
  }, []);

  const onDelete = useCallback(async (token: CardToken) => {
    const updatedCards = await mockApiService.deleteSavedCard(token);

    if (selectedCardToken === token) {
      setSelectedCard(null);
    }

    setSavedCards(updatedCards);
  }, []);

  useEffect(() => {
    const sessionToken = useSessionStore.getState().sessionToken;

    mockApiService.getPaymentMethods(sessionToken).then((cards) => {
      setSavedCards(cards);
    });
  }, []);

  useEffect(() => {
    if (!selectedCardToken) return;

    const tokenExists = savedCards.some(
      (card) => card.token === selectedCardToken,
    );

    if (!tokenExists) {
      setSelectedCard(null);
    }
  }, []);

  useEffect(() => {
    if (savedCards.length === 0) {
      setSelectedCard(null);
    }
  }, [savedCards]);

  return {
    savedCards,
    selectedCardToken,
    setSavedCards,
    selectACard,

    addSavedCard,
    onDelete,

    saveCard,
    setToggle: toggleSaveCard,
  };
};
