import { useEffect, useState } from "react";
import isUserFullStack from "./isUserFullStack";

export default function useFullStackStatus(user) {
  const [FullStackStatus, setFullStackStatus] = useState("");

  useEffect(() => {
    if (user) {
      const checkFullStackStatus = async function () {
        setFullStackStatus(await isUserFullStack());
      };
      checkFullStackStatus();
    }
  }, [user]);

  return FullStackStatus;
}
