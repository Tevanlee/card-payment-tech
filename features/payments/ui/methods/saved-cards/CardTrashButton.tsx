"use client";

import { Trash2 } from "lucide-react";

interface CardTrashBtnProps {
  ariaLabel?: string;
  onClick: () => void;
}

export default function CardTrashButton({
  ariaLabel = "Remove card",
  onClick,
}: CardTrashBtnProps) {
  return (
    <button role="button" onClick={onClick} aria-label={ariaLabel}>
      <Trash2 size={18} />
    </button>
  );
}
