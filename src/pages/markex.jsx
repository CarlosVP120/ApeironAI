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
      {auth.currentUser !== null ? <Main /> : <Guest />}
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
          <>
            {item}
            <br />
          </>
        ))}
      </div>
    </div>
  );
}
