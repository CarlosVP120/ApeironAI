import { useRouter } from "next/router";
import React from "react";
import scrollToTop from "../../common/scrollToTop";

const ScrollToTop = () => {
  const router = useRouter();

  React.useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div
      className={`${
        router.pathname === "/login" ||
        router.pathname === "/register" ||
        router.pathname === "/apeiron" ||
        router.pathname === "/markex" ||
        router.pathname === "/codex"
          ? "tw-hidden"
          : ""
      } progress-wrap cursor-pointer`}
    >
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
    </div>
  );
};

export default ScrollToTop;
