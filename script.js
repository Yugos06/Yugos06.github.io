
function initializeDarkMode() {
  const darkToggle = document.getElementById('dark-toggle');
  const html = document.documentElement;
  if (!darkToggle) return;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
  html.setAttribute('data-theme', initialTheme);
  darkToggle.textContent = initialTheme === 'light' ? '☀️' : '🌙';
  darkToggle.setAttribute('aria-pressed', initialTheme === 'light' ? 'true' : 'false');
  darkToggle.title = initialTheme === 'light' ? 'Light Mode' : 'Dark Mode';

  darkToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    darkToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
    darkToggle.setAttribute('aria-pressed', newTheme === 'light' ? 'true' : 'false');
    darkToggle.title = newTheme === 'light' ? 'Light Mode' : 'Dark Mode';
  });
}

function initializeViewer() {
  const viewerStage = document.querySelector('.viewer-stage');
  const viewerImage = document.getElementById('viewer-image');
  const viewerCanvas = document.getElementById('viewer-canvas');
  const viewerName = document.getElementById('viewer-name');
  const viewerType = document.getElementById('viewer-type');
  const viewerDesc = document.getElementById('viewer-desc');
  const viewerSelect = document.getElementById('viewer-select');
  const prevBtn = document.getElementById('viewer-prev');
  const nextBtn = document.getElementById('viewer-next');
  const tiltInput = document.getElementById('viewer-tilt');
  const viewer3DToggle = document.getElementById('viewer-3d-toggle');
  const viewer3DStatus = document.getElementById('viewer-3d-status');
  const viewerJumps = document.querySelectorAll('.viewer-jump');
  const viewerProgress = document.querySelector('.viewer-progress');
  const viewerProgressBar = document.getElementById('viewer-progress-bar');

  if (!viewerStage || !viewerImage || !viewerSelect) return;

  const cards = Array.from(document.querySelectorAll('.ship-card'));
  const ships = cards
    .map(card => {
      const image = card.querySelector('img')?.getAttribute('src') || 'images/wave.webp';
      const name = card.querySelector('h3')?.textContent?.trim() || 'Navire';
      const type = card.querySelectorAll('.stat')[1]?.textContent.replace(/Type:/, '').trim() || 'Navire';
      const desc = card.querySelector('.ship-desc')?.textContent?.trim() || '';
      return { id: card.id, name, type, desc, image };
    })
    .filter(ship => ship.id);

  viewerSelect.innerHTML = '<option value="">-- Choisir un navire --</option>';
  ships.forEach(ship => {
    const option = document.createElement('option');
    option.value = ship.id;
    option.textContent = ship.name;
    viewerSelect.appendChild(option);
  });

  let currentIndex = Math.max(0, ships.findIndex(ship => ship.id === 'bismarck'));
  let currentViews = [];
  let use3D = false;
  let userEnabled3D = false;
  let loading3D = false;
  const glbUrl = 'bismarck.glb?v=2';

  const hasWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  };

  const hasThreeSupport = () => {
    return hasWebGLSupport() && !!window.THREE_LIB && !!window.THREE_LIB.THREE && !!window.THREE_LIB.GLTFLoader;
  };

  const createViewer3D = () => {
    if (!viewerCanvas || !window.THREE_LIB) return null;
    const { THREE, GLTFLoader, DRACOLoader } = window.THREE_LIB;
    const { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, DirectionalLight, Group, Mesh, MeshStandardMaterial, BoxGeometry, CylinderGeometry } = THREE;
    const scene = new Scene();
    scene.background = new Color(0x0c141f);

    let renderer;
    try {
      renderer = new WebGLRenderer({ canvas: viewerCanvas, antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch (error) {
      console.warn('3D viewer disabled:', error);
      return null;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));

    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(4.2, 1.8, 5.2);

    const ambient = new AmbientLight(0xffffff, 0.8);
    const keyLight = new DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(6, 8, 4);
    scene.add(ambient, keyLight);

    const root = new Group();
    const group = new Group();
    root.add(group);
    scene.add(root);

    const hullMaterial = new MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.6, metalness: 0.2 });
    const deckMaterial = new MeshStandardMaterial({ color: 0x6d6f6f, roughness: 0.8, metalness: 0.1 });
    const towerMaterial = new MeshStandardMaterial({ color: 0xaeb4bf, roughness: 0.4, metalness: 0.4 });

    const hull = new Mesh(new BoxGeometry(4.2, 0.45, 1.3), hullMaterial);
    hull.position.y = -0.1;
    const deck = new Mesh(new BoxGeometry(3.2, 0.25, 1.0), deckMaterial);
    deck.position.y = 0.25;
    const tower = new Mesh(new BoxGeometry(0.6, 0.5, 0.6), towerMaterial);
    tower.position.set(-0.2, 0.6, 0.1);
    const gun = new Mesh(new CylinderGeometry(0.05, 0.05, 1.2, 16), towerMaterial);
    gun.rotation.z = Math.PI / 2;
    gun.position.set(1.2, 0.5, 0.15);

    group.add(hull, deck, tower, gun);

    let model = null;
    let loader = GLTFLoader ? new GLTFLoader() : null;
    if (loader && DRACOLoader) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/');
      loader.setDRACOLoader(dracoLoader);
    }
    const loadModel = (url, onDone, onFail, onProgress) => {
      if (!loader || model) {
        if (onDone && model) onDone();
        return;
      }
      if (loading3D) return;
      loading3D = true;
      let timedOut = false;
      const timeoutId = setTimeout(() => {
        timedOut = true;
        loading3D = false;
        if (onFail) onFail(new Error('Timeout'));
      }, 20000);
      loader.load(
        url,
        (gltf) => {
          if (timedOut) return;
          clearTimeout(timeoutId);
          model = gltf.scene;
          model.scale.set(1.2, 1.2, 1.2);
          model.position.set(0, -0.2, 0);
          root.add(model);
          group.visible = false;
          render();
          loading3D = false;
          if (onDone) onDone();
        },
        (xhr) => {
          if (onProgress && xhr && xhr.lengthComputable) {
            const percent = Math.round((xhr.loaded / xhr.total) * 100);
            onProgress(percent);
          }
        },
        (error) => {
          if (timedOut) return;
          clearTimeout(timeoutId);
          console.warn('GLB load failed:', error);
          model = null;
          group.visible = true;
          render();
          loading3D = false;
          if (onFail) onFail(error);
        }
      );
    };

    const palette = (id) => {
      let hash = 0;
      for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
      const hue = Math.abs(hash) % 360;
      return {
        hull: `hsl(${hue}, 24%, 26%)`,
        deck: `hsl(${hue}, 12%, 56%)`,
        tower: `hsl(${hue}, 18%, 70%)`
      };
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    const setShip = (id) => {
      const colors = palette(id);
      hull.material.color.set(colors.hull);
      deck.material.color.set(colors.deck);
      tower.material.color.set(colors.tower);
      gun.material.color.set(colors.tower);
      render();
    };

    const resize = () => {
      const rect = viewerStage.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      render();
    };

    const setRotation = (deg) => {
      root.rotation.y = THREE.MathUtils.degToRad(deg);
      render();
    };

    resize();
    window.addEventListener('resize', resize);

    const set3DMode = (enabled) => {
      if (model) {
        model.visible = enabled;
      }
      group.visible = !enabled;
    };

    return { setShip, setRotation, resize, loadModel, set3DMode, render };
  };

  const viewer3D = createViewer3D();

  const applyAngle = value => {
    if (viewer3D && use3D) {
      viewer3D.setRotation(value);
      return;
    }
    if (!currentViews.length) return;
    const max = Math.max(0, currentViews.length - 1);
    const clamped = Math.min(max, Math.max(0, value));
    viewerImage.src = currentViews[clamped];
    if (tiltInput) tiltInput.value = clamped;
    if (max > 0) {
      const tilt = (clamped / max) * 16 - 8;
      viewerStage.style.setProperty('--viewer-tilt', `${tilt.toFixed(1)}deg`);
    } else {
      viewerStage.style.setProperty('--viewer-tilt', '0deg');
    }
  };

  const setViews = (shipId, fallbackImage) => {
    const views = shipGalleryImages[shipId] || [fallbackImage];
    currentViews = views.filter(Boolean);
    if (tiltInput) {
      if (viewer3D && use3D) {
        tiltInput.min = '-45';
        tiltInput.max = '45';
        tiltInput.step = '1';
        tiltInput.value = '0';
      } else {
        tiltInput.min = '0';
        tiltInput.max = `${Math.max(0, currentViews.length - 1)}`;
        tiltInput.step = '1';
        tiltInput.value = '0';
      }
    }
    applyAngle(0);
  };

  const renderShip = index => {
    if (!ships.length) return;
    currentIndex = (index + ships.length) % ships.length;
    const ship = ships[currentIndex];
    viewerImage.alt = `${ship.name} - vue principale`;
    if (viewerName) viewerName.textContent = ship.name;
    if (viewerType) viewerType.textContent = ship.type;
    if (viewerDesc) viewerDesc.textContent = ship.desc;
    viewerSelect.value = ship.id;
    use3D = ship.id === 'bismarck' && !!viewer3D && userEnabled3D;
    viewerStage.classList.toggle('is-3d', use3D);
    setViews(ship.id, ship.image);
    if (viewer3D) {
      viewer3D.setShip(ship.id);
      viewer3D.set3DMode(use3D);
    }
  };

  renderShip(currentIndex);

  viewerSelect.addEventListener('change', () => {
    const selectedIndex = ships.findIndex(ship => ship.id === viewerSelect.value);
    if (selectedIndex >= 0) {
      renderShip(selectedIndex);
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => renderShip(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => renderShip(currentIndex + 1));
  }

  if (tiltInput) {
    tiltInput.addEventListener('input', () => {
      applyAngle(parseInt(tiltInput.value, 10) || 0);
    });
  }

  if (viewer3DToggle && viewer3DStatus) {
    if (!hasThreeSupport()) {
      viewer3DToggle.disabled = true;
      viewer3DToggle.textContent = '3D indisponible';
      if (viewer3DStatus) viewer3DStatus.textContent = '3D indisponible (WebGL ou Three.js).';
      if (viewerProgress) viewerProgress.style.display = 'none';
      return;
    }

    viewer3DToggle.addEventListener('click', () => {
      const shipId = ships[currentIndex]?.id;
      if (shipId !== 'bismarck') {
        if (viewer3DStatus) viewer3DStatus.textContent = '3D disponible uniquement pour Bismarck.';
        if (viewerProgressBar) viewerProgressBar.style.width = '0%';
        userEnabled3D = false;
        use3D = false;
        viewerStage.classList.remove('is-3d');
        setViews(shipId, ships[currentIndex]?.image || 'images/wave.webp');
        if (viewer3D) viewer3D.set3DMode(false);
        return;
      }

      if (!viewer3D) {
        if (viewer3DStatus) viewer3DStatus.textContent = 'WebGL indisponible sur ce navigateur.';
        return;
      }

      userEnabled3D = !userEnabled3D;
      if (!userEnabled3D) {
        if (viewer3DStatus) viewer3DStatus.textContent = '3D désactivée.';
        if (viewerProgressBar) viewerProgressBar.style.width = '0%';
        use3D = false;
        viewerStage.classList.remove('is-3d');
        setViews(shipId, ships[currentIndex]?.image || 'images/wave.webp');
        viewer3D.set3DMode(false);
        return;
      }

      if (viewer3DStatus) viewer3DStatus.textContent = 'Chargement du modèle 3D...';
      if (viewerProgressBar) viewerProgressBar.style.width = '0%';
      viewer3D.loadModel(glbUrl, () => {
        use3D = true;
        viewerStage.classList.add('is-3d');
        viewer3D.set3DMode(true);
        if (viewer3DStatus) viewer3DStatus.textContent = '3D activée. Utilise le slider pour tourner.';
        if (viewerProgressBar) viewerProgressBar.style.width = '100%';
        setViews(shipId, ships[currentIndex]?.image || 'images/wave.webp');
      }, () => {
        userEnabled3D = false;
        use3D = false;
        viewerStage.classList.remove('is-3d');
        viewer3D.set3DMode(false);
        if (viewer3DStatus) viewer3DStatus.textContent = 'Échec du chargement 3D. Retour en 2D.';
        if (viewerProgressBar) viewerProgressBar.style.width = '0%';
      }, (percent) => {
        if (viewer3DStatus) viewer3DStatus.textContent = `Chargement du modèle 3D... ${percent}%`;
        if (viewerProgressBar) viewerProgressBar.style.width = `${percent}%`;
      });
    });
  }

  if (viewerJumps.length) {
    viewerJumps.forEach(button => {
      button.addEventListener('click', () => {
        const shipId = button.getAttribute('data-ship');
        const index = ships.findIndex(ship => ship.id === shipId);
        if (index >= 0) {
          renderShip(index);
          document.getElementById('navires-3d')?.scrollIntoView({ behavior: 'smooth' });
          if (viewer3DToggle && !viewer3DToggle.disabled) {
            viewer3DToggle.click();
          }
        }
      });
    });
  }

  viewerStage.addEventListener('mousemove', event => {
    const rect = viewerStage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    viewerStage.style.setProperty('--spot-x', `${x.toFixed(0)}%`);
    viewerStage.style.setProperty('--spot-y', `${y.toFixed(0)}%`);
  });

  viewerStage.addEventListener('mouseleave', () => {
    viewerStage.style.setProperty('--spot-x', '50%');
    viewerStage.style.setProperty('--spot-y', '50%');
  });
}


function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const resultsCount = document.getElementById('results-count');
  let currentFilter = 'all';
  
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterCards(searchTerm, currentFilter, resultsCount);
  });
  
 
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      const searchTerm = searchInput.value.toLowerCase();
      filterCards(searchTerm, currentFilter, resultsCount);
    });
  });

  filterCards('', currentFilter, resultsCount);
}

