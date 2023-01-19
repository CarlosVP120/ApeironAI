import firebase from "../firebase/firebaseClient";
import { db, auth } from "../firebase/firebaseClient";

export default async function isUserSub() {
  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();

  return decodedToken?.claims?.stripeRole
    ? decodedToken.claims.stripeRole
    : "none";
}
