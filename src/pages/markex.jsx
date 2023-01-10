import React, { useEffect } from "react";
import { auth, db } from "../../firebase/firebaseClient";
import { useRouter } from "next/router";
import Guest from "../components/Guest";
import Head from "next/head";
import styles from "../styles/Markex.module.css";
import Descriptions from "../components/Descriptions";
import Keywords from "../components/Keywords";
import Ads from "../components/Ads";

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
          <div className="tw-justify-center tw-flex">
            <div className="tw-justify-center tw-self-center tw-flex tw-gap-6">
              <div className="tw-relative tw-group">
                <div className="tw-absolute tw-inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300"></div>
                <button
                  className="tw-relative tw-px-4 tw-py-2 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center"
                  onClick={() => setValue("Descriptions")}
                >
                  <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold tw-divide-x tw-divide-gray-600">
                    <span className="tw-flex tw-items-center tw-space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="tw-w-6 tw-h-6 tw-text-pink-600"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>

                      <span className=" tw-text-gray-100">Descriptions</span>
                    </span>
                  </div>
                </button>
              </div>

              <div className="tw-relative tw-group">
                <div className="tw-absolute tw-inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300"></div>

                <button
                  className="tw-relative tw-px-4 tw-py-2 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center  "
                  onClick={() => setValue("Keywords")}
                >
                  <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold tw-divide-x tw-divide-gray-600">
                    <span className="tw-flex tw-items-center tw-space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="tw-w-6 tw-h-6 tw-text-pink-600"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>

                      <span className="tw-text-gray-100">Keywords</span>
                    </span>
                  </div>
                </button>
              </div>
              <div className="tw-relative tw-group">
                <div className="tw-absolute tw-inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300"></div>

                <button
                  className="tw-relative tw-px-4 tw-py-2 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center  "
                  onClick={() => setValue("Ads")}
                >
                  <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold tw-divide-x tw-divide-gray-600">
                    <span className="tw-flex tw-items-center tw-space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="tw-w-6 tw-h-6 tw-text-pink-600"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
                        />
                      </svg>

                      <span className=" tw-text-gray-100">Ads</span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

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

        {value === "Descriptions" && <Descriptions />}
        {value === "Keywords" && <Keywords />}
        {value === "Ads" && <Ads />}
      </div>
    </div>
  );
}
