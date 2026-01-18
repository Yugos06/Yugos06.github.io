// ===== Dark Mode =====
function initializeDarkMode() {
  const darkToggle = document.getElementById('dark-toggle');
  const html = document.documentElement;
  
  // Vérifier les préférences sauvegardées
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    html.setAttribute('data-theme', 'light');
    darkToggle.textContent = '☀️';
  }
  
  // Toggle dark mode
  darkToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    darkToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
  });
}

// ===== Search & Filter =====
function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const shipCards = document.querySelectorAll('.ship-card');
  let currentFilter = 'all';
  
  // Search in real-time
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterCards(searchTerm, currentFilter);
  });
  
  // Filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      const searchTerm = searchInput.value.toLowerCase();
      filterCards(searchTerm, currentFilter);
    });
  });
}

function filterCards(searchTerm, country) {
  const shipCards = document.querySelectorAll('.ship-card');
  
  shipCards.forEach(card => {
    const shipName = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const shipCountry = card.getAttribute('data-country') || '';
    
    // Search match
    const nameMatch = shipName.includes(searchTerm);
    
    // Country match
    const countryMatch = country === 'all' || shipCountry === country;
    
    // Show/hide card
    card.style.display = (nameMatch && countryMatch) ? 'flex' : 'none';
  });
}

// ===== Ship Card Interactions =====
function initializeShipCards() {
  const shipCards = document.querySelectorAll('.ship-card');
  
  shipCards.forEach(card => {
    // Click to expand/collapse
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
    
    // Keyboard navigation (Enter/Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('active');
      }
    });
    
    // Gallery button
    const galleryBtn = card.querySelector('.gallery-btn');
    if (galleryBtn) {
      galleryBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openGallery(card.id);
      });
    }
  });
}

// ===== Gallery Modal =====
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
  
  // Keyboard navigation
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

// Gallery state management
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
  // Exemple : 3 images par navire (à adapter selon les images réelles)
  const shipImages = {
    'bismarck': ['images/bismarck.png', 'images/wave.png', 'images/bismarck.png'],
    'yamato': ['images/yamato.png', 'images/wave.png', 'images/yamato.png'],
    'hood': ['images/hood.png', 'images/wave.png', 'images/hood.png'],
    'iowa': ['images/iowa.png', 'images/wave.png', 'images/iowa.png'],
    'richelieu': ['images/richelieu.png', 'images/wave.png', 'images/richelieu.png'],
    'prinz-eugen': ['images/prinz_eugen.png', 'images/wave.png', 'images/prinz_eugen.png'],
    'vladivostok': ['images/vladivostok.png', 'images/wave.png', 'images/vladivostok.png'],
    'prince-of-wales': ['images/prince_of_wales.png', 'images/wave.png', 'images/prince_of_wales.png'],
    'grober-kurfurst': ['images/grosser_kurfurst.png', 'images/wave.png', 'images/grosser_kurfurst.png'],
    'de-zeven-provincien': ['images/de_zeven_provincien.png', 'images/wave.png', 'images/de_zeven_provincien.png']
  };
  
  galleryState.currentShipImages = shipImages[shipId] || ['images/wave.png', 'images/wave.png', 'images/wave.png'];
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

// ===== Stats Visualization =====
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
  
  // Display stats (simple bar chart)
  if (powerChart) displayChart(powerChart, shipData, 'power');
  if (armorChart) displayChart(armorChart, shipData, 'armor');
  if (speedChart) displayChart(speedChart, shipData, 'speed');
}

function extractNumber(text) {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

function displayChart(chartElement, shipData, statType) {
  // Créer un canvas si nécessaire
  let canvas = chartElement.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    chartElement.innerHTML = '';
    chartElement.appendChild(canvas);
  }
  
  // Détruire le graphique existant s'il existe
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

// ===== Smooth Scroll for Navigation =====
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

// ===== Scroll Animations =====
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

// ===== Service Worker Registration (PWA) =====
function initializeServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.log('SW registration failed:', err));
  }
}

// ===== Blog Section Enhancement =====
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

// ===== Ship Comparison =====
function initializeComparison() {
  const shipCards = document.querySelectorAll('.ship-card');
  const shipSelects = document.querySelectorAll('.ship-select');
  const resetBtn = document.getElementById('reset-comparison');
  
  // Populate ship select dropdowns
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
  
  // Update table headers
  for (let i = 1; i <= 3; i++) {
    const header = document.getElementById(`ship-col-${i}`);
    const ship = ships.find(s => s.index === i);
    header.textContent = ship ? ship.name : '-';
    header.style.color = ship ? '#f39c12' : '#666';
  }
  
  // Update table data
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
    
    // Type
    document.getElementById(`type-${i}`).textContent = ship ? ship.type : '-';
    
    // Puissance
    document.getElementById(`power-${i}`).textContent = ship && typeof ship.power === 'number' && ship.power > 0 ? '⚡'.repeat(ship.power) : '-';
    
    // Armure
    document.getElementById(`armor-${i}`).textContent = ship && typeof ship.armor === 'number' && ship.armor > 0 ? '🛡️' + '⚡'.repeat(ship.armor) : '-';
    
    // Vitesse
    document.getElementById(`speed-${i}`).textContent = ship && typeof ship.speed === 'number' && ship.speed > 0 ? '⚡'.repeat(ship.speed) : '-';
  }
  
  table.style.display = 'block';
  table.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== Init All =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎮 Initializing World of Warships Fan Site...');
  
  try {
    galleryState.init();
    initializeDarkMode();
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
      window.location.href = `mailto:yugos@example.com?subject=${subject}&body=${body}`;
    });
  }
}
