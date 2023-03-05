import React, { useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useEffect } from "react";

const ChatBody = ({ chat }) => {
  const aiStyle =
    "tw-bg-white tw-bg-opacity-95 tw-backdrop-blur-lg tw-dropshadow-md tw-mr-auto tw-animate-appear";

  const parent = useRef(null);
  const bottomRef = useRef(null);

  // only for aut animations
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  //for scrolling bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <>
      {chat && chat.length !== 0 ? (
        <div
          className="tw-flex tw-flex-col tw-gap-4 tw-animate-appear"
          ref={parent}
        >
          {chat.map((message, i) => {
            return (
              <div
                className={`tw-animate-appear tw-break-words tw-rounded-xl tw-self-end tw-max-w-[80%] tw-bg-gradient-to-r tw-from-pink-500 tw-via-red-500 tw-to-yellow-500 tw-p-[1.5px] ${
                  message.sender === "ai" && aiStyle
                }`}
              >
                <div
                  className={`tw-flex tw-h-full tw-items-center tw-justify-center tw-bg-gray-800 tw-back tw-px-3 tw-py-3 tw-rounded-xl ${
                    message.sender === "ai" && aiStyle
                  }`}
                >
                  <pre className="tw-whitespace-pre-wrap">
                    <span>{message.message}</span>
                  </pre>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>
      ) : (
        <div className="tw-flex tw-justify-center tw-items-center tw-h-full">
          <div className="tw-text-2xl tw-text-gray-500 tw-font-bold">
            Start a conversation! <br />
            <span className="tw-text-sm tw-text-gray-400 tw-font-normal">
              Ex. &quot;What is Apeiron AI?&quot;
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBody;
