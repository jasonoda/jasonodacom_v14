import * as THREE from 'three';

export class UI {
    setUp(e) {
        this.e = e;
    }

    // load() {
    //     this.scene = new THREE.Scene();
    //     this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //     this.renderer = new THREE.WebGLRenderer();
    //     this.renderer.setSize(window.innerWidth, window.innerHeight);
    //     document.body.appendChild(this.renderer.domElement);
    //     this.renderer.domElement.style.zIndex = -1;
    //     this.renderer.domElement.style.position = "absolute";

    //     this.renderer.domElement.classList.add('backCanvas');

    //     this.load2();
    // }

    // load2() {
    //     this.isLoaded_UI = true;

    //     var geometry2 = new THREE.BoxGeometry(10, 10, 10);
    //     var material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //     this.box = new THREE.Mesh(geometry2, material2);
    //     this.box.castShadow = true;
    //     this.box.receiveShadow = true;

    //     // Particles
    //     this.particleCount = 5000;
    //     this.particles = new THREE.BufferGeometry();
    //     this.positions = new Float32Array(this.particleCount * 3); // x, y, z for each particle

    //     for (let i = 0; i < this.particleCount; i++) {
    //         let pX = Math.random() * 500 - 250;
    //         let pY = Math.random() * 500 - 250;
    //         let pZ = Math.random() * 500 - 250;

    //         this.positions[i * 3] = pX;
    //         this.positions[i * 3 + 1] = pY;
    //         this.positions[i * 3 + 2] = pZ;
    //     }

    //     this.particles.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

    //     // Use the texture from the external object
    //     this.material = new THREE.PointsMaterial({
    //         color: 0xffffff,
    //         size: 0.1,
    //         map: this.e.hamburger,
    //         blending: THREE.AdditiveBlending,
    //         transparent: true,
    //     });

    //     this.particleSystem = new THREE.Points(this.particles, this.material);
    //     this.scene.add(this.particleSystem);

    //     this.camera.position.z = 100;
    // }

    // update() {
    //     this.particleSystem.rotation.x += 0.002;
    //     this.particleSystem.rotation.y += 0.002;

    //     this.renderer.render(this.scene, this.camera);
    // }
}
