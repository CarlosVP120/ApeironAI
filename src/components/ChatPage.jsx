import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebaseClient";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { useMutation } from "react-query";

export default function Descriptions() {
  // TO UPDATE/DELETE:

  const [chat, setChat] = useState([]);

  const fetchResponse = async (chat) => {
    try {
      // after depoloyment you should change the fetch URL below
      const response = await fetch(
        "https://apeironai-mainserver.onrender.com/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: chat.map((message) => message.message).join(" \n "),
          }),
        }
      );

      const data = await response.json();
      data.message = data.result.choices[0].message.content;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  // END OF TO UPDATE/DELETE

  return (
    <div className="tw-animate-appear tw-bg-black tw-h-screen tw-py-6 tw-relative sm:tw-px-16 tw-px-12 tw-text-white tw-overflow-hidden tw-flex tw-flex-col tw-justify-between tw-align-middle">
      {/* gradients */}
      <div className="tw-gradient-01 tw-z-0 tw-absolute"></div>
      <div className="tw-gradient-02 tw-z-0 tw-absolute"></div>

      {/* body */}
      <div
        className="tw-h-[90%] tw-overflow-auto tw-w-full tw-max-w-4xl tw-min-w-[20rem] tw-py-8 tw-px-4 tw-self-center
  tw-scrollbar-thumb-slate-400 tw-scrollbar-thin tw-scrollbar-track-gray-tranparent tw-scrollbar-thumb-rounded-md
  "
      >
        <ChatBody chat={chat} />
      </div>

      {/* input */}
      <div className="tw-w-full tw-max-w-4xl tw-min-w-[20rem] tw-self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </div>
    </div>
  );
}
