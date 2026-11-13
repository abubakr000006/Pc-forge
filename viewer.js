import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('pc3d');

if (!container) {
    console.error('Не найден элемент #pc3d');
} else {

    // СЦЕНА
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101525);

    // КАМЕРА
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.set(5, 4, 7);

    // РЕНДЕРЕР
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // УПРАВЛЕНИЕ
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 1.8, 0);
    controls.minDistance = 4;
    controls.maxDistance = 12;

    // СВЕТ
    scene.add(new THREE.AmbientLight(0xffffff, 1.8));

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 8, 6);
    scene.add(mainLight);

    const purpleLight = new THREE.PointLight(0x7733ff, 35, 10);
    purpleLight.position.set(-3, 3, 2);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x0088ff, 25, 10);
    blueLight.position.set(3, 2, 3);
    scene.add(blueLight);

    // МАТЕРИАЛЫ
    const materials = {
        metal: new THREE.MeshStandardMaterial({
            color: 0x303747,
            metalness: 0.8,
            roughness: 0.3
        }),

        black: new THREE.MeshStandardMaterial({
            color: 0x10151e,
            metalness: 0.4,
            roughness: 0.45
        }),

        board: new THREE.MeshStandardMaterial({
            color: 0x164638,
            metalness: 0.2,
            roughness: 0.65
        }),

        silver: new THREE.MeshStandardMaterial({
            color: 0x9aa5b5,
            metalness: 0.8,
            roughness: 0.25
        }),

        glass: new THREE.MeshPhysicalMaterial({
            color: 0x9bbcff,
            transparent: true,
            opacity: 0.10,
            roughness: 0.12,
            metalness: 0.1,
            side: THREE.DoubleSide,
            depthWrite: false
        })
    };

    // ГРУППА КОМПЬЮТЕРА
    const pc = new THREE.Group();
    scene.add(pc);

    // СОЗДАНИЕ КОРОБОК
    function box(width, height, depth, x, y, z, material) {
        const geometry = new THREE.BoxGeometry(
            width,
            height,
            depth
        );

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        pc.add(mesh);

        return mesh;
    }

    // RGB МАТЕРИАЛ
    function rgbMaterial(color) {
        return new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 1.5
        });
    }

    // КОРПУС
    box(2.8, 0.12, 2.3, 0, 0.1, 0, materials.metal);
    box(2.8, 0.12, 2.3, 0, 3.8, 0, materials.metal);

    // ЗАДНЯЯ СТЕНКА
    box(2.8, 3.8, 0.12, 0, 1.95, -1.1, materials.black);

    // ЛЕВАЯ СТЕНКА
    box(0.12, 3.8, 2.3, -1.34, 1.95, 0, materials.black);

    // ПЕРЕДНЯЯ РАМКА
    box(0.12, 3.8, 2.3, 1.34, 1.95, 0, materials.metal);

    // СТЕКЛО
    const glassPanel = new THREE.Mesh(
        new THREE.BoxGeometry(2.55, 3.5, 0.025),
        materials.glass
    );

    glassPanel.position.set(0, 1.95, 1.16);
    pc.add(glassPanel);

    // МАТЕРИНСКАЯ ПЛАТА
    box(
        1.8, 2.5, 0.08,
        -0.35, 2.05, -0.85,
        materials.board
    );

    // ПРОЦЕССОР
    box(
        0.55, 0.12, 0.55,
        -0.35, 2.85, -0.55,
        materials.silver
    );

    // КУЛЕР
    box(
        0.85, 0.4, 0.85,
        -0.35, 3.15, -0.55,
        materials.metal
    );

    // СОЗДАНИЕ RGB-ВЕНТИЛЯТОРА
    function fan(x, y, z, color, radius = 0.38) {

        const group = new THREE.Group();

        group.position.set(x, y, z);

        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(
                radius,
                0.045,
                12,
                40
            ),
            rgbMaterial(color)
        );

        group.add(ring);

        const center = new THREE.Mesh(
            new THREE.CylinderGeometry(
                radius * 0.3,
                radius * 0.3,
                0.12,
                24
            ),
            materials.black
        );

        center.rotation.x = Math.PI / 2;

        group.add(center);

        // Лопасти
        for (let i = 0; i < 4; i++) {

            const blade = new THREE.Mesh(
                new THREE.BoxGeometry(
                    radius * 0.65,
                    0.055,
                    0.045
                ),
                materials.silver
            );

            blade.position.x = radius * 0.35;
            blade.rotation.z = i * Math.PI / 2;

            group.add(blade);
        }

        pc.add(group);

        return group;
    }

    // ВЕНТИЛЯТОР КУЛЕРА
    fan(-0.35, 3.15, 0.0, 0x00aaff, 0.32);

    // ОПЕРАТИВНАЯ ПАМЯТЬ
    for (let i = 0; i < 2; i++) {

        box(
            0.12, 0.85, 0.18,
            0.25 + i * 0.3,
            2.75,
            -0.55,
            materials.silver
        );

        box(
            0.13, 0.04, 0.19,
            0.25 + i * 0.3,
            3.2,
            -0.55,
            rgbMaterial(0x8a35ff)
        );
    }

    // ВИДЕОКАРТА
    box(
        2.0, 0.38, 0.65,
        0, 1.65, 0.15,
        materials.black
    );

    // ПОЛОСА ВИДЕОКАРТЫ
    box(
        1.7, 0.045, 0.035,
        0, 1.85, 0.49,
        rgbMaterial(0x0088ff)
    );

    // ВЕНТИЛЯТОРЫ ВИДЕОКАРТЫ
    for (let i = 0; i < 3; i++) {

        fan(
            -0.65 + i * 0.65,
            1.65,
            0.53,
            0x00aaff,
            0.18
        );
    }

    // ПЕРЕДНИЕ ВЕНТИЛЯТОРЫ
    for (let i = 0; i < 3; i++) {

        fan(
            0.85,
            0.8 + i * 1.1,
            0.75,
            0x8a35ff
        );
    }

    // БЛОК ПИТАНИЯ
    box(
        1.0, 0.65, 1.0,
        0.55, 0.55, -0.45,
        materials.black
    );

    // ПОЛ
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({
            color: 0x101525,
            roughness: 0.9
        })
    );

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // АНИМАЦИЯ
    function animate() {

        requestAnimationFrame(animate);

        controls.update();

        renderer.render(scene, camera);
    }

    animate();

    // ИЗМЕНЕНИЕ РАЗМЕРА
    const resizeObserver = new ResizeObserver(() => {

        const width = container.clientWidth;
        const height = container.clientHeight;

        if (width === 0 || height === 0) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    });

    resizeObserver.observe(container);
}
