export type CardType = "master" | "visa";

export type CardToken = string | null;

export type CardData = {
  id: string | number;
  type: CardType;
  pan: string;
  expiryDate: string;
  token: CardToken;
  selected?: boolean;
};

export interface PaymentRequest {
  token: CardToken;
  amount: number;
}

export interface PaymentResponse {
  message: string;
  status: "error" | "success";
}
