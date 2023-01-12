import React, { useEffect } from "react";
import { auth, db } from "../../firebase/firebaseClient";
import { useRouter } from "next/router";
import Guest from "../components/Guest";
import Head from "next/head";
import ApeironNavbar from "../components/ApeironNavbar";
import CodeSnippet from "../components/CodeSnippet";

export default function CodeX() {
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
    <div className="tw-w-full tw-h-[100vh] tw-text-center tw-bg-black tw-text-white">
      <div className="tw-h-full tw-flex tw-flex-col tw-pt-4 tw-gap-4 ">
        <ApeironNavbar
          setValue={setValue}
          redirectHandler={redirectHandler}
          signOutHandler={signOutHandler}
          value="codex"
        />
        <CodeSnippet />
      </div>
    </div>
  );
}
