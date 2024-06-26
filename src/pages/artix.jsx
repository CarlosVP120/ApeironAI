import React, { useEffect } from "react";
import { auth, db } from "../../firebase/firebaseClient";
import { useRouter } from "next/router";
import Guest from "../components/Guest";
import Head from "next/head";
import ApeironNavbar from "../components/ApeironNavbar";
import TypeArtiX from "../components/TypeArtiX";
import GenerateImage from "../components/GenerateImage";

export default function ArtiX() {
  const router = useRouter();
  useEffect(() => {
    if (auth.currentUser === null) {
      router.replace("/login");
      return;
    }
  }, []);

  return (
    <>
      <Head>
        <title>CodeX</title>
      </Head>
      {auth.currentUser !== null ? <Test router={router} /> : <Guest />}
    </>
  );
}

function Test({ router }) {
  const signOutHandler = async () => {
    await auth.signOut();
    router.replace("/login");
  };

  const redirectHandler = (path) => {
    router.replace(path);
  };

  const [value, setValue] = React.useState("");

  return (
    <div className="tw-w-full tw-h-[100vh] tw-text-center tw-bg-black tw-text-white tw-overflow-hidden">
      <div className="tw-h-full tw-flex tw-flex-col w-gap-4 ">
        <ApeironNavbar
          setValue={setValue}
          selected={value}
          redirectHandler={redirectHandler}
          signOutHandler={signOutHandler}
          value="artix"
        />

        {value === "" && <TypeArtiX />}

        {value === "Generate Image" && <GenerateImage />}
      </div>
    </div>
  );
}
