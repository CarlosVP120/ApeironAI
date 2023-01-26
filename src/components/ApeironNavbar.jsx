import styles from "../styles/Markex.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../../firebase/firebaseClient";
import Link from "next/link";

export default function ApeironNavbar({
  setValue,
  redirectHandler,
  signOutHandler,
  value,
  selected,
  theme,
}) {
  return (
    <div
      className={` tw-justify-between tw-items-center tw-px-10 tw-relative tw-py-3 tw-pt-4 tw-flex ${
        theme === "light" ? "tw-bg-white" : ""
      }  ${value === "main" ? "tw-animate-appear" : ""} `}
    >
      <a href="/">
        <h1
          className={`tw-self-center tw-justify-center tw-transition tw-duration-300 tw-rounded-lg ${
            theme === "light" ? "tw-text-black" : "tw-text-white"
          }`}
          style={{
            fontSize: "2rem",
            fontFamily: "Poppins",
          }}
        >
          Apeiron
          <span className={styles.color_font} style={{ fontWeight: "bold" }}>
            AI
          </span>
        </h1>
      </a>

      {value === "markex" ? (
        <div className="tw-justify-center tw-hidden lg:tw-flex tw-animate-appear">
          <div className="tw-justify-center tw-self-center tw-flex tw-gap-6">
            <button
              onClick={() => setValue("Descriptions")}
              className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3"
            >
              <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-500 tw-via-purple-500 tw-to-[#ff00c6]  tw-absolute"></span>
              <span
                className={`tw-relative tw-px-4 tw-py-2 tw-transition-all tw-ease-out ${
                  selected === "Descriptions"
                    ? "tw-bg-opacity-0"
                    : "tw-bg-black"
                }  tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500`}
              >
                <span className="tw-relative tw-text-white tw-flex tw-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5 tw-mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  Descriptions
                </span>
              </span>
            </button>

            <button
              onClick={() => setValue("Keywords")}
              className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3"
            >
              <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-500 tw-via-purple-500 tw-to-[#ff00c6]  tw-absolute"></span>
              <span
                className={`tw-relative tw-px-4 tw-py-2 tw-transition-all tw-ease-out ${
                  selected === "Keywords" ? "tw-bg-opacity-0" : "tw-bg-black"
                }  tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500`}
              >
                <span className="tw-relative tw-text-white tw-flex tw-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5 tw-mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                  Keywords
                </span>
              </span>
            </button>

            <button
              onClick={() => setValue("Ads")}
              className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3"
            >
              <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-500 tw-via-purple-500 tw-to-[#ff00c6]  tw-absolute"></span>
              <span
                className={`tw-relative tw-px-4 tw-py-2 tw-transition-all tw-ease-out ${
                  selected === "Ads" ? "tw-bg-opacity-0" : "tw-bg-black"
                }  tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500`}
              >
                <span className="tw-relative tw-text-white tw-flex tw-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5 tw-mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
                    />
                  </svg>
                  Ads
                </span>
              </span>
            </button>
          </div>
        </div>
      ) : null}

      {value === "codex" ? (
        <div className="tw-justify-center tw-hidden lg:tw-flex tw-animate-appear">
          <div className="tw-justify-center tw-self-center tw-flex tw-gap-2 ">
            <button
              onClick={() => setValue("Explain Code")}
              className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3 tw-text-xs 2xl:tw-text-base"
            >
              <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-500 tw-via-purple-500 tw-to-[#ff00c6] tw-absolute"></span>
              <span
                className={`tw-relative tw-px-2 2xl:tw-px-4 tw-py-2 tw-transition-all tw-ease-out ${
                  selected === "Explain Code"
                    ? "tw-bg-opacity-0"
                    : "tw-bg-black"
                }  tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500`}
              >
                <span className="tw-relative tw-text-white tw-flex tw-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5 tw-mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                  </svg>
                  Explain Code
                </span>
              </span>
            </button>

            <button
              onClick={() => setValue("Convert Code")}
              className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3 tw-text-xs 2xl:tw-text-base"
            >
              <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-500 tw-via-purple-500 tw-to-[#ff00c6]  tw-absolute"></span>
              <span
                className={`tw-relative tw-px-2 2xl:tw-px-4 tw-py-2 tw-transition-all tw-ease-out ${
                  selected === "Convert Code"
                    ? "tw-bg-opacity-0"
                    : "tw-bg-black"
                }  tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500`}
              >
                <span className="tw-relative tw-text-white tw-flex tw-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5 tw-mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                    />
                  </svg>
                  Convert Code
                </span>
              </span>
            </button>

            <button
              onClick={() => setValue("Generate Code")}
              className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3 tw-text-xs 2xl:tw-text-base"
            >
              <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-500 tw-via-purple-500 tw-to-[#ff00c6]  tw-absolute"></span>
              <span
                className={`tw-relative tw-px-2 2xl:tw-px-4 tw-py-2 tw-transition-all tw-ease-out ${
                  selected === "Generate Code"
                    ? "tw-bg-opacity-0"
                    : "tw-bg-black"
                }  tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500`}
              >
                <span className="tw-relative tw-text-white tw-flex tw-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5 tw-mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                  Generate Code
                </span>
              </span>
            </button>

            <button
              onClick={() => setValue("Cmd Assistance")}
              className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3 tw-text-xs 2xl:tw-text-base"
            >
              <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-500 tw-via-purple-500 tw-to-[#ff00c6]  tw-absolute"></span>
              <span
                className={`tw-relative tw-px-2 2xl:tw-px-4 tw-py-2 tw-transition-all tw-ease-out ${
                  selected === "Cmd Assistance"
                    ? "tw-bg-opacity-0"
                    : "tw-bg-black"
                }  tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500`}
              >
                <span className="tw-relative tw-text-white tw-flex tw-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5 tw-mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  Cmd Assistance
                </span>
              </span>
            </button>

            <button
              onClick={() => setValue("Time Comp.")}
              className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3 tw-text-xs 2xl:tw-text-base"
            >
              <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-500 tw-via-purple-500 tw-to-[#ff00c6]  tw-absolute"></span>
              <span
                className={`tw-relative tw-px-2 2xl:tw-px-4 tw-py-2 tw-transition-all tw-ease-out ${
                  selected === "Time Comp." ? "tw-bg-opacity-0" : "tw-bg-black"
                }  tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500`}
              >
                <span className="tw-relative tw-text-white tw-flex tw-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5 tw-mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Time Comp.
                </span>
              </span>
            </button>
          </div>
        </div>
      ) : null}

      {value === "typex" ? (
        <div className="tw-justify-center tw-hidden lg:tw-flex tw-animate-appear">
          <div className="tw-justify-center tw-self-center tw-flex tw-gap-6">
            <button
              onClick={() => setValue("Article Creator")}
              className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3"
            >
              <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-500 tw-via-purple-500 tw-to-[#ff00c6]  tw-absolute"></span>
              <span
                className={`tw-relative tw-px-4 tw-py-2 tw-transition-all tw-ease-out ${
                  selected === "Article Creator"
                    ? "tw-bg-opacity-0"
                    : theme === "light"
                    ? "tw-bg-white"
                    : "tw-bg-black"
                }  tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500 `}
              >
                <span
                  className={`tw-relative ${
                    theme === "light"
                      ? ` group-hover:tw-text-white ${
                          selected === "Article Creator"
                            ? "tw-text-white"
                            : "tw-text-black"
                        } tw-transition tw-duration-300`
                      : "tw-text-white"
                  } tw-flex tw-items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5 tw-mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Article Creator
                </span>
              </span>
            </button>

            <button
              onClick={() => setValue("Article Outline")}
              className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3"
            >
              <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-500 tw-via-purple-500 tw-to-[#ff00c6]  tw-absolute"></span>
              <span
                className={`tw-relative tw-px-4 tw-py-2 tw-transition-all tw-ease-out ${
                  selected === "Article Outline"
                    ? "tw-bg-opacity-0"
                    : theme === "light"
                    ? "tw-bg-white"
                    : "tw-bg-black"
                }  tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500 `}
              >
                <span
                  className={`tw-relative ${
                    theme === "light"
                      ? ` group-hover:tw-text-white ${
                          selected === "Article Outline"
                            ? "tw-text-white"
                            : "tw-text-black"
                        } tw-transition tw-duration-300`
                      : "tw-text-white"
                  } tw-flex tw-items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5 tw-mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  Article Outline
                </span>
              </span>
            </button>
          </div>
        </div>
      ) : null}

      {value === "artix" ? (
        <div className="tw-justify-center tw-hidden lg:tw-flex tw-animate-appear">
          <div className="tw-justify-center tw-self-center tw-flex tw-gap-6">
            <button
              onClick={() => setValue("Generate Image")}
              className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3"
            >
              <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-500 tw-via-purple-500 tw-to-[#ff00c6]  tw-absolute"></span>
              <span
                className={`tw-relative tw-px-4 tw-py-2 tw-transition-all tw-ease-out ${
                  selected === "Generate Image"
                    ? "tw-bg-opacity-0"
                    : theme === "light"
                    ? "tw-bg-white"
                    : "tw-bg-black"
                }  tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500 `}
              >
                <span
                  className={`tw-relative ${
                    theme === "light"
                      ? ` group-hover:tw-text-white ${
                          selected === "Generate Image"
                            ? "tw-text-white"
                            : "tw-text-black"
                        } tw-transition tw-duration-300`
                      : "tw-text-white"
                  } tw-flex tw-items-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5 tw-mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  Generate Image
                </span>
              </span>
            </button>
          </div>
        </div>
      ) : null}

      <div className="tw-flex tw-justify-center ">
        <div className="tw-self-center">
          {(value === "main" || value === "subscription") && (
            <>
              {auth.currentUser.displayName}
              {value === "main" && (
                <button
                  onClick={() =>
                    redirectHandler(
                      "https://billing.stripe.com/p/login/5kA8zKfERbRQ6k0eUU"
                    )
                  }
                  className="tw-relative tw-p-0.5 tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3 tw-hidden md:tw-inline-flex"
                >
                  <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-[#ff8a05] tw-via-[#ff5478] tw-to-[#ff00c6] group-hover:tw-from-[#ff00c6] group-hover:tw-via-[#ff5478] group-hover:tw-to-[#ff8a05] tw-absolute"></span>
                  <span
                    className="tw-relative tw-px-4 tw-py-2 tw-transition-all tw-ease-out tw-bg-black tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500 
"
                  >
                    <span className="tw-relative tw-text-white">Account</span>
                  </span>
                </button>
              )}
            </>
          )}
        </div>
        {value !== "main" && value !== "subscription" ? (
          <button
            onClick={redirectHandler.bind(this, "/apeiron")}
            className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3 tw-animate-appear"
          >
            <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-[#ff8a05] tw-via-[#ff5478] tw-to-[#ff00c6] group-hover:tw-from-[#ff00c6] group-hover:tw-via-[#ff5478] group-hover:tw-to-[#ff8a05] tw-absolute"></span>
            <span
              className={`tw-relative tw-px-4 tw-py-2 tw-transition-all tw-ease-out tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500 ${
                theme === "light" ? "tw-bg-white" : "tw-bg-black"
              }`}
            >
              <span
                className={`tw-relative ${
                  theme === "light"
                    ? "tw-text-black group-hover:tw-text-white tw-transition tw-duration-300"
                    : "tw-text-white"
                }`}
              >
                Tools
              </span>
            </span>
          </button>
        ) : null}
        <button
          onClick={signOutHandler}
          className="tw-relative tw-p-0.5 tw-inline-flex tw-items-center tw-justify-center tw-font-bold tw-overflow-hidden tw-group tw-rounded-md tw-ml-3"
        >
          <span className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-[#ff8a05] tw-via-[#ff5478] tw-to-[#ff00c6] group-hover:tw-from-[#ff00c6] group-hover:tw-via-[#ff5478] group-hover:tw-to-[#ff8a05] tw-absolute"></span>
          <span
            className={`tw-relative tw-px-4 tw-py-2 tw-transition-all tw-ease-out tw-bg-black tw-rounded-md group-hover:tw-bg-opacity-0 tw-duration-500  ${
              theme === "light" ? "tw-bg-white" : "tw-bg-black"
            }`}
          >
            <span
              className={`tw-relative ${
                theme === "light"
                  ? "tw-text-black group-hover:tw-text-white tw-transition tw-duration-300"
                  : "tw-text-white"
              }`}
            >
              Sign Out
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
