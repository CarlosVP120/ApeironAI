import React, { useEffect } from "react";
import { auth, db } from "../../firebase/firebaseClient";
import { useRouter } from "next/router";
import Guest from "../components/Guest";
import Head from "next/head";
import styles from "../styles/Markex.module.css";
import Descriptions from "../components/Descriptions";
import Keywords from "../components/Keywords";
import Ads from "../components/Ads";
import ApeironNavbar from "../components/ApeironNavbar";

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
          value="markex"
        />

        {value === "Descriptions" && <Descriptions />}
        {value === "Keywords" && <Keywords />}
        {value === "Ads" && <Ads />}
      </div>
    </div>
  );
}

// function Main() {
//   const [value, setValue] = React.useState("");
//   const [prompt, setPrompt] = React.useState("");
//   const [completion, setCompletion] = React.useState("");

//   const handleInput = React.useCallback((e) => {
//     setValue(e.target.value);
//   }, []);

//   const handleKeyDown = React.useCallback(
//     async (e) => {
//       if (e.key === "Enter") {
//         setPrompt(value);
//         setCompletion("Loading...");
//         const response = await fetch("/api/hello", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ text: value }),
//         });
//         const data = await response.json();
//         setValue("");
//         setCompletion(data.result.choices[0].text);
//       }
//     },
//     [value]
//   );

//   return (
//     <>
//       <Head>
//         <title>MarkeX</title>
//       </Head>
//       <div className={styles.main}>
//         <div>Please type your prompt</div>
//         <input
//           value={value}
//           onChange={handleInput}
//           onKeyDown={handleKeyDown}
//           className="tw-bg-gray-100 tw-px-4"
//         />
//         <div>Prompt: {prompt}</div>
//         <div>
//           Completion:{" "}
//           {completion.split("\n").map((item) => (
//             // eslint-disable-next-line react/jsx-key
//             <>
//               {item}
//               <br />
//             </>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