function filterCards(searchTerm, country, resultsCount) {
  const shipCards = document.querySelectorAll('.ship-card');
  let visibleCount = 0;
  
  shipCards.forEach(card => {
    const shipName = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const shipCountry = card.getAttribute('data-country') || '';
    
    
    const nameMatch = shipName.includes(searchTerm);
    
    
    const countryMatch = country === 'all' || shipCountry === country;
    
    
    const isVisible = nameMatch && countryMatch;
    card.style.display = isVisible ? 'flex' : 'none';
    if (isVisible) visibleCount += 1;
  });

  if (resultsCount) {
    resultsCount.textContent = visibleCount === 0
      ? 'Aucun navire trouvé.'
      : `${visibleCount} navire${visibleCount > 1 ? 's' : ''} affiché${visibleCount > 1 ? 's' : ''}.`;
  }
}


function initializeShipCards() {
  const shipCards = document.querySelectorAll('.ship-card');
  
  shipCards.forEach(card => {
    
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
    
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('active');
      }
    });
    
    
    const galleryBtn = card.querySelector('.gallery-btn');
    if (galleryBtn) {
      galleryBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openGallery(card.id);
      });
    }
  });
}


function initializeGalleryModal() {
  const modal = document.getElementById('gallery-modal');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentImageIndex = 0;
  let currentShipImages = [];
  
  closeBtn.addEventListener('click', closeGallery);
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeGallery();
    }
  });
  
 
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') previousImage();
      if (e.key === 'ArrowRight') nextImage();
    }
  });
  
  prevBtn.addEventListener('click', previousImage);
  nextBtn.addEventListener('click', nextImage);
}

