import Typewriter from "typewriter-effect";

export default function TypeMarkex() {
    return (
        <div className="tw-text-5xl tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full ">
            <h1 className="tw-text-7xl tw-font-bold tw-text-gray-100 tw-mb-5 tw-flex tw-justify-center tw-items-center ">
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString(
                                `Welcome to <span style="  background: -webkit-gradient(
              linear,
              left top,
              right top,
              from(#12c2e9),
              color-stop(#c471ed),
              to(#f64f59)
            );
            background: -webkit-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: -o-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">MarkeX  </span>`
                            )
                            .start();
                    }}
                />
            </h1>

            <h1 className="tw-text-3xl tw-font-bold tw-text-gray-100 tw-mb-5 tw-flex tw-justify-center tw-items-center ">
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString(
                                `A place where you can <span style="  background: -webkit-gradient(
              linear,
              left top,
              right top,
              from(#12c2e9),
              color-stop(#c471ed),
              to(#f64f59)
            );
            background: -webkit-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: -o-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">Describe </span> your ideas`
                            )
                            .pauseFor(500)
                            .deleteAll()
                            .typeString(
                                `Convert your ideas into <span style="  background: -webkit-gradient(
              linear,
              left top,
              right top,
              from(#12c2e9),
              color-stop(#c471ed),
              to(#f64f59)
            );
            background: -webkit-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: -o-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">products</span>`
                            )
                            .pauseFor(500)
                            .deleteAll()
                            .typeString(
                                `Find the special <span style="  background: -webkit-gradient(
              linear,
              left top,
              right top,
              from(#12c2e9),
              color-stop(#c471ed),
              to(#f64f59)
            );
            background: -webkit-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: -o-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">words</span>`
                            )
                            .pauseFor(500)
                            .deleteAll()
                            .typeString(
                                `Create <span style="  background: -webkit-gradient(
              linear,
              left top,
              right top,
              from(#12c2e9),
              color-stop(#c471ed),
              to(#f64f59)
            );
            background: -webkit-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: -o-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">Ads </span> for your products`
                            )
                            .pauseFor(500)
                            .deleteAll()
                            .typeString(`All in one place`)
                            .pauseFor(500)
                            .deleteAll()
                            .typeString(
                                `All in <span style="  background: -webkit-gradient(
              linear,
              left top,
              right top,
              from(#12c2e9),
              color-stop(#c471ed),
              to(#f64f59)
            );
            background: -webkit-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: -o-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
            background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">MarkeX</span>`
                            )
                            .start();
                    }}
                />
            </h1>
        </div>
    );
}
