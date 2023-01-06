import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Form.module.css";
import Link from "next/link";
import { useSession, getSession, signOut } from "next-auth/react";
import { auth, db } from "../../firebase/firebaseClient";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { data } from "autoprefixer";
import { useRouter } from "next/router";

export default function ToolHomePage() {
  // const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser === null) {
      router.replace("/login");
      return;
    }
  }, []);

  if (auth.currentUser) {
    if (!auth.currentUser.displayName) {
      auth.currentUser.displayName = auth.currentUser.email.split("@")[0];
    }
  }

  useEffect(() => {
    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const getDocData = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Nothing
        } else {
          await setDoc(docRef, {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
          });
        }
      };
      getDocData();
    }
  }, []);

  const signOutHandler = async () => {
    await auth.signOut();
    router.replace("/login");
  };

  return (
    <>
      <Head>
        <title>ApeironAI</title>
      </Head>
      {auth.currentUser !== null ? (
        <User signOutHandler={signOutHandler} />
      ) : (
        <Guest />
      )}
    </>
  );
}

// Guest
function Guest() {
  return (
    // center in the middle of the page
    <div className="tw-w-full tw-h-[100vh] tw-text-center">
      <div className="tw-h-full tw-flex tw-flex-col tw-justify-center">
        <h1
          className="tw-self-center tw-mb-10"
          style={{ fontSize: "60px", fontFamily: "Poppins" }}
        >
          Apeiron
          <span className={styles.color_font} style={{ fontWeight: "bold" }}>
            AI
          </span>
        </h1>
      </div>
    </div>
  );
}

// User
function User({ signOutHandler }) {
  return (
    <div className="tw-w-full tw-h-[100vh] tw-text-center tw-bg-black tw-text-white">
      <div className="tw-h-full tw-flex tw-flex-col tw-pt-4 tw-gap-10">
        <div className="tw-flex tw-justify-between tw-items-center tw-p-4">
          <h1
            className="tw-self-center tw-mb-10  tw-text-white tw-justify-center tw-pl-10"
            style={{ fontSize: "2rem", fontFamily: "Poppins" }}
          >
            Apeiron
            <span className={styles.color_font} style={{ fontWeight: "bold" }}>
              AI
            </span>
          </h1>
          <div className="tw-flex  tw-justify-center">
            <button
              className="tw-bg-purple-600 tw-text-white tw-p-4 tw-rounded-md tw-m-2"
              onClick={signOutHandler}
            >
              {auth.currentUser.displayName} Sign Out
            </button>
          </div>
        </div>

        <div className="details">
          <h1 className=" tw-text-4xl tw-font-semi-bold tw-py-4">
            UID: {auth.currentUser.uid}
          </h1>
        </div>

        {/* Select Product Page */}
      </div>
    </div>
  );
}
