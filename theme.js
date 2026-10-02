// ---------- Theme toggle: a circle of the new theme grows out from the button ----------
const root = document.documentElement;
const toggleBtn = document.querySelector('.theme-toggle');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function setTheme(t) {
  root.dataset.theme = t;
  localStorage.setItem('theme', t);
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const r = toggleBtn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => setTheme(next));
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      );
    });
  });
}

// ---------- Star background (hidden automatically in light mode by the CSS) ----------
const starsContainer = document.getElementById('stars');
const STAR_COUNT = 90;
if (starsContainer) {
  for (let i = 0; i < STAR_COUNT; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 1;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.top = Math.random() * 100 + '%';
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 3) + 's';
    s.style.animationDuration = (2 + Math.random() * 3) + 's';
    starsContainer.appendChild(s);
  }
}

// ---------- Active-section highlight in the nav (safe even while the nav is commented out) ----------
const sections = document.querySelectorAll('section.category');
const navLinks = document.querySelectorAll('nav.index a');
const map = {};
navLinks.forEach(l => map[l.getAttribute('href').slice(1)] = l);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = map[entry.target.id];
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-10% 0px -70% 0px', threshold: 0 });

sections.forEach(s => observer.observe(s));
