import React, { useEffect } from "react";
import { auth, db } from "../../firebase/firebaseClient";
import { useRouter } from "next/router";
import Guest from "../components/Guest";
import Head from "next/head";
import styles from "../styles/Form.module.css";

export default function MarkeX() {
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
              onClick={redirectHandler.bind(this, "/apeiron")}
              class="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3"
            >
              <span class="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-[#ff8a05] tw-via-[#ff5478] tw-to-[#ff00c6] group-hover:tw-from-[#ff00c6] group-hover:tw-via-[#ff5478] group-hover:tw-to-[#ff8a05] tw-absolute"></span>
              <span
                class="tw-relative tw-px-4 tw-py-2 tw-transition-all tw-ease-out tw-bg-black tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-400
"
              >
                <span class="tw-relative tw-text-white">Tools</span>
              </span>
            </button>
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
          </div>
        </div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/atom-one-dark.min.css"
        ></link>
        <div className="">
          <pre>
            <code>
              &lt;!DOCTYPE html&gt; &lt;html&gt; &lt;head&gt; &lt;title&gt;My
              Page&lt;/title&gt; &lt;/head&gt; &lt;body&gt; &lt;h1&gt;Welcome to
              my page&lt;/h1&gt; &lt;p&gt;Hello, World!&lt;/p&gt; &lt;/body&gt;
              &lt;/html&gt;
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
