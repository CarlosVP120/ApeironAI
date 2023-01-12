import { useCallback, useState } from "react";
import styles from "../styles/Form.module.css";

export default function ShowingProduct({
  name,
  prompt,
  completion,
  writeToDatabase,
  setShowingProduct,
}) {
  const [nameUpdated, setNameUpdated] = useState(name);
  const [promptUpdated, setPromptUpdated] = useState(prompt);
  const [completionUpdated, setCompletionUpdated] = useState(completion);

  console.log("nameUpdated: " + nameUpdated);
  console.log("promptUpdated: " + promptUpdated);
  console.log("completionUpdated: " + completionUpdated);

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
        nameUpdated + (longer ? " longer" : " shorter"),
        requestMode + completion,
        data.result.choices[0].text
      );
      setNameUpdated(nameUpdated + (longer ? " longer" : " shorter"));
      setPromptUpdated(requestMode + completion);
      setCompletionUpdated(data.result.choices[0].text);
      setShowingProduct({
        name: nameUpdated,
        prompt: promptUpdated,
        completion: completionUpdated,
      });
    });
  });

  return (
    <>
      <h1
        className={` tw-text-4xl tw-font-bold tw-py-3 tw-px-4 tw-rounded-lg ${styles.color_font}`}
      >
        {nameUpdated}
      </h1>
      <div className="tw-flex tw-flex-col tw-px-10 tw-py-5 tw-w-5/6 tw-justify-center tw-bg-neutral-900 tw-my-auto tw-rounded-lg">
        <div>
          <p className="tw-text-white tw-text-base tw-mb-4">{promptUpdated}</p>
          <div className="tw-flex tw-justify-center tw-items-center tw-mb-4">
            <div className="tw-flex tw-justify-center tw-items-center tw-bg-neutral-800 tw-rounded-lg tw-py-3 tw-px-4 ">
              {completionUpdated}
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
