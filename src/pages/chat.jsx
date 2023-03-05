import React, { useEffect } from "react";
import { auth, db } from "../../firebase/firebaseClient";
import { useRouter } from "next/router";
import Guest from "../components/Guest";
import Head from "next/head";
import ChatPage from "../components/ChatPage";
import ApeironNavbar from "../components/ApeironNavbar";

export default function Chat() {
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
        <title>Chat</title>
      </Head>
      {auth.currentUser !== null ? <Main router={router} /> : <Guest />}
    </>
  );
}

function Main({ router }) {
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
      <div className="tw-h-full tw-flex tw-flex-col">
        <ApeironNavbar
          setValue={setValue}
          selected={value}
          redirectHandler={redirectHandler}
          signOutHandler={signOutHandler}
        />

        <ChatPage />
      </div>
    </div>
  );
}
