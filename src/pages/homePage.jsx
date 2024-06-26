import React from "react";
import Navbar from "../components/Navbar/navbar";
import FullTestimonials from "../components/Full-testimonials/full-testimonials";
import CallToAction from "../components/Call-to-action/call-to-action";
import Footer from "../components/Footer/footer";
import Team from "../components/Team/team";
import DarkTheme from "../layouts/Dark";
import LightTheme from "../layouts/Light";
import Works3 from "../components/Works3/works3";
import Blogs4 from "../components/blogs/Blogs4/blogs4";
import Intro4 from "../components/Intro4/intro4";
import AboutUs3 from "../components/About-us3/about-us3";
import Services3 from "../components/Services3/services3";
import MinimalArea2 from "../components/Minimal-Area2/minimal-area2";
import World from "../components/World";

const Homepage5 = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

  React.useEffect(() => {
    var navbar = navbarRef.current;
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
      {/* <Navbar nr={navbarRef} lr={logoRef} theme="themeL" /> FOR LIGHT THEME  */}
      <Navbar nr={navbarRef} lr={logoRef} />
      <Intro4 />
      {/* <Intro4 blackStar /> FOR LIGHT THEME*/}
      <AboutUs3 />
      <Works3 />
      <Blogs4 />
      <MinimalArea2 />
      <Services3 />

      {/*<FullTestimonials classText="pb-0"/>*/}
      <Team />

      {/*<CallToAction />*/}
      <Footer />
    </DarkTheme>
  );
};

export default Homepage5;
