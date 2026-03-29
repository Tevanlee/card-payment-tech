import { onlyDigits } from "./formatters.js";

export const isValidCard = (pan, expiry, cvv, holder) => {
  if (!holder) return false;

  const cleanPan = onlyDigits(pan);
  if (cleanPan.length < 12) return false;

  if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

  if (!/^\d{3,4}$/.test(cvv)) return false;

  return true;
};
