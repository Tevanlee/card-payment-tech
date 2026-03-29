"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CardData, CardToken } from "../types/card.types";

import { CARDS_STORAGE } from "../constants";

interface CardStore {
  savedCards: CardData[];
  selectedCardToken: CardToken;
  saveCard: boolean;

  setSavedCards: (cards: CardData[]) => void;
  setSelectedCard: (token: CardToken) => void;
  toggleSaveCard: (save: boolean) => void;
}

/** Payment method - Saved cards store state management to
 * track all updates and related movements.
 */

export const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      savedCards: [],
      selectedCardToken: null,
      saveCard: false,

      setSavedCards: (cards: CardData[]) => set({ savedCards: cards }),
      setSelectedCard: (token: CardToken) => set({ selectedCardToken: token }),
      toggleSaveCard: (save: boolean) =>
        set({
          saveCard: save,
        }),
    }),
    {
      name: CARDS_STORAGE,
      partialize: (state) => ({
        selectedCardToken: state.selectedCardToken,
        saveCard: state.saveCard,
      }),
    },
  ),
);
