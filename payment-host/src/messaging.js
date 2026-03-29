import { TARGET_URL } from "./constants.js";

export const sendMessage = (message) => {
  window.parent.postMessage(message, TARGET_URL);
};
