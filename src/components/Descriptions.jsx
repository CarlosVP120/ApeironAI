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
  const type = "descriptions";

  const [dataArray, setDataArray] = useState([]);

  const docRef = doc(db, "users", auth.currentUser.uid);

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      // if there is no data, set it to an empty array
      if (doc.data().descriptions) {
        setDataArray(doc.data().descriptions.reverse());
      }
    });
  }, []);

  const askName = "Give me a name for a ";
  const askDescription =
    ", and give me a professional description to sell this product. Put a dot between the name and the description.";

  return (
    <MarkeXLayout
      dataArray={dataArray}
      type={type}
      askName={askName}
      askDescription={askDescription}
    />
  );
}
