import styles from "../styles/Form.module.css";

export default function ShowingProduct({ name, prompt, completion }) {
  console.log(name, prompt, completion);
  return (
    <>
      <h1
        className={` tw-text-4xl tw-font-bold tw-py-3 tw-px-4 tw-rounded-lg ${styles.color_font}`}
      >
        {name}
      </h1>
      <div className="tw-flex tw-flex-col tw-px-20 tw-py-5 tw-w-5/6 tw-justify-center tw-bg-neutral-900 tw-my-auto tw-rounded-lg">
        <div>
          <p className="tw-text-white tw-text-base tw-mb-4">{prompt}</p>
          <div className="tw-flex tw-justify-center tw-items-center tw-mb-4">
            <div className="tw-flex tw-justify-center tw-items-center tw-bg-neutral-800 tw-rounded-lg tw-py-3 tw-px-4 ">
              {completion}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
