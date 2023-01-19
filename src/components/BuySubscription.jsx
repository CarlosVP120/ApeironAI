import { createCheckoutSession } from "../../Stripe/createCheckoutSession";
import styles from "../styles/Form.module.css";
import ApeironNavbar from "./ApeironNavbar";

export default function BuySub({ uid, signOutHandler, redirectHandler }) {
  return (
    <div className="tw-w-full tw-h-[100vh] tw-text-center tw-bg-black tw-text-white tw-overflow-hidden">
      <div className="tw-h-full tw-flex tw-flex-col">
        <ApeironNavbar
          signOutHandler={signOutHandler}
          redirectHandler={redirectHandler}
          value="subscription"
        />
        <h1 className="tw-text-4xl tw-font-bold tw-text-white ">
          <span className={styles.color_font}>Subscriptions</span>
        </h1>
        <div className="tw-h-full tw-justify-center tw-flex tw-w-full ">
          <div className="tw-justify-center tw-self-center tw-flex tw-gap-10">
            <div className="tw-flex tw-relative tw-group tw-max-w-sm">
              <div className="tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt"></div>
              <button
                className="tw-relative tw-px-7 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center"
                onClick={() => createCheckoutSession(uid, "codex")}
              >
                <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4">
                  <h1 className="tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300">
                    CodeX
                  </h1>
                  <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                    <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                      Your AI tool for code.
                    </span>
                    <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[20vw] tw-my-3">
                      With CodeX, find the best solutions for your coding
                      problems, learn how to code better, and learn new
                      techniques.
                    </p>
                  </p>
                </div>
                <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold">
                  <span className="tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200">
                    Price &rarr;
                  </span>
                </div>
              </button>
            </div>
            <div className="tw-relative tw-group tw-max-w-sm">
              <div className="tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-from-pink-600 tw-to-purple-600 tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt"></div>

              <button
                className="tw-relative tw-px-7 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center  "
                onClick={() => createCheckoutSession(uid, "markex")}
              >
                <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4">
                  <h1 className="tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300">
                    MarkeX
                  </h1>

                  <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                    <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                      Your market helper.
                    </span>
                    <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[20vw] tw-my-3">
                      With MarkeX, find the best description for your products
                      and create the best ads for your business.
                    </p>
                  </p>
                </div>
                <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold ">
                  <span className=" tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200">
                    Price &rarr;
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="tw-relative tw-px-7 tw-mb-16  tw-rounded-lg tw-leading-none tw-flextw-items-center">
          <button
            className="tw-bg-white tw-px-4 tw-py-2 tw-text-xl tw-rounded-lg tw-font-bold tw-transition tw-duration-500 hover:tw-bg-neutral-800"
            onClick={() => createCheckoutSession(uid, "fullstack")}
          >
            <span className={styles.color_font}>Select all</span>
          </button>
        </div>
      </div>
    </div>

    // <div className="tw-w-full tw-text-center tw-h-screen tw-flex tw-flex-col tw-justify-center tw-items-center">
    //   <span
    //     className={styles.color_font}
    //     style={{ fontWeight: "bold", fontSize: 45, marginBottom: 20 }}
    //   >
    //     Buy Subscription
    //   </span>
    //   <button
    //     onClick={() => createCheckoutSession(uid, "fullstack")}
    //     className="tw-mb-4 tw-bg-black tw-text-white tw-p-2 tw-rounded-lg tw-transition tw-duration-500 hover:tw-bg-purple-500"
    //   >
    //     Buy Subscription for Fullstack
    //   </button>
    //   <button
    //     onClick={() => createCheckoutSession(uid, "markex")}
    //     className="tw-mb-4 tw-bg-black tw-text-white tw-p-2 tw-rounded-lg tw-transition tw-duration-500 hover:tw-bg-purple-500"
    //   >
    //     Buy Subscription for Markex
    //   </button>
    // </div>
  );
}
