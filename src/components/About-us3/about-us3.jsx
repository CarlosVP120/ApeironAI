/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from "../Split";
import Link from "next/link";
import AboutUs3date from "../../data/sections/about-us3.json";
import { thumparallax, thumparallaxDown } from "../../common/thumparallax";

const AboutUs3 = () => {
  React.useEffect(() => {
    setTimeout(() => {
      thumparallax();
      thumparallaxDown();
    }, 1000);
  }, []);
  return (
    <section className="agency section-padding position-re">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 tw-items-end tw-flex">
            <div className="imgsec ">
              <div className="row tw-flex tw-justify-center">
                <div className="col-md-8 ">
                  <div className="item">
                    <div
                      className="imgone big-bord wow fadeInDown"
                      data-wow-delay=".8s"
                    >
                      <video className="thumparallax-down" autoPlay muted loop>
                        <source src="/img/chipX.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <div className="exp">
                      <h2 className="nmb-font">{AboutUs3date.exp.nmb}</h2>
                      <h6>{AboutUs3date.exp.name}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 valign">
            <div className="content">
              <Split>
                <h4 className="wow words chars splitting" data-splitting>
                  {AboutUs3date.title.first} <br /> {AboutUs3date.title.second}
                </h4>
              </Split>
              <Split>
                <p className="wow txt words chars splitting" data-splitting>
                  {AboutUs3date.content.first} <br />
                  {AboutUs3date.content.second}
                </p>
              </Split>
              <Link href={`/about`}>
                <a
                  className="butn bord curve mt-40 wow fadeInUp"
                  data-wow-delay=".8s"
                >
                  <span>{AboutUs3date.smallTitle}</span>
                </a>
              </Link>

              <br />
            </div>
          </div>
        </div>
      </div>
      <div className="line bottom right"></div>
    </section>
  );
};

export default AboutUs3;
