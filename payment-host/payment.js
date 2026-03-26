const target_url = "http://localhost:3000";
const eventMessages = {
  ready: "CARD_IFRAME_READY",
  addStyles: "INJECT_STYLES",
  stylesAdded: "STYLES_APPLIED",
  tokenizeCard: "TOKENIZE_CARD",
  validationError: "VALIDATION_ERROR",
  cardTokenized: "CARD_TOKENIZED",
  source: "payments",
};

const cardInputIds = ["holder", "pan", "expiry", "cvv"];

const sendMessage = (message) => {
  window.parent.postMessage(message, target_url);
};

const handleEvents = (event) => {
  sendMessage({
    source: eventMessages.source,
    type: eventMessages.ready,
  });

  const data = event.data;

  if (event.origin !== target_url) return;

  if (!data || typeof data !== "object") return;

  const { type, payload } = data;

  if (type === eventMessages.addStyles) {
    customStylingTrigger.styleByQuery("body", payload.body);
    customStylingTrigger.styleByQuery("form", payload.form);
    customStylingTrigger.styleByQuery("input", payload.input, true);
    customStylingTrigger.styleById("expiry", payload.customStyles);
    customStylingTrigger.styleById("cvv", payload.customStyles);

    sendMessage({
      type: eventMessages.stylesAdded,
      source: eventMessages.source,
    });
  }

  if (type === eventMessages.tokenizeCard) {
    const holder = document.getElementById("holder").value;
    const pan = document.getElementById("expiry").value;
    const expiry = document.getElementById("pan").value;
    const cvv = document.getElementById("cvv").value;

    validateAndTokenizeCard(holder, pan, expiry, cvv);
  }
};

const customStylingTrigger = {
  styleByQuery: (queryKey, styles, multiple) => {
    if (!queryKey || !styles) return;

    if (multiple) {
      document.querySelectorAll(queryKey).forEach((i) => {
        Object.assign(i.style, styles);
      });

      return;
    }

    const element = document.querySelector(queryKey);

    if (!element) return;

    Object.assign(element.style, styles);
  },

  styleById: (id, styles) => {
    if (!id & !styles) return;

    const input = document.getElementById(id);

    if (!input) return;

    Object.assign(input.style, styles);
  },
};

const validateAndTokenizeCard = async (holder, pan, expiryDate, cvv) => {
  // We only varify the details are not empty here for purposes of this test
  if (!holder || !pan || !expiryDate || !cvv) {
    sendMessage({
      type: eventMessages.validationError,
      source: eventMessages.source,
      payload: {
        message: "Invalid card details!",
        status: "error",
      },
    });

    return;
  }

  const cardToken = await cardTokenizationMockRequest();

  if (cardToken) resetInputs();

  sendMessage({
    type: eventMessages.cardTokenized,
    source: eventMessages.source,
    payload: {
      token: cardToken,
      message: "Payment successful",
      status: "success",
    },
  });
};

const resetInputs = () => {
  cardInputIds.forEach((id) => {
    const input = document.getElementById(id);
    if (input) input.value = "";
  });
};

const cardTokenizationMockRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("card_token_" + Math.random().toString(36).slice(2));
    }, 500);
  });
};

window.addEventListener("load", () => {
  window.addEventListener("message", handleEvents);
});

window.addEventListener("beforeunload", () => {
  window.removeEventListener("message", handleEvents);
});
