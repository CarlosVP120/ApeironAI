import React from "react";
import Script from "next/script";
import loadingPace from "../../common/loadingPace";
import appData from "../../data/app.json";
import { useRouter } from "next/router";

const LoadingScreen = ({ disabled }) => {
  const router = useRouter();

  const [show, setShow] = React.useState("");

  React.useEffect(() => {
    if (
      router.pathname !== "/" ||
      router.pathname !== "/features" ||
      router.pathname !== "/pricing" ||
      router.pathname !== "/contact" ||
      router.pathname !== "/about"
    ) {
      setShow("tw-hidden");
      console.log(router.pathname);
    }

    if (disabled) {
      appData.showLoading = false;
    } else {
      appData.showLoading = true;
    }

    let bodyEl = document.querySelector("body");
    if (appData.showLoading) {
      loadingPace();

      if (bodyEl.classList.contains("hideX")) {
        bodyEl.classList.remove("hideX");
      }
    } else {
      bodyEl.classList.add("hideX");
    }
  });

  return (
    <>
      <div
        className={`${
          appData.showLoading === true ? `showX ${show}` : "hideX"
        }`}
      >
        <div className={`loading ${disabled === true ? "tw-hidden" : ""}`}>
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </div>
        <div id="preloader"></div>
      </div>
      {appData.showLoading ? (
        <Script
          id="pace"
          strategy="beforeInteractive"
          src="/js/pace.min.js"
        ></Script>
      ) : (
        ""
      )}
    </>
  );
};

export default LoadingScreen;
