import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_51KOZh6FdnCXohRp9VBt2xN8tznUqyorgUVyXDZxuTgL8LaCyOCl1FjbGxX1UXOl7KUZhBiigOTamG7SmtpI0QqA300dQwmgauG"
    );
  }
  return stripePromise;
};

export default initializeStripe;
