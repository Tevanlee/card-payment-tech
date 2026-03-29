"use client";

import clsx from "clsx";

import CardLogo from "./CardLogo";
import CardTrashButton from "./CardTrashButton";

import styles from "./styles/Card.module.css";

import type { CardType } from "@/features/payments/types/card.types";

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
        "grid gap-6 md:gap-8 shrink-0 md:min-w-50 max-w-50 h-fit p-4 rounded-xl border border-transparent cursor-pointer transition-all duration-200",
        selected && styles.selected,
      )}
      onClick={onSelect}
    >
      <div className={clsx("top-layer", "flex justify-between items-center")}>
        <CardLogo type={type} />
        <CardTrashButton onClick={onDelete} />
      </div>
      <div
        className={clsx(
          "bottom-layer",
          "text-xs m-0 leading-normal md:text-sm",
        )}
      >
        <p className={clsx("number")}>{pan}</p>
        <p className={clsx("ex-date")}>{expiryDate}</p>
      </div>
    </div>
  );
}
