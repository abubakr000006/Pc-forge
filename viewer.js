import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ======================================================
// PC FORGE — HIGH DETAIL 3D PC
// Corsair 5000D Airflow inspired
// ======================================================

const container = document.getElementById('pc3d');

if (!container) {
    throw new Error('PC FORGE: контейнер #pc3d не найден');
}

// Не создаём второй renderer при повторной загрузке скрипта
if (container.dataset.pcForgeLoaded === 'true') {
    console.warn('PC FORGE: 3D-модель уже загружена');
} else {

container.dataset.pcForgeLoaded = 'true';

// ======================================================
// SCENE
// ======================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x080c16);
scene.fog = new THREE.Fog(0x080c16, 15, 35);

// ======================================================
// CAMERA
// ======================================================

const camera = new THREE.PerspectiveCamera(
    38,
    Math.max(container.clientWidth, 1) /
        Math.max(container.clientHeight, 1),
    0.1,
    100
);

camera.position.set(6.5, 4.8, 8.5);

// ======================================================
// RENDERER
// ======================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 2)
);

renderer.setSize(
    Math.max(container.clientWidth, 1),
    Math.max(container.clientHeight, 1)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

container.appendChild(renderer.domElement);

// ======================================================
// CAMERA CONTROLS
// ======================================================

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.045;

controls.minDistance = 4;
controls.maxDistance = 13;

controls.target.set(0, 1.9, 0);

controls.maxPolarAngle = Math.PI * 0.48;

// ======================================================
// LIGHTING
// ======================================================

scene.add(
    new THREE.HemisphereLight(
        0xd9e5ff,
        0x101322,
        2
    )
);

const mainLight = new THREE.DirectionalLight(
    0xffffff,
    3.2
);

mainLight.position.set(5, 9, 7);
mainLight.castShadow = true;

mainLight.shadow.mapSize.set(2048, 2048);

mainLight.shadow.camera.left = -7;
mainLight.shadow.camera.right = 7;
mainLight.shadow.camera.top = 7;
mainLight.shadow.camera.bottom = -7;

scene.add(mainLight);

const purpleLight = new THREE.PointLight(
    0x914cff,
    38,
    13
);

purpleLight.position.set(-3, 3, 3);
scene.add(purpleLight);

const blueLight = new THREE.PointLight(
    0x3388ff,
    30,
    13
);

blueLight.position.set(3, 2, -2);
scene.add(blueLight);

const pinkLight = new THREE.PointLight(
    0xff55cc,
    16,
    9
);

pinkLight.position.set(0, 4, 2);
scene.add(pinkLight);

// ======================================================
// MATERIALS
// ======================================================

const white = new THREE.MeshStandardMaterial({
    color: 0xe8ebf2,
    metalness: 0.45,
    roughness: 0.3
});

const black = new THREE.MeshStandardMaterial({
    color: 0x11141c,
    metalness: 0.55,
    roughness: 0.3
});

const dark = new THREE.MeshStandardMaterial({
    color: 0x252b38,
    metalness: 0.65,
    roughness: 0.4
});

const silver = new THREE.MeshStandardMaterial({
    color: 0xbac5d3,
    metalness: 0.88,
    roughness: 0.2
});

const plastic = new THREE.MeshStandardMaterial({
    color: 0xf1f3f8,
    roughness: 0.32
});

const rubber = new THREE.MeshStandardMaterial({
    color: 0x080a10,
    roughness: 0.8
});

const glass = new THREE.MeshPhysicalMaterial({
    color: 0xb9c8df,
    transparent: true,
    opacity: 0.105,
    roughness: 0.12,
    metalness: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false
});

const rgbMaterials = [];

function rgbMaterial(color, intensity = 2) {

    const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: intensity,
        metalness: 0.25,
        roughness: 0.25
    });

    rgbMaterials.push(material);

    return material;
}

// ======================================================
// MAIN PC GROUP
// ======================================================

