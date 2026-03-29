export interface SessionResponse {
  sessionToken: string;
  amountToPay: number;
  status: number;
  createdAt: string;
  expiresAt: string;
}
