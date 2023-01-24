import { useCallback } from "react";
import { useState } from "react";
import Loading from "./Loading";
import styles from "../styles/styles.module.css";

export default function ExplainCode() {
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

  const handleClick = useCallback(
    async (e) => {
      setPrompt(value);
      setCompletion("Loading...");
      const response = await fetch("/api/walle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: value }),
      });
      const data = await response.json().then((data) => {
        setCompletion(data.result.data[0].url);
        console.log(data.result.data[0].url);
      });
    },
    [value]
  );

  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-black tw-text-white tw-flex tw-justify-center tw-overflow-hidden tw-animate-appear">
      <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center ">
        <div className="tw-font-bold tw-text-white tw-flex tw-justify-center tw-shadow-inner tw-w-full tw-h-full tw-items-center">
          <div className="tw-bg-neutral-900 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-flex tw-px-8 tw-flex-col tw-w-[45%] tw-h-[95%] 2xl:tw-h-[80%] tw-justify-between">
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
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              Generate Image
            </h1>
            <h2 className="tw-mt-1 tw-text-sm">
              Describe the image you want to generate and we will do the rest.
            </h2>
            <input
              className="tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-[#eeffff] tw-bg-neutral-800 tw-border-black  tw-resize-none tw-transition tw-duration-500 focus:tw-outline-0 tw-font-code"
              value={value}
              onChange={handleInput}
              onKeyDown={handleTab}
              placeholder="What do you want to generate?"
            />

            {completion !== "Loading..." ? (
              <>
                {completion !== "" ? (
                  <div className="tw-flex tw-justify-center tw-self-center tw-mt-4 tw-overflow-hidden tw-h-[80%]">
                    <div className="tw-text-lg tw-h-full tw-overflow-auto tw-p-4 tw-text-white tw-bg-neutral-600 tw-rounded-lg tw-font-mono">
                      <img
                        src={completion}
                        alt="Generated Image"
                        className="tw-w-full tw-h-full tw-object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="tw-flex tw-justify-center tw-self-center tw-mt-4 tw-overflow-hidden tw-h-[80%]">
                    <div className="tw-text-lg tw-h-full tw-overflow-y-auto tw-p-4 tw-text-white tw-bg-neutral-600 tw-rounded-lg tw-font-mono">
                      <img
                        src="/img/land.jpeg"
                        alt="No results"
                        className="tw-w-full tw-h-full tw-object-cover"
                      />
                    </div>
                  </div>
                )}
              </>
            ) : completion === "Loading..." ? (
              <div className="tw-flex tw-justify-center tw-h-full">
                <Loading />
              </div>
            ) : null}

            <div className="tw-flex">
              <button
                onClick={handleClick}
                className={` ${
                  completion === "" ? "tw-w-full" : "tw-w-[90%] tw-mr-2"
                }   tw-mt-4  tw-flex tw-justify-center tw-p-4 tw-rounded-lg tw-text-white  tw-transition tw-duration-500 tw-bg-purple-500 hover:tw-bg-white hover:tw-text-black`}
              >
                Explain
              </button>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={completion}
                download
                className={`${
                  completion === "" ? "tw-hidden" : ""
                } tw-animate-appear tw-mt-4 tw-w-[10%] tw-flex tw-justify-center tw-p-4 tw-rounded-lg tw-text-white  tw-transition tw-duration-500 tw-bg-purple-500 hover:tw-bg-white hover:tw-text-black`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="tw-w-6 tw-h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