const shipGalleryImages = {
  'bismarck': ['images/bismarck.webp', 'images/wave.webp', 'images/bismarck.webp'],
  'yamato': ['images/yamato.webp', 'images/wave.webp', 'images/yamato.webp'],
  'hood': ['images/hood.webp', 'images/wave.webp', 'images/hood.webp'],
  'iowa': ['images/iowa.webp', 'images/wave.webp', 'images/iowa.webp'],
  'richelieu': ['images/richelieu.webp', 'images/wave.webp', 'images/richelieu.webp'],
  'prinz-eugen': ['images/prinz_eugen.webp', 'images/wave.webp', 'images/prinz_eugen.webp'],
  'vladivostok': ['images/vladivostok.webp', 'images/wave.webp', 'images/vladivostok.webp'],
  'prince-of-wales': ['images/prince_of_wales.webp', 'images/wave.webp', 'images/prince_of_wales.webp'],
  'grober-kurfurst': ['images/grosser_kurfurst.webp', 'images/wave.webp', 'images/grosser_kurfurst.webp'],
  'de-zeven-provincien': ['images/de_zeven_provincien.webp', 'images/wave.webp', 'images/de_zeven_provincien.webp'],
  'admiral-scheer': ['images/Admiral-Scheer.png', 'images/wave.webp', 'images/Admiral-Scheer.png'],
  'gascogne': ['images/FNFF-Gasgogne.jpg', 'images/wave.webp', 'images/FNFF-Gasgogne.jpg'],
  'shokaku': ['images/ijn-shokaku.jpg', 'images/wave.webp', 'images/ijn-shokaku.jpg'],
  'komsomolets': ['images/wowsL-Legends_Komsomolets.png', 'images/wave.webp', 'images/wowsL-Legends_Komsomolets.png'],
  'wave': ['images/wave.webp', 'images/wave.webp', 'images/wave.webp']
};


