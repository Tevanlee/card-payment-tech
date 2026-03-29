export const TARGET_URL = "http://localhost:3000";

export const EVENTS = {
  ready: "CARD_IFRAME_READY",
  addStyles: "INJECT_STYLES",
  stylesAdded: "STYLES_APPLIED",
  tokenizeCard: "TOKENIZE_CARD",
  validationError: "VALIDATION_ERROR",
  cardTokenized: "CARD_TOKENIZED",
  paymentMethodSelected: "PAYMENT_METHOD_SELECTED",
  source: "payments",
};

export const MESSAGES = {
  success: "Payment successful.",
  invalidDetails: "Invalid card details.",
};

export const STATUS = {
  success: "success",
  error: "error",
};
