import React, { useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useEffect } from "react";

const ChatBody = ({ chat }) => {
  const aiStyle =
    "tw-bg-white tw-bg-opacity-40 tw-backdrop-blur-lg tw-dropshadow-md tw-mr-auto";

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
                key={i}
                className={`tw-border-[#999999] tw-break-words tw-border-2 tw-rounded-xl tw-self-end tw-px-3 tw-py-3 tw-max-w-[80%] ${
                  message.sender === "ai" && aiStyle
                }`}
              >
                <pre className="tw-whitespace-pre-wrap">
                  <span>{message.message}</span>
                </pre>
              </div>
            );
          })}

          <div ref={bottomRef} className="tw-h-3"></div>
        </div>
      ) : (
        <div className="tw-flex tw-justify-center tw-items-center tw-h-full">
          <div className="tw-text-2xl tw-text-gray-500 tw-font-bold">
            Start a conversation! <br />
            <span className="tw-text-sm tw-text-gray-400 tw-font-normal">
              Ex. "What is Apeiron AI?"
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBody;