const galleryState = {
  currentShipImages: [],
  currentImageIndex: 0,
  modal: null,
  modalImage: null,
  init() {
    this.modal = document.getElementById('gallery-modal');
    this.modalImage = document.getElementById('modal-image');
  }
};

function openGallery(shipId) {
  const fallbackImage = (() => {
    const card = document.getElementById(shipId);
    const img = card?.querySelector('img');
    return img?.getAttribute('src') || 'images/wave.webp';
  })();

  const images = shipGalleryImages[shipId] || [fallbackImage, fallbackImage, fallbackImage];
  galleryState.currentShipImages = images;
  galleryState.currentImageIndex = 0;
  
  updateGalleryImage();
  galleryState.modal.classList.add('active');
}

function closeGallery() {
  galleryState.modal.classList.remove('active');
}

function updateGalleryImage() {
  if (galleryState.currentShipImages && galleryState.currentShipImages.length > 0) {
    galleryState.modalImage.src = galleryState.currentShipImages[galleryState.currentImageIndex];
  }
}

function previousImage() {
  if (galleryState.currentShipImages) {
    galleryState.currentImageIndex = (galleryState.currentImageIndex - 1 + galleryState.currentShipImages.length) % galleryState.currentShipImages.length;
    updateGalleryImage();
  }
}

