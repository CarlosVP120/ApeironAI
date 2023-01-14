export default function ConvertCode({ setValue, value }) {
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
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                />
              </svg>
              Convert Code
            </h1>
            <h2 className="tw-mt-1 tw-text-sm">
              Convert your code into a different programming language
            </h2>
            <h2 className="tw-mt-4 ">Paste your code below...</h2>
            <textarea className="tw-mt-4 tw-w-full tw-h-64 tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100 tw-resize-none" />
            <button className="tw-mt-4 tw-w-full tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100">
              Convert
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
              Which language?
            </h1>
            <h2 className="tw-mt-1 tw-text-sm">
              Select the language you want to convert your code to
            </h2>
            <div className="tw-mt-4 tw-flex tw-flex-col tw-gap-4">
              <ul>
                <label>
                  <input
                    type="radio"
                    name="language"
                    className="tw-mr-2 tw-cursor-pointer"
                  />
                  <span className="tw-cursor-pointer">Python</span>
                </label>
              </ul>
              <ul>
                <label>
                  <input
                    type="radio"
                    name="language"
                    className="tw-mr-2 tw-cursor-pointer"
                  />
                  <span className="tw-cursor-pointer">JavaScript</span>
                </label>
              </ul>
              <ul>
                <label>
                  <input
                    type="radio"
                    name="language"
                    className="tw-mr-2 tw-cursor-pointer"
                  />
                  <span className="tw-cursor-pointer">C++</span>
                </label>
              </ul>
              <ul>
                <label>
                  <input
                    type="radio"
                    name="language"
                    className="tw-mr-2 tw-cursor-pointer"
                  />
                  <span className="tw-cursor-pointer">C#</span>
                </label>
              </ul>
              <ul>
                <label>
                  <input
                    type="radio"
                    name="language"
                    className="tw-mr-2 tw-cursor-pointer"
                  />
                  <span className="tw-cursor-pointer">Java</span>
                </label>
              </ul>
              <ul>
                <label>
                  <input
                    type="radio"
                    name="language"
                    className="tw-mr-2 tw-cursor-pointer"
                  />
                  <span className="tw-cursor-pointer">PHP</span>
                </label>
              </ul>
              <ul>
                <label>
                  <input
                    type="radio"
                    name="language"
                    className="tw-mr-2 tw-cursor-pointer"
                  />
                  <span className="tw-cursor-pointer">Ruby</span>
                </label>
              </ul>
              <ul>
                <label>
                  <input
                    type="radio"
                    name="language"
                    className="tw-mr-2 tw-cursor-pointer"
                  />
                  <span className="tw-cursor-pointer">Swift</span>
                </label>
              </ul>
              <ul>
                <label>
                  <input
                    type="radio"
                    name="language"
                    className="tw-mr-2 tw-cursor-pointer"
                  />
                  <span className="tw-cursor-pointer">Go</span>
                </label>
              </ul>

              <ul>
                <label>
                  <input
                    type="radio"
                    name="language"
                    className="tw-mr-2 tw-cursor-pointer"
                  />
                  <span className="tw-cursor-pointer">Rust</span>
                </label>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
