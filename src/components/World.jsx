import React, { Component, useEffect } from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

class ThreeScene extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();

    //Add Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // set color of background to transparent
    this.renderer.setClearColor("#000000", 0);
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.mount.appendChild(this.renderer.domElement);

    //add Camera
    this.camera = new THREE.PerspectiveCamera();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.camera.position.z = 400;
    this.camera.position.y = 0;
    this.camera.position.x = 0;

    //LIGHTS
    var dLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    this.camera.add(dLight);

    var dLight1 = new THREE.DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-200, 500, 200);
    this.camera.add(dLight1);

    var dLight2 = new THREE.PointLight(0x8566cc, 0.5);
    dLight2.position.set(-200, 500, 200);
    this.camera.add(dLight2);

    this.scene.add(this.camera);

    this.scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    //Camera Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dynamicDampingFactor = 0.01;
    this.controls.enablePan = false;
    this.controls.minDistance = 250;
    this.controls.maxDistance = 500;
    this.controls.rotateSpeed = 0.2;
    this.controls.zoomSpeed = 0.3;
    this.controls.autoRotate = true;
    this.controls.autoZoom = true;

    this.controls.minPolarAngle = Math.PI / 3.5;
    this.controls.maxPolarAngle = Math.PI - Math.PI / 3;

    // window.addEventListener("resize", onWindowResize, false);

    //Simple Box with WireFrame
    this.addModels();

    this.renderScene();

    // //start animation
    // this.animate(); LATER
  }

  addModels() {
    // -----Step 1--------
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshNormalMaterial({});
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // // -----Step 2--------
    // //LOAD TEXTURE and on completion apply it on SPHERE
    // new THREE.TextureLoader().load(
    //   "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    //   (texture) => {
    //     //Update Texture
    //     this.cube.material.map = texture;
    //     this.cube.material.needsUpdate = true;
    //   },
    //   (xhr) => {
    //     //Download Progress
    //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //   },
    //   (error) => {
    //     //Error CallBack
    //     console.log("An error happened" + error);
    //   }
    // );

    // // -----Step 4--------
    // //Loading 3d Models
    // //Loading Material First
    // var mtlLoader = new MTLLoader();
    // mtlLoader.setBaseUrl("./assets/");
    // mtlLoader.load("freedom.mtl", (materials) => {
    //   materials.preload();
    //   console.log("Material loaded");
    //   //Load Object Now and Set Material
    //   var objLoader = new OBJLoader();
    //   objLoader.setMaterials(materials);
    //   objLoader.load(
    //     "./assets/freedom.obj",
    //     (object) => {
    //       this.freedomMesh = object;
    //       this.freedomMesh.position.setY(3); //or  this
    //       this.freedomMesh.scale.set(0.02, 0.02, 0.02);
    //       this.scene.add(this.freedomMesh);
    //     },
    //     (xhr) => {
    //       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //     },
    //     // called when loading has errors
    //     (error) => {
    //       console.log("An error happened" + error);
    //     }
    //   );
    // });
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    // -----Step 3--------
    //Rotate Models
    if (this.cube) this.cube.rotation.y += 0.01;
    // if (this.freedomMesh) this.freedomMesh.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <>
        <div
          className="col d-none d-sm-block"
          style={{ height: "100vh", zIndex: 1000 }}
          ref={(mount) => {
            this.mount = mount;
          }}
        />
      </>
    );
  }
}
export default ThreeScene;
