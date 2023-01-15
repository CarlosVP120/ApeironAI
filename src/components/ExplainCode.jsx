import { useCallback } from "react";
import { useState } from "react";
import Loading from "./Loading";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import styles from "../styles/styles.module.css";

export default function CodeSnippet() {
  const code = ``;

  const [value, setValue] = useState(code);
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");

  const handleTab = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      e.target.value =
        e.target.value.substring(0, start) +
        "\t" +
        e.target.value.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      setValue(e.target.value);
    }
  };

  const handleInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const askName = "Explain me this code:";

  const handleClick = useCallback(
    async (e) => {
      setPrompt(askName + value);
      setCompletion("Loading...");
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: askName + value }),
      });
      const data = await response.json().then((data) => {
        setCompletion(data.result.choices[0].text);
      });
    },
    [value]
  );

  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-black tw-text-white tw-flex tw-justify-center">
      <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center ">
        <div className="tw-font-bold tw-text-white tw-flex tw-justify-center tw-shadow-inner tw-w-full tw-h-full tw-items-center">
          <div className="tw-bg-neutral-900 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-flex tw-px-8 tw-flex-col tw-rounded-r-none tw-w-[45%] tw-h-[90%] 2xl:tw-h-[80%] tw-justify-between">
            <h1 className="tw-flex tw-items-center tw-text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="tw-w-8 tw-h-8 tw-mr-2 tw-stroke-current tw-stroke-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
              Explain Code
            </h1>
            <h2 className="tw-mt-1 tw-text-sm">
              Explain some code based on the syntax provided.
            </h2>
            <h2 className="tw-mt-4 ">Paste your code below...</h2>
            <textarea
              className="tw-mt-4 tw-w-full tw-h-[80%] tw-p-4 tw-rounded-lg tw-text-[#eeffff] tw-bg-neutral-800 tw-border-black  tw-resize-none tw-transition tw-duration-500 focus:tw-outline-0 tw-font-code"
              value={value}
              onChange={handleInput}
              onKeyDown={handleTab}
            />

            <button
              onClick={handleClick}
              className=" tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-white tw-bg-gray-100 tw-transition tw-duration-500 tw-bg-purple-500 hover:tw-bg-white hover:tw-text-black"
            >
              Explain
            </button>
          </div>

          <div className="tw-flex tw-flex-col tw-bg-neutral-800 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-px-8 tw-rounded-l-none tw-w-[45%] tw-h-[90%] 2xl:tw-h-[80%]">
            {completion !== "Loading..." ? (
              <>
                <h1 className="tw-flex tw-items-center tw-text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="tw-w-8 tw-h-8 tw-mr-2 tw-stroke-current tw-stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                  What does this code do?
                </h1>
                <h2 className="tw-mt-1 tw-text-sm ">
                  Explain what this code does based on the syntax provided.
                </h2>
                <h2 className="tw-mt-4 ">
                  The explanation will appear here...
                </h2>
                {completion !== "" && (
                  <div className="tw-flex tw-justify-center tw-self-center tw-mt-4 tw-overflow-hidden">
                    <div className="tw-text-lg tw-h-full tw-overflow-y-auto tw-p-4 tw-text-white tw-bg-neutral-600 tw-rounded-lg tw-font-mono">
                      {completion}
                    </div>
                  </div>
                )}
              </>
            ) : completion === "Loading..." ? (
              <div className="tw-flex tw-justify-center tw-h-full">
                <Loading />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
