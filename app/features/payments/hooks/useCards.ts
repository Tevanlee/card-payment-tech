"use client";

import { useCallback, useEffect, useState } from "react";

import { mockApiService } from "../api/mockApiService";

import { useCardStore } from "../store/cards";

import type { CardToken } from "../types/card.types";

export const useCards = () => {
  const {
    saveCard,
    savedCards,
    selectedCardToken,
    setSavedCards,
    setSelectedCard,
    toggleSaveCard,
  } = useCardStore();

  const [toggle, setToggle] = useState<boolean>(saveCard);

  // Here we want to load savedCards just once on mount and save to the store
  useEffect(() => {
    mockApiService.getSavedCards().then((cards) => {
      setSavedCards(cards);
    });
  }, []);

  // Below we are watching for a save card toggle to set the state
  useEffect(() => {
    toggleSaveCard(toggle);
  }, [toggle]);

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

    setSavedCards(updatedCards);
  }, []);

  return {
    savedCards,
    selectedCardToken,
    setSavedCards,
    selectACard,

    addSavedCard,
    onDelete,

    saveCard,
    setToggle,
  };
};
