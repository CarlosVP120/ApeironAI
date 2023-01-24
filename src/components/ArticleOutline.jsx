import { useCallback } from "react";
import { useState, useEffect } from "react";

export default function ArticleOutline() {
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

  const askName = "Create me an article outline for this theme: ";
  const askDescription =
    ", give me the next format:\n1-Introduction 1.1-example 1.2-example\n2-Body 2.1-example\n3-Conclusion, and so on...";

  const handleClick = useCallback(
    async (e) => {
      setPrompt(askName + value);
      setCompletion("Loading...");
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: askName + value + askDescription }),
      });
      const data = await response.json().then((data) => {
        setCompletion(data.result.choices[0].text.replace(/^\s+|\s+$/g, ""));
      });
    },
    [value]
  );

  console.log(completion);

  const onClick = useCallback(() => {
    setValue("");
    setPrompt("");
    setCompletion("");
  }, []);

  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-white tw-text-black tw-flex  tw-overflow-hidden">
      <div className="tw-h-full tw-w-full tw-flex tw-flex-col ">
        <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-pt-10 tw-px-10 tw-text-xl ">
          <div className="tw-bg-neutral-100 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-flex tw-px-8 tw-flex-col tw-w-[45%] 2xl:tw-h-[80%] tw-h-[90%] tw-overflow-y-auto tw-overflow-x-hidden">
            <h1 className=" tw-font-bold tw-mb-4">
              <span className="tw-text-3xl tw-font-bold tw-mr-2">📝</span>
              <span className="tw-text-3xl tw-font-bold">Article Outline</span>
            </h1>
            <p className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-neutral-600">
              This tool will help you create an article outline for your theme.
              Just enter a theme and click on the &quot;Generate&quot; button.
            </p>

            <input
              className="tw-w-full tw-p-2 tw-mt-4 tw-rounded-lg tw-border tw-border-neutral-300 tw-text-black tw-text-xl tw-outline-none"
              placeholder="Enter a theme"
              value={value}
              onChange={handleInput}
            />

            <div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-mt-4">
              <span className="tw-p-2 tw-rounded-lg tw-bg-neutral-300 tw-text-black tw-text-xl tw-outline-none tw-transition tw-duration-300 tw-ease-in-out tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-neutral-500 tw-focus:tw-ring-opacity-50">
                {completion.split("\n").map((item, i) => (
                  <>
                    {item.includes(".") ? (
                      <p key={i}>&nbsp;&nbsp;&nbsp;&nbsp;{item}</p>
                    ) : (
                      <p key={i}>{item}</p>
                    )}
                    <br />
                  </>
                ))}
              </span>
            </div>
            <div className="tw-w-full tw-flex tw-justify-between tw-items-center tw-mt-4">
              <button
                className="tw-w-1/2 tw-p-2 tw-rounded-lg tw-bg-neutral-300 tw-text-black tw-text-xl tw-outline-none tw-transition tw-duration-300 tw-ease-in-out tw-focus:tw-outline-none tw-focus:tw-ring-2 tw-focus:tw-ring-neutral-500 tw-focus:tw-ring-opacity-50"
                onClick={handleClick}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
