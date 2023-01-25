/* eslint-disable @next/next/no-img-element */
import React from "react";
import Split from "../Split";
import Link from "next/link";
import { thumparallaxDown } from "../../common/thumparallax";

const MinimalArea2 = () => {
  React.useEffect(() => {
    setTimeout(() => {
      thumparallaxDown();
    }, 1000);
  }, []);
  return (
    <section className="min-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="img">
              <video className="thumparallax-down" muted autoPlay loop>
                <source src="/img/video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="col-lg-6 valign">
            <div className="content">
              <h4 className="color-font">TypeX</h4>
              <Split>
                <p className="wow txt words chars splitting" data-splitting>
                  TypeX is a typing essay AI that helps you write essays faster
                  and more efficiently. It can be used to automate the process
                  of essay writing, create new essays, and improve your writing
                  skills.
                </p>
              </Split>
              <ul>
                <li className="wow fadeInUp" data-wow-delay=".2s">
                  We provide the best services for our clients.
                </li>
                <li className="wow fadeInUp" data-wow-delay=".4s">
                  We work with the most advanced AI technology.
                </li>
              </ul>
              <Link href={"/login"}>
                <a
                  className="butn bord curve mt-40 wow fadeInUp"
                  data-wow-delay=".8s"
                >
                  <span>Discover</span>
                </a>
              </Link>

              <br />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimalArea2;
