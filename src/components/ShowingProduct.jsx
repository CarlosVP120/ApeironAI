import { useCallback, useState } from "react";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseClient";
import Loading from "./Loading";

export default function ShowingProduct({
  name,
  prompt,
  completion,
  setShowingProduct,
  setUnderlined,
  type,
  platform,
}) {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const [loading, setLoading] = useState(false);

  const writeToDatabase = (name, prompt, completion) => {
    updateDoc(docRef, {
      [type]: arrayUnion({
        name: name,
        prompt: prompt,
        completion: completion,
      }),
    });
  };

  const updateResponse = async (longer) => {
    setLoading(true);
    let requestMode = longer
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
        prompt + (longer ? " longer" : " shorter"),
        data.result.choices[0].message.content.replace(/^\s+|\s+$/g, "")
      );

      setShowingProduct({
        name: name + (longer ? " longer" : " shorter"),
        prompt: prompt + (longer ? " longer" : " shorter"),
        completion: data.result.choices[0].message.content.replace(
          /^\s+|\s+$/g,
          ""
        ),
      });

      setLoading(false);
      setUnderlined(name + (longer ? " longer" : " shorter"));
    });
  };

  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-black tw-text-white tw-flex tw-justify-center tw-overflow-hidden">
      <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center tw-animate-appear">
        <div className="tw-font-bold tw-text-white tw-flex tw-justify-center tw-shadow-inner tw-w-full tw-h-full tw-items-center">
          <div className="tw-flex tw-mt-6 tw-flex-col tw-bg-neutral-800 tw-py-6 tw-rounded-lg tw-text-left tw-text tw-px-8 tw-max-w-[70%] 2xl:tw-max-h-[60%] tw-max-h-[90%]">
            {completion !== "" && !loading ? (
              <>
                <h1 className="tw-flex tw-items-center tw-text-2xl tw-mb-2">
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
                  <div
                    className={`tw-flex ${styles.color_font} tw-text-2xl tw-w-full tw-items-center`}
                  >
                    {name}
                  </div>
                  {type === "descriptions" ? (
                    <div className="tw-flex tw-ml-4 tw-w-full tw-justify-end tw-bg-neutral-800 tw-rounded-xl tw-gap-2">
                      <button
                        className="tw-py-2 tw-px-2 tw-rounded-lg tw-bg-neutral-900 tw-text-white tw-text-sm tw-transition tw-duration-500 hover:tw-bg-neutral-700"
                        onClick={() => {
                          setLoading(true);
                          updateResponse(false);
                        }}
                      >
                        Short version
                      </button>
                      <button
                        className="tw-py-2 tw-px-2 tw-rounded-lg tw-bg-neutral-900 tw-text-white tw-text-sm tw-transition tw-duration-500 hover:tw-bg-neutral-700"
                        onClick={() => {
                          setLoading(true);
                          updateResponse(true);
                        }}
                      >
                        Long version
                      </button>
                    </div>
                  ) : type === "ads" && platform !== "" ? (
                    <div className="tw-ml-4 tw-flex tw-items-center tw-bg-gray-100 tw-p-2 tw-rounded-lg tw-text-gray-900 tw-font-bold tw-text-sm">
                      <Image
                        src={`/assets/${
                          platform === "Google"
                            ? "google"
                            : platform === "Facebook"
                            ? "facebook-svgrepo-com"
                            : "instagram1"
                        }.svg`}
                        width="35"
                        height={35}
                      ></Image>
                    </div>
                  ) : (
                    ""
                  )}
                </h1>
                <h2 className="tw-mt-1 tw-text-sm">
                  Your{" "}
                  {type === "ads"
                    ? "ad"
                    : type === "keywords"
                    ? "keyword"
                    : "product"}{" "}
                  description is ready!
                </h2>
                <h2 className="tw-mt-4 tw-w-full tw-flex tw-items-center tw-justify-between">
                  Take a look at the{" "}
                  {type === "ads"
                    ? "ads"
                    : type === "keywords"
                    ? "keywords"
                    : "description"}{" "}
                  below...
                </h2>
                {completion !== "" ? (
                  <div className="tw-flex tw-justify-center tw-self-center tw-mt-4 tw-overflow-hidden tw-h-full">
                    <div className="tw-text-lg tw-overflow-auto tw-p-4 tw-text-white tw-bg-neutral-600 tw-rounded-lg tw-font-mono">
                      {type === "descriptions" ? (
                        completion?.split("\n").map((item, key) => {
                          return (
                            <span key={key}>
                              {item}
                              <br />
                            </span>
                          );
                        })
                      ) : type === "keywords" || type === "ads" ? (
                        <div
                          className={`tw-flex tw-flex-col tw-rounded-lg tw-px-4 ${
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
                                        <div className="tw-mr-4 tw-flex tw-items-center">
                                          <Image
                                            src={`/assets/${
                                              platform === "Google"
                                                ? "google"
                                                : platform === "Facebook"
                                                ? "facebook-svgrepo-com"
                                                : "instagram1"
                                            }.svg`}
                                            width={20}
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
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </>
            ) : loading ? (
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

// <>
//   {loading ? (
//     <Loading />
//   ) : (
//     <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full tw-w-full">
//       <div
//         className={`tw-flex tw-text-4xl tw-font-bold tw-py-3 tw-px-4 tw-rounded-lg ${styles.color_font} tw-text-center tw-items-center`}
//       >
//         {name}
//         {type === "ads" && platform !== "" && (
//           <div className=" tw-ml-4 tw-flex tw-items-center tw-bg-gray-100 tw-p-2 tw-rounded-lg tw-text-gray-900 tw-font-bold tw-text-sm">
//             <Image
//               src={`/assets/${
//                 platform === "Google"
//                   ? "google"
//                   : platform === "Facebook"
//                   ? "facebook-svgrepo-com"
//                   : "instagram1"
//               }.svg`}
//               width="30"
//               height={30}
//             ></Image>
//           </div>
//         )}
//       </div>
//       <div className="tw-relative tw-flex tw-flex-col tw-px-3 tw-max-w-[95%] tw-justify-center tw-bg-neutral-900 tw-my-auto tw-rounded-lg tw-pt-3 tw-overflow-y-auto">
//         <div className="tw-h-full">
//           <p className="tw-text-white tw-text-base tw-mb-4">
//             Showing completion for: {prompt}
//           </p>
//           <div className="tw-flex tw-justify-center tw-items-center tw-mb-4">
//             {type === "descriptions" ? (
//               <div className="tw-flex tw-justify-center tw-items-center tw-bg-neutral-800 tw-rounded-lg tw-py-3 tw-px-4 ">
//                 {completion}
//               </div>
//             ) : type === "keywords" || type === "ads" ? (
//               <div
//                 className={`tw-flex tw-flex-col tw-rounded-lg tw-px-4 tw-mb-2 ${
//                   type === "keywords" ? "tw-gap-1" : "tw-gap-5 "
//                 }`}
//               >
//                 {completion?.length > 0 &&
//                   completion.split(",").map((item, index) => {
//                     return (
//                       <div
//                         key={index}
//                         className={`tw-flex tw-justify-center tw-items-center tw-bg-neutral-800 tw-rounded-lg tw-px-3 ${
//                           index === 0 ? "tw-hidden" : "tw-py-1"
//                         }`}
//                       >
//                         <p className="tw-text-white tw-text-base tw-flex">
//                           {platform !== "" && type === "ads" ? (
//                             <>
//                               <div className="tw-mr-2 tw-flex tw-items-center">
//                                 <Image
//                                   src={`/assets/${
//                                     platform === "Google"
//                                       ? "google"
//                                       : platform === "Facebook"
//                                       ? "facebook-svgrepo-com"
//                                       : "instagram1"
//                                   }.svg`}
//                                   width="20"
//                                   height={20}
//                                 ></Image>
//                               </div>
//                               {item}
//                             </>
//                           ) : // dont show the index 0 and 11
//                           index === 0 ? null : (
//                             index + "." + item
//                           )}
//                         </p>
//                       </div>
//                     );
//                   })}
//               </div>
//             ) : (
//               completion
//             )}

//             {type === "descriptions" && (
//               <div className="tw-flex tw-ml-4 tw-flex-col tw-h-full tw-bg-neutral-800 tw-px-2 tw-py-1 tw-rounded-xl tw-gap-3">
//                 <button
//                   className="tw-py-2 tw-px-4 tw-rounded-lg tw-bg-neutral-900 tw-text-white tw-text-sm tw-transition tw-duration-500 hover:tw-bg-neutral-700"
//                   onClick={() => updateResponse(false)}
//                 >
//                   Shorter version
//                 </button>
//                 <button
//                   className="tw-py-2 tw-px-4 tw-rounded-lg tw-bg-neutral-900 tw-text-white tw-text-sm tw-transition tw-duration-500 hover:tw-bg-neutral-700"
//                   onClick={() => updateResponse(true)}
//                 >
//                   Longer version
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )}
// </>
