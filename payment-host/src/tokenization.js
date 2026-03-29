export const cardTokenizationMockRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("card_token_" + Math.random().toString(36).slice(2));
    }, 500);
  });
};
