import React from "react";
import { useState } from "react";

const ChatInput = ({ sendMessage, loading }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
  };
  return (
    <div
      className="tw-w-full tw-bg-white tw-bg-opacity-0 tw-max-h-40 tw-rounded-lg 
    tw-py-3 tw-overflow-auto tw-relative"
    >
      {loading ? (
        <img src="/assets/loader.gif" className="tw-w-8 tw-m-auto" />
      ) : (
        <>
          <input
            onKeyDown={(e) => {
              e.keyCode === 13 && e.shiftKey === false && handleSubmit();
            }}
            rows={1}
            // className="tw-border-0 tw-bg-transparent tw-outline-none tw-w-11/12 tw-pl-0"
            className="tw-w-9/12 tw-bg-neutral-900 tw-text-gray-100 tw-px-4 tw-py-2 tw-rounded-lg tw-outline-none tw-text-sm tw-mr-2"
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />

          {/* Submit button with Gradient */}
          <button
            className="tw-bg-size-200 tw-bg-pos-0 hover:tw-bg-pos-100  tw-py-2 tw-w-2/12 tw-text-center tw-border-none tw-rounded-md  tw-text-sm tw-font-bold tw-px-4 hover:tw-shadow-2xl tw-bg-gradient-to-r tw-from-blue-500 tw-via-purple-500 tw-to-pink-500 tw-duration-500 tw-text-gray-50"
            onClick={handleSubmit}
          >
            Send
          </button>
        </>
      )}
    </div>
  );
};

export default ChatInput;
