import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

window.THREE = THREE;
window.THREE.GLTFLoader = GLTFLoader;
window.__threeReady = Promise.resolve(true);
