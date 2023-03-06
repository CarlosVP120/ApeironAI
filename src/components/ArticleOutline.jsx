import { useCallback } from "react";
import { useState, useEffect } from "react";
import Loading from "./Loading";

export default function ArticleOutline() {
  const code = ``;

  const [value, setValue] = useState(code);
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        handleClick(e);
      }
    },
    [value]
  );

  const handleInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const askName = "Create me an article outline for this theme: ";
  const askDescription =
    ", give me the next format:\n1-Introduction 1.1-example 1.2-example\n2-Body 2.1-example\n3-Conclusion, and so on...";

  const handleClick = useCallback(
    async (e) => {
      setPrompt(askName + value);
      setCompletion("Loading...");
      const response = await fetch(
        "https://apeironai-mainserver.onrender.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: askName + value + askDescription }),
        }
      );
      const data = await response.json().then((data) => {
        setCompletion(
          data.result.choices[0].message.content.replace(/^\s+|\s+$/g, "")
        );
      });
    },
    [value]
  );

  const onClick = useCallback(() => {
    setValue("");
    setPrompt("");
    setCompletion("");
  }, []);

  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-white tw-text-neutral-700 tw-flex tw-justify-center tw-overflow-hidden">
      <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center tw-animate-appear ">
        <div className="tw-font-bold tw-text-neutral-700 tw-flex tw-justify-center tw-w-full tw-h-full tw-items-center">
          <div className="tw-bg-neutral-200 tw-py-4 tw-rounded-lg tw-text-left tw-text tw-flex tw-px-8 tw-flex-col tw-w-[45%] tw-h-[95%] 2xl:tw-h-[80%] tw-justify-between">
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              Article Outline
            </h1>
            <h2 className="tw-mt-1 tw-text-sm">
              Paste your theme name and get an article outline for it.
            </h2>
            <h2 className="tw-mt-4 ">
              Create an article outline for this theme:
            </h2>
            <input
              className="tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-bg-neutral-300 tw-border-black tw-resize-none tw-transition tw-duration-500 focus:tw-outline-0 tw-placeholder-neutral-500"
              value={value}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Example: Air Pollution"
            />

            {completion !== "Loading..." ? (
              <>
                {completion !== "" ? (
                  <div className="tw-flex tw-justify-center tw-self-center tw-mt-4 tw-overflow-hidden">
                    <div className="tw-text-lg tw-h-full tw-overflow-auto tw-p-4 tw-bg-neutral-300 tw-rounded-lg tw-font-mono">
                      {completion.split("\n").map((item, i) => (
                        <>
                          {item.includes(".") ? (
                            <p key={i}>&nbsp;&nbsp;&nbsp;&nbsp;{item}</p>
                          ) : (
                            <p key={i}>
                              {item}
                              <br />
                            </p>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="tw-flex tw-justify-center tw-self-center tw-mt-4 tw-overflow-hidden tw-h-[80%]">
                    <div className="tw-text-lg tw-h-full tw-overflow-y-auto tw-p-2 tw-bg-neutral-300 tw-rounded-lg tw-font-mono">
                      <span className="tw-opacity-60">
                        1-Introduction
                        <br />
                        &nbsp;&nbsp;&nbsp;1.1-Definition of Air Pollution
                        <br />
                        2-Body
                        <br />
                        &nbsp;&nbsp;&nbsp;2.1-Dangers of Air Pollution
                        <br />
                        &nbsp;&nbsp;&nbsp;2.2-Impact on Human Health
                        <br />
                        3-Causes <br />
                        &nbsp;&nbsp;&nbsp;3.1-Human Activity <br />
                        &nbsp;&nbsp;&nbsp;3.2-Natural Causes <br />
                        4-Prevention and Solutions <br />
                        &nbsp;&nbsp;&nbsp;4.1-Legislation and Government
                        Regulation <br />
                        &nbsp;&nbsp;&nbsp;4.2-Conservation and Renewable Energy
                        <br /> &nbsp;&nbsp;&nbsp;4.3-Public Education
                        <br /> 5-Conclusion
                        <br /> &nbsp;&nbsp;&nbsp;5.1-Call to Action
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : completion === "Loading..." ? (
              <div className="tw-flex tw-justify-center tw-h-full">
                <Loading />
              </div>
            ) : null}

            <button
              onClick={handleClick}
              className=" tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-white  tw-transition tw-duration-500 tw-bg-purple-500 hover:tw-bg-white hover:tw-text-black"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
