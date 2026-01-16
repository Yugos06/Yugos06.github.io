document.addEventListener('DOMContentLoaded', function() {
  initializeShipCards();
  initializeSmoothScroll();
});

function initializeShipCards() {
  const shipCards = document.querySelectorAll('.ship-card');
  
  shipCards.forEach(card => {
    card.addEventListener('click', function() {
      toggleShipCard(this);
    });

    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleShipCard(this);
      }
    });
  });
}

function toggleShipCard(card) {
  const shipCards = document.querySelectorAll('.ship-card');
  
  shipCards.forEach(c => {
    if (c !== card) {
      c.classList.remove('active');
    }
  });
  
  card.classList.toggle('active');
}

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          target.focus();
        }
      }
    });
  });
}
