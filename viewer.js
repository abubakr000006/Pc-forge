import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('pc3d');

if (!container) {
    throw new Error('Не найден контейнер pc3d');
}

// ===============================
// SCENE
// ===============================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101522);

const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    0.1,
    100
);

camera.position.set(5.5, 4.2, 7.5);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

container.appendChild(renderer.domElement);

// ===============================
// CAMERA CONTROLS
// ===============================

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 4;
controls.maxDistance = 11;
controls.target.set(0, 1.8, 0);

// ===============================
// LIGHTING
// ===============================

scene.add(new THREE.AmbientLight(0xffffff, 1.8));

const mainLight = new THREE.DirectionalLight(0xffffff, 3);
mainLight.position.set(5, 8, 6);
scene.add(mainLight);

const fillLight = new THREE.PointLight(0x9d7aff, 35, 12);
fillLight.position.set(-3, 3, 3);
scene.add(fillLight);

const blueLight = new THREE.PointLight(0x55aaff, 25, 10);
blueLight.position.set(3, 2, -2);
scene.add(blueLight);

// ===============================
// MATERIALS
// ===============================

const white = new THREE.MeshStandardMaterial({
    color: 0xe8eaf0,
    metalness: 0.55,
    roughness: 0.28
});

const whitePlastic = new THREE.MeshStandardMaterial({
    color: 0xf5f5f8,
    roughness: 0.35
});

const black = new THREE.MeshStandardMaterial({
    color: 0x171a22,
    metalness: 0.45,
    roughness: 0.3
});

const motherboard = new THREE.MeshStandardMaterial({
    color: 0x202c39,
    metalness: 0.3,
    roughness: 0.5
});

const silver = new THREE.MeshStandardMaterial({
    color: 0xb9c2d0,
    metalness: 0.8,
    roughness: 0.22
});

const glass = new THREE.MeshPhysicalMaterial({
    color: 0xb9d5ff,
    transparent: true,
    opacity: 0.12,
    roughness: 0.08,
    metalness: 0.1,
    side: THREE.DoubleSide,
    depthWrite: false
});

// ===============================
// COMPUTER GROUP
// ===============================

const pc = new THREE.Group();
scene.add(pc);

function box(w, h, d, x, y, z, material) {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        material
    );

    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    pc.add(mesh);
    return mesh;
}

function cylinder(radius, height, x, y, z, material) {
    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, height, 32),
        material
    );

    mesh.position.set(x, y, z);
    pc.add(mesh);

    return mesh;
}

// ===============================
// WHITE CASE
// ===============================

// Bottom and top
box(2.9, 0.14, 2.5, 0, 0.1, 0, white);
box(2.9, 0.14, 2.5, 0, 3.8, 0, white);

// Back wall
box(2.9, 3.7, 0.13, 0, 1.95, -1.18, white);

// Left wall
box(0.13, 3.7, 2.5, -1.38, 1.95, 0, white);

// Front frame
box(0.13, 3.7, 2.5, 1.38, 1.95, 0, white);

// Front decorative strips
box(0.04, 3.5, 0.04, 1.3, 1.95, 
