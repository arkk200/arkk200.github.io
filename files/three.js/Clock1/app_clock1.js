import * as THREE from 'https://cdn.skypack.dev/three@0.133'
import threejsOrbitControls from 'https://cdn.skypack.dev/threejs-orbit-controls';
import {FontLoader} from "https://cdn.skypack.dev/three@0.133/examples/jsm/loaders/FontLoader.js";
import {TextGeometry} from "https://cdn.skypack.dev/three@0.133/examples/jsm/geometries/TextGeometry.js";

// Responsive

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color("white");

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    1,
    1000
);
camera.position.set(0,0,25);

// FontLoader, TextGeometry
const loader = new FontLoader();

loader.load('./fonts/Song_Myung_Regular.json', (font) =>{
    const textmat = new THREE.MeshStandardMaterial({
        color:0xffffff,
        metalness: -0.5
    });
    for(let i = 1; i <= 12; i++){
        const textgeo = new TextGeometry(`${i}`, {
            font:font,
            size: 1.3,
            height: 0.3,
            curveSegments: 20,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.03,
            bevelOffset: 0.005,
            bevelSegments: 24
        });
        textgeo.center();
        const textmesh = new THREE.Mesh(textgeo, textmat);
        // Math.cos()*radius - size/2, Math.sin()*radius - size/2
        textmesh.position.set(Math.cos((-i*30+90)/180 * Math.PI)*7,Math.sin((-i*30+90)/180 * Math.PI)*7,3);
        // testmesh.geometry.translate(0,0,5);
        scene.add(textmesh);
    }
});

// PointLight
const pl = new THREE.PointLight(0xffffff, 0.7);
pl.position.set(0, 0, 10);
scene.add(pl);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new threejsOrbitControls(camera, renderer.domElement);

// Geometry, Material, Mesh

// ClockBody
const clkbodygeo = new THREE.CylinderGeometry(10, 10, 1, 64);
const clkbodymat = new THREE.MeshPhongMaterial({
    color:0x999999,
    shininess: 1,
    specular: 0xffffff
});
const clkbodymesh = new THREE.Mesh(clkbodygeo, clkbodymat);
clkbodymesh.rotation.x = 90 * Math.PI / 180;
clkbodymesh.position.z = 2.3;
scene.add(clkbodymesh);

// ClockNeedle
const hourgeo = new THREE.TorusGeometry( 1, 0.3, 16, 100 );
const minutegeo = new THREE.TorusGeometry( 0.8, 0.2, 16, 100 );
const secondgeo = new THREE.TorusGeometry( 0.6, 0.1, 16, 100 );
const hourmat = new THREE.MeshPhongMaterial({
    color:0x999999,
    transparent: true,
    opacity: 0.85
});
const minutemat = new THREE.MeshPhongMaterial({
    color:0x666666,
    transparent: true,
    opacity: 0.85
});
const secondmat = new THREE.MeshPhongMaterial({
    color:0x999999,
    transparent: true,
    opacity: 0.85
});
const hourmesh = new THREE.Mesh(hourgeo, hourmat);
const minutemesh = new THREE.Mesh(minutegeo, minutemat);
const secondmesh = new THREE.Mesh(secondgeo, secondmat);

const rad = 7;
hourmesh.position.set(0,rad,2.8);
minutemesh.position.set(0,rad,2.9);
secondmesh.position.set(0,rad,3);

scene.add(hourmesh);
scene.add(minutemesh);
scene.add(secondmesh);

// Clock

// Resize
function onResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onResize);

// Animation
function animate(){
    requestAnimationFrame(animate);
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    let second = currentTime.getSeconds();
    hourmesh.position.set(Math.cos((-(hour)*30+90)/180 * Math.PI)*rad,Math.sin((-(hour)*30+90)/180 * Math.PI)*rad,2.8);
    minutemesh.position.set(Math.cos((-(minute)*6+90)/180 * Math.PI)*rad,Math.sin((-(minute)*6+90)/180 * Math.PI)*rad,2.9);
    secondmesh.position.set(Math.cos((-(second)*6+90)/180 * Math.PI)*rad,Math.sin((-(second)*6+90)/180 * Math.PI)*rad,3);
    renderer.render(scene, camera);
}
animate();