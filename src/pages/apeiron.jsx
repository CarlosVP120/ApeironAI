import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Form.module.css";
import { useSession, getSession, signOut } from "next-auth/react";
import { auth, db } from "../../firebase/firebaseClient";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { data } from "autoprefixer";
import { useRouter } from "next/router";
import Guest from "../components/Guest";
import ApeironNavbar from "../components/ApeironNavbar";
import { createCheckoutSession } from "../../Stripe/createCheckoutSession";
import useFullStackStatus from "../../Stripe/useFullStackStatus";
import BuySub from "../components/BuySubscription";

export default function ToolHomePage() {
  const router = useRouter();

  // Link to administrative page
  // https://billing.stripe.com/p/login/test_7sI6rtcQO9gT3YceUU

  useEffect(() => {
    if (auth.currentUser === null) {
      router.replace("/login");
      return;
    }
  }, []);

  const [access, setAccess] = React.useState(null);
  const userIsFullStack = useFullStackStatus(auth.currentUser);

  useEffect(() => {
    if (userIsFullStack || userIsFullStack === "") setAccess(userIsFullStack);
  }, [userIsFullStack]);

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

  const redirectHandler = (path) => {
    router.replace(path);
  };

  console.log("access: ", access);

  return (
    <>
      <Head>
        <title>Tools</title>
      </Head>
      {auth.currentUser !== null ? (
        <>
          {access !== "" && access !== "none" && access !== null ? (
            <User
              signOutHandler={signOutHandler}
              redirectHandler={redirectHandler}
              access={access}
            />
          ) : access === "none" ? (
            <BuySub
              uid={auth.currentUser.uid}
              signOutHandler={signOutHandler}
              redirectHandler={redirectHandler}
            />
          ) : (
            <div className="tw-w-full tw-h-[100vh] tw-text-center tw-bg-black tw-text-white tw-overflow-hidden">
              <div className="tw-h-full tw-flex tw-flex-col tw-gap-10 "></div>
            </div>
          )}
        </>
      ) : (
        <Guest />
      )}
    </>
  );
}

function User({ signOutHandler, redirectHandler, access }) {
  return (
    <div className="tw-w-full tw-h-[100vh] tw-text-center tw-bg-black tw-text-white tw-overflow-hidden">
      <div className="tw-h-full tw-flex tw-flex-col tw-gap-10 ">
        <ApeironNavbar
          signOutHandler={signOutHandler}
          value="main"
          redirectHandler={redirectHandler}
        />

        <div className="tw-h-3/4 tw-justify-center tw-flex tw-w-full ">
          <div className="tw-justify-center tw-self-center tw-flex tw-gap-10">
            {access === "fullstack" || access === "codex" ? (
              <div className="tw-flex tw-relative tw-group tw-max-w-sm">
                <div className="tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt"></div>
                <button
                  className="tw-relative tw-px-7 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center"
                  onClick={redirectHandler.bind(this, "/codex")}
                >
                  <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4">
                    <h1 className="tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300">
                      CodeX
                    </h1>
                    <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                      <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                        Your AI tool for code.
                      </span>
                      <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[20vw] tw-my-3">
                        With CodeX, find the best solutions for your coding
                        problems, learn how to code better, and get help from
                        others.
                      </p>
                    </p>
                  </div>
                  <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold tw-divide-x tw-divide-gray-600">
                    <span className="tw-flex tw-items-center tw-space-x-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="tw-w-6 tw-h-6 tw-text-pink-600 tw--rotate-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                        />
                      </svg>

                      <span className="tw-pr-6 tw-text-gray-100">CodeX</span>
                    </span>
                    <span className="tw-pl-6 tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200">
                      Start &rarr;
                    </span>
                  </div>
                </button>
              </div>
            ) : null}
            {access === "fullstack" || access === "markex" ? (
              <div className="tw-relative tw-group tw-max-w-sm">
                <div className="tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt"></div>

                <button
                  className="tw-relative tw-px-7 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center  "
                  onClick={redirectHandler.bind(this, "/markex")}
                >
                  <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4">
                    <h1 className="tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300">
                      MarkeX
                    </h1>

                    <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                      <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                        Your market helper.
                      </span>
                      <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[20vw] tw-my-3">
                        With MarkeX, find the best description for your products
                        and create the best ads for your business.
                      </p>
                    </p>
                  </div>
                  <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold tw-divide-x tw-divide-gray-600">
                    <span className="tw-flex tw-items-center tw-space-x-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="tw-w-6 tw-h-6 tw-text-pink-600 tw--rotate-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>

                      <span className="tw-pr-6 tw-text-gray-100">MarkeX</span>
                    </span>
                    <span className="tw-pl-6 tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200">
                      Start &rarr;
                    </span>
                  </div>
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Select Product Page */}
      </div>
    </div>
  );
}
