import { TARGET_URL, EVENTS, MESSAGES, STATUS } from "./constants.js";
import { sendMessage } from "./messaging.js";
import { getValues, resetInputs, setInputsDisabled } from "./dom.js";
import { initInputUX } from "./inputHandlers.js";
import { isValidCard } from "./validation.js";
import { cardTokenizationMockRequest } from "./tokenization.js";

const customStylingTrigger = {
  styleByQuery: (queryKey, styles, multiple) => {
    if (!queryKey || !styles) return;

    if (multiple) {
      document.querySelectorAll(queryKey).forEach((el) => {
        Object.assign(el.style, styles);
      });

      return;
    }

    const element = document.querySelector(queryKey);

    if (element) Object.assign(element.style, styles);
  },

  styleById: (id, styles) => {
    const el = document.getElementById(id);
    if (el && styles) Object.assign(el.style, styles);
  },
};

const handleEvents = (event) => {
  if (event.origin !== TARGET_URL) return;

  const data = event.data;

  if (!data || typeof data !== "object") return;

  const { type, payload } = data;

  if (type === EVENTS.addStyles) {
    customStylingTrigger.styleByQuery("body", payload.body);
    customStylingTrigger.styleByQuery("form", payload.form);
    customStylingTrigger.styleByQuery("input", payload.input, true);
    customStylingTrigger.styleById("expiry", payload.customStyles);
    customStylingTrigger.styleById("cvv", payload.customStyles);

    sendMessage({
      type: EVENTS.stylesAdded,
      source: EVENTS.source,
    });
  }

  if (type === EVENTS.tokenizeCard) {
    handleTokenization();
  }

  if (type === EVENTS.paymentMethodSelected) {
    const selected = payload?.selected;
    setInputsDisabled(!!selected);
  }
};

const handleTokenization = async () => {
  const { holder, pan, expiry, cvv } = getValues();

  if (!isValidCard(pan, expiry, cvv, holder)) {
    sendMessage({
      type: EVENTS.validationError,
      source: EVENTS.source,
      payload: {
        message: MESSAGES.invalidDetails,
        status: STATUS.error,
      },
    });

    return;
  }

  const token = await cardTokenizationMockRequest();

  resetInputs();

  sendMessage({
    type: EVENTS.cardTokenized,
    source: EVENTS.source,
    payload: {
      token,
      message: MESSAGES.success,
      status: STATUS.success,
    },
  });
};

window.addEventListener("load", () => {
  initInputUX();

  sendMessage({
    source: EVENTS.source,
    type: EVENTS.ready,
  });

  window.addEventListener("message", handleEvents);
});

window.addEventListener("beforeunload", () => {
  window.removeEventListener("message", handleEvents);
});
