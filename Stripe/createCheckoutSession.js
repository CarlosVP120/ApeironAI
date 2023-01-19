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
      : "price_1MRsHWFdnCXohRp9xAwcChpE";

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
