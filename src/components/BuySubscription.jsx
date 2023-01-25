import { useState } from "react";
import { createCheckoutSession } from "../../Stripe/createCheckoutSession";
import styles from "../styles/Form.module.css";
import ApeironNavbar from "./ApeironNavbar";
import Loading from "./Loading";
import Guest from "./Guest";

export default function BuySub({ uid, signOutHandler, redirectHandler }) {
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useState([]);

  const verifyCart = () => {
    if (cart.length === 0) {
      alert("Please select a subscription.");
      return false;
    } else if (cart.length == 1) {
      if (cart[0] === "codex") {
        createCheckoutSession(uid, "codex");
      } else if (cart[0] === "markex") {
        createCheckoutSession(uid, "markex");
      } else if (cart[0] === "typex") {
        createCheckoutSession(uid, "typex");
      } else if (cart[0] === "artix") {
        createCheckoutSession(uid, "artix");
      }
    } else if (cart.length == 2) {
      if (cart.includes("codex") && cart.includes("markex")) {
        createCheckoutSession(uid, "codex-markex");
      } else if (cart.includes("codex") && cart.includes("typex")) {
        createCheckoutSession(uid, "codex-typex");
      } else if (cart.includes("codex") && cart.includes("artix")) {
        createCheckoutSession(uid, "codex-artix");
      } else if (cart.includes("markex") && cart.includes("typex")) {
        createCheckoutSession(uid, "markex-typex");
      } else if (cart.includes("markex") && cart.includes("artix")) {
        createCheckoutSession(uid, "markex-artix");
      } else if (cart.includes("typex") && cart.includes("artix")) {
        createCheckoutSession(uid, "typex-artix");
      }
    } else if (cart.length == 3) {
      if (
        cart.includes("codex") &&
        cart.includes("markex") &&
        cart.includes("typex")
      ) {
        createCheckoutSession(uid, "codex-markex-typex");
      } else if (
        cart.includes("codex") &&
        cart.includes("markex") &&
        cart.includes("artix")
      ) {
        createCheckoutSession(uid, "codex-markex-artix");
      } else if (
        cart.includes("codex") &&
        cart.includes("typex") &&
        cart.includes("artix")
      ) {
        createCheckoutSession(uid, "codex-typex-artix");
      } else if (
        cart.includes("markex") &&
        cart.includes("typex") &&
        cart.includes("artix")
      ) {
        createCheckoutSession(uid, "markex-typex-artix");
      }
    } else if (cart.length == 4) {
      createCheckoutSession(uid, "fullstack");
    }
  };

  return (
    <>
      {loading ? (
        <div className="tw-w-full tw-h-[100vh] tw-text-center tw-bg-white tw-overflow-hidden">
          <div className="tw-flex tw-justify-center tw-h-full">
            <Guest />
          </div>
        </div>
      ) : (
        <div className="tw-w-full tw-h-[100vh] tw-text-center tw-bg-black tw-text-white tw-overflow-hidden tw-animate-appear">
          <div className="tw-h-full tw-flex tw-flex-col">
            <ApeironNavbar
              signOutHandler={signOutHandler}
              redirectHandler={redirectHandler}
              value="subscription"
            />
            <h1 className="tw-text-4xl tw-font-bold tw-text-white ">
              <span className={styles.color_font}>Subscriptions</span>
            </h1>
            <span className="tw-text-white">
              Please select one or more tools to continue.
            </span>

            <div className="tw-h-full tw-justify-center tw-flex tw-w-full tw-flex-col tw-gap-6 ">
              <div className="tw-justify-center tw-self-center tw-flex tw-gap-10 tw-flex-col md:tw-flex-row">
                <div className="tw-flex tw-relative tw-group tw-max-w-sm">
                  <div
                    className={`tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt ${
                      cart.includes("codex")
                        ? "tw-from-white tw-to-white motion-safe:tw-animate-pulse"
                        : "tw-from-pink-600 tw-to-purple-600"
                    }`}
                  ></div>
                  <button
                    className="tw-relative tw-px-2 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center"
                    onClick={() => {
                      if (!cart.includes("codex")) {
                        setCart([...cart, "codex"]);
                      } else {
                        // delete codex from cart
                        setCart(cart.filter((item) => item !== "codex"));
                      }
                    }}
                  >
                    <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4 tw-hidden md:tw-block">
                      <h1
                        className={`${
                          cart.includes("codex")
                            ? "color_text"
                            : "tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300 "
                        } `}
                      >
                        ProCodeX
                      </h1>
                      <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                        <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                          Your AI tool for code.
                        </span>
                        <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[19vw] tw-my-3">
                          With ProCodeX, find the best solutions for your coding
                          problems, and learn how to code better with our
                          AI-powered tool.
                        </p>
                      </p>
                    </div>
                    <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold tw-divide-x tw-divide-gray-600">
                      <span className=" tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200 tw-self-center">
                        $5/month
                      </span>
                    </div>
                  </button>
                </div>

                <div className="tw-flex tw-relative tw-group tw-max-w-sm">
                  <div
                    className={`tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt ${
                      cart.includes("markex")
                        ? "tw-from-white tw-to-white motion-safe:tw-animate-pulse"
                        : "tw-from-pink-600 tw-to-purple-600"
                    }`}
                  ></div>
                  <button
                    className="tw-relative tw-px-2 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center"
                    onClick={() => {
                      if (!cart.includes("markex")) {
                        setCart([...cart, "markex"]);
                      } else {
                        // delete markex from cart
                        setCart(cart.filter((item) => item !== "markex"));
                      }
                    }}
                  >
                    <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4 tw-hidden md:tw-block">
                      <h1
                        className={`${
                          cart.includes("markex")
                            ? "color_text"
                            : "tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300 "
                        } `}
                      >
                        MarkeX
                      </h1>
                      <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                        <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                          Your market helper.
                        </span>
                        <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[19vw] tw-my-3">
                          With MarkeX, find the best description for your
                          products and create the best ads for your business.
                        </p>
                      </p>
                    </div>
                    <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold tw-divide-x tw-divide-gray-600">
                      <span className=" tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200 tw-self-center">
                        $5/month
                      </span>
                    </div>
                  </button>
                </div>

                <div className="tw-flex tw-relative tw-group tw-max-w-sm">
                  <div
                    className={`tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt ${
                      cart.includes("typex")
                        ? "tw-from-white tw-to-white motion-safe:tw-animate-pulse"
                        : "tw-from-pink-600 tw-to-purple-600"
                    }`}
                  ></div>
                  <button
                    className="tw-relative tw-px-2 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center  "
                    onClick={() => {
                      if (!cart.includes("typex")) {
                        setCart([...cart, "typex"]);
                      } else {
                        // delete typex from cart
                        setCart(cart.filter((item) => item !== "typex"));
                      }
                    }}
                  >
                    <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4 tw-hidden md:tw-block">
                      <h1
                        className={`${
                          cart.includes("typex")
                            ? "color_text"
                            : "tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300 "
                        } `}
                      >
                        TypeX
                      </h1>

                      <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                        <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                          Your best editor.
                        </span>
                        <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[19vw] tw-my-3">
                          With TypeX, you can edit your text in a simple, fast
                          and easy way, and generate the best articles for your
                          blog.
                        </p>
                      </p>
                    </div>
                    <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold tw-divide-x tw-divide-gray-600">
                      <span className=" tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200 tw-self-center">
                        $5/month
                      </span>
                    </div>
                  </button>
                </div>

                <div className="tw-flex tw-relative tw-group tw-max-w-sm">
                  <div
                    className={`tw-absolute tw--inset-0.5 tw-bg-gradient-to-r tw-opacity-75 tw-rounded-lg tw-blur group-hover:tw-opacity-100 tw-transition tw-duration-1000 group-hover:tw-duration-300 tw-animate-tilt ${
                      cart.includes("artix")
                        ? "tw-from-white tw-to-white motion-safe:tw-animate-pulse"
                        : "tw-from-pink-600 tw-to-purple-600"
                    }`}
                  ></div>
                  <button
                    className="tw-relative tw-px-2 tw-py-4 tw-bg-black tw-rounded-lg tw-leading-none tw-flex tw-flex-col tw-items-center  "
                    onClick={() => {
                      if (!cart.includes("artix")) {
                        setCart([...cart, "artix"]);
                      } else {
                        // delete artix from cart
                        setCart(cart.filter((item) => item !== "artix"));
                      }
                    }}
                  >
                    <div className="tw-text-white tw-text-2xl tw-font-bold tw-mb-4 tw-hidden md:tw-block">
                      <h1
                        className={`${
                          cart.includes("artix")
                            ? "color_text"
                            : "tw-opacity-60 group-hover:tw-opacity-100 tw-transition tw-duration-300 "
                        } `}
                      >
                        ArtiX
                      </h1>

                      <p className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                        <span className="tw-text-pink-600 tw-font-bold tw-text-base">
                          Shape your imagination.
                        </span>
                        <p className="tw-text-sm tw-text-gray-400 tw-font-bold tw-text-center tw-max-w-[19vw] tw-my-3">
                          With ArtiX, you can create your own images, and the
                          best of all, you can do it in a simple way:
                          Imaginating.
                        </p>
                      </p>
                    </div>
                    <div className="tw-flex tw-gap-2 tw-text-white tw-text-sm tw-font-bold tw-divide-x tw-divide-gray-600">
                      <span className=" tw-text-indigo-400 group-hover:tw-text-gray-100 tw-transition tw-duration-200 tw-self-center">
                        $5/month
                      </span>
                    </div>
                  </button>
                </div>
              </div>
              <div className="">
                <h1 className="tw-font-bold tw-opacity-50">
                  Powered by
                  <svg
                    id="openai-horizontal"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 120 29.53"
                    fill="currentColor"
                    className="tw-w-20 tw-h-6 tw-inline-block tw-ml-[6px] tw-mb-1"
                  >
                    <path d="M40.7,6.98s-.05,0-.07,0c-.02,0-.05,0-.07,0-4.67,0-7.58,2.91-7.58,7.6v2.53c0,4.69,2.9,7.6,7.58,7.6,.02,0,.05,0,.07,0,.02,0,.05,0,.07,0,4.67,0,7.58-2.91,7.58-7.6v-2.53c0-4.69-2.91-7.6-7.58-7.6Zm4.31,10.31c0,3.08-1.6,4.86-4.38,4.89-2.78-.03-4.38-1.81-4.38-4.89v-2.88c0-3.08,1.6-4.86,4.38-4.89,2.78,.03,4.38,1.81,4.38,4.89v2.88Zm40.57-5.79s-.06,0-.09,0c-.02,0-.03,0-.05,0-1.77,0-3.03,.6-3.65,1.75l-.19,.35v-1.8h-3.02v12.56h3.17v-7.48c0-1.76,.95-2.77,2.59-2.8,1.57,.03,2.47,1.02,2.47,2.73v7.55h3.17v-8.09c0-2.99-1.64-4.77-4.39-4.77Zm34.42-1.77v-2.4h-10.46v2.4h3.67v12.22h-3.67v2.4h10.46v-2.4h-3.67V9.73h3.67Zm-18.75-2.4h0s-3.28,0-3.28,0l-6.1,17.04h3.43l1.17-3.65h6.66v.04s1.17,3.62,1.17,3.62h3.43l-6.11-17.04h-.36Zm-4.03,10.98l2.57-8.05,2.55,8.05h-5.12Zm-39.45-6.81s-.05,0-.07,0c-.03,0-.05,0-.07,0-1.59,0-2.96,.66-3.68,1.76l-.18,.28v-1.74h-3.02V28.69h3.17v-5.9l.18,.27c.68,1.01,2.01,1.61,3.56,1.61,.03,0,.05,0,.08,0,.02,0,.04,0,.07,0,2.61,0,5.24-1.7,5.24-5.51v-2.14c0-2.74-1.62-5.51-5.26-5.51Zm2.1,7.5c0,2-1.15,3.24-3.01,3.28-1.73-.03-2.94-1.35-2.94-3.23v-1.89c0-1.9,1.22-3.24,2.97-3.28,1.84,.03,2.98,1.28,2.98,3.28v1.84Zm11.05-7.5h0c-.06,0-.12,.01-.18,.01-.06,0-.12-.01-.18-.01h0c-3.57,0-5.78,2.23-5.78,5.81v1.76c0,3.45,2.24,5.59,5.83,5.59,.08,0,.15,0,.22-.01,.05,0,.09,.01,.14,.01,2.41,0,4.09-.88,5.16-2.7l-2.13-1.23c-.71,1.05-1.66,1.84-3.02,1.84-1.82,0-2.91-1.12-2.91-3.01v-.5h8.44v-2.08c0-3.34-2.19-5.49-5.59-5.49Zm-2.86,5.54v-.3c0-2,.95-3.12,2.68-3.2,1.66,.08,2.66,1.18,2.66,2.99v.5s-5.34,0-5.34,0Z"></path>
                    <path d="M27.21,12.08c.67-2.01,.44-4.21-.63-6.04-1.61-2.8-4.85-4.24-8.01-3.57C17.16,.89,15.14-.01,13.02,0c-3.23,0-6.1,2.08-7.1,5.15-2.08,.43-3.87,1.73-4.92,3.57-1.62,2.8-1.25,6.32,.92,8.72-.67,2.01-.44,4.21,.63,6.03,1.61,2.81,4.85,4.25,8.02,3.58,1.4,1.58,3.42,2.49,5.54,2.48,3.23,0,6.1-2.08,7.1-5.15,2.08-.43,3.87-1.73,4.91-3.57,1.63-2.8,1.26-6.32-.91-8.72Zm-2.3-5.07c.64,1.12,.88,2.43,.66,3.7-.04-.03-.12-.07-.17-.1l-5.88-3.4c-.3-.17-.67-.17-.97,0l-6.89,3.98v-2.92l5.69-3.29c2.65-1.53,6.03-.62,7.56,2.03Zm-13.25,6.07l2.9-1.68,2.9,1.68v3.35l-2.9,1.68-2.9-1.68v-3.35ZM13.01,1.93c1.3,0,2.55,.45,3.55,1.28-.04,.02-.12,.07-.18,.1l-5.88,3.39c-.3,.17-.48,.49-.48,.84v7.96l-2.53-1.46V7.46c0-3.06,2.47-5.53,5.53-5.54ZM2.68,9.69h0c.65-1.12,1.66-1.98,2.88-2.43v6.99c0,.35,.18,.66,.48,.84l6.88,3.97-2.54,1.47-5.68-3.28c-2.64-1.53-3.55-4.91-2.02-7.56Zm1.55,12.83h0c-.65-1.11-.88-2.43-.66-3.7,.04,.03,.12,.07,.17,.1l5.88,3.4c.3,.17,.67,.17,.97,0l6.88-3.98v2.92l-5.69,3.28c-2.65,1.52-6.03,.62-7.56-2.02Zm11.89,5.08c-1.29,0-2.55-.45-3.54-1.28,.04-.02,.13-.07,.18-.1l5.88-3.39c.3-.17,.49-.49,.48-.84v-7.95l2.53,1.46v6.57c0,3.06-2.48,5.54-5.53,5.54Zm10.34-7.76c-.65,1.12-1.67,1.98-2.88,2.42v-6.99c0-.35-.18-.67-.48-.84h0l-6.89-3.98,2.53-1.46,5.69,3.28c2.65,1.53,3.55,4.91,2.02,7.56Z"></path>
                  </svg>
                </h1>
              </div>
            </div>
            <div className="tw-relative tw-px-7 tw-mb-12  tw-rounded-lg tw-leading-none tw-flextw-items-center tw-flex tw-justify-center tw-gap-3">
              <button
                className="tw-bg-neutral-800 tw-px-4 tw-py-2 tw-text-xl tw-rounded-lg tw-font-bold tw-transition tw-duration-500 hover:tw-bg-neutral-900 tw-shadow hover:tw-shadow-indigo-500/50 hover:tw-shadow-md "
                onClick={() => {
                  setLoading(true);
                  createCheckoutSession(uid, "fullstack");
                }}
              >
                <span className={styles.color_font}>Get all for $15/mo</span>
              </button>
              {cart.length > 0 && (
                <button
                  className="tw-animate-appear tw-bg-neutral-800 tw-px-4 tw-py-2 tw-text-xl tw-rounded-lg tw-font-bold tw-transition tw-duration-500 hover:tw-bg-neutral-900 tw-shadow hover:tw-shadow-indigo-500/50 hover:tw-shadow-md "
                  onClick={() => {
                    setLoading(true);
                    verifyCart();
                  }}
                >
                  <span className={styles.color_font}>Proceed to Checkout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
