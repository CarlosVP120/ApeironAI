import { useCallback, useState } from "react";
import styles from "../styles/Form.module.css";
import Image from "next/image";

export default function ShowingProduct({
  name,
  prompt,
  completion,
  writeToDatabase,
  setShowingProduct,
  setUnderlined,
  type,
  platform,
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
        data.result.choices[0].text,
        ""
      );

      setShowingProduct({
        name: name + (longer ? " longer" : " shorter"),
        prompt: requestMode + completion,
        completion: data.result.choices[0].text,
        platform: "",
      });

      setUnderlined(name + (longer ? " longer" : " shorter"));
    });
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full tw-w-full">
      <div
        className={`tw-flex tw-text-4xl tw-font-bold tw-py-3 tw-px-4 tw-rounded-lg ${styles.color_font} tw-text-center tw-items-center`}
      >
        {name}
        {type === "ads" && platform !== "" && (
          <div className=" tw-ml-4 tw-flex tw-items-center tw-bg-gray-100 tw-p-2 tw-rounded-lg tw-text-gray-900 tw-font-bold tw-text-sm">
            <Image
              src={`/assets/${
                platform === "Google"
                  ? "google"
                  : platform === "Facebook"
                  ? "facebook-svgrepo-com"
                  : "instagram1"
              }.svg`}
              width="30"
              height={30}
            ></Image>
          </div>
        )}
      </div>
      <div className="tw-relative tw-flex tw-flex-col tw-px-3 tw-max-w-[95%] tw-justify-center tw-bg-neutral-900 tw-my-auto tw-rounded-lg tw-pt-3 tw-overflow-y-auto">
        <div className="tw-h-full">
          <p className="tw-text-white tw-text-base tw-mb-4">
            Showing completion for: {prompt}
          </p>
          <div className="tw-flex tw-justify-center tw-items-center tw-mb-4">
            {type === "descriptions" ? (
              <div className="tw-flex tw-justify-center tw-items-center tw-bg-neutral-800 tw-rounded-lg tw-py-3 tw-px-4 ">
                {completion}
              </div>
            ) : type === "keywords" || type === "ads" ? (
              <div
                className={`tw-flex tw-flex-col tw-rounded-lg tw-px-4 tw-mb-2 ${
                  type === "keywords" ? "tw-gap-1" : "tw-gap-5 "
                }`}
              >
                {completion?.length > 0 &&
                  completion.split(",").map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`tw-flex tw-justify-center tw-items-center tw-bg-neutral-800 tw-rounded-lg tw-px-3 ${
                          index === 0 ? "tw-hidden" : "tw-py-1"
                        }`}
                      >
                        <p className="tw-text-white tw-text-base tw-flex">
                          {platform !== "" && type === "ads" ? (
                            <>
                              <div className="tw-mr-2 tw-flex tw-items-center">
                                <Image
                                  src={`/assets/${
                                    platform === "Google"
                                      ? "google"
                                      : platform === "Facebook"
                                      ? "facebook-svgrepo-com"
                                      : "instagram1"
                                  }.svg`}
                                  width="20"
                                  height={20}
                                ></Image>
                              </div>
                              {item}
                            </>
                          ) : // dont show the index 0 and 11
                          index === 0 ? null : (
                            index + "." + item
                          )}
                        </p>
                      </div>
                    );
                  })}
              </div>
            ) : (
              completion
            )}

            {type === "descriptions" && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
