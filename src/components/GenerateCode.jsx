export default function GenerateCode() {
  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-black tw-text-white tw-flex tw-justify-center">
      <div className="tw-h-full tw-flex tw-flex-col tw-pt-4 tw-gap-4">
        <div className="tw-font-bold tw-text-white tw-mt-4 tw-flex tw-justify-center tw-shadow-inner">
          <div className="tw-bg-neutral-900 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-flex tw-px-8 tw-flex-col tw-rounded-r-none">
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
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
              Generate Code
            </h1>
            <h2 className="tw-mt-1 tw-text-sm">
              Create new code based on the syntax provided.
            </h2>
            <h2 className="tw-mt-4 ">What do you want to create?</h2>
            <input className="tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100" />
            <button className="tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100">
              Generate
            </button>
          </div>
          <div className="tw-bg-neutral-800 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-px-8 tw-rounded-l-none">
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
              <pre className="tw-text-sm tw-mt-4 tw-text-gray-400">
                <code>
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
