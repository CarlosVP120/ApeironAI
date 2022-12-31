import React, { useEffect } from "react";
import particlesConfig from "../../config/particle-config";
import particlesBlackConfig from "../../config/pr-s-black";
import Particles from "react-tsparticles";
import dynamic from "next/dynamic";
import countries from "../../files/custom.geo.json";
import lines from "../../files/lines.json";
import map from "../../files/map.json";
import * as THREE from "three";

const Intro4 = ({ sliderRef, blackStar }) => {
  let Globe = () => null;

  if (typeof window !== "undefined") Globe = require("react-globe.gl").default;
  const globeEl = React.useRef();

  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  const [arcsData, setArcsData] = React.useState([]);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth / 2);
    globeEl.current.controls().enableDamping = true;
    globeEl.current.controls().dynamicDampingFactor = 0.01;
    globeEl.current.controls().enablePan = false;
    globeEl.current.controls().minDistance = 250;
    globeEl.current.controls().maxDistance = 500;
    globeEl.current.controls().rotateSpeed = 0.2;
    globeEl.current.controls().autoZoom = true;
    globeEl.current.controls().zoomSpeed = 0.3;
    globeEl.current.controls().autoRotate = true;

    globeEl.current.controls().minPolarAngle = Math.PI / 3.5;
    globeEl.current.controls().maxPolarAngle = Math.PI - Math.PI / 3;
    globeEl.current.scene().rotation.y = -Math.PI * (5 / 9);
    globeEl.current.scene().rotation.z = -Math.PI / 6;

    window.addEventListener("resize", onWindowResize, false);
  }, []);

  setTimeout(() => {
    setArcsData(lines.pulls);
  }, 1000);

  const onWindowResize = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth / 2);
  };

  const globeMaterial = new THREE.MeshPhongMaterial();
  globeMaterial.color = new THREE.Color(0x3a228a);
  globeMaterial.emissive = new THREE.Color(0x220038);
  globeMaterial.emissiveIntensity = 0.1;
  globeMaterial.shininess = 0.7;

  return (
    <header ref={sliderRef} className="particles circle-bg valign">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div
            className="col-lg-6 align-self-center cont text-center justify-content-center container "
            style={{ display: "flex", height: "100vh" }}
          >
            <h1 className="align-self-center" style={{ fontSize: "3.3vw" }}>
              Unlock the power of <span className="color-font">Carlos</span> to{" "}
              <span className="color-font">change your future</span>.
            </h1>
          </div>
          <div
            className="col-lg-6 align-self-center pl-0 d-none d-lg-block h-100 mh-100"
            style={{ zIndex: 1000 }}
          >
            <Globe
              ref={globeEl}
              hexPolygonsData={countries.features}
              hexPolygonResolution={3}
              hexPolygonMargin={0.7}
              showAtmosphere={true}
              atmosphereColor={"#0057c7"}
              backgroundColor={"rgba(0,0,0,0)"}
              atmosphereAltitude={0.14}
              globeMaterial={globeMaterial}
              hexPolygonColor={(e) => {
                if (["USA", "CAN", "MEX", "UAE"].includes(e.properties.name)) {
                  return "#ff4000";
                } else {
                  return "#9cff00";
                }
              }}
              width={width}
              height={height}
              arcsData={arcsData}
              arcColor={(e) => {
                return e.order % 2 === 0 ? "#9cff00" : "#ff4000";
              }}
              arcAltitude={(e) => {
                return e.arcAlt;
              }}
              arcStroke={(e) => {
                return e.status ? 0.5 : 0.3;
              }}
              arcDashLength={0.9}
              arcDashGap={4}
              arcDashAnimateTime={1000}
              arcsTransitionDuration={1000}
              arcDashInitialGap={(e) => e.order * 1}
              labelsData={map.maps}
              labelColor={() => "#ffffff"}
              labelDotRadius={0.3}
              labelSize={(e) => e.size}
              labelText={"city"}
              labelResolution={6}
              labelAltitude={0.01}
              pointsData={map.maps}
              pointColor={() => "#ffffff"}
              pointsMerge={true}
              pointAltitude={0.07}
              pointRadius={0.05}
            />
          </div>
        </div>
      </div>

      <Particles
        id="particles-js"
        options={blackStar ? particlesBlackConfig : particlesConfig}
      />

      <div className="gradient-circle"></div>
      <div className="gradient-circle two"></div>
      <div className="line bottom left"></div>
    </header>
  );
};

export default Intro4;
