import React, { useEffect } from "react";
import { auth, db } from "../../firebase/firebaseClient";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { data } from "autoprefixer";
import { useRouter } from "next/router";
import Guest from "../components/Guest";
import Head from "next/head";
import styles from "../styles/Markex.module.css";

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
        <title>MarkeX</title>
      </Head>
      {auth.currentUser !== null ? <Test router={router} /> : <Guest />}
    </>
  );
}

function Main() {
  const [value, setValue] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [completion, setCompletion] = React.useState("");

  const handleInput = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleKeyDown = React.useCallback(
    async (e) => {
      if (e.key === "Enter") {
        setPrompt(value);
        setCompletion("Loading...");
        const response = await fetch("/api/hello", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: value }),
        });
        const data = await response.json();
        setValue("");
        setCompletion(data.result.choices[0].text);
      }
    },
    [value]
  );

  return (
    <>
      <Head>
        <title>MarkeX</title>
      </Head>
      <div className={styles.main}>
        <div>Please type your prompt</div>
        <input
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          className="tw-bg-gray-100 tw-px-4"
        />
        <div>Prompt: {prompt}</div>
        <div>
          Completion:{" "}
          {completion.split("\n").map((item) => (
            // eslint-disable-next-line react/jsx-key
            <>
              {item}
              <br />
            </>
          ))}
        </div>
      </div>
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
      </div>
    </div>
  );
}
