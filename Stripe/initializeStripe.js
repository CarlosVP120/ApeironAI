import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_live_51KOZh6FdnCXohRp9og9oxHM4avFudXQIToipP6pDISmjDrAIkYMvvLceHW4Akuu5TkGULXHxFPHEvhK7bmUBUmhu00A0JbpkJ5"
    );
  }
  return stripePromise;
};

export default initializeStripe;