function nextImage() {
  if (galleryState.currentShipImages) {
    galleryState.currentImageIndex = (galleryState.currentImageIndex + 1) % galleryState.currentShipImages.length;
    updateGalleryImage();
  }
}

function initializeStats() {
  const shipCards = document.querySelectorAll('.ship-card');
  const powerChart = document.getElementById('power-chart');
  const armorChart = document.getElementById('armor-chart');
  const speedChart = document.getElementById('speed-chart');
  
  let shipData = [];
  
  shipCards.forEach(card => {
    const shipName = card.querySelector('h3')?.textContent || '';
    const stats = card.querySelectorAll('.stat');
    
    let power = 0, armor = 0, speed = 0;
    stats.forEach(stat => {
      const text = stat.textContent.toLowerCase();
      if (text.includes('puissance')) power = extractNumber(text);
      if (text.includes('armure')) armor = extractNumber(text);
      if (text.includes('vitesse')) speed = extractNumber(text);
    });
    
    shipData.push({ name: shipName, power, armor, speed });
  });
  
  
  if (powerChart) displayChart(powerChart, shipData, 'power');
  if (armorChart) displayChart(armorChart, shipData, 'armor');
  if (speedChart) displayChart(speedChart, shipData, 'speed');
}

function extractNumber(text) {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

function displayChart(chartElement, shipData, statType) {
  if (typeof Chart === 'undefined') return;
  
  let canvas = chartElement.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    chartElement.innerHTML = '';
    chartElement.appendChild(canvas);
  }
  
  
  const chartInstance = typeof Chart.getChart === 'function' ? Chart.getChart(canvas) : null;
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  const labels = shipData.map(s => s.name);
  const data = shipData.map(s => s[statType]);
  const statLabels = { power: 'Puissance', armor: 'Armure', speed: 'Vitesse' };
  
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: statLabels[statType],
        data: data,
        backgroundColor: 'rgba(243, 156, 18, 0.7)',
        borderColor: '#f39c12',
        borderWidth: 2,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          labels: { color: '#f0f0f0', font: { size: 12 } }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: { color: '#f0f0f0' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        x: {
          ticks: { color: '#f0f0f0' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      }
    }
  });
}


function initializeSmoothScroll() {
  const menuLinks = document.querySelectorAll('.menu a');
  
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}


function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('section, .ship-card').forEach(el => {
    observer.observe(el);
  });
}


function initializeServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.log('SW registration failed:', err));
  }
}

function initializeBlog() {
  const blogCards = document.querySelectorAll('.blog-card');
  
  blogCards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.querySelector('.blog-link');
      if (link && link.href !== '#') {
        window.location.href = link.href;
      }
    });
    
    card.style.cursor = 'pointer';
  });
}


