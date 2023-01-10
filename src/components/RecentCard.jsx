import styles from "../styles/Form.module.css";

export default function RecentCard({ isNew, name, isUnderlined }) {
  return (
    <div className="tw-flex tw-justify-center tw-w-full tw-mb-2">
      <div
        className={`${
          isUnderlined ? "tw-bg-neutral-700" : "tw-bg-neutral-800"
        }  tw-w-full tw-py-3 tw-rounded-lg tw-transition tw-duration-300 hover:tw-bg-neutral-700`}
      >
        {isNew ? (
          <div className="tw-flex tw-justify-center tw-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="tw-w-6 tw-h-6 tw-mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className={styles.color_font}>New Product</span>
          </div>
        ) : (
          <div className="tw-flex tw-justify-center tw-items-center">
            <span className="tw-text-white tw-ml-2">{name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
