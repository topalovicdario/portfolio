import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menuBtn");

  btn.addEventListener("click", toggleMenu);

  // Dynamic year in footer
  const yearElement = document.querySelector(".year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

function toggleMenu() {
  const nav = document.querySelector("nav");
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
  } else {
    nav.classList.add("active");
  }
}

document.querySelector(".menu-btn button").addEventListener("keydown", (e) => {
  if (e.key === "Enter") e.preventDefault();
});

const state = {
  portalIsReady: false,
  modelLoaded: false,
  isEntering: false,
};

let isArticleFullyOpen = false;
let videoplay = false;
let scrollProgress = 0;
let targetScrollProgress = 0;
let SCROLL_SPEED = 0.0008;
const modelCenterOffset = new THREE.Vector3();

const startPos = { x: 0, y: 2, z: 16 };
const startTarget = new THREE.Vector3(0, 0, 0);
const screenPosition = new THREE.Vector3(0, 0, 0);

let initialCameraDistance = 0;
const END_DISTANCE = 4;



const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");

const video = document.getElementById("myVideo");
const videoTexture = new THREE.VideoTexture(video);
videoTexture.colorSpace = THREE.SRGBColorSpace;
videoTexture.flipY = false;

videoTexture.center.set(1, 0);
videoTexture.repeat.set(-1, 1);
videoTexture.rotation = Math.PI / 2;

const loader = new GLTFLoader();
loader.load("https://github.com/topalovicdario/portfolio/releases/download/v1.0/pc5.glb", (gltf) => {
  const model = gltf.scene;
  model.scale.set(1, 1, 1);

  const box = new THREE.Box3().setFromObject(model);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();

  box.getCenter(center);
  box.getSize(size);

  model.position.sub(center);

  modelCenterOffset.set(0, size.y * 0.18, 0);

  startTarget.copy(modelCenterOffset);

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.name === "Object_19") {
        child.material = new THREE.MeshBasicMaterial({ map: videoTexture });
        child.frustumCulled = false;

        child.getWorldPosition(screenPosition);
        screenPosition.y += 1.9;
        screenPosition.z += 2;
      }
    }
  });

  scene.add(model);

  state.modelLoaded = true;

  initialCameraDistance = camera.position.distanceTo(startTarget);
  keyLight.target.position.copy(model.position);
  scene.add(keyLight.target);
});

scene.fog = new THREE.Fog(0x0000, 14, 22);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);

const keyLight = new THREE.SpotLight(
  0xffe3c1,
  70,

  25,
  Math.PI,
  0.75,
  2
);

keyLight.position.set(3, 2, 6);
keyLight.castShadow = true;

scene.add(keyLight);
scene.add(keyLight.target);

const rimLight = new THREE.DirectionalLight(0x6fa8ff, 1.4);
rimLight.position.set(-3, 4, -6);
scene.add(rimLight);

const bounceLight = new THREE.PointLight(0x2c3e70, 0.4, 10);
bounceLight.position.set(0, 1, -2);
scene.add(bounceLight);

const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(
  30,
  sizes.width / sizes.height,
  0.1,
  200
);
camera.position.set(startPos.x, startPos.y, startPos.z);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;

renderer.physicallyCorrectLights = true;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;

controls.enabled = true;
controls.enableRotate = true;
controls.enablePan = false;
controls.enableZoom = false;

controls.rotateSpeed = 0.05;

controls.minAzimuthAngle = -0.2;
controls.maxAzimuthAngle = Math.PI / 2;

controls.minPolarAngle = Math.PI / 2 - 0.3;
controls.maxPolarAngle = Math.PI / 2;

controls.minDistance = 0;
controls.maxDistance = Infinity;

controls.target.copy(startTarget);
video.pause();

window.addEventListener("keydown", (event) => {
 

  if (videoplay && state.portalIsReady) {
    video.pause();
    videoplay = false;
  } else if (!videoplay && state.portalIsReady) {
    videoplay = true;
    video.play();
  }
});

let a = false;
window.addEventListener(
  "wheel",
  (event) => {
    if (isArticleFullyOpen) {
      return;
    }
    if (state.isEntering) return;

    if (targetScrollProgress >= 0.6 && !a) {
      SCROLL_SPEED = 0.004;
      state.portalIsReady = true;

      a = true;
      console.log(a);
    } else if (targetScrollProgress <= 0.6 && a) {
      state.portalIsReady = false;
      video.pause();
      if (videoplay) {
        videoplay = !videoplay;
      }

      a = false;
      console.log(a);
      SCROLL_SPEED = 0.0008;
    }

    targetScrollProgress -= event.deltaY * SCROLL_SPEED;
    targetScrollProgress = Math.max(Math.min(1, targetScrollProgress));

    console.log("skrol progres:", targetScrollProgress.toFixed(2));
  },
  { passive: false }
);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const tick = () => {
  if (!state.portalIsReady && videoplay) {
    video.pause();
  }

  if (!state.isEntering) {
    controls.update();
  }

  if (state.modelLoaded && !state.isEntering) {
    scrollProgress = THREE.MathUtils.lerp(
      scrollProgress,
      targetScrollProgress,
      0.08
    );

    if (scrollProgress > 0.01) {
      if (scrollProgress > 0.6) {
      }
      const zoomProgress = scrollProgress;

      const currentDistance = THREE.MathUtils.lerp(
        initialCameraDistance,
        END_DISTANCE,
        zoomProgress
      );

      controls.minDistance = currentDistance;
      controls.maxDistance = currentDistance;

      if (zoomProgress >= 0.64) {
        const alignmentProgress = (zoomProgress - 0.64) / 0.3;

        const idealCameraPos = new THREE.Vector3(
          screenPosition.x,
          screenPosition.y,
          screenPosition.z + currentDistance
        );

        camera.position.lerp(idealCameraPos, alignmentProgress * 0.1);

        controls.target.lerp(screenPosition, alignmentProgress * 0.7);
      }
    } else if (scrollProgress < -0.01) {
      const openPhase = Math.min(1, Math.abs(scrollProgress));

      const articleElement = document.getElementById("about-article");
      const topPos = (1 - openPhase) * 100;
      articleElement.style.top = `${topPos}%`;

      canvas.style.filter = `blur(${openPhase * 10}px)`;
      canvas.style.opacity = 1 - openPhase;

      if (openPhase >= 0.99) {
        articleElement.classList.add("fully-open");
        canvas.style.visibility = "hidden";
      } else {
        articleElement.classList.remove("fully-open");
        canvas.style.visibility = "visible";
      }

      controls.minDistance = 0;
      controls.maxDistance = Infinity;
    } else {
      controls.minDistance = 0;
      controls.maxDistance = Infinity;

      const articleElement = document.getElementById("about-article");
      canvas.style.filter = `blur(0px)`;
      canvas.style.opacity = 1;
      canvas.style.visibility = "visible";
      articleElement.style.top = `100%`;
      articleElement.classList.remove("fully-open");
    }
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
