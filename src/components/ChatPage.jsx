import { useCallback, useEffect, useState } from "react";
import RecentCard from "./RecentCard";
import ShowingProduct from "./ShowingProduct";
import { auth, db } from "../../firebase/firebaseClient";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import ApeironNavbar from "./ApeironNavbar";
import { data } from "autoprefixer";
import MarkeXLayout from "./MarkeXLayout";

export default function Descriptions() {
  const type = "chats";

  const [dataArray, setDataArray] = useState([]);

  const docRef = doc(db, "users", auth.currentUser.uid);

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      // if there is no data, set it to an empty array
      if (doc.data().chats) {
        setDataArray(doc.data().chats.reverse());
      }
    });
  }, []);

  return (
    <div className="tw-flex tw-w-full tw-h-full tw-flex-row tw-gap-5 tw-justify-center">
      <div className="tw-w-[20vw] tw-bg-red-500">Hi</div>
      <div className="tw-w-[80vw]">Hi</div>
    </div>
  );
}
