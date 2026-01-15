function toggleDesc(card) {
  document.querySelectorAll(".ship-card").forEach(c => {
    if (c !== card) c.classList.remove("active");
  });
  card.classList.toggle("active");
}
