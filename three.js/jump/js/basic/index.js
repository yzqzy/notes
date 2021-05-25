// 场景
const scene = new THREE.Scene();

// 相机
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 9;
camera.position.x = 5;
camera.position.y = 6;

// 几何体
const geometry = new THREE.CubeGeometry(5, 10, 5);
const material = new THREE.MeshLambertMaterial({
  color: 0xcccccc
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 光
let directionLight = new THREE.DirectionalLight(0xffffff, 1.1);
directionLight.position.set(7, 10, 5);
scene.add(directionLight);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

let x = 5;

function render () {
  x -= 0.1;
  camera.position.x = x;
  renderer.render(scene, camera);

  if (x > -5) {
    requestAnimationFrame(render);
  }
}

render();