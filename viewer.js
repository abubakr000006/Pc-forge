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
        1.0 + i * 0.16,
        -0.925,
        silver
    );

}

// ======================================================
// VRM HEATSINK
// ======================================================

box(
    0.68,
    0.42,
    0.16,
    -0.85,
    3.0,
    -0.84,
    silver
);

for (let i = 0; i < 11; i++) {

    box(
        0.035,
        0.34,
        0.17,
        -1.16 + i * 0.065,
        3.0,
        -0.73,
        black
    );

}

// ======================================================
// CPU SOCKET
// ======================================================

box(
    0.72,
    0.12,
    0.72,
    -0.35,
    2.75,
    -0.65,
    black
);

box(
    0.53,
    0.045,
    0.53,
    -0.35,
    2.84,
    -0.65,
    silver
);

box(
    0.34,
    0.018,
    0.34,
    -0.35,
    2.875,
    -0.65,
    dark
);

box(
    0.2,
    0.01,
    0.12,
    -0.35,
    2.89,
    -0.65,
    silver
);

// ======================================================
// CPU COOLER
// ======================================================

// Tower heatsink

box(
    0.78,
    0.78,
    0.7,
    -0.35,
    3.28,
    -0.65,
    silver
);

// Individual cooling fins

for (let i = 0; i < 16; i++) {

    box(
        0.72,
        0.022,
        0.74,
        -0.35,
        2.94 + i * 0.045,
        -0.65,
        white
    );

}

// Cooler side details

box(
    0.8,
    0.045,
    0.045,
    -0.35,
    3.68,
    -0.65,
    dark
);

// ======================================================
// FAN SYSTEM
// ======================================================

const fanAnimations = [];

function createFan(
    x,
    y,
    z,
    radius,
    color,
    direction = 'z',
    parent = pc
) {

    const group = new THREE.Group();

    group.position.set(x, y, z);

    // Fan orientation:
    // z = facing the glass
    // x = facing the front
    // y = horizontal fan, facing upward

    if (direction === 'x') {
        group.rotation.y = Math.PI / 2;
    }

    if (direction === 'x-in') {
        group.rotation.y = -Math.PI / 2;
    }

    if (direction === 'y') {
        group.rotation.x = -Math.PI / 2;
    }

    if (direction === 'y-down') {
        group.rotation.x = Math.PI / 2;
    }

    // Outer frame

    const frame = new THREE.Mesh(
        new THREE.TorusGeometry(
            radius,
            radius * 0.09,
            12,
            64
        ),
        black
    );

    group.add(frame);

    // RGB ring

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
            radius * 0.86,
            radius * 0.035,
            12,
            64
        ),
        rgbMaterial(color, 2)
    );

    ring.position.z = 0.015;

    group.add(ring);

    // Inner metallic ring

    const innerRing = new THREE.Mesh(
        new THREE.TorusGeometry(
            radius * 0.68,
            radius * 0.018,
            8,
            48
        ),
        silver
    );

    group.add(innerRing);

    // Blades

    const blades = new THREE.Group();

    for (let i = 0; i < 7; i++) {

        const shape = new THREE.Shape();

        shape.moveTo(0, -radius * 0.08);

        shape.bezierCurveTo(
            radius * 0.18,
            -radius * 0.12,
            radius * 0.55,
            radius * 0.02,
            radius * 0.78,
            radius * 0.16
        );

        shape.bezierCurveTo(
            radius * 0.65,
            radius * 0.32,
            radius * 0.3,
            radius * 0.24,
            0,
            radius * 0.08
        );

        const geometry = new THREE.ShapeGeometry(shape);

        const blade = new THREE.Mesh(
            geometry,
            plastic
        );

        blade.rotation.z =
            i * Math.PI * 2 / 7;

        blades.add(blade);

    }

    group.add(blades);

    // Central hub

    const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(
            radius * 0.23,
            radius * 0.23,
            radius * 0.16,
            32
        ),
        silver
    );

    hub.rotation.x = Math.PI / 2;

    group.add(hub);

    // RGB center

    const hubLight = new THREE.Mesh(
        new THREE.CircleGeometry(
            radius * 0.13,
            32
        ),
        rgbMaterial(color, 3)
    );

    hubLight.position.z = radius * 0.09;

    group.add(hubLight);

    // Support struts

    for (let i = 0; i < 4; i++) {

        const strut = box(
            radius * 0.55,
            radius * 0.055,
            radius * 0.07,
            radius * 0.45,
            0,
            -radius * 0.04,
            black,
            group
        );

        strut.rotation.z =
            i * Math.PI / 2;

    }

    parent.add(group);

    fanAnimations.push({
        blades,
        speed: 5 + fanAnimations.length * 0.12
    });

    return group;
}

// ======================================================
// CPU FAN
// ======================================================

createFan(
    -0.35,
    3.25,
    -0.16,
    0.29,
    0x55aaff
);

// ======================================================
// RAM
// ======================================================

for (let i = 0; i < 4; i++) {

    const x = 0.12 + i * 0.19;

    box(
        0.11,
        0.85,
        0.14,
        x,
        2.7,
        -0.62,
        black
    );

    box(
        0.11,
        0.035,
        0.15,
        x,
        3.14,
        -0.62,
        rgbMaterial(0x9955ff)
    );

    box(
        0.07,
        0.55,
        0.015,
        x,
        2.7,
        -0.54,
        silver
    );

}

// ======================================================
// GPU
// ======================================================

// Graphics card main body

box(
    2.12,
    0.46,
    0.76,
    0,
    1.65,
    0.12,
    black
);

// GPU metal backplate

box(
    2.05,
    0.065,
    0.73,
    0,
    1.91,
    0.12,
    silver
);

// GPU edge

box(
    2.0,
    0.045,
    0.035,
    0,
    1.95,
    0.51,
    dark
);

// GPU RGB strip

box(
    1.55,
    0.025,
    0.025,
    0,
    1.975,
    0.53,
    rgbMaterial(0x00aaff)
);

// GPU side branding panel

box(
    1.1,
    0.09,
    0.025,
    0,
    1.55,
    0.525,
    white
);

// GPU PCI connector

box(
    1.35,
    0.045,
    0.13,
    0,
    1.38,
    -0.3,
    silver
);

// ======================================================
// GPU FANS — UNDER THE GRAPHICS CARD
// ======================================================

// Вентиляторы расположены снизу видеокарты.
// Их плоскость горизонтальная, а не на боковой стенке.

for (let i = 0; i < 3; i++) {

    createFan(
        -0.66 + i * 0.66,
        1.405,
        0.12,
        0.22,
        0x7c5cff,
        'y'
    );

}

// ======================================================
// FRONT INTAKE FANS
// ======================================================

for (let i = 0; i < 3; i++) {

    createFan(
        1.12,
        0.85 + i * 1.05,
        0.05,
        0.39,
        0x8b55ff,
        'x-in'
    );

}

// ======================================================
// TOP EXHAUST FANS
// ======================================================

for (let i = 0; i < 3; i++) {

    createFan(
        -0.75 + i * 0.75,
        3.9,
        -0.1,
        0.32,
        0x3388ff,
        'y'
    );

}

// ======================================================
// REAR EXHAUST FAN
// ======================================================

createFan(
    -0.95,
    2.9,
    -1.04,
    0.35,
    0x55aaff,
    'z'
);

// ======================================================
// PSU SHROUD
// ======================================================

box(
    1.25,
    0.65,
    1.05,
    0.45,
    0.55,
    -0.48,
    black
);

box(
    1.05,
    0.025,
    0.8,
    0.45,
    0.89,
    -0.48,
    silver
);

// PSU ventilation

for (let i = 0; i < 9; i++) {

    box(
        0.8,
        0.012,
        0.025,
        0.45,
        0.91,
        -0.8 + i * 0.08,
        black
    );

}

// PSU logo panel

box(
    0.45,
    0.025,
    0.025,
    0.45,
    0.93,
    -0.48,
    rgbMaterial(0x8b6cff)
);

// ======================================================
// CABLES
// ======================================================

const cableWhite = new THREE.MeshStandardMaterial({
    color: 0xe5e8f0,
    roughness: 0.45
});

const cableBlack = new THREE.MeshStandardMaterial({
    color: 0x090b12,
    roughness: 0.55
});

// Main power cable

tube([
    [0.95, 1.35, -0.55],
    [1.05, 1.55, -0.7],
    [0.85, 1.85, -0.75],
    [0.75, 2.1, -0.8]
], 0.035, cableBlack);

// GPU power cable

tube([
    [0.8, 1.8, 0.4],
    [1.0, 1.9, 0.2],
    [0.95, 2.1, -0.1],
    [0.65, 2.3, -0.45]
], 0.035, cableWhite);

// Additional cables

tube([
    [0.9, 1.15, -0.4],
    [1.05, 1.35, -0.55],
    [0.9, 1.6, -0.7]
], 0.022, cableBlack);

tube([
    [0.9, 1.1, -0.35],
    [1.0, 1.25, -0.55],
    [0.9, 1.45, -0.7]
], 0.022, cableWhite);

// ======================================================
// CASE FEET
// ======================================================

for (const x of [-1, 1]) {

    for (const z of [-0.8, 0.8]) {

        cylinder(
            0.13,
            0.16,
            x,
            0.015,
            z,
            rubber
        );

    }

}

// ======================================================
// RGB LIGHT STRIP
// ======================================================

const rgbStrip = box(
    2.15,
    0.025,
    0.025,
    0,
    0.25,
    0.95,
    rgbMaterial(0x8844ff)
);

// ======================================================
// CASE DETAILS
// ======================================================

// Front power button

cylinder(
    0.055,
    0.025,
    1.45,
    3.55,
    0.8,
    silver
);

// Power LED

const powerLed = new THREE.Mesh(
    new THREE.SphereGeometry(0.025, 16, 16),
    rgbMaterial(0x44aaff)
);

powerLed.position.set(1.46, 3.4, 0.8);

pc.add(powerLed);

// ======================================================
// FLOOR
// ======================================================

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({
        color: 0x080c16,
        roughness: 0.85,
        metalness: 0.1
    })
);

floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.09;
floor.receiveShadow = true;

scene.add(floor);

// ======================================================
// ANIMATION
// ======================================================

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Fan rotation

    fanAnimations.forEach((fan) => {

        fan.blades.rotation.z =
            time * fan.speed;

    });

    // RGB breathing

    rgbMaterials.forEach((material, index) => {

        material.emissiveIntensity =
            1.5 +
            Math.sin(time * 2 + index * 0.65) * 0.65;

    });

    // Ambient RGB lighting

    purpleLight.intensity =
        38 + Math.sin(time * 1.5) * 7;

    blueLight.intensity =
        30 + Math.cos(time * 1.5) * 7;

    pinkLight.intensity =
        16 + Math.sin(time * 2) * 4;

    controls.update();

    renderer.render(scene, camera);

}

animate();

// ======================================================
// RESPONSIVE RESIZE
// ======================================================

const resizeObserver = new ResizeObserver(() => {

    const width = container.clientWidth;
    const height = container.clientHeigh
