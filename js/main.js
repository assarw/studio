// ── Navbar hide on scroll down ──
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastY = window.scrollY;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.style.top = (y > lastY && y > 80) ? '-80px' : '0';
    lastY = y;

    const btn = document.getElementById('back2Top');
    if (btn) btn.classList.toggle('visible', y > 380);
  }, { passive: true });
})();

// ── Back to top ──
(function () {
  const btn = document.getElementById('back2Top');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

// ── Staggered grid fade-in (startpage only) ──
(function () {
  const items = document.querySelectorAll('.grid-item');
  if (!items.length) return;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .grid-item { opacity: 0; }
  `;
  document.head.appendChild(style);

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeUp 0.45s ease ${i * 0.04}s both`;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  items.forEach(item => obs.observe(item));
})();

// ── Portfolio nav link scroll-to-grid ──
(function () {
  const link = document.getElementById('portfolioLink');
  const grid = document.getElementById('grid');
  if (link && grid) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      grid.scrollIntoView({ behavior: 'smooth' });
    });
  }
})();


const cursor = document.getElementById('cursor');

// Uppdatera positionen
document.addEventListener('mousemove', e => {
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

// Lägg till "hovered"-klassen på alla länkar och knappar
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});