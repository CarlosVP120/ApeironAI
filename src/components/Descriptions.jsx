import { useCallback, useEffect, useState } from "react";
import RecentCard from "./RecentCard";
import ShowingProduct from "./ShowingProduct";
import { auth, db } from "../../firebase/firebaseClient";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import ApeironNavbar from "./ApeironNavbar";

export default function Descriptions() {
  const [dataArray, setDataArray] = useState([]);
  const docRef = doc(db, "users", auth.currentUser.uid);
  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      setDataArray(doc.data().descriptions);
    });
  }, []);

  const writeToDatabase = (name, prompt, completion) => {
    updateDoc(docRef, {
      descriptions: arrayUnion({
        name: name,
        prompt: prompt,
        completion: completion,
      }),
    });
  };

  const [productName, setProductName] = useState("Product Name");

  const [value, setValue] = useState("");
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const [newProductWelcome, setNewProductWelcome] = useState(true);
  const [showingProduct, setShowingProduct] = useState({});
  const [underlined, setUnderlined] = useState("");

  const askName = "Give me a 2-words name for a ";
  const askDescription =
    ", and give me a professional description to sell this product";

  const handleInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    async (e) => {
      if (e.key === "Enter") {
        setPrompt(askName + value + askDescription);
        setCompletion("Loading...");
        const response = await fetch("/api/hello", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: askName + value + askDescription }),
        });
        const data = await response.json().then((data) => {
          writeToDatabase(
            data.result.choices[0].text
              .split(" ", 2)
              .join(" ")
              .replace(/[^a-zA-Z ]/g, ""),
            prompt,
            data.result.choices[0].text
          );
          setValue("");
          setNewProductWelcome(false);
          setShowingProduct({
            name: data.result.choices[0].text
              .split(" ", 2)
              .join(" ")
              .replace(/[^a-zA-Z ]/g, ""),
            prompt: askName + value + askDescription,
            completion: data.result.choices[0].text,
          });
        });
      }
    },
    [value]
  );

  return (
    <div className="tw-flex tw-justify-center tw-w-full tw-h-full tw-overflow-hidden">
      <div className="tw-h-full tw-bg-neutral-900 tw-w-[20vw] tw-rounded-tr-lg tw-font-bold tw-px-3 tw-overflow-y-scroll">
        <button
          className="tw-w-full tw-sticky tw-top-0 tw-z-10 tw-bg-neutral-900 tw-pt-3"
          onClick={() => {
            setNewProductWelcome(true);
            setUnderlined("");
          }}
        >
          {underlined === "" ? (
            <RecentCard isNew={true} isUnderlined={true} />
          ) : (
            <RecentCard isNew={true} isUnderlined={false} />
          )}
        </button>
        <div className="">
          {/* MAP OF THE RECENTCARDS */}
          {dataArray.length > 0
            ? dataArray.map((data) => (
                <button
                  className={`tw-w-full`}
                  onClick={() => {
                    setNewProductWelcome(false);
                    setShowingProduct(data);
                    console.log(data);
                    setUnderlined(data.name);
                  }}
                >
                  {underlined === data.name ? (
                    <RecentCard name={data.name} isUnderlined={true} />
                  ) : (
                    <RecentCard name={data.name} isUnderlined={false} />
                  )}
                </button>
              ))
            : null}
        </div>
      </div>
      {/* Full container */}
      <div className="tw-h-full tw-w-[80vw] tw-py-6 tw-flex tw-justify-center">
        <div className="tw-flex tw-flex-col tw-items-center">
          {newProductWelcome ? (
            <>
              <NewProductWelcome />
              <input
                className="tw-w-11/12 tw-bg-neutral-900 tw-text-gray-100 tw-px-4 tw-py-2 tw-rounded-lg tw-outline-none tw-text-sm"
                placeholder="Describe to us what your product is and what it does in a few words..."
                value={value}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
              />
            </>
          ) : (
            <ShowingProduct
              name={showingProduct.name}
              prompt={showingProduct.prompt}
              completion={showingProduct.completion}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function NewProductWelcome() {
  return (
    <div className="tw-flex tw-w-4/6 tw-h-full tw-flex-col tw-gap-5">
      <h1 className="tw-text-2xl tw-font-bold tw-text-gray-100 tw-mb-5 tw-flex tw-justify-center tw-items-center ">
        Let's get started!
      </h1>
      <div className="tw-flex tw-self-center tw-gap-6">
        <div className=" tw-flex tw-flex-col tw-gap-3 tw-max-w-[33%] tw-text-sm">
          <h1 className="tw-flex tw-flex-col tw-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="tw-w-6 tw-h-6 tw-mb-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
              />
            </svg>
            Examples
          </h1>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            "Explain quantum computing in simple terms"
          </div>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            "Got any creative ideas for a 10 year old's birthday?"
          </div>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            "How do I make an HTTP request in Javascript?"
          </div>
        </div>
        <div className=" tw-flex tw-flex-col tw-gap-3 tw-max-w-[33%] tw-text-sm">
          <h1 className="tw-flex tw-flex-col tw-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="tw-w-6 tw-h-6 tw-mb-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            Capabilities
          </h1>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            Remembers what user said earlier in the conversation
          </div>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            Allows user to provide follow-up corrections
          </div>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            Trained to decline inappropriate requests
          </div>
        </div>
        <div className=" tw-flex tw-flex-col tw-gap-3 tw-max-w-[33%] tw-text-sm">
          <h1 className="tw-flex tw-flex-col tw-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="tw-w-6 tw-h-6 tw-mb-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            Limitations
          </h1>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            May occasionally generate incorrect information
          </div>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            May occasionally produce harmful instructions or biased content
          </div>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            Limited knowledge of world and events after 2021
          </div>
        </div>
      </div>
    </div>
  );
}
