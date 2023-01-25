import firebase from "../firebase/firebaseClient";
import getStripe from "./initializeStripe";
import { db, auth } from "../firebase/firebaseClient";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  addDoc,
  collection,
} from "firebase/firestore";

export async function createCheckoutSession(uid, typeOfProduct) {
  // const priceBasedOntypeOfProduct =
  //   typeOfProduct === "fullstack"
  //     ? "price_1MRoiPFdnCXohRp9zM5iquVf"
  //     : typeOfProduct === "markex"
  //     ? "price_1MRroFFdnCXohRp9A4AKuIjS"
  //     : typeOfProduct === "codex"
  //     ? "price_1MRsHWFdnCXohRp9xAwcChpE"
  //     : typeOfProduct === "typex"
  //     ? "price_1MS8d2FdnCXohRp9r0pijF4C"
  //     : typeOfProduct === "artix"
  //     ? "price_1MTbKyFdnCXohRp9qMZaCjHt"
  //     : null;

  const priceBasedOntypeOfProduct =
    typeOfProduct === "fullstack"
      ? "price_1MTya5FdnCXohRp9F1knmiTj"
      : typeOfProduct === "markex"
      ? "price_1MTwMEFdnCXohRp9EddMqSHz"
      : typeOfProduct === "codex"
      ? "price_1MTwKwFdnCXohRp9RGpPKB5X"
      : typeOfProduct === "typex"
      ? "price_1MTwNIFdnCXohRp9JHryf4T8"
      : typeOfProduct === "artix"
      ? "price_1MTwORFdnCXohRp9SvbOqJYX"
      : typeOfProduct === "codex-markex"
      ? "price_1MTyJgFdnCXohRp9Lh5J3tSJ"
      : typeOfProduct === "codex-typex"
      ? "price_1MTySjFdnCXohRp9T1mwSpbq"
      : typeOfProduct === "codex-artix"
      ? "price_1MTyUKFdnCXohRp94efMsaWM"
      : typeOfProduct === "markex-typex"
      ? "price_1MTyWaFdnCXohRp9wLRsOgWl"
      : typeOfProduct === "markex-artix"
      ? "price_1MTybtFdnCXohRp94UvsruXW"
      : typeOfProduct === "typex-artix"
      ? "price_1MTyeJFdnCXohRp9XqrhMbXp"
      : typeOfProduct === "codex-markex-typex"
      ? "price_1MTygRFdnCXohRp93ThIuZd4"
      : typeOfProduct === "codex-markex-artix"
      ? "price_1MTyiiFdnCXohRp9Rc4RNgdC"
      : typeOfProduct === "codex-typex-artix"
      ? "price_1MTykQFdnCXohRp9zoDLlWxm"
      : typeOfProduct === "markex-typex-artix"
      ? "price_1MTylyFdnCXohRp9kf29Xhi4"
      : null;

  const docRef = await addDoc(
    collection(db, `users/${uid}/checkout_sessions`),
    {
      price: priceBasedOntypeOfProduct,
      success_url: "https://www.apeiron-ai.com/apeiron",
      cancel_url: "https://www.apeiron-ai.com/apeiron",
    }
  );

  onSnapshot(docRef, async (snap) => {
    const { sessionId } = snap.data();

    if (sessionId) {
      // We have a Stripe Checkout sessionId, let's redirect.
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}
