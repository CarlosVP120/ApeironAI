import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Cursor from "../components/cursor";
import ScrollToTop from "../components/scrollToTop";
import LoadingScreen from "../components/Loading-Screen";
import "../styles/main.scss";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (
        url !== "/login" &&
        url !== "/register" &&
        url !== "/apeiron" &&
        url !== "/markex" &&
        url !== "/codex"
      ) {
        LoadingScreen.disabled = false;
      } else {
        LoadingScreen.disabled = true;
        document.querySelector("body").classList.remove("hideX");
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Apeiron AI</title>
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      {/* <Cursor /> */}
      {Component.name !== "Login" &&
      Component.name !== "Register" &&
      Component.name !== "ToolHomePage" &&
      Component.name !== "MarkeX" &&
      Component.name !== "CodeX" ? (
        <>
          <LoadingScreen disabled={false} />
          <Component {...pageProps} />
          <ScrollToTop />
          <Script id="wow" src="/js/wow.min.js"></Script>
          <Script
            strategy="beforeInteractive"
            id="splitting"
            src="/js/splitting.min.js"
          ></Script>
          <Script id="simpleParallax" src="/js/simpleParallax.min.js"></Script>
          <Script
            id="isotope"
            strategy="beforeInteractive"
            src="/js/isotope.pkgd.min.js"
          ></Script>
          <Script
            id="wowInit"
            strategy="lazyOnload"
          >{`new WOW().init();`}</Script>
        </>
      ) : (
        <>
          <div className="tw-hidden">
            <LoadingScreen disabled={true} />
          </div>
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

export default MyApp;
