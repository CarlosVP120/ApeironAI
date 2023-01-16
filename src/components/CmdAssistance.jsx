export default function CmdAssitance() {
  return (
    <div className="tw-w-full tw-h-[100vh] tw-bg-black tw-text-white tw-flex tw-justify-center tw-overflow-hidden">
      <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center ">
        <div className="tw-font-bold tw-text-white tw-flex tw-justify-center tw-shadow-inner tw-w-full tw-h-full tw-items-center">
          <div className="tw-bg-neutral-900 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-flex tw-px-8 tw-flex-col tw-rounded-r-none tw-w-[45%]  tw-justify-between">
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
                  d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Command Assistance
            </h1>
            <h2 className="tw-mt-1 tw-text-sm">
              Modify any code, to get some quick changes.
            </h2>
            <h2 className="tw-mt-4 ">What do you want to do?</h2>
            <input
              className="tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100"
              placeholder="Hot to create a new React app?"
            />
            <button className="tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100">
              Show me
            </button>
          </div>
          <div className="tw-bg-neutral-800 tw-py-8 tw-rounded-lg tw-text-left tw-text tw-px-8 tw-rounded-l-none tw-w-[45%]">
            <h1 className="tw-flex tw-items-center tw-text-2xl">
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
              Commands
            </h1>
            <h2>
              <pre className="tw-mt-4 tw-text-sm tw-bg-gray-100 tw-p-4 tw-rounded-lg tw-text-black">
                <code>
                  <span className="tw-text-green-500">import</span> React{" "}
                  <span className="tw-text-green-500">from</span>{" "}
                  <span className="tw-text-red-500">&ldquo;react&rdquo;</span>;
                </code>
              </pre>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
