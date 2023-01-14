import { useState } from "react";

export default function GenerateCode() {

  const [inputText, setInputText] = useState("");

  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-black tw-text-white tw-flex tw-justify-center">
      <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center ">
        <div className="tw-font-bold tw-text-white tw-flex tw-justify-center tw-shadow-inner tw-w-full tw-h-full tw-items-center">
          <div className="tw-bg-neutral-900 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-flex tw-px-8 tw-flex-col tw-rounded-r-none tw-w-[30%] tw-h-[80%] tw-justify-between">
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
            <h2 className="tw-mt-4 ">What do you want to create?</h2>
            <textarea className="tw-mt-4 tw-w-full tw-h-[80%] tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-300 tw-resize-none tw-transition tw-duration-500 focus:tw-outline-0" value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <button className="tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100">
              Generate
            </button>
          </div>
          <div className="tw-bg-neutral-800 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-px-8 tw-rounded-l-none tw-max-w-[65%] tw-h-[80%]">
            <h1 className="tw-flex tw-items-center tw-text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="tw-w-8 tw-h-8 tw-mr-2 tw-stroke-current tw-stroke-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
              Code generated
            </h1>
            <h2 className="tw-mt-1 tw-text-sm">
              This is where your code will appear.
            </h2>
            <h2>
              <pre className="tw-text-sm tw-mt-4 tw-text-gray-400 tw-overflow-auto">
                <code className="tw-text-sm tw-mt-4 tw-text-gray-400">
                  {`// Path: src\components\CmdAssistance.jsx
export default function CmdAssitance() {
    return (
        <div className="tw-w-full tw-h-[100vh] tw-bg-black tw-text-white tw-flex tw-justify-center">

        </div>
    );
}`}
                </code>
              </pre>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
