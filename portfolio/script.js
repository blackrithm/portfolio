/* script.js — Portfolio interactions */

// ── Custom Cursor ──────────────────────────────────────────
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    cursorRing.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    cursorRing.classList.remove('hovered');
  });
});

// ── Mobile Nav Toggle ──────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Scroll Reveal ──────────────────────────────────────────
const revealEls     = document.querySelectorAll('.reveal');
const timelineItems = document.querySelectorAll('.timeline-item');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

[...revealEls, ...timelineItems].forEach(el => revealObserver.observe(el));

// ── Skill Bars ─────────────────────────────────────────────
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
      skillsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const skillsList = document.getElementById('skills-list');
if (skillsList) skillsObserver.observe(skillsList);

// ── Active Nav Highlight ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Navbar scroll shadow ───────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 4px 40px rgba(0,0,0,0.5)' : 'none';
}, { passive: true });

// ── Typed hero tag (optional flair) ───────────────────────
const heroTag = document.querySelector('.hero-tag');
if (heroTag) {
  const phrases = [
    'Software Engineer · Full Stack · Open to work',
    'TypeScript · React · Node.js · Go',
    'Building tools that developers love'
  ];
  let pi = 0, ci = 0, deleting = false;
  const typed = document.createElement('span');
  heroTag.textContent = '';
  heroTag.appendChild(typed);

  function typeLoop() {
    const phrase = phrases[pi];
    if (!deleting) {
      typed.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
    } else {
      typed.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(typeLoop, deleting ? 28 : 55);
  }
  setTimeout(typeLoop, 1400);
}
