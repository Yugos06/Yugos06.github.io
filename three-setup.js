import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

window.THREE_LIB = { THREE, GLTFLoader };
window.__threeReady = Promise.resolve(true);
