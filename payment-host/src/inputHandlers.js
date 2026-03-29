import {
  formatCardHolder,
  formatCardNumber,
  formatExpiry,
  formatCVV,
} from "./formatters.js";
import { getInputs } from "./dom.js";

const attachFormatter = (input, formatter) => {
  if (!input) return;

  input.addEventListener("input", () => {
    input.value = formatter(input.value);
  });
};

export const initInputUX = () => {
  const { holder, pan, expiry, cvv } = getInputs();

  attachFormatter(holder, formatCardHolder);
  attachFormatter(pan, formatCardNumber);
  attachFormatter(expiry, formatExpiry);
  attachFormatter(cvv, formatCVV);
};
