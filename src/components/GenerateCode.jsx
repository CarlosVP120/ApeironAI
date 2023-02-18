import { useCallback } from "react";
import { useState } from "react";
import Loading from "./Loading";

export default function GenerateCode() {
  const [value, setValue] = useState("");
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const [language, setLanguage] = useState("javascript");

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

  const askName = "Generate a " + language + " code that: ";

  const handleClick = async (e) => {
    let prompt = askName + value;
    setCompletion("Loading...");
    const response = await fetch("https://apeironai-mainserver.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: prompt }),
    });
    const data = await response.json().then((data) => {
      setCompletion(data.result.choices[0].text.replace(/^\s+|\s+$/g, ""));
    });
  };

  const handleSelect = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-black tw-text-white tw-flex tw-justify-center tw-overflow-hidden tw-animate-appear">
      <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center ">
        <div className="tw-font-bold tw-text-white tw-flex tw-justify-center tw-shadow-inner tw-w-full tw-h-full tw-items-center">
          <div className="tw-bg-neutral-900 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-flex tw-px-8 tw-flex-col tw-rounded-r-none tw-w-[30%] 2xl:tw-h-[80%] tw-h-[90%] tw-justify-between">
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
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
              Generate Code
            </h1>
            <h2 className="tw-mt-1 tw-text-sm">
              Create new code based on the syntax provided.
            </h2>
            <h2 className="tw-mt-4 ">
              {"Generate a " + language + " code that... "}
            </h2>
            <textarea
              className="tw-mt-4 tw-w-full tw-h-[80%] tw-p-4 tw-rounded-lg tw-text-[#eeffff] tw-font-code tw-bg-neutral-800 tw-border-black  tw-resize-none tw-transition tw-duration-500 focus:tw-outline-0 tw-font-code"
              value={value}
              onChange={handleInput}
              onKeyDown={handleTab}
              placeholder="Calculate the area of a circle with radius 5"
            />
            <button
              onClick={handleClick}
              className=" tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-white tw-bg-gray-100 tw-transition tw-duration-500 tw-bg-purple-500 hover:tw-bg-white hover:tw-text-black"
            >
              Generate
            </button>
          </div>
          <div className="tw-flex tw-flex-col tw-bg-neutral-800 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-px-8 tw-rounded-l-none tw-min-w-[30%] tw-max-w-[65%] 2xl:tw-h-[80%] tw-h-[90%]">
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
                  Code generated
                </h1>
                <h2 className="tw-mt-1 tw-text-sm">
                  This is where your code will appear.
                </h2>
                <h2 className="tw-mt-4 tw-w-full">
                  Select the language you want to use.
                </h2>
                <div className="tw-w-full">
                  <select
                    className="tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-300 tw-resize-none tw-transition tw-duration-500 focus:tw-outline-0"
                    onChange={handleSelect}
                  >
                    <option value="Javascript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                    <option value="C#">C#</option>
                    <option value="Php">PHP</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Swift">Swift</option>
                    <option value="Go">Go</option>
                    <option value="Rust">Rust</option>
                    <option value="Scala">Scala</option>
                    <option value="Dart">Dart</option>
                    <option value="SQL">SQL</option>
                  </select>
                </div>
                {completion !== "" ? (
                  <div className="tw-flex tw-justify-center tw-self-center tw-mt-4 tw-overflow-hidden">
                    <div className="tw-text-lg tw-h-full tw-overflow-auto tw-p-4 tw-text-white tw-bg-neutral-600 tw-rounded-lg tw-font-mono">
                      {completion.split("\n").map((item, key) => {
                        return (
                          <span key={key}>
                            {item}
                            <br />
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="tw-flex tw-justify-center tw-self-center tw-mt-4 tw-overflow-hidden">
                    <div className="tw-text-lg tw-h-full tw-overflow-auto tw-p-4 tw-text-white tw-bg-neutral-600 tw-rounded-lg tw-font-mono">
                      <span className="tw-opacity-60">
                        EXAMPLE: Calculate the area of a circle with radius 5
                        <br />
                        <br />
                        var radius = 5;
                        <br />
                        var area = Math.PI * Math.pow(radius, 2);
                        <br />
                        console.log(&apos;The area of the circle is &apos; +
                        area);
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : completion === "Loading..." ? (
              <div className="tw-flex tw-justify-center tw-h-full tw-w-full">
                <Loading />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
