"use client";

import clsx from "clsx";

import type { CardData, CardToken } from "../../types/card.types";

import Card from "./Card";

import styles from "./styles/Cards.module.css";

export interface CardsProps {
  cards: CardData[];
  selected: CardToken;
  toggleSelected: (token: CardToken) => void;
  onDelete: (token: CardToken) => void;
}

export default function Cards({
  cards,
  selected,
  toggleSelected,
  onDelete,
}: CardsProps) {
  return (
    <div className="cards max-w-lg h-full max-h-33.75 flex gap-2 overflow-y-auto mb-6 transition-all duration-200">
      {cards.length === 0 ? (
        <div
          className={clsx(
            styles.noCards,
            "min-h-33.75 w-full rounded-md flex items-center justify-center",
          )}
        >
          <p className="text-sm">No saved cards added.</p>
        </div>
      ) : (
        cards.map((card: CardData) => (
          <Card
            key={card.id}
            type={card.type}
            pan={card.pan}
            expiryDate={card.expiryDate}
            selected={selected === card.token}
            onSelect={() => toggleSelected(card.token)}
            onDelete={() => onDelete(card.token)}
          />
        ))
      )}
    </div>
  );
}
