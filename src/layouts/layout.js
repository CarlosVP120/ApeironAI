import { useState } from "react";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      setIsMobile(true);
    }
  }, []);

  return (
    <div
      className={`tw-flex tw-bg-black ${
        !isMobile ? "tw-h-screen" : "tw-h-[90vh]"
      }`}
    >
      <div className="tw-m-auto tw-bg-black tw-rounded-md tw-w-5/6 tw-h-[90%] tw-grid lg:tw-grid-cols-2 tw-text-white tw-animate-appearLong">
        {!isMobile && (
          <div className="tw-flex tw-items-center">
            {/* <div className={styles.cartoonImg}></div> */}

            <img
              src="/assets/ai.jpg"
              alt="landscape"
              width="100%"
              height="100%"
              onLoad={() => setImageLoaded(true)}
              style={{
                position: "relative",
                bottom: "0",
                left: "0",
                right: "0",
                top: "0",
                display: !imageLoaded ? "none" : "block",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className="tw-animate-appearLong"
            />
          </div>
        )}

        <div className="tw-right tw-flex tw-flex-col tw-justify-evenly ">
          <div className="tw-text-center tw-py-0 tw-h-full tw-animate-appearLong">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