const pc = new THREE.Group();

scene.add(pc);

// ======================================================
// GEOMETRY HELPERS
// ======================================================

function box(
    w, h, d,
    x, y, z,
    material,
    parent = pc
) {

    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        material
    );

    mesh.position.set(x, y, z);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    parent.add(mesh);

    return mesh;
}

function cylinder(
    radius,
    height,
    x, y, z,
    material,
    parent = pc,
    segments = 32
) {

    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radius,
            radius,
            height,
            segments
        ),
        material
    );

    mesh.position.set(x, y, z);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    parent.add(mesh);

    return mesh;
}

function tube(
    points,
    radius,
    material,
    parent = pc
) {

    const curve = new THREE.CatmullRomCurve3(
        points.map(
            point => new THREE.Vector3(...point)
        )
    );

    const mesh = new THREE.Mesh(
        new THREE.TubeGeometry(
            curve,
            48,
            radius,
            10,
            false
        ),
        material
    );

    mesh.castShadow = true;

    parent.add(mesh);

    return mesh;
}

// ======================================================
// CASE FRAME
// ======================================================

// Main chassis

box(2.9, 0.13, 2.5, 0, 0.1, 0, black);
box(2.9, 0.13, 2.5, 0, 3.8, 0, black);

// Rear wall

box(2.9, 3.6, 0.12, 0, 1.95, -1.18, black);

// Front and rear vertical frame parts

box(0.12, 3.6, 2.5, 1.38, 1.95, 0, black);
box(0.12, 3.6, 2.5, -1.38, 1.95, 0, black);

// Front metal rails

box(0.045, 3.45, 0.045, 1.29, 1.95, 1.16, silver);
box(0.045, 3.45, 0.045, -1.29, 1.95, 1.16, silver);

// Bottom frame details

box(2.65, 0.045, 0.045, 0, 0.2, 1.15, silver);
box(2.65, 0.045, 0.045, 0, 0.2, -1.15, silver);

// ======================================================
// TEMPERED GLASS SIDE PANEL
// ======================================================

const glassPanel = new THREE.Mesh(
    new THREE.BoxGeometry(2.55, 3.4, 0.018),
    glass
);

glassPanel.position.set(0, 1.95, 1.235);

pc.add(glassPanel);

// Glass metal borders

box(2.55, 0.035, 0.035, 0, 3.67, 1.25, silver);
box(2.55, 0.035, 0.035, 0, 0.23, 1.25, silver);

box(0.035, 3.4, 0.035, -1.27, 1.95, 1.25, silver);
box(0.035, 3.4, 0.035, 1.27, 1.95, 1.25, silver);

// Glass mounting screws

for (const x of [-1.18, 1.18]) {

    for (const y of [0.35, 3.55]) {

        cylinder(
            0.035,
            0.018,
            x,
            y,
            1.275,
            silver
        );

    }

}

// ======================================================
// FRONT AIRFLOW PANEL
// ======================================================

box(0.09, 3.3, 0.09, 1.38, 1.95, 0.85, dark);
box(0.09, 3.3, 0.09, 1.38, 1.95, -0.85, dark);

// Fine ventilation slats

for (let i = 0; i < 24; i++) {

    box(
        0.025,
        0.035,
        1.7,
        1.32,
        0.3 + i * 0.14,
        0,
        dark
    );

}

// ======================================================
// MOTHERBOARD
// ======================================================

const motherboard = box(
    1.95,
    2.75,
    0.075,
    -0.3,
    2.05,
    -0.98,
    dark
);

// PCB details

for (let i = 0; i < 10; i++) {

    box(
        0.025,
        0.65,
        0.018,
        -1.18 + i * 0.19,
        2.1,
        -0.93,
        silver
    );

}

// PCB decorative traces

for (let i = 0; i < 7; i++) {

    box(
        0.55,
        0.012,
        0.018,
        -0.7 + (i % 3) * 0.35,
        1.0 + i