function initializeComparison() {
  const shipCards = document.querySelectorAll('.ship-card');
  const shipSelects = document.querySelectorAll('.ship-select');
  const resetBtn = document.getElementById('reset-comparison');
  
 
  shipSelects.forEach(select => {
    shipCards.forEach(card => {
      const shipName = card.querySelector('h3').textContent;
      const option = document.createElement('option');
      option.value = card.id;
      option.textContent = shipName;
      select.appendChild(option);
    });
    
    select.addEventListener('change', updateComparison);
  });
  
  resetBtn.addEventListener('click', () => {
    shipSelects.forEach(select => select.value = '');
    document.getElementById('comparison-table').style.display = 'none';
  });
}

function updateComparison() {
  const shipSelects = document.querySelectorAll('.ship-select');
  const selectedShips = [];
  
  shipSelects.forEach((select, index) => {
    if (select.value) {
      const shipCard = document.getElementById(select.value);
      if (shipCard) {
        const stats = shipCard.querySelectorAll('.stat');
        selectedShips.push({
          index: index + 1,
          id: select.value,
          name: shipCard.querySelector('h3').textContent,
          country: shipCard.getAttribute('data-country'),
          type: stats[1]?.textContent.replace(/Type:/, '').trim() || '-',
          power: extractStars(stats[2]),
          armor: extractStars(stats[3]),
          speed: extractStars(stats[4])
        });
      }
    }
  });
  
  if (selectedShips.length > 0) {
    displayComparison(selectedShips);
  } else {
    document.getElementById('comparison-table').style.display = 'none';
  }
}

function extractStars(element) {
  if (!element) return 0;
  const text = element.textContent;
  const match = text.match(/⚡+/g);
  return match && match[0] ? match[0].length : 0;
}

function displayComparison(ships) {
  const table = document.getElementById('comparison-table');
  
  
  for (let i = 1; i <= 3; i++) {
    const header = document.getElementById(`ship-col-${i}`);
    const ship = ships.find(s => s.index === i);
    header.textContent = ship ? ship.name : '-';
    header.style.color = ship ? '#f39c12' : '#666';
  }
  
  
  for (let i = 1; i <= 3; i++) {
    const ship = ships.find(s => s.index === i);
    
    // Country avec drapeau
    const countryElement = document.getElementById(`country-${i}`);
    if (ship) {
      const flags = {
        'allemagne': '🇩🇪',
        'france': '🇫🇷',
        'japon': '🇯🇵',
        'usa': '🇺🇸',
        'uk': '🇬🇧',
        'urss': '🇷🇺',
        'pays-bas': '🇳🇱'
      };
      const flag = flags[ship.country] || '';
      countryElement.textContent = flag + ' ' + ship.country.toUpperCase();
    } else {
      countryElement.textContent = '-';
    }
    
    
    document.getElementById(`type-${i}`).textContent = ship ? ship.type : '-';
    
    
    document.getElementById(`power-${i}`).textContent = ship && typeof ship.power === 'number' && ship.power > 0 ? '⚡'.repeat(ship.power) : '-';
    
    
    document.getElementById(`armor-${i}`).textContent = ship && typeof ship.armor === 'number' && ship.armor > 0 ? '🛡️' + '⚡'.repeat(ship.armor) : '-';
    
    
    document.getElementById(`speed-${i}`).textContent = ship && typeof ship.speed === 'number' && ship.speed > 0 ? '⚡'.repeat(ship.speed) : '-';
  }
  
  table.style.display = 'block';
  table.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


function initializeViewerWhenReady() {
  const ready = window.__threeReady;
  if (ready && typeof ready.then === 'function') {
    ready.then(() => initializeViewer()).catch(() => initializeViewer());
  } else {
    initializeViewer();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎮 Initializing World of Warships Fan Site...');
  
  try {
    galleryState.init();
    initializeDarkMode();
    initializeViewerWhenReady();
    initializeSearch();
    initializeShipCards();
    initializeGalleryModal();
    initializeComparison();
    initializeStats();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeBlog();
    initializeEmailContact();
    initializeServiceWorker();
    console.log('✅ All features initialized!');
  } catch (error) {
    console.error('❌ Initialization error:', error);
  }
});

// ===== Email Contact Handler =====
function initializeEmailContact() {
  const emailLink = document.querySelector('.email-link');
  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      // Ouvrir un formulaire de contact ou rediriger vers email
      const subject = encodeURIComponent('Contact depuis le site World of Warships');
      const body = encodeURIComponent('Bonjour,\n\nJ\'aimerais te contacter concernant...\n\n');
      window.location.href = `mailto:yugos@gmail.com?subject=${subject}&body=${body}`;
    });
  }
}
