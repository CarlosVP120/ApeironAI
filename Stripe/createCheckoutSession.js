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
  const priceBasedOntypeOfProduct =
    typeOfProduct === "fullstack"
      ? "price_1MRoiPFdnCXohRp9zM5iquVf"
      : typeOfProduct === "markex"
      ? "price_1MRroFFdnCXohRp9A4AKuIjS"
      : typeOfProduct === "codex"
      ? "price_1MRsHWFdnCXohRp9xAwcChpE"
      : typeOfProduct === "typex"
      ? "price_1MS8d2FdnCXohRp9r0pijF4C"
      : "price_1MTbKyFdnCXohRp9qMZaCjHt";

  const docRef = await addDoc(
    collection(db, `users/${uid}/checkout_sessions`),
    {
      price: priceBasedOntypeOfProduct,
      success_url: "http://localhost:3000/apeiron",
      cancel_url: "http://localhost:3000/apeiron",
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
