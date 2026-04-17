import * as THREE from 'three';
import { WireframeGeometry } from 'three';
import gsap from "gsap";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

export class Back {

  setUp(e) {
    this.e = e;

    this.scrollPercent = 0;
    this.targetCamRotationY = 0;
    this.currentGradientColor = new THREE.Color(0xeb0000);
    this.moveAmount = 10;
    this.tweenTime = 2;
    this.tweenType = "sine.inOut";
    this.defaultCamAngleY = 0;
    this.camRotationTarget = 0;

    this.scene3D = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 4, 740);
    this.camContX = new THREE.Group();
    this.camContY = new THREE.Group();
    
    this.camContX.add(this.camera);
    this.camContY.add(this.camContX);
    this.scene3D.add(this.camContY);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance", alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMapSoft = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // this.renderer.domElement.style.position = "fixed";
    // this.renderer.domElement.style.zIndex = "122111";
    // this.renderer.domElement.style.top = "0px";
    // this.renderer.domElement.style.border = "3px solid red";
    this.renderer.domElement.classList.add("backCanvas");
    document.getElementById("canvasHolder").appendChild(this.renderer.domElement);

    // document.body.appendChild(this.renderer.domElement);

    console.log("make back")
  }

  buildScene() {
    console.log("make back 2")
    this.mainCont = new THREE.Group();
    this.scene3D.add(this.mainCont);

    this.dl_shad = new THREE.DirectionalLight(0xffffff, 0.75);
    this.dl_shad.position.set(36, 78, -78);
    this.dl_shad.castShadow = true;
    this.dl_shad.shadow.mapSize.set(4096, 4096);
    this.sSize = 11;
    this.dl_shad.shadow.camera.near = 0.1;
    this.dl_shad.shadow.camera.far = 180;
    this.dl_shad.shadow.camera.left = -this.sSize;
    this.dl_shad.shadow.camera.right = this.sSize;
    this.dl_shad.shadow.camera.top = this.sSize;
    this.dl_shad.shadow.camera.bottom = -this.sSize;
    this.dl_shad.shadow.radius = 2;
    this.mainCont.add(this.dl_shad);

//     const geo = new THREE.BoxGeometry(1, 1, 1);
// const mat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
// const testMesh = new THREE.Mesh(geo, mat);
// testMesh.position.set(0, 0, -5);
// this.scene3D.add(testMesh);

    this.ambLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.mainCont.add(this.ambLight);

    this.playerCont = new THREE.Group();
    this.playerCont.position.set(0, 0, 0);
    this.mainCont.add(this.playerCont);

    this.curveGroups = [];

    fetch('src/models/curve.json')
      .then((res) => res.json())
      .then((curveData) => {
        for (const curveName in curveData) {
          const points = curveData[curveName];
          const vectors = points.map(([x, y, z]) => new THREE.Vector3(x, y, z));
          const curve = new THREE.CatmullRomCurve3(vectors);

          const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.01, 8, false);

          const textureClone = this.e.tubeTexture.clone();
          textureClone.needsUpdate = true;
          textureClone.wrapS = THREE.RepeatWrapping;
          textureClone.wrapT = THREE.RepeatWrapping;
          textureClone.offset.x = Math.random();

          const tubeMaterial = new THREE.MeshStandardMaterial({ transparent: true, depthWrite: false, map: textureClone });

          const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
        //   this.mainCont.add(tubeMesh);

          const planes = [];
          for (let i = 0; i < 1; i++) {
            this.size = this.e.u.ran(10) / 200;

            const planeCont = new THREE.Group();
            const plane = new THREE.Mesh(new THREE.PlaneGeometry(this.size, this.size), new THREE.MeshBasicMaterial({ color: this.e.u.randomColorBetweenGoldAnd(0xFF3333), opacity: 0, transparent: true, map: this.e.glintTexture }));

            planeCont.add(plane);
            this.mainCont.add(planeCont);

            planes.push({ mesh: plane, container: planeCont, t: Math.random(), rotationSpeed: (Math.random() - 0.5) * 0.02, offset: new THREE.Vector3(0, 0, 0) });

            gsap.to(plane.material, { opacity: 1, duration: (this.e.u.ran(10)/10)+1, delay: 1 + (this.e.u.ran(100)/10), repeat: -1, yoyo: true, ease: 'linear' });
          }

          this.curveGroups.push({ curve, planes, material: tubeMaterial });
        }
      });

      window.addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
      });
  }

  

  update() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollPercent = scrollTop / scrollHeight;

    if (this.e.scene?.heightSetter && this.e.scene.heightSetter.scrollHeight > 0) {
        this.scrollPercent = this.e.scene.myScroll / this.e.scene.heightSetter.scrollHeight;
      } else {
        this.scrollPercent = 0;
      }

    this.targetCamRotationY = this.e.u.ca(127) * this.scrollPercent;
    this.camRotationTarget = -this.defaultCamAngleY - this.targetCamRotationY;
    this.camContY.rotation.y = this.e.u.lerp(this.camContY.rotation.y, this.camRotationTarget, 0.03);

    this.camContX.rotation.x = this.e.u.lerp(this.camContX.rotation.x, -this.e.u.ca((this.scrollPercent * 50) + 5), 0.03);
    this.camera.position.z = this.e.u.lerp(this.camera.position.z, 10 + (this.scrollPercent * 6), 0.03);

    if (this.curveGroups) {
      const cameraWorldPosition = new THREE.Vector3();
      this.camera.getWorldPosition(cameraWorldPosition);

      for (const group of this.curveGroups) {
        for (const obj of group.planes) {
          obj.t -= 0.0005;
          if (obj.t > 1) obj.t = 0;
          if (obj.t < 0) obj.t = 1;
          const basePosition = group.curve.getPointAt(obj.t);
          obj.container.position.copy(basePosition.clone().add(obj.offset));
          obj.container.lookAt(cameraWorldPosition);
          obj.mesh.rotation.z += obj.rotationSpeed;
        }
        if (group.material?.map) {
          group.material.map.offset.x -= 0.001;
        }
      }
    }

    this.mixer();
  }

  mixer() {
    if (document.getElementById("mix").checked === true) {
      const c1_H = document.getElementById("c1_H").value;
      const c1_S = document.getElementById("c1_S").value;
      const c1_L = document.getElementById("c1_L").value;
      document.getElementById("c1_Color").value = this.e.u.hslToHex(c1_H, c1_S, c1_L);
    }
  }

  changeColors(targetColorHex, defaultAngleDeg = 0) {
    // gsap.to(window, { duration: this.tweenTime, scrollTo: { y: 0 }, ease: this.tweenType });

    const target = new THREE.Color(targetColorHex);
    const darkerColor = target.clone().lerp(new THREE.Color(0x000000), 0.96);
    const targetRgb = { r: Math.round(darkerColor.r * 255), g: Math.round(darkerColor.g * 255), b: Math.round(darkerColor.b * 255) };

    gsap.to(document.body, { duration: this.tweenTime, backgroundColor: `rgb(${targetRgb.r},${targetRgb.g},${targetRgb.b})`, ease: this.tweenType });
    gsap.to(this.renderer.domElement, { duration: this.tweenTime / 2, opacity: 0.1, ease: "sine.out" });
    gsap.to(this.renderer.domElement, { duration: this.tweenTime / 2, delay: this.tweenTime / 2, opacity: 1, ease: "sine.inOut" });

    const grad = document.getElementById('myGrad');
    const startColor = this.currentGradientColor.clone();
    const colorObj = { r: startColor.r * 255, g: startColor.g * 255, b: startColor.b * 255 };

    gsap.to(colorObj, { duration: this.tweenTime, r: target.r * 255, g: target.g * 255, b: target.b * 255, ease: this.tweenType, onUpdate: () => { grad.style.background = `radial-gradient(circle, rgba(${colorObj.r.toFixed(0)}, ${colorObj.g.toFixed(0)}, ${colorObj.b.toFixed(0)}, 0.15) 0%, rgba(${colorObj.r.toFixed(0)}, ${colorObj.g.toFixed(0)}, ${colorObj.b.toFixed(0)}, 0) 50%)`; }, onComplete: () => { this.currentGradientColor = target.clone(); } });

    this.defaultCamAngleY = this.e.u.ca(defaultAngleDeg);

    if (this.curveGroups) {
      for (const group of this.curveGroups) {
        for (const obj of group.planes) {
          const newColor = this.e.u.randomColorBetweenGoldAnd(targetColorHex);
          gsap.to(obj.mesh.material.color, { duration: this.tweenTime, r: newColor.r, g: newColor.g, b: newColor.b, ease: this.tweenType });

          const randomOffset = new THREE.Vector3((Math.random() - 0.5) * this.moveAmount, (Math.random() - 0.5) * this.moveAmount, (Math.random() - 0.5) * this.moveAmount);

          gsap.to(obj.offset, { x: randomOffset.x, y: randomOffset.y, z: randomOffset.z, duration: this.tweenTime * 0.3, ease: "sine.out", onComplete: () => { gsap.to(obj.offset, { x: 0, y: 0, z: 0, duration: this.tweenTime * 0.7, ease: "expo.inOut" }); } });
        }
      }
    }
  }
}