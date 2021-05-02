import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()
// Lights
const pointLight = new THREE.PointLight(0xffffff, 1.2)
const aLight = new THREE.AmbientLight(0x404040, 1.2)
pointLight.position.set(0,0,2)
scene.add(aLight)
scene.add(pointLight)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

camera.position.x = 0
camera.position.y = 10
camera.position.z = 3
camera.aspect = sizes.width / sizes.height;
camera.lookAt(0, 20, -100);
scene.add(camera)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // alpha: true,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
/**
 * Animate
 */
const loader = new GLTFLoader();
let fallen_angel = null
loader.load('./model/fallen_angel/scene.gltf', gltf => {
    fallen_angel = gltf
    fallen_angel.scene.scale.set(5, 5, 5);
    scene.add(fallen_angel.scene)
})

const spd = 0.0006;
const r = 0.20
let flg = true; 

const tick = () => {
    if (fallen_angel) {
        if (Math.round(fallen_angel.scene.rotation.y * 100) / 100 === r) {
            flg = false;
        } else if (Math.round(fallen_angel.scene.rotation.y * 100) / 100 === -r) {
            flg = true;
        }
        if (flg) {
            fallen_angel.scene.rotation.y += spd;
        } else {
            fallen_angel.scene.rotation.y -= spd;
        }
    }
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick();
