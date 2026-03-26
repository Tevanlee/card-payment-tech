"use client";

import { CardData, CardToken, CardType } from "../../types/card.types";

const getRandomType = (): CardType => {
  return Math.random() > 1 ? "visa" : "master";
};

function getRandomPan() {
  const first4 = Math.floor(1000 + Math.random() * 9000);
  const last4 = Math.floor(1000 + Math.random() * 9000);

  return `${first4} **** **** ${last4}`;
}

function getRandomExpiry() {
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const year = String(new Date().getFullYear() + 2).slice(-2);
  return `${month}/${year}`;
}

export function createTokenizedCard(token: CardToken): CardData {
  return {
    id: Date.now(),
    type: getRandomType(),
    pan: getRandomPan(),
    expiryDate: getRandomExpiry(),
    token,
  };
}
