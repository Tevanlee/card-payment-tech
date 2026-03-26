"use client";

import clsx from "clsx";

import CardLogo from "./CardLogo";
import CardTrashButton from "./CardTrashButton";

import styles from "./styles/Card.module.css";

import type { CardType } from "../../types/card.types";

export interface CardProps {
  type: CardType;
  pan: string;
  expiryDate: string;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export default function Card({
  type,
  pan,
  expiryDate,
  selected,
  onSelect,
  onDelete,
}: CardProps) {
  return (
    <div
      className={clsx(
        styles.card,
        "grid gap-8 flex-1 md:min-w-50 max-w-50 p-4 rounded-xl border border-transparent cursor-pointer transition-all duration-200",
        selected && styles.selected,
      )}
      onClick={onSelect}
    >
      <div className={clsx("top-layer", "flex justify-between items-center")}>
        <CardLogo type={type} />
        <CardTrashButton onClick={onDelete} />
      </div>
      <div className={clsx("bottom-layer")}>
        <p className={clsx("number")}>{pan}</p>
        <p className={clsx("ex-date")}>{expiryDate}</p>
      </div>
    </div>
  );
}
