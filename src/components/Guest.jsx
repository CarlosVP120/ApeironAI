import React from "react";
import styles from "../styles/Form.module.css";

const guest = () => {
  return (
    <div className="tw-w-full tw-h-[100vh] tw-text-center">
      <div className="tw-h-full tw-flex tw-flex-col tw-justify-center">
        <h1
          className="tw-self-center tw-mb-10"
          style={{ fontSize: "60px", fontFamily: "Poppins" }}
        >
          Apeiron
          <span className={styles.color_font} style={{ fontWeight: "bold" }}>
            AI
          </span>
        </h1>
      </div>
    </div>
  );
};

export default guest;
