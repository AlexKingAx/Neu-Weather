import * as THREE from '../node_modules/three/build/three.module.js';
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js';


// SONO OGGETTI COSTANTI CHE SERVONO SEMPRE 
// PER VEDERE LA SCENZA, RENDERIZZARE GLI OGGETTI
// E PER CONTENERE TUTTI I NOSTRI OGGETTI DEL "MONDO"
const scene = new THREE.Scene();/*CREO SEMPLICEMENTE UNA SCENA DOVE POSIZIONERO TUTTO*/

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);/*CREO UNA CAMERA DI TIPO PRESPECTIVECAMERA, DOVE SETTO ALCUBNI PARAMETRI*/

const light = new THREE.PointLight(0xFFFFFF, 1, 100); //AGGIUNGO LUCE PER VEDERE GLI OGGETTI

light.position.set(5, 5, 5);
scene.add(light);

const renderer = new THREE.WebGL1Renderer({antialias: true});/**RENDERIZZO GLI ELEMENTI CON WebGL API*/
renderer.setClearColor("#233143");/**SETTA IL COLORE DEL BACKGROUND */
renderer.setSize(window.innerWidth, window.innerHeight);/**SETTA LA GRANDEZZA DEGLI OGGETTI RENDERIZZATI */
document.body.appendChild(renderer.domElement);/**APPENDE L'ELEMENTO <canvas></canvas> NEL DOM, DOVE VENGONO RENDIRIZZATI GLI ELEMENTI CON WebGL*/

/**QUESTA FUNZIONE SERVE PER FARE IL RESIZE DEL RENDERING IN CASO LA FINESTRA VENGA MODIFICATA (allargata o rimpicciolita) */
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

//**CREO UN BOX GEOMETRICO COME PRIMO ELEMENTO */
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);/**SETTO LE GRANDEZZE DELLA FORMA GEOMETRICA WIDTH,HEIGHT,DEPTH */
const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});/**CI SONO DIVERSI TIPI MATERIAL,MESHLAMBERT CONSENTE DI UTILIZZARE UN COLORE IN QUESTO CASO BIANCO */
const boxMesh = new THREE.Mesh(boxGeometry, 
boxMaterial);/**METTO INSIEME I DUE ELEMENTI */
boxMesh.rotation.set(40, 0, 40);/**CAMBIO LA ROTAZIONE INZIALE X,Y,Z */
scene.add(boxMesh);/**AGGIUNGO IL GEOMETRYBOX ALLA SCENA */

// SETTO LA CAMERA IN MODO CHE SI VEDA L'OGGETTO, PERCHE LA SUA POSIZIONE ALTRIMENTI SAREBBE A 0,0,0 X,Y,Z
camera.position.z = 5; // <- New code

/**FUNZIONE CHE SERVE PER RENDERIZZARE TUTTO CIO CHE ABBIAMO CREATO PRIMA, 
 * CREA ANCHE UN ANIMAZIONE PER IL CUBO
 */
const rendering = function() {
    requestAnimationFrame(rendering);
    // Constantly rotate box
    scene.rotation.z -= 0.005;
    scene.rotation.x -= 0.01;
    renderer.render(scene, camera);
}
rendering();

//non funziona non so pk, da schermo bianco. da capire come mai