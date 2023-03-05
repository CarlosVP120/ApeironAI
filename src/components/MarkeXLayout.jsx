import { useCallback, useEffect, useState } from "react";
import RecentCard from "./RecentCard";
import ShowingProduct from "./ShowingProduct";
import { auth, db } from "../../firebase/firebaseClient";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import styles from "../styles/Form.module.css";

export default function MarkeXLayout({
  dataArray,
  type,
  askName,
  askDescription,
}) {
  const [value, setValue] = useState("");
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const [newProductWelcome, setNewProductWelcome] = useState(true);
  const [showingProduct, setShowingProduct] = useState({});
  const [underlined, setUnderlined] = useState("");

  const [platform, setPlatform] = useState("");

  const docRef = doc(db, "users", auth.currentUser.uid);

  const delimiter = type === "keywords" ? "," : ".";

  const handleInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const writeToDatabase = (name, prompt, completion, platform) => {
    updateDoc(docRef, {
      [type]: arrayUnion({
        name: name,
        prompt: prompt,
        completion: completion,
        platform: platform,
      }),
    });
  };

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
            type !== "ads"
              ? data.result.choices[0].message.content.split(delimiter, 1)[0]
              : value,
            value,
            data.result.choices[0].message.content.replace(/^\s+|\s+$/g, ""),
            platform
          );
          setValue("");
          setNewProductWelcome(false);
          setShowingProduct({
            name:
              type !== "ads"
                ? data.result.choices[0].message.content.split(delimiter, 1)[0]
                : value,
            prompt: value,
            completion: data.result.choices[0].message.content.replace(
              /^\s+|\s+$/g,
              ""
            ),
            platform: platform,
          });
          setUnderlined(
            type !== "ads"
              ? data.result.choices[0].message.content.split(delimiter, 1)[0]
              : value
          );
        });
      }
    },
    [value]
  );

  const handleClick = useCallback(
    async (e) => {
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
          type !== "ads"
            ? data.result.choices[0].message.content.split(delimiter, 1)[0]
            : value,
          value,
          data.result.choices[0].message.content.replace(/^\s+|\s+$/g, ""),
          platform
        );
        setValue("");
        setNewProductWelcome(false);
        setShowingProduct({
          name:
            type !== "ads"
              ? data.result.choices[0].message.content.split(delimiter, 1)[0]
              : value,
          prompt: value,
          completion: data.result.choices[0].message.content.replace(
            /^\s+|\s+$/g,
            ""
          ),
          platform: platform,
        });
        setUnderlined(
          type !== "ads"
            ? data.result.choices[0].message.content.split(delimiter, 1)[0]
            : value
        );
      });
    },
    [value]
  );

  return (
    <div className="tw-flex tw-justify-center tw-w-full tw-h-full tw-overflow-hidden">
      <div className="tw-h-full tw-bg-neutral-900 tw-w-[20vw] tw-rounded-tr-lg tw-font-bold tw-px-3 tw-overflow-y-auto">
        <button
          className="tw-w-full tw-sticky tw-top-0 tw-z-10 tw-bg-neutral-900 tw-pt-3"
          onClick={() => {
            setCompletion("");
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
        <div>
          {/* MAP OF THE RECENTCARDS */}
          {dataArray.length > 0 ? (
            // invert the order of the dataArray
            dataArray.map((data) => (
              <button
                key={data.name}
                className={`tw-w-full tw-animate-appear`}
                onClick={() => {
                  setNewProductWelcome(false);
                  setShowingProduct(data);
                  setUnderlined(data.name);
                }}
              >
                {underlined === data.name ? (
                  <RecentCard
                    name={data.name}
                    isUnderlined={true}
                    type={type}
                    platform={data.platform}
                  />
                ) : (
                  <RecentCard
                    name={data.name}
                    isUnderlined={false}
                    type={type}
                    platform={data.platform}
                  />
                )}
              </button>
            ))
          ) : (
            <div className="tw-h-full tw-w-full tw-flex tw-self-center tw-flex-col tw-justify-center tw-items-center tw-mt-[30vh] tw-animate-appear">
              <h1>You have no recent products. Start by creating a new one!</h1>
            </div>
          )}
        </div>
      </div>
      {/* Full container */}

      <div className="tw-h-full tw-w-[80vw] tw-flex tw-justify-center">
        {" "}
        <div className="tw-flex tw-flex-col tw-items-center tw-pb-6 tw-w-full tw-h-full ">
          {newProductWelcome ? (
            <>
              {completion === "" ? (
                <>
                  <NewProductWelcome
                    type={type}
                    setPlatform={setPlatform}
                    askName={askName}
                    completion={completion}
                    setCompletion={setCompletion}
                  />
                  {type === "ads" && platform === "" ? null : (
                    <div className="tw-flex tw-w-full tw-items-center tw-justify-center">
                      <input
                        className="tw-w-9/12 tw-bg-neutral-900 tw-text-gray-100 tw-px-4 tw-py-2 tw-rounded-lg tw-outline-none tw-text-sm"
                        placeholder={`${
                          type === "ads"
                            ? "Type a short headline/title about your ad..."
                            : "Describe to us what your product is and what it does in a few words..."
                        }`}
                        value={value}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                      />
                      <button
                        className="tw-ml-3 tw-bg-blue-600 tw-px-3 tw-text-sm tw-py-2 tw-rounded-lg"
                        onClick={handleClick}
                      >
                        {type === "ads"
                          ? "Create Ad"
                          : type === "descriptions"
                          ? "Create Product"
                          : "Find Keywords"}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                completion === "Loading..." && (
                  <div
                    disabled
                    type="button"
                    className="tw-h-full tw-text-2xl tw-inline-flex tw-items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="tw-inline tw-w-6 tw-h-6 tw-mr-2 tw-text-gray-200 tw-animate-spin dark:tw-text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Loading...
                  </div>
                )
              )}
            </>
          ) : (
            <ShowingProduct
              name={showingProduct.name}
              prompt={showingProduct.prompt}
              completion={showingProduct.completion}
              writeToDatabase={writeToDatabase}
              setShowingProduct={setShowingProduct}
              setUnderlined={setUnderlined}
              type={type}
              platform={showingProduct.platform}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function NewProductWelcome({ type, setPlatform, askName }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="tw-flex tw-w-4/6 tw-h-full tw-flex-col tw-gap-5 tw-justify-center">
      <h1 className="tw-text-3xl tw-font-bold tw-text-gray-100 tw-mb-5 tw-flex tw-justify-center tw-items-center tw-animate-appear">
        {type === "ads" ? (
          <span>
            Create a New <span className={styles.color_font}>Ad</span>{" "}
          </span>
        ) : type === "descriptions" ? (
          <span>
            Create a New <span className={styles.color_font}>Product</span>{" "}
          </span>
        ) : (
          <span>
            Find <span className={styles.color_font}>Keywords</span>{" "}
          </span>
        )}
      </h1>

      <div className="tw-flex tw-self-center tw-gap-6 tw-justify-center">
        <div className=" tw-flex tw-flex-col tw-gap-3 tw-w-[33%] tw-text-sm">
          <h1 className="tw-flex tw-flex-col tw-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="tw-w-6 tw-h-6 tw-mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
              />
            </svg>
            Examples
          </h1>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            &quot;Red car that goes fast, but is also safe&quot;
          </div>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            &quot;Watch with a heart rate monitor&quot;
          </div>
          {type !== "ads" && (
            <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
              &quot;UI/UX Course for Google&quot;
            </div>
          )}
        </div>
        <div className=" tw-flex tw-flex-col tw-gap-3 tw-w-[33%] tw-text-sm">
          <h1 className="tw-flex tw-flex-col tw-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="tw-w-6 tw-h-6 tw-mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            Capabilities
          </h1>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            Generates completely new ideas
          </div>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            Has the capability to correct a concept based on feedback
          </div>
          {type !== "ads" && (
            <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
              Detects the type of product you&apos;re trying to create
            </div>
          )}
        </div>
        <div className=" tw-flex tw-flex-col tw-gap-3 tw-w-[33%] tw-text-sm">
          <h1 className="tw-flex tw-flex-col tw-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="tw-w-6 tw-h-6 tw-mb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            Limitations
          </h1>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            May occasionally generate incorrect information
          </div>
          <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
            May have difficulty generating ideas for certain products
          </div>
          {type !== "ads" && (
            <div className="tw-bg-neutral-900 tw-px-3 tw-py-2 tw-rounded-lg">
              It&apos;s intelligence is limited to the data it has been trained
              on
            </div>
          )}
        </div>
      </div>
      {type === "ads" && (
        <>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-100 tw-flex tw-justify-center tw-items-center tw-animate-appear">
            Choose a platform to get started:
          </h1>
          <div className="tw-flex tw-justify-center tw-items-center tw-animate-appear">
            <div className="tw-flex tw-items-center tw-gap-5">
              <button
                className={`tw-flex tw-items-center ${
                  selected === "Google" ? "tw-bg-gray-800" : "tw-bg-gray-100"
                } tw-p-2 tw-rounded-lg tw-text-gray-900 tw-font-bold tw-text-sm tw-transition tw-duration-500 hover:tw-bg-gray-800`}
                onClick={() => {
                  setPlatform("Google");
                  askName = askName.replace(/\./g, "Google");
                  setSelected("Google");
                }}
              >
                <Image
                  alt="image"
                  src={"/assets/google.svg"}
                  width="30"
                  height={30}
                ></Image>
              </button>
              <button
                className={`tw-flex tw-items-center ${
                  selected === "Facebook" ? "tw-bg-gray-800" : "tw-bg-gray-100"
                } tw-p-2 tw-rounded-lg tw-text-gray-900 tw-font-bold tw-text-sm tw-transition tw-duration-500 hover:tw-bg-gray-800`}
                onClick={() => {
                  setPlatform("Facebook");
                  askName = askName.replace(/\./g, "Facebook");
                  setSelected("Facebook");
                }}
              >
                <Image
                  alt="image"
                  src={"/assets/facebook-svgrepo-com.svg"}
                  width="30"
                  height={30}
                ></Image>
              </button>
              <button
                className={`tw-flex tw-items-center ${
                  selected === "Instagram" ? "tw-bg-gray-800" : "tw-bg-gray-100"
                } tw-p-2 tw-rounded-lg tw-text-gray-900 tw-font-bold tw-text-sm tw-transition tw-duration-500 hover:tw-bg-gray-800`}
                onClick={() => {
                  setPlatform("Instagram");
                  askName = askName.replace(/\./g, "Instagram");
                  setSelected("Instagram");
                }}
              >
                <Image
                  alt="image"
                  src={"/assets/instagram1.svg"}
                  width="30"
                  height={30}
                ></Image>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
