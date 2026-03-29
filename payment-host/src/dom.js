export const getInput = (id) => document.getElementById(id);

export const getInputs = () => ({
  holder: getInput("holder"),
  pan: getInput("pan"),
  expiry: getInput("expiry"),
  cvv: getInput("cvv"),
});

export const getValues = () => {
  const { holder, pan, expiry, cvv } = getInputs();

  return {
    holder: holder?.value || "",
    pan: pan?.value || "",
    expiry: expiry?.value || "",
    cvv: cvv?.value || "",
  };
};

export const resetInputs = () => {
  Object.values(getInputs()).forEach((input) => {
    if (input) input.value = "";
  });
};

export const setInputsDisabled = (disabled) => {
  Object.values(getInputs()).forEach((input) => {
    if (input) {
      input.disabled = disabled;
      input.style.opacity = disabled ? 0.5 : 1;
      input.style.pointerEvents = disabled ? "none" : "auto";
    }
  });
};
