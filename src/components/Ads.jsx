export default function Ads() {
  return (
    <div tw-font-bold tw-text-gray-100>
      <h1 className="tw-text-2xl tw-font-bold tw-text-gray-100 tw-mb-2 tw-h-full tw-flex tw-justify-center tw-items-center">
        Ads
      </h1>

      <input
        className="tw-w-full tw-text-black tw-px-4 tw-rounded-md tw-border-2 tw-border-gray-300 tw-bg-gray-100 tw-mb-4 tw-px-4 tw-py-2 tw-focus:tw-border-[#ff8a05] tw-focus:tw-bg-white tw-focus:tw-shadow-md tw-w-auto  "
        placeholder="Type your prompt here..."
      />
      <p className="tw-text-gray-300 tw-mb-4">
        A short headline about your ad.
      </p>
    </div>
  );
}
