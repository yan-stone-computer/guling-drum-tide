const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileMenu.hidden = !open;
  document.body.style.overflow = open ? 'hidden' : '';
  menuToggle.querySelector('.sr-only').textContent = open ? '关闭菜单' : '打开菜单';
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileMenu.hidden) {
    setMenu(false);
    menuToggle.focus();
  }
});

const revealItems = document.querySelectorAll('[data-reveal]');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const mapExplorer = document.querySelector('[data-map-explorer]');
const mapPanel = document.querySelector('#map-panel');
const mapImage = document.querySelector('[data-map-image]');
const mapBadge = document.querySelector('[data-map-badge]');
const mapTitle = document.querySelector('[data-map-title]');
const mapCopy = document.querySelector('[data-map-copy]');
const mapTabs = [...document.querySelectorAll('[role="tab"]')];

function selectMap(tab) {
  if (tab.getAttribute('aria-selected') === 'true') return;

  mapTabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  mapPanel.setAttribute('aria-labelledby', tab.id);

  mapExplorer.classList.add('is-changing');
  window.setTimeout(() => {
    mapImage.src = tab.dataset.mapImageSrc;
    mapImage.alt = tab.dataset.mapImageAlt;
    mapBadge.textContent = tab.dataset.mapBadge;
    mapTitle.textContent = tab.dataset.mapTitle;
    mapCopy.textContent = tab.dataset.mapCopy;
    mapExplorer.classList.remove('is-changing');
  }, reduceMotion ? 0 : 140);
}

mapTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectMap(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowLeft') next = (index - 1 + mapTabs.length) % mapTabs.length;
    if (event.key === 'ArrowRight') next = (index + 1) % mapTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = mapTabs.length - 1;
    mapTabs[next].focus();
    selectMap(mapTabs[next]);
  });
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
