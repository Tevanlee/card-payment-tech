"use client";

import clsx from "clsx";

// Payment logo's to go here
import MastercardIcon from "@/app/ui/icons/Mastercard";
import VisacardIcon from "@/app/ui/icons/Visacard";
// Payment logo's end

import styles from "./styles/CardLogo.module.css";

type CardType = "master" | "visa";

interface CardLogoProps {
  type: CardType;
}

const getCardTypeLogo = (type: CardType) => {
  switch (type) {
    case "master":
      return <MastercardIcon />;
    case "visa":
      return <VisacardIcon />;
    default:
      break;
  }
};

export default function CardLogo({ type }: CardLogoProps) {
  return (
    <div className={clsx("cardLogo", styles.cardLogo)}>
      {getCardTypeLogo(type)}
    </div>
  );
}
