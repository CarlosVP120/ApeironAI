import { useCallback, useState } from "react";
import styles from "../styles/Form.module.css";

export default function ShowingProduct({
  name,
  prompt,
  completion,
  writeToDatabase,
  setShowingProduct,
  setUnderlined,
}) {
  const updateResponse = useCallback(async (longer) => {
    const requestMode = longer
      ? "Give me a longer and more detailed version of this description: "
      : "Give me a shorter version of this description: ";

    const response = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: requestMode + completion }),
    });
    const data = await response.json().then((data) => {
      writeToDatabase(
        name + (longer ? " longer" : " shorter"),
        requestMode + completion,
        data.result.choices[0].text
      );

      setShowingProduct({
        name: name + (longer ? " longer" : " shorter"),
        prompt: requestMode + completion,
        completion: data.result.choices[0].text,
      });

      setUnderlined(name + (longer ? " longer" : " shorter"));
    });
  });

  return (
    <>
      <h1
        className={` tw-text-4xl tw-font-bold tw-py-3 tw-px-4 tw-rounded-lg ${styles.color_font}`}
      >
        {name}
      </h1>
      <div className="tw-flex tw-flex-col tw-px-10 tw-py-5 tw-w-5/6 tw-justify-center tw-bg-neutral-900 tw-my-auto tw-rounded-lg">
        <div>
          <p className="tw-text-white tw-text-base tw-mb-4">{prompt}</p>
          <div className="tw-flex tw-justify-center tw-items-center tw-mb-4">
            <div className="tw-flex tw-justify-center tw-items-center tw-bg-neutral-800 tw-rounded-lg tw-py-3 tw-px-4 ">
              {completion}
            </div>
            <div className="tw-flex tw-ml-4 tw-flex-col tw-h-full tw-bg-neutral-800 tw-px-2 tw-py-1 tw-rounded-xl tw-gap-3">
              <button
                className="tw-py-2 tw-px-4 tw-rounded-lg tw-bg-neutral-900 tw-text-white tw-text-sm tw-transition tw-duration-500 hover:tw-bg-neutral-700"
                onClick={() => updateResponse(false)}
              >
                Shorter version
              </button>
              <button
                className="tw-py-2 tw-px-4 tw-rounded-lg tw-bg-neutral-900 tw-text-white tw-text-sm tw-transition tw-duration-500 hover:tw-bg-neutral-700"
                onClick={() => updateResponse(true)}
              >
                Longer version
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
