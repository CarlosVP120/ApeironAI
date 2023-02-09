import { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import styles from "../styles/Form.module.css";
import Head from "next/head";
import Loading from "./Loading";

export default function ArticleEditor() {
  const [value, setValue] = useState("");
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const [feedback, setFeedback] = useState("");
  const GenerateAI = "Give me more information based on this text: ";
  const ReplaceAI = "Rephrase the text: ";
  const ImproveAI = "Improve the grammar of this text: ";
  const FeedbackAI = "Give me feedback on this text: ";

  function getSelectedText() {
    var txt = "";
    if (window.getSelection) {
      txt = window.getSelection().toString();
    } else if (document.getSelection) {
      txt = document.getSelection().toString();
    } else if (document.selection) {
      txt = document.selection.createRange().text;
    }
    return txt;
  }

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

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // // replace all \n at the beginning with a space
  // console.log(value.replace(/(?:\r\n|\r|\n)/g, " "));

  const handleClick = async (askName, val) => {
    if (askName !== FeedbackAI) setCompletion("Loading...");
    if (askName === FeedbackAI) setFeedback("Loading...");

    // const response = await fetch("/api/hello", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ text: askName + val }),
    // }).catch((err) => {
    //   console.log("error");
    // });

    let prompt = askName + "\n\n" + '"' + val.replace(/\n$/, "") + '"';
    console.log(JSON.stringify({ text: prompt }));

    await fetch("https://apeironai-mainserver.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Retry-After": "5",
      },
      body: JSON.stringify({ text: prompt }),
    }).then((response) => {
      return response
        .json()
        .then((data) => {
          console.log(data);
          if (data.result.choices[0].text.length < 3) {
            alert(
              "Apeiron didn't come up with anything. Please try again with a slighltly modified prompt."
            );
            setCompletion("Not Loading...");
            return;
          }
          if (askName === GenerateAI) {
            setValue(
              (
                value +
                "\n" +
                data.result.choices[0].text.replace(/^\s+|\s+$/g, "")
              ).replace(/\n$/, "")
            );
          } else if (askName === ReplaceAI || askName === ImproveAI) {
            setValue(
              value.replace(
                val,
                data.result.choices[0].text.replace(/^\s+|\s+$/g, "")
              )
            );
          } else {
            setFeedback(data.result.choices[0].text.replace(/^\s+|\s+$/g, ""));
          }

          setCompletion("Not Loading...");
        })
        .catch((err) => {
          setCompletion("Not Loading...");
          alert("The server is saturated. Please try again in a few seconds.");
        });
    });

    // const data = await response.json().then((data) => {
    //   setCompletion(data.result.choices[0].text.replace(/^\s+|\s+$/g, ""));
    //   if (askName === GenerateAI) {
    //     setValue(
    //       value +
    //         "\n" +
    //         "\n" +
    //         data.result.choices[0].text.replace(/^\s+|\s+$/g, "")
    //     );
    //   } else if (askName === ReplaceAI || askName === ImproveAI) {
    //     setValue(
    //       value.replace(
    //         val,
    //         data.result.choices[0].text.replace(/^\s+|\s+$/g, "")
    //       )
    //     );
    //   } else {
    //     setFeedback(data.result.choices[0].text.replace(/^\s+|\s+$/g, ""));
    //   }
    // });
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <div className="tw-w-full tw-h-full tw-bg-white tw-text-black tw-flex tw-justify-center tw-overflow-hidden ">
        <div className="tw-h-full tw-w-full tw-flex tw-justify-center tw-animate-appear">
          <div className="tw-h-full tw-w-1/4 tw-px-10 tw-py-5 tw-font-bold tw-text-2xl tw-overflow-auto tw-flex tw-flex-col tw-gap-10">
            <div className="tw-flex tw-flex-col tw-items-start">
              <h1 className="tw-font-bold tw-text-left">
                <span className={styles.color_font}>Assistant Features</span>
              </h1>
              <button
                onClick={() => {
                  handleClick(GenerateAI, value);
                }}
                className="tw-items-center tw-mt-6 tw-py-2 tw-px-3 tw-bg-purple-600 tw-text-white tw-rounded-lg tw-font-bold tw-text-base tw-flex tw-justify-center tw-transition tw-duration-300 hover:tw-bg-blue-500 hover:tw-text-white"
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>

                <h1>Generate AI Text</h1>
              </button>
              <p className="tw-opacity-50 tw-mt-2 tw-text-sm tw-text-left">
                Predict additional content based on context of previous text.
              </p>
            </div>
            <div className="tw-flex tw-flex-col tw-items-start">
              <h1 className="tw-font-bold tw-text-left">
                <span className={styles.color_font}>Writing Tools</span>
              </h1>
              <button
                onClick={() => {
                  handleClick(ReplaceAI, getSelectedText());
                }}
                className="tw-items-center tw-mt-6 tw-py-2 tw-px-3 tw-bg-gray-300 tw-text-neutral-500 tw-rounded-lg tw-font-bold tw-text-base tw-flex tw-justify-center tw-transition tw-duration-300 hover:tw-bg-blue-500 hover:tw-text-white"
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
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                  />
                </svg>

                <h1>Rephrase Selected Text</h1>
              </button>
              <p className="tw-opacity-50 tw-mt-2 tw-text-sm tw-text-left tw-mb-4">
                Highlight text and get alternate phrasing.
              </p>
              <button
                onClick={() => {
                  handleClick(ImproveAI, getSelectedText());
                }}
                className="tw-items-center tw-mt-6 tw-py-2 tw-px-3 tw-bg-gray-300 tw-text-neutral-500 tw-rounded-lg tw-font-bold tw-text-base tw-flex tw-justify-center tw-transition tw-duration-300 hover:tw-bg-blue-500 hover:tw-text-white"
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
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>

                <h1>Improve Text Grammar</h1>
              </button>
              <p className="tw-opacity-50 tw-mt-2 tw-text-sm tw-text-left">
                Select text and get grammar suggestions to improve your writing.
              </p>
            </div>
          </div>
          <div className="tw-h-full tw-flex tw-justify-center tw-text-base tw-rounded-lg  tw-w-[40rem] 2xl:tw-w-[64rem] ">
            {/* <Editor
            toolbarClassName="tw-flex !tw-justify-center tw-sticky tw-top-0 tw-z-50 tw-bg-white !tw-w-full tw-mx-auto"
            editorClassName="tw-bg-white tw-shadow-2xl tw-rounded-lg tw-overflow-auto tw-max-w-5xl tw-text-black tw-mx-auto tw-p-10 tw-mt-5 tw-border-2"
            onEditorStateChange={setValueEditor}
            wrapperClassName="tw-mb-16"
            editorStyle={{
              height: "auto",
              overflow: "auto",
              minHeight: "95%",
              maxHeight: "95%",
              lineHeight: "0.5",
            }}
          /> */}
            {completion === "Loading..." ? (
              <Loading />
            ) : (
              <textarea
                className="tw-bg-white tw-shadow-2xl tw-rounded-sm tw-overflow-auto tw-max-w-5xl tw-text-black  tw-p-10 tw-mt-6 tw-border-2 tw-w-full tw-outline-none tw-animate-appear"
                value={value}
                onChange={handleInput}
                onKeyDown={handleTab}
                style={{
                  height: "auto",
                  overflow: "auto",
                  minHeight: "95%",
                  maxHeight: "95%",
                }}
              />
            )}
          </div>
          <div className="tw-h-full tw-w-1/4 tw-px-10 tw-py-5 tw-font-bold tw-text-2xl tw-overflow-auto tw-flex tw-flex-col tw-gap-10">
            <div className="tw-flex tw-flex-col tw-items-end">
              <h1 className="tw-font-bold tw-text-right">
                <span className={styles.color_font}>Summary</span>
              </h1>
              <div className="tw-items-center tw-mt-2 tw-py-1 tw-px-30 tw-text-neutral-500 tw-rounded-lg tw-font-bold tw-text-base tw-flex tw-justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="tw-w-6 tw-h-6 tw-mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                  />
                </svg>
                <h1>{value.split(" ").length} Words</h1>
              </div>
              <div className="tw-items-center tw-mt-2 tw-py-1 tw-px-30 tw-text-neutral-500 tw-rounded-lg tw-font-bold tw-text-base tw-flex tw-justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="tw-w-6 tw-h-6 tw-mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                  />
                </svg>
                <h1>{value.split("\n\n").length} Paragraphs</h1>
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-items-end">
              <h1 className="tw-font-bold tw-text-right">
                <span className={styles.color_font}>Recommendations</span>
              </h1>
              <button
                onClick={() => handleClick(FeedbackAI, value)}
                className="tw-items-center tw-mt-6 tw-py-2 tw-px-3 tw-bg-gray-300 tw-text-neutral-500 tw-rounded-lg tw-font-bold tw-text-base tw-flex tw-justify-center tw-transition tw-duration-300 hover:tw-bg-blue-500 hover:tw-text-white"
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
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <h1>Generate AI Feedback</h1>
              </button>
              <p className="tw-opacity-50 tw-mt-4 tw-text-sm tw-text-justify tw-mb-4 tw-bg-gray-300 tw-px-2 tw-py-1 tw-rounded-md">
                {feedback === "Loading..." ? (
                  <span>Loading...</span>
                ) : feedback !== "" ? (
                  <span className="tw-animate-appear">{feedback}</span>
                ) : (
                  <span>
                    Recieve feedback from our AI on how to improve your text.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
