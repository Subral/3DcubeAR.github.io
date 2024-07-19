// window.onload = function () {
//     const scene = new THREE.Scene();
//     const camera = new THREE.Camera();
//     scene.add(camera);

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     document.body.appendChild(renderer.domElement);

//     const ambientLight = new THREE.AmbientLight(0x404040);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//     directionalLight.position.set(2, 5, 5);
//     directionalLight.castShadow = true;
//     scene.add(directionalLight);

//     const markerRoot = new THREE.Group();
//     scene.add(markerRoot);

//     const arToolkitSource = new THREEx.ArToolkitSource({
//         sourceType: 'webcam',
//         sourceWidth: window.innerWidth,
//         sourceHeight: window.innerHeight,
//         displayWidth: window.innerWidth,
//         displayHeight: window.innerHeight,
//     });

//     arToolkitSource.init(function onReady() {
//         setTimeout(onResize, 1000);
//     });

//     window.addEventListener('resize', onResize);

//     function onResize() {
//         arToolkitSource.onResizeElement();
//         arToolkitSource.copyElementSizeTo(renderer.domElement);
//         if (arToolkitContext.arController !== null) {
//             arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
//         }
//     }

//     const arToolkitContext = new THREEx.ArToolkitContext({
//         cameraParametersUrl: 'https://rawcdn.githack.com/AR-js-org/AR.js/master/data/data/camera_para.dat',
//         detectionMode: 'mono',
//         maxDetectionRate: 30,
//     });

//     arToolkitContext.init(function onCompleted() {
//         camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
//     });

//     const markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
//         type: 'pattern',
//         patternUrl: 'https://rawcdn.githack.com/AR-js-org/AR.js/master/data/data/patt.hiro',
//     });

//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);
//     cube.scale.set(1, 1, 1);
//     cube.castShadow = true;
//     cube.receiveShadow = true;
//     markerRoot.add(cube);

//     const edges = new THREE.EdgesGeometry(geometry);
//     const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
//     const wireframe = new THREE.LineSegments(edges, lineMaterial);
//     cube.add(wireframe);

//     function animate() {
//         requestAnimationFrame(animate);

//         if (arToolkitSource.ready !== false) {
//             arToolkitContext.update(arToolkitSource.domElement);
//         }

//         cube.rotation.x += 0.01;

//         renderer.render(scene, camera);
//     }

//     animate();
// };


window.onload = function() {
            const video = document.getElementById('arjs-video');
            const scene = new THREE.Scene();
            const camera = new THREE.Camera();
            scene.add(camera);

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            const arToolkitSource = new THREEx.ArToolkitSource({
                sourceType: 'webcam',
                sourceWidth: window.innerWidth,
                sourceHeight: window.innerHeight,
                displayWidth: window.innerWidth,
                displayHeight: window.innerHeight,
            });

            arToolkitSource.init(function onReady() {
                video.srcObject = arToolkitSource.domElement.srcObject;
                setTimeout(onResize, 100);
            });

            const arToolkitContext = new THREEx.ArToolkitContext({
                cameraParametersUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/data/data/camera_para.dat',
                detectionMode: 'mono',
            });

            arToolkitContext.init(function onCompleted() {
                camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
            });

            const markerRoot = new THREE.Group();
            scene.add(markerRoot);
            const markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
                type: 'pattern',
                patternUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/data/data/patt.hiro',
            });

            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshNormalMaterial();
            const cube = new THREE.Mesh(geometry, material);
            cube.position.y = 0.5;
            markerRoot.add(cube);

            function onResize() {
                arToolkitSource.onResizeElement();
                arToolkitSource.copyElementSizeTo(renderer.domElement);
                if (arToolkitContext.arController !== null) {
                    arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
                }
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            window.addEventListener('resize', onResize);

            function update() {
                if (arToolkitSource.ready !== false) {
                    arToolkitContext.update(arToolkitSource.domElement);
                }
            }

            function animate() {
                requestAnimationFrame(animate);
                update();
                renderer.render(scene, camera);
            }

            animate();
        };