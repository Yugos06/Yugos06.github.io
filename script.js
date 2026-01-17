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
  galleryState.currentShipImages = [
    `images/${shipId}.png`,
    `images/wave.png`,
    `images/${shipId}.png` // Repeat for demo
  ];
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
  chartElement.innerHTML = '';
  const maxValue = Math.max(...shipData.map(s => s[statType]));
  
  shipData.forEach(ship => {
    const value = ship[statType];
    const percentage = (value / maxValue) * 100;
    
    const barContainer = document.createElement('div');
    barContainer.style.marginBottom = '8px';
    barContainer.style.fontSize = '0.8rem';
    
    const label = document.createElement('div');
    label.textContent = `${ship.name}: ${value}`;
    label.style.marginBottom = '4px';
    
    const bar = document.createElement('div');
    bar.style.width = '100%';
    bar.style.height = '20px';
    bar.style.background = 'rgba(52, 152, 219, 0.3)';
    bar.style.borderRadius = '4px';
    bar.style.overflow = 'hidden';
    
    const fill = document.createElement('div');
    fill.style.width = percentage + '%';
    fill.style.height = '100%';
    fill.style.background = 'linear-gradient(90deg, #f39c12, #e67e22)';
    fill.style.transition = 'width 0.5s ease';
    
    bar.appendChild(fill);
    barContainer.appendChild(label);
    barContainer.appendChild(bar);
    chartElement.appendChild(barContainer);
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

// ===== Init All =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎮 Initializing World of Warships Fan Site...');
  
  try {
    galleryState.init();
    initializeDarkMode();
    initializeSearch();
    initializeShipCards();
    initializeGalleryModal();
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
