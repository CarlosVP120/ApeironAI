import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Cursor from "../components/cursor";
import ScrollToTop from "../components/scrollToTop";
import LoadingScreen from "../components/Loading-Screen";
import "../styles/main.scss";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "react-query";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Head>
          <title>Apeiron AI</title>
          <link rel="icon" href="/img/favicon.ico" />
        </Head>
        {/* <Cursor /> */}
        {router.pathname !== "/login" &&
        router.pathname !== "/register" &&
        router.pathname !== "/apeiron" &&
        router.pathname !== "/markex" &&
        router.pathname !== "/codex" &&
        router.pathname !== "/typex" &&
        router.pathname !== "/artix" &&
        router.pathname !== "/chat" ? (
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
            <Script
              id="simpleParallax"
              src="/js/simpleParallax.min.js"
            ></Script>
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
    </QueryClientProvider>
  );
}

export default MyApp;
