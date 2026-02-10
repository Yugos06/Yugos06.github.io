
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
  const viewerName = document.getElementById('viewer-name');
  const viewerType = document.getElementById('viewer-type');
  const viewerDesc = document.getElementById('viewer-desc');
  const viewerSelect = document.getElementById('viewer-select');
  const prevBtn = document.getElementById('viewer-prev');
  const nextBtn = document.getElementById('viewer-next');
  const tiltInput = document.getElementById('viewer-tilt');

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

  const applyAngle = value => {
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
      tiltInput.min = '0';
      tiltInput.max = `${Math.max(0, currentViews.length - 1)}`;
      tiltInput.step = '1';
      tiltInput.value = '0';
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
    setViews(ship.id, ship.image);
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
  
  let canvas = chartElement.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    chartElement.innerHTML = '';
    chartElement.appendChild(canvas);
  }
  
  
  const chartInstance = Chart.helpers.getChart(canvas);
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


document.addEventListener('DOMContentLoaded', () => {
  console.log('🎮 Initializing World of Warships Fan Site...');
  
  try {
    galleryState.init();
    initializeDarkMode();
    initializeViewer();
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
