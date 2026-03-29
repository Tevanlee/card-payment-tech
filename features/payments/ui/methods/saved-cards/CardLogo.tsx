"use client";

import clsx from "clsx";

// Payment logo's to go here
import MastercardIcon from "@/ui/icons/Mastercard";
import VisacardIcon from "@/ui/icons/Visacard";
// Payment logo's end

import styles from "./styles/CardLogo.module.css";

type CardType = "master" | "visa";

interface CardLogoProps {
  type: CardType;
}

/** The below can grow to cater for all card types
 * based on what response we get from our payment methods
 * request.
 */

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
