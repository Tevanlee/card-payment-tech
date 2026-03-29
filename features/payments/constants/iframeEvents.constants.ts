/** The below URL's should come from an .env file, left here for test purposes */
export const TARGET_URL = "http://localhost:3001";

export const EVENTS = {
  ready: "CARD_IFRAME_READY",
  addStyles: "INJECT_STYLES",
  stylesAdded: "STYLES_APPLIED",
  tokenizeCard: "TOKENIZE_CARD",
  validationError: "VALIDATION_ERROR",
  paymentMethodSelected: "PAYMENT_METHOD_SELECTED",
  cardTokenized: "CARD_TOKENIZED",
};

export const SOURCE = "payments";
