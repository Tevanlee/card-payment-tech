"use client";

import { CardData } from "../../types/card.types";

/** This resembles a DB for testing purposes as this
 * information should not be client side
 */

export let DB = {
  paymentMethods: {
    savedCards: [
      {
        id: 1,
        type: "master",
        pan: "1234 **** **** 2487",
        expiryDate: "12/24",
        token: "card_token_m7s0abri8",
      },
      {
        id: 2,
        type: "visa",
        pan: "5678 **** **** 9876",
        expiryDate: "08/26",
        token: "card_token_q4nu2lbf51f",
      },
      {
        id: 3,
        type: "visa",
        pan: "2648 **** **** 9800",
        expiryDate: "08/26",
        token: "card_token_q4nu2lbf23f",
      },
    ] as CardData[],
  },
};
