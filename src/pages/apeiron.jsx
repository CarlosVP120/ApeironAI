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

  if (typeof window !== "undefined") {
    history.pushState(null, document.title, location.href); // this is to prevent the back button from navigating to the previous page
    window.addEventListener("popstate", function (event) {
      // The popstate event is fired each time when the current history entry changes.
      history.pushState(null, "ApeironAI", "/"); // this changes the url to the current page without adding it to the history
      location.reload(); // this reloads the page
    });
  }

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
    if (
      auth.currentUser?.uid === "re0xUfkL31cDNYcbYCeIdnp1CU62" ||
      auth.currentUser?.uid === "AZfy1rwg9Ia0qb4c6VcM5Jb8Jrd2" ||
      auth.currentUser?.uid === "bOgJMKRQSkaS3Z1Ef1snw4AFqp23"
    ) {
      setAccess("fullstack");
    }
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
              <div className=" tw-justify-between tw-items-center tw-px-10 tw-relative tw-py-3 tw-pt-4 tw-flex"></div>
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

        <div className="tw-h-3/4 tw-justify-center tw-flex tw-flex-col tw-w-full tw-animate-appear tw-gap-10">
          <div className="tw-justify-center tw-self-center tw-flex tw-gap-10 tw-flex-col md:tw-flex-row">
            {access === "fullstack" || access.includes("codex") ? (
              <div className="tw-flex tw-relative tw-group tw-max-w-sm">
                <div className="group-hover:tw-animate-pulse tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt"></div>
                <button
                  className="tw-relative tw-px-2 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center"
                  onClick={redirectHandler.bind(this, "/codex")}
                >
                  <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4 tw-hidden md:tw-block">
                    <h1 className="tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300">
                      ProCodeX
                    </h1>
                    <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                      <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                        Your AI tool for code.
                      </span>
                      <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[19vw] tw-my-3">
                        With ProCodeX, find the best solutions for your coding
                        problems, and learn how to code better with our
                        AI-powered tool.
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
                    <span className="tw-pl-6 tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200 tw-self-center">
                      Start &rarr;
                    </span>
                  </div>
                </button>
              </div>
            ) : null}
            {access === "fullstack" || access.includes("markex") ? (
              <div className="tw-flex tw-relative tw-group tw-max-w-sm">
                <div className="group-hover:tw-animate-pulse tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt"></div>
                <button
                  className="tw-relative tw-px-2 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center"
                  onClick={redirectHandler.bind(this, "/markex")}
                >
                  <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4 tw-hidden md:tw-block">
                    <h1 className="tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300">
                      MarkeX
                    </h1>
                    <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                      <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                        Your market helper.
                      </span>
                      <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[19vw] tw-my-3">
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
                          d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                        />
                      </svg>

                      <span className="tw-pr-6 tw-text-gray-100">MarkeX</span>
                    </span>
                    <span className="tw-pl-6 tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200 tw-self-center">
                      Start &rarr;
                    </span>
                  </div>
                </button>
              </div>
            ) : null}
            {access === "fullstack" || access.includes("typex") ? (
              <div className="tw-flex tw-relative tw-group tw-max-w-sm">
                <div className="group-hover:tw-animate-pulse tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt"></div>

                <button
                  className="tw-relative tw-px-2 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center  "
                  onClick={redirectHandler.bind(this, "/typex")}
                >
                  <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4 tw-hidden md:tw-block">
                    <h1 className="tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300">
                      TypeX
                    </h1>

                    <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                      <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                        Your best editor.
                      </span>
                      <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[19vw] tw-my-3">
                        With TypeX, you can edit your text in a simple, fast and
                        easy way, and generate the best articles for your blog.
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
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                      <span className="tw-pr-6 tw-text-gray-100">TypeX</span>
                    </span>
                    <span className="tw-pl-6 tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200 tw-self-center">
                      Start &rarr;
                    </span>
                  </div>
                </button>
              </div>
            ) : null}
            {access === "fullstack" || access.includes("artix") ? (
              <div className="tw-flex tw-relative tw-group tw-max-w-sm">
                <div className=" group-hover:tw-animate-pulse tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt"></div>

                <button
                  className="tw-relative tw-px-2 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center  "
                  onClick={redirectHandler.bind(this, "/artix")}
                >
                  <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4 tw-hidden md:tw-block">
                    <h1 className="tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300">
                      ArtiX
                    </h1>

                    <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                      <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                        Shape your imagination.
                      </span>
                      <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[19vw] tw-my-3">
                        With ArtiX, you can create your own images, and the best
                        of all, you can do it in a simple way: Imaginating.
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
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                      <span className="tw-pr-6 tw-text-gray-100">ArtiX</span>
                    </span>
                    <span className="tw-pl-6 tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200 tw-self-center">
                      Start &rarr;
                    </span>
                  </div>
                </button>
              </div>
            ) : null}
          </div>
          <div className="tw-animate-appearLong">
            <h1 className="tw-font-bold tw-opacity-50">
              Powered by
              <svg
                id="openai-horizontal"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 29.53"
                fill="currentColor"
                className="tw-w-20 tw-h-6 tw-inline-block tw-ml-[6px] tw-mb-1"
              >
                <path d="M40.7,6.98s-.05,0-.07,0c-.02,0-.05,0-.07,0-4.67,0-7.58,2.91-7.58,7.6v2.53c0,4.69,2.9,7.6,7.58,7.6,.02,0,.05,0,.07,0,.02,0,.05,0,.07,0,4.67,0,7.58-2.91,7.58-7.6v-2.53c0-4.69-2.91-7.6-7.58-7.6Zm4.31,10.31c0,3.08-1.6,4.86-4.38,4.89-2.78-.03-4.38-1.81-4.38-4.89v-2.88c0-3.08,1.6-4.86,4.38-4.89,2.78,.03,4.38,1.81,4.38,4.89v2.88Zm40.57-5.79s-.06,0-.09,0c-.02,0-.03,0-.05,0-1.77,0-3.03,.6-3.65,1.75l-.19,.35v-1.8h-3.02v12.56h3.17v-7.48c0-1.76,.95-2.77,2.59-2.8,1.57,.03,2.47,1.02,2.47,2.73v7.55h3.17v-8.09c0-2.99-1.64-4.77-4.39-4.77Zm34.42-1.77v-2.4h-10.46v2.4h3.67v12.22h-3.67v2.4h10.46v-2.4h-3.67V9.73h3.67Zm-18.75-2.4h0s-3.28,0-3.28,0l-6.1,17.04h3.43l1.17-3.65h6.66v.04s1.17,3.62,1.17,3.62h3.43l-6.11-17.04h-.36Zm-4.03,10.98l2.57-8.05,2.55,8.05h-5.12Zm-39.45-6.81s-.05,0-.07,0c-.03,0-.05,0-.07,0-1.59,0-2.96,.66-3.68,1.76l-.18,.28v-1.74h-3.02V28.69h3.17v-5.9l.18,.27c.68,1.01,2.01,1.61,3.56,1.61,.03,0,.05,0,.08,0,.02,0,.04,0,.07,0,2.61,0,5.24-1.7,5.24-5.51v-2.14c0-2.74-1.62-5.51-5.26-5.51Zm2.1,7.5c0,2-1.15,3.24-3.01,3.28-1.73-.03-2.94-1.35-2.94-3.23v-1.89c0-1.9,1.22-3.24,2.97-3.28,1.84,.03,2.98,1.28,2.98,3.28v1.84Zm11.05-7.5h0c-.06,0-.12,.01-.18,.01-.06,0-.12-.01-.18-.01h0c-3.57,0-5.78,2.23-5.78,5.81v1.76c0,3.45,2.24,5.59,5.83,5.59,.08,0,.15,0,.22-.01,.05,0,.09,.01,.14,.01,2.41,0,4.09-.88,5.16-2.7l-2.13-1.23c-.71,1.05-1.66,1.84-3.02,1.84-1.82,0-2.91-1.12-2.91-3.01v-.5h8.44v-2.08c0-3.34-2.19-5.49-5.59-5.49Zm-2.86,5.54v-.3c0-2,.95-3.12,2.68-3.2,1.66,.08,2.66,1.18,2.66,2.99v.5s-5.34,0-5.34,0Z"></path>
                <path d="M27.21,12.08c.67-2.01,.44-4.21-.63-6.04-1.61-2.8-4.85-4.24-8.01-3.57C17.16,.89,15.14-.01,13.02,0c-3.23,0-6.1,2.08-7.1,5.15-2.08,.43-3.87,1.73-4.92,3.57-1.62,2.8-1.25,6.32,.92,8.72-.67,2.01-.44,4.21,.63,6.03,1.61,2.81,4.85,4.25,8.02,3.58,1.4,1.58,3.42,2.49,5.54,2.48,3.23,0,6.1-2.08,7.1-5.15,2.08-.43,3.87-1.73,4.91-3.57,1.63-2.8,1.26-6.32-.91-8.72Zm-2.3-5.07c.64,1.12,.88,2.43,.66,3.7-.04-.03-.12-.07-.17-.1l-5.88-3.4c-.3-.17-.67-.17-.97,0l-6.89,3.98v-2.92l5.69-3.29c2.65-1.53,6.03-.62,7.56,2.03Zm-13.25,6.07l2.9-1.68,2.9,1.68v3.35l-2.9,1.68-2.9-1.68v-3.35ZM13.01,1.93c1.3,0,2.55,.45,3.55,1.28-.04,.02-.12,.07-.18,.1l-5.88,3.39c-.3,.17-.48,.49-.48,.84v7.96l-2.53-1.46V7.46c0-3.06,2.47-5.53,5.53-5.54ZM2.68,9.69h0c.65-1.12,1.66-1.98,2.88-2.43v6.99c0,.35,.18,.66,.48,.84l6.88,3.97-2.54,1.47-5.68-3.28c-2.64-1.53-3.55-4.91-2.02-7.56Zm1.55,12.83h0c-.65-1.11-.88-2.43-.66-3.7,.04,.03,.12,.07,.17,.1l5.88,3.4c.3,.17,.67,.17,.97,0l6.88-3.98v2.92l-5.69,3.28c-2.65,1.52-6.03,.62-7.56-2.02Zm11.89,5.08c-1.29,0-2.55-.45-3.54-1.28,.04-.02,.13-.07,.18-.1l5.88-3.39c.3-.17,.49-.49,.48-.84v-7.95l2.53,1.46v6.57c0,3.06-2.48,5.54-5.53,5.54Zm10.34-7.76c-.65,1.12-1.67,1.98-2.88,2.42v-6.99c0-.35-.18-.67-.48-.84h0l-6.89-3.98,2.53-1.46,5.69,3.28c2.65,1.53,3.55,4.91,2.02,7.56Z"></path>
              </svg>
            </h1>
          </div>
        </div>

        {/* Select Product Page */}
      </div>
    </div>
  );
}
