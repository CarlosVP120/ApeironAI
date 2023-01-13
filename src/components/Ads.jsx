import { useCallback, useEffect, useState } from "react";

import { auth, db } from "../../firebase/firebaseClient";
import { doc, onSnapshot } from "firebase/firestore";
import MarkeXLayout from "./MarkeXLayout";

export default function Ads() {
  const type = "ads";

  const [dataArray, setDataArray] = useState([]);

  const docRef = doc(db, "users", auth.currentUser.uid);

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      // if there is no data, set it to an empty array
      if (doc.data().ads) {
        setDataArray(doc.data().ads.reverse());
      }
    });
  }, []);

  const askName = "Generate 5 ads for . based on the headline: ";
  const askDescription = `.\nStrictly separate them with commas, for example: \n"ad-1", "ad-2", "ad-3", "ad-4", "ad-5"`;

  return (
    <MarkeXLayout
      dataArray={dataArray}
      type={type}
      askName={askName}
      askDescription={askDescription}
    />
  );
}
