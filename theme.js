   

   // starFunction background
  const starsContainer = document.getElementById('stars');
  const STAR_COUNT = 90;
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

  // active-section highlight in the nav (safe to leave in even while nav is commented out)
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
