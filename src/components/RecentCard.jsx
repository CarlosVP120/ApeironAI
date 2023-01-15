import styles from "../styles/Form.module.css";
import Image from "next/image";

export default function RecentCard({
  isNew,
  name,
  isUnderlined,
  type,
  platform,
}) {
  return (
    <div className="tw-flex tw-justify-center tw-w-full tw-mb-2">
      <div
        className={`${
          isUnderlined ? "tw-bg-neutral-700" : "tw-bg-neutral-900"
        } tw-w-full tw-py-2 tw-rounded-md tw-transition tw-duration-300 hover:tw-bg-neutral-700`}
      >
        {isNew ? (
          <div className="tw-flex tw-justify-center tw-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="tw-w-6 tw-h-6 tw-mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className={styles.color_font}>New Product</span>
          </div>
        ) : (
          <div className="tw-flex">
            <span className="tw-text-white tw-ml-2 tw-flex tw-font-normal tw-items-center">
              {type === "descriptions" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="tw-w-6 tw-h-6 tw-mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>
              ) : type === "keywords" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="tw-w-6 tw-h-6 tw-mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
              ) : (
                <div className="tw-mr-3 tw-flex tw-items-center tw-bg-gray-100 tw-p-1 tw-rounded-lg tw-text-gray-900 tw-font-bold tw-text-sm">
                  {platform === "Google" ? (
                    <Image
                      alt="image"
                      src={"/assets/google.svg"}
                      width="24"
                      height="24"
                    ></Image>
                  ) : platform === "Facebook" ? (
                    <Image
                      alt="image"
                      src={"/assets/facebook-svgrepo-com.svg"}
                      width="24"
                      height="24"
                    ></Image>
                  ) : (
                    <Image
                      alt="image"
                      src={"/assets/instagram1.svg"}
                      width="24"
                      height="24"
                    ></Image>
                  )}
                </div>
              )}
              {name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
