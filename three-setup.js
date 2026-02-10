import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

window.THREE_LIB = { THREE, GLTFLoader, DRACOLoader };
window.__threeReady = Promise.resolve(true);
