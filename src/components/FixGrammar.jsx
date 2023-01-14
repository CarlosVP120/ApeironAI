export default function FixGrammar() {
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
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                />
              </svg>
              Fix Grammar
            </h1>
            <h2 className="tw-mt-1 tw-text-sm">
              Fix the grammar in the code below.
            </h2>
            <h2 className="tw-mt-4 ">Paste your code below...</h2>
            <textarea className="tw-mt-4 tw-w-full tw-h-64 tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100 tw-resize-none" />

            <button className="tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100">
              Check
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
              Output
            </h1>

            <span className="tw-mt-4 tw-block tw-text-sm">
              <span className="tw-text-green-500 tw-font-bold">✔</span> Fixed
              grammar
            </span>
            <span className="tw-mt-4 tw-block tw-text-sm">
              <span className="tw-text-red-500 tw-font-bold">✘</span> 1 error
              found
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
