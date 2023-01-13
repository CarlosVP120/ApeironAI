import Typewriter from "typewriter-effect";
import CodeXButtons from "./CodeXButtons";

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
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
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
