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
      <div className="tw-h-full tw-flex tw-flex-col tw-pt-4 tw-gap-10 ">
        <div className="tw-flex tw-justify-between tw-items-center tw-px-10">
          <h1
            className="tw-self-center tw-text-white tw-justify-center"
            style={{ fontSize: "2rem", fontFamily: "Poppins" }}
          >
            Apeiron
            <span className={styles.color_font} style={{ fontWeight: "bold" }}>
              AI
            </span>
          </h1>
          <div className="tw-flex tw-justify-center ">
            <div className="tw-self-center">{auth.currentUser.displayName}</div>
            <button
              onClick={signOutHandler}
              class="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3"
            >
              <span class="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-[#ff8a05] tw-via-[#ff5478] tw-to-[#ff00c6] group-hover:tw-from-[#ff00c6] group-hover:tw-via-[#ff5478] group-hover:tw-to-[#ff8a05] tw-absolute"></span>
              <span
                class="tw-relative tw-px-4 tw-py-2 tw-transition-all tw-ease-out tw-bg-black tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-400
"
              >
                <span class="tw-relative tw-text-white">Sign Out</span>
              </span>
            </button>

            {/* add the prefix "tw-" to EVERY TAG in the above <a> component */}
          </div>
        </div>

        <div className="tw-h-3/4 tw-justify-center tw-flex tw-w-full ">
          <div className="tw-justify-center tw-self-center tw-flex tw-gap-10">
            <div className="tw-relative tw-group">
              <div className="tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-200 tw-animate-tilt"></div>
              <button className="tw-relative tw-px-7 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center">
                <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4">
                  <h1 className="tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-700">
                    CodeX
                  </h1>
                  <p>
                    <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                      Your AI tool for code.
                    </span>
                  </p>
                </div>
                <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold tw-divide-x tw-divide-gray-600">
                  <span className="tw-flex tw-items-center tw-space-x-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="tw-w-6 tw-h-6 tw-text-pink-600 tw--rotate-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
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

            <div className="tw-relative tw-group">
              <div className="tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-700 group-hover:tw-duration-200 tw-animate-tilt"></div>

              <button className="tw-relative tw-px-7 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center  ">
                <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4">
                  <h1 className="tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-700">
                    MarkeX
                  </h1>
                  <p>
                    <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                      Your market helper.
                    </span>
                  </p>
                </div>
                <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold tw-divide-x tw-divide-gray-600">
                  <span className="tw-flex tw-items-center tw-space-x-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="tw-w-6 tw-h-6 tw-text-pink-600 tw--rotate-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
          </div>
        </div>

        {/* Select Product Page */}
      </div>
    </div>
  );
}

// add the prefix "tw-" to every tag here:
// relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400
// tw-relative tw-px-6 tw-py-3 tw-transition-all tw-ease-out tw-bg-gray-900 tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-400
