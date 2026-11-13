import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('pc3d');

if (!container) throw new Error('Не найден pc3d');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101522);

const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    0.1,
    100
);

camera.position.set(5.8, 4.5, 7.5);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

container.appendChild(renderer.domElement);

// CAMERA

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.minDistance = 4;
controls.maxDistance = 11;
controls.target.set(0, 1.8, 0);

// LIGHTING

scene.add(new THREE.AmbientLight(0xffffff, 1.5));

const mainLight = new THREE.DirectionalLight(0xffffff, 3);
mainLight.position.set(5, 8, 6);
scene.add(mainLight);

const purpleLight = new THREE.PointLight(0x8855ff, 35, 12);
purpleLight.position.set(-3, 3, 3);
scene.add(purpleLight);

const blueLight = new THREE.PointLight(0x3388ff, 25, 10);
blueLight.position.set(3, 2, -2);
scene.add(blueLight);

// MATERIALS

const white = new THREE.MeshStandardMaterial({
    color: 0xe8eaf0,
    metalness: 0.55,
    roughness: 0.28
});

const plastic = new THREE.MeshStandardMaterial({
    color: 0xf5f5f8,
    roughness: 0.35
});

const black = new THREE.MeshStandardMaterial({
    color: 0x171a22,
    metalness: 0.45,
    roughness: 0.3
});

const dark = new THREE.MeshStandardMaterial({
    color: 0x252b38,
    metalness: 0.4,
    roughness: 0.45
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

const rgbMaterials = [];

function rgbMaterial(color) {
    const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.5,
        metalness: 0.2,
        roughness: 0.3
    });

    rgbMaterials.push(material);
    return material;
}

// PC GROUP

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

// CASE

// Base and roof
box(2.9, 0.14, 2.5, 0, 0.1, 0, white);
box(2.9, 0.14, 2.5, 0, 3.8, 0, white);

// Back wall
box(2.9, 3.7, 0.13, 0, 1.95, -1.18, white);

// Left wall
box(0.13, 3.7, 2.5, -1.38, 1.95, 0, white);

// Front frame
box(0.13, 3.7, 2.5, 1.38, 1.95, 0, white);

// Metal edges
box(0.045, 3.5, 0.045, 1.3, 1.95, 1.15, silver);
box(0.045, 3.5, 0.045, -1.3, 1.95, 1.15, silver);

// Glass side panel
const glassPanel = new THREE.Mesh(
    new THREE.BoxGeometry(2.55, 3.45, 0.025),
    glass
);

glassPanel.position.set(0, 1.95, 1.23);
pc.add(glassPanel);

// Glass panel frame
box(2.55, 0.035, 0.035, 0, 3.68, 1.24, silver);
box(2.55, 0.035, 0.035, 0, 0.22, 1.24, silver);

// FRONT PANEL DETAILS

box(0.08, 3.2, 0.08, 1.38, 1.95, 0.85, black);
box(0.08, 3.2, 0.08, 1.38, 1.95, -0.85, black);

// Front mesh-like strips
for (let i = 0; i < 16; i++) {
    box(
        0.025,
        0.035,
        0.85,
        1.32,
        0.45 + i * 0.19,
        0,
        dark
    );
}

// MOTHERBOARD

box(
    1.9, 2.65, 0.09,
    -0.35, 2.05, -0.94,
    dark
);

// Motherboard details
box(0.55, 0.35, 0.12, -0.85, 3.0, -0.82, silver);
box(0.42, 0.55, 0.12, 0.55, 2.1, -0.82, silver);

// VRM heatsink fins
for (let i = 0; i < 7; i++) {
    box(
        0.035, 0.3, 0.14,
        -1.05 + i * 0.07,
        3.0,
        -0.72,
        black
    );
}

// CPU

box(0.5, 0.13, 0.5, -0.35, 2.75, -0.65, silver);
box(0.38, 0.035, 0.38, -0.35, 2.84, -0.65, black);

// CPU label
box(0.22, 0.008, 0.12, -0.35, 2.865, -0.65, silver);

// CPU COOLER

box(0.78, 0.85, 0.75, -0.35, 3.25, -0.62, silver);

