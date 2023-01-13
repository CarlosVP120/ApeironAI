export default function CodeXButtons({ setValue, value }) {
  return (
    <div className="tw-font-bold tw-text-white tw-mt-2 tw-flex tw-justify-center tw-shadow-inner tw-gap-4">
      <button
        onClick={() => setValue("Explain Code")}
        className="tw-mt-4 tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100"
      >
        Explain Code
      </button>
      <button
        onClick={() => setValue("Convert Code")}
        className="tw-mt-4 tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100"
      >
        Convert Code
      </button>
      <button
        onClick={() => setValue("Generate Code")}
        className="tw-mt-4 tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100"
      >
        Generate Code
      </button>
      <button
        onClick={() => setValue("Fix Grammar")}
        className="tw-mt-4 tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100"
      >
        Fix Grammar
      </button>
      <button
        onClick={() => setValue("Cmd Assistance")}
        className="tw-mt-4 tw-p-4 tw-rounded-lg tw-text-black tw-bg-gray-100"
      >
        Cmd Assistance
      </button>
    </div>
  );
}
