import styles from "../styles/Layout.module.css";
import Image from "next/image";
import mongoose from "mongoose";
import { useEffect } from "react";

export default function Layout({ children }) {
  return (
    <div className="tw-flex tw-h-screen tw-bg-blue-400">
      <div className="tw-m-auto tw-bg-slate-50 tw-rounded-md tw-w-5/6 tw-h-[90%] tw-grid lg:tw-grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}></div>
          {/* <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div> */}
        </div>
        <div className="tw-right tw-flex tw-flex-col tw-justify-evenly ">
          <div className="tw-text-center tw-py-0 tw-h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
