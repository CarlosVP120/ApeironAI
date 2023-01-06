import React from "react";
import blog1Data from "../data/blog1.json";
import LightTheme from "../layouts/Light";
import Navbar from "../components/Navbar/navbar";
import DarkTheme from "../layouts/Dark";
import BlogStanderd from "../components/Blog-standerd/blog-standerd";
import PageHeader from "../components/Page-header/page-header";
import Footer from "../components/Footer/footer";

const BlogLight = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

  React.useEffect(() => {
    var navbar = navbarRef.current,
      logo = logoRef.current;
    if (window.pageYOffset > 300) {
      navbar.classList.add("nav-scroll");
    } else {
      navbar.classList.remove("nav-scroll");
    }
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    });
  }, [navbarRef]);
  return (
    <DarkTheme>
      {/* <Navbar nr={navbarRef} lr={logoRef} theme="themeL" /> */}
      <Navbar nr={navbarRef} lr={logoRef} />
      <h1>Pricing</h1>
      <Footer />
    </DarkTheme>
  );
};

export default BlogLight;
