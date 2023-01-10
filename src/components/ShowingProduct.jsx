export default function ShowingProduct({ name, prompt, completion }) {
  return (
    <>
      <h1 className="tw-text-white tw-text-4xl tw-font-bold tw-mb-4">{name}</h1>
      <div className="tw-flex tw-flex-col tw-px-20 tw-h-5/6 tw-justify-center tw-gap-16">
        <div className="">
          <p className="tw-text-white tw-text-base tw-mb-4">{prompt}</p>
          <div className="tw-flex tw-justify-center tw-items-center tw-mb-4">
            <div className="tw-flex tw-justify-center tw-items-center tw-bg-neutral-800 tw-rounded-lg tw-py-3 tw-px-4">
              {completion}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
