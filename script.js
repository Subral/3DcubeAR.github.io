import * as THREE from 'three'; 

const scene = new THREE.Scene();
const camera = new THREE.Camera();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(2, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Set up AR.js
const arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam'
});

arToolkitSource.init(() => {
    setTimeout(() => {
        onResize();
    }, 2000);
});

window.addEventListener('resize', () => {
    onResize();
});

function onResize() {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
}

const arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@master/three.js/data/camera_para.dat',
    detectionMode: 'mono'
});

arToolkitContext.init(() => {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
});

const markerRoot = new THREE.Group();
scene.add(markerRoot);

const markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
    type: 'pattern',
    patternUrl: 'https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@master/three.js/data/patt.hiro',
});

// Create the cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;
markerRoot.add(cube);

// Add wireframe edges
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
const wireframe = new THREE.LineSegments(edges, lineMaterial);
cube.add(wireframe);

function animate() {
    requestAnimationFrame(animate);

    if (arToolkitSource.ready) {
        arToolkitContext.update(arToolkitSource.domElement);
    }

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate();
