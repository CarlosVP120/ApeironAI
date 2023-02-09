/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import appData from "../../data/app.json";
import { handleDropdown, handleMobileDropdown } from "../../common/navbar";

const Navbar = ({ lr, nr, theme }) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <nav
      ref={nr}
      className={`navbar navbar-expand-lg change ${
        theme === "themeL" ? "light" : ""
      }`}
    >
      <div className="container">
        <Link href="/">
          <a className="ml-3 ml-md-0 p-2 tw-rounded-lg tw-transition tw-font-semi-bold tw-duration-500 hover:tw-bg-gray-200 hover:tw-text-black ">
            {/* {theme ? (
              theme === "themeL" ? (
                <img ref={lr} src={appData.darkLogo} alt="logo" />
              ) : (
                <img ref={lr} src={appData.lightLogo} alt="logo" />
              )
            ) : (
              <img ref={lr} src={appData.lightLogo} alt="logo" />
            )} */}
            <h1 className="align-self-center" style={{ fontSize: "22px" }}>
              Apeiron
              <span className="color-font" style={{ fontWeight: "bold" }}>
                AI
              </span>
            </h1>
          </a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleMobileDropdown}
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-bar">
            <i className="fas fa-bars"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item nav-link">
              <Link href={`/`}>
                <a className=" tw-transition tw-duration-400 hover:tw-border-b-gray-200 tw-border-transparent tw-border-2  ">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item nav-link">
              <Link href={`/tools`}>
                <a className="tw-transition tw-duration-400 hover:tw-border-b-gray-200 tw-border-transparent tw-border-2  ">
                  Tools
                </a>
              </Link>
            </li>
            {/* <li className="nav-item nav-link">
              <Link href={`/pricing`}>
                <a className="tw-transition tw-duration-400 hover:tw-border-b-gray-200 tw-border-transparent tw-border-2  ">
                  Pricing
                </a>
              </Link>
            </li> */}
            <li className="nav-item nav-link">
              <Link href={`/contact`}>
                <a className="tw-transition tw-duration-400 hover:tw-border-b-gray-200 tw-border-transparent tw-border-2  ">
                  Contact
                </a>
              </Link>
            </li>
            <li className="nav-item nav-link">
              <Link href={`/about`}>
                <a className="tw-transition tw-duration-400 hover:tw-border-b-gray-200 tw-border-transparent tw-border-2  ">
                  About Us
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link tw-relative tw-inline-flex tw-items-center tw-justify-center tw-px-5 tw-py-3 tw-overflow-hidden tw-font-medium tw-text-indigo-600 tw-transition tw-duration-300 tw-ease-out tw-rounded-lg tw-shadow tw-group hover:tw-ring-purple-500 hover:tw-shadow-purple-700 hover:tw-shadow-md ">
                <Link href={"/login"}>
                  <a>
                    {!isMobile && (
                      <>
                        <span className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-600 tw-via-purple-600 tw-to-pink-700"></span>
                        <span className="tw-absolute tw-bottom-0 tw-right-0 tw-block tw-w-64 tw-h-64 tw-mb-32 tw-mr-4 tw-transition tw-duration-500 tw-origin-bottom-left tw-transform tw-rotate-45 tw-translate-x-24 tw-bg-pink-600 tw-rounded-full tw-opacity-10 group-hover:tw-rotate-180 tw-ease"></span>
                      </>
                    )}
                    <span className="tw-relative tw-text-white d-flex tw-font-bold tw-flex tw-justify-center tw-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="tw-w-4 tw-h-4 tw-mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                        />
                      </svg>
                      Login or Signup
                    </span>
                  </a>
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
