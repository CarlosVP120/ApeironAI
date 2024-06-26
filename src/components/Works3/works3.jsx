/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import worksData from "../../data/sections/works.json";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
SwiperCore.use([Autoplay, Pagination, Navigation]);

const Works3 = () => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/ionicons.min.css" />
      </Head>
      <section className="work-carousel2 metro section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10">
              <div className="sec-head">
                <h6 className="wow fadeIn" data-wow-delay=".5s">
                  CodeX - Tools
                </h6>
                <h3 className="wow color-font">
                  Five Different Tools &amp; <br /> Some Examples.
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 no-padding">
              <div className="swiper-container">
                <Swiper
                  className="swiper-wrapper"
                  slidesPerView={2}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                  }}
                  onSwiper={(swiper) => {
                    setTimeout(() => {
                      swiper.params.navigation.prevEl =
                        navigationPrevRef.current;
                      swiper.params.navigation.nextEl =
                        navigationNextRef.current;

                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    });
                  }}
                  speed={1000}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    767: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                      centeredSlides: false,
                    },
                    991: {
                      slidesPerView: 2,
                    },
                  }}
                >
                  <SwiperSlide className="swiper-slide">
                    <div className="content">
                      <div className="img">
                        <span className="imgio">
                          <span className="wow cimgio" data-delay="500"></span>
                          <img src="/img/portfolio/explaincode.png" alt="" />
                        </span>
                      </div>
                      <div className="cont">
                        <h6>
                          <Link href={`/works3/works3-dark`}>Explain Code</Link>
                        </h6>
                        <h4>
                          <Link
                            href={`/project-details2/project-details2-dark`}
                          >
                            Sharing knowledge
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="content">
                      <div className="img">
                        <span className="imgio">
                          <span className="wow cimgio" data-delay="500"></span>
                          <img src="/img/portfolio/convertcode.png" alt="" />
                        </span>
                      </div>
                      <div className="cont">
                        <h6>
                          <Link href={`/codex`}>Convert Code</Link>
                        </h6>
                        <h4>
                          <Link
                            href={`/project-details2/project-details2-dark`}
                          >
                            Transforming ideas
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="content">
                      <div className="img">
                        <span className="imgio">
                          <span className="wow cimgio" data-delay="500"></span>
                          <img src="/img/portfolio/generatecode.png" alt="" />
                        </span>
                      </div>
                      <div className="cont">
                        <h6>
                          <Link href={`/works3/works3-dark`}>
                            Generate Code
                          </Link>
                        </h6>
                        <h4>
                          <Link
                            href={`/project-details2/project-details2-dark`}
                          >
                            Building ideas
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="content">
                      <div className="img">
                        <span className="imgio">
                          <span className="wow cimgio" data-delay="500"></span>
                          <img src="/img/portfolio/cmdassistance.png" alt="" />
                        </span>
                      </div>
                      <div className="cont">
                        <h6>
                          <Link href={`/works3/works3-dark`}>
                            Command Assistance
                          </Link>
                        </h6>
                        <h4>
                          <Link
                            href={`/project-details2/project-details2-dark`}
                          >
                            Helping developers
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="content">
                      <div className="img">
                        <span className="imgio">
                          <span className="wow cimgio" data-delay="500"></span>
                          <img src="/img/portfolio/timecomp.png" alt="" />
                        </span>
                      </div>
                      <div className="cont">
                        <h6>
                          <Link href={`/works3/works3-dark`}>
                            Time Complexity
                          </Link>
                        </h6>
                        <h4>
                          <Link
                            href={`/project-details2/project-details2-dark`}
                          >
                            Analyzing algorithms
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>

                <div
                  ref={navigationNextRef}
                  className="swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer"
                >
                  <i className="ion-ios-arrow-right"></i>
                </div>
                <div
                  ref={navigationPrevRef}
                  className="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer"
                >
                  <i className="ion-ios-arrow-left"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Works3;
