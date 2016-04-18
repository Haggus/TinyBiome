(function() {

    var scene;
    var camera;
    var controls;
    var container;
    var renderer;

    init();
    animate();

    function init() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
        camera.position.z = 1000;

        container = document.createElement('div');
        document.body.appendChild(container);

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;

        var loader = new THREE.TextureLoader();
        loader.load('img/surface.png', function(texture) {
            var geometry = new THREE.SphereGeometry(450, 20, 20);

            var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});

            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        });

        var objLoader = new THREE.OBJLoader();
        var trees = new THREE.Group();
        scene.add(trees);

        objLoader.load('models/example_tree.obj', function(object) {
            var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

            for (var i=0; i<10; i++) {
                var vertex = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
                vertex.normalize();
                vertex.multiplyScalar(450);

                var geometry = new THREE.BoxGeometry(1, 1, 1);
                var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

                var mesh = new THREE.Mesh(geometry, material);
                mesh.scale.set(10, 10, 10);
                mesh.position.set(vertex.x, vertex.y, vertex.z);

                // trees.add(mesh);
                // console.log(vertex);
                
                object.scale.set(10, 10, 10);
                object.position.set(vertex.x, vertex.y, vertex.z);
                object.children[0].material = material;
                object.children[0].material.needsUpdate = true;

                trees.add(object);
            }

            console.log(trees);
        });

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

	for (var i=0; i<1000; i++) {
	    var particle = new THREE.Mesh( geometry, material);
	    particle.position.x = Math.random() * 2 - 1;
	    particle.position.y = Math.random() * 2 - 1;
	    particle.position.z = Math.random() * 2 - 1;
	    particle.position.normalize();
	    particle.position.multiplyScalar(Math.random() * 10 + 450);
	    particle.scale.multiplyScalar(2);
	    scene.add(particle);
	}

        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);

        controls.update();

        render();
    }

    function render() {
        renderer.render(scene, camera);
    }
})();
