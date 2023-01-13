import { useCallback, useEffect, useState } from "react";

import { auth, db } from "../../firebase/firebaseClient";
import { doc, onSnapshot } from "firebase/firestore";
import MarkeXLayout from "./MarkeXLayout";

export default function Keywords() {
  const type = "keywords";

  const [dataArray, setDataArray] = useState([]);

  const docRef = doc(db, "users", auth.currentUser.uid);

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      // if there is no data, set it to an empty array
      if (doc.data().keywords) {
        setDataArray(doc.data().keywords.reverse());
      }
    });
  }, []);

  const askName = "Create a name for a: ";
  const askDescription =
    ", and number the best 10 keywords to sell this product.\nDont include any number and give them in the format:\nGenerated Name, keyword-1, keyword-2, keyword-3, keyword-4, keyword-5, keyword-6, keyword-7, keyword-8, keyword-9, keyword-10";

  return (
    <MarkeXLayout
      dataArray={dataArray}
      type={type}
      askName={askName}
      askDescription={askDescription}
    />
  );
}
