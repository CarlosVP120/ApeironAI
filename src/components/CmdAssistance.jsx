import { useCallback } from "react";
import { useState } from "react";
import Loading from "./Loading";

export default function CmdAssitance() {
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

  const askName = "Give me the commands to: ";

  const handleClick = useCallback(
    async (e) => {
      let prompt = askName + value;
      setCompletion("Loading...");
      const response = await fetch(
        "https://apeironai-mainserver.onrender.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: prompt }),
        }
      );
      const data = await response.json().then((data) => {
        setCompletion(data.result.choices[0].text.replace(/^\s+|\s+$/g, ""));
      });
    },
    [value]
  );

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
                  d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Command Assistance
            </h1>
            <h2 className="tw-mt-1 tw-text-sm">
              Modify your code and get advice on how to improve it.
            </h2>
            <h2 className="tw-mt-4 ">What do you want to do?</h2>
            <textarea
              className="tw-mt-4 tw-w-full tw-h-[80%] tw-p-4 tw-rounded-lg tw-text-[#eeffff] tw-font-code tw-bg-neutral-800 tw-border-black  tw-resize-none tw-transition tw-duration-500 focus:tw-outline-0 tw-font-code"
              value={value}
              onChange={handleInput}
              onKeyDown={handleTab}
              placeholder="Create a new React app"
            />
            <button
              onClick={handleClick}
              className=" tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-white tw-bg-gray-100 tw-transition tw-duration-500 tw-bg-purple-500 hover:tw-bg-white hover:tw-text-black"
            >
              Show me
            </button>
          </div>
          <div className="tw-flex tw-flex-col tw-bg-neutral-800 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-px-8 tw-rounded-l-none tw-min-w-[30%] tw-max-w-[45%] 2xl:tw-h-[80%] tw-h-[90%]">
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
                  Commands
                </h1>
                <h2 className="tw-mt-1 tw-text-sm">
                  This is where your code will appear.
                </h2>

                {completion !== "" ? (
                  <>
                    <h2 className="tw-mt-4 ">Commands to {value}:</h2>
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
                  </>
                ) : (
                  <div className="tw-flex tw-justify-center tw-self-center tw-mt-4 tw-overflow-auto">
                    <div className="tw-text-lg tw-h-full tw-overflow-auto tw-p-4 tw-text-white tw-bg-neutral-600 tw-rounded-lg tw-font-mono">
                      <span className="tw-opacity-60">
                        EXAMPLE: Create a new React app
                        <br />
                        <br />
                        1. Open a terminal window and type in the following
                        command:
                        <br />
                        npx create-react-app *app-name*
                        <br />
                        <br />
                        2. Once the installation is complete, change directory
                        into your new React app:
                        <br />
                        cd *app-name*
                        <br />
                        <br />
                        3. Start your React app:
                        <br />
                        npm start
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
          </div>
        </div>
      </div>
    </div>
  );
}