// Cooler fins
for (let i = 0; i < 13; i++) {
    box(
        0.68, 0.025, 0.68,
        -0.35,
        2.9 + i * 0.055,
        -0.62,
        white
    );
}

// Cooler fan
const fanAnimations = [];

function createFan(x, y, z, radius, color, direction = 'z') {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    if (direction === 'x') {
        group.rotation.y = Math.PI / 2;
    }

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.035, 10, 40),
        rgbMaterial(color)
    );

    group.add(ring);

    const blades = new THREE.Group();

    for (let i = 0; i < 7; i++) {
        const blade = new THREE.Mesh(
            new THREE.BoxGeometry(
                radius * 0.75,
                0.055,
                0.035
            ),
            plastic
        );

        blade.position.x = radius * 0.42;
        blade.rotation.z = i * Math.PI / 3.5;
        blades.add(blade);
    }

    group.add(blades);

    const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radius * 0.23,
            radius * 0.23,
            0.09,
            32
        ),
        white
    );

    hub.rotation.x = Math.PI / 2;
    group.add(hub);

    pc.add(group);
    fanAnimations.push(blades);

    return group;
}

createFan(-0.35, 3.25, -0.18, 0.29, 0x55aaff);

// RAM

for (let i = 0; i < 4; i++) {
    const x = 0.12 + i * 0.19;

    box(0.11, 0.85, 0.14, x, 2.7, -0.62, plastic);

    box(
        0.11, 0.035, 0.15,
        x, 3.14, -0.62,
        rgbMaterial(0x9955ff)
    );
}

// GPU

box(2.05, 0.45, 0.72, 0, 1.65, 0.15, plastic);
box(1.95, 0.07, 0.68, 0, 1.9, 0.12, silver);

// GPU top line
box(1.65, 0.035, 0.035, 0, 1.94, 0.52, rgbMaterial(0x00aaff));

// GPU side details
box(1.8, 0.08, 0.04, 0, 1.55, 0.53, black);

// Three GPU fans
for (let i = 0; i < 3; i++) {
    createFan(
        -0.65 + i * 0.65,
        1.65,
        0.54,
        0.18,
        0x7c5cff
    );
}

// FRONT FANS

for (let i = 0; i < 3; i++) {
    createFan(
        1.18,
        0.85 + i * 1.05,
        0.2,
        0.38,
        0x8b55ff,
        'x'
    );
}

// PSU

box(1.1, 0.65, 1.05, 0.55, 0.55, -0.48, plastic);
box(0.8, 0.025, 0.65, 0.55, 0.89, -0.48, silver);

// PSU ventilation
for (let i = 0; i < 8; i++) {
    box(
        0.65, 0.012, 0.025,
        0.55,
        0.91,
        -0.75 + i * 0.08,
        black
    );
}

// CABLES

function cable(points, color, radius = 0.025) {
    const curve = new THREE.CatmullRomCurve3(
        points.map(p => new THREE.Vector3(...p))
    );

    const mesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 35, radius, 8, false),
        new THREE.MeshStandardMaterial({
            color,
            roughness: 0.5
        })
    );

    pc.add(mesh);
}

cable([
    [0.9, 1.3, -0.5],
    [0.95, 1.8, -0.6],
    [0.8, 2.2, -0.7]
], 0xffffff);

cable([
    [0.9, 1.2, -0.5],
    [1.0, 1.5, -0.7],
    [0.8, 1.8, -0.7]
], 0x222222);

cable([
    [-0.8, 1.9, 0.4],
    [-0.9, 2.2, 0.2],
    [-0.7, 2.5, -0.4]
], 0xffffff, 0.035);

// CASE FEET

for (const x of [-1, 1]) {
    for (const z of [-0.8, 0.8]) {
        cylinder(0.12, 0.12, x, 0.02, z, black);
    }
}

// FLOOR

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({
        color: 0x101522,
        roughness: 0.85
    })
);

floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.06;
scene.add(floor);

// ANIMATION

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    fanAnimations.forEach((fan, index) => {
        fan.rotation.z = time * (4 + index * 0.1);
    });

    rgbMaterials.forEach((material, index) => {
        material.emissiveIntensity =
            1.3 + Math.sin(time * 2 + index) * 0.5;
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

// RESIZE

const resizeObserver = new ResizeObserver(() => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

resizeObserver.observe(container);
