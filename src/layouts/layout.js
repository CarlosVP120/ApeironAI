import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className="tw-flex tw-h-screen tw-bg-black">
      <div className="tw-m-auto tw-bg-black tw-rounded-md tw-w-5/6 tw-h-[90%] tw-grid lg:tw-grid-cols-2 tw-text-white tw-animate-appearLong">
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}></div>
          {/* <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div> */}
        </div>
        <div className="tw-right tw-flex tw-flex-col tw-justify-evenly ">
          <div className="tw-text-center tw-py-0 tw-h-full tw-animate-appearLong">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
