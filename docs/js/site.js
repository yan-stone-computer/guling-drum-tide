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

const lookbook = document.querySelector('[data-lookbook]');
const lookCards = [...document.querySelectorAll('.look')];
const prevButton = document.querySelector('[data-lookbook-prev]');
const nextButton = document.querySelector('[data-lookbook-next]');
const currentLabel = document.querySelector('[data-lookbook-current]');

function nearestLookIndex() {
  let nearest = 0;
  let nearestDistance = Infinity;
  const start = parseFloat(getComputedStyle(lookbook).paddingLeft);
  lookCards.forEach((card, index) => {
    const distance = Math.abs(card.offsetLeft - lookbook.scrollLeft - start);
    if (distance < nearestDistance) {
      nearest = index;
      nearestDistance = distance;
    }
  });
  return nearest;
}

function updateLookbook() {
  const maxScroll = lookbook.scrollWidth - lookbook.clientWidth;
  prevButton.disabled = lookbook.scrollLeft < 8;
  nextButton.disabled = lookbook.scrollLeft >= maxScroll - 8;
  const nearest = nearestLookIndex();
  currentLabel.textContent = String(nearest + 1).padStart(2, '0');
}

function scrollLookbook(direction) {
  const targetIndex = Math.max(0, Math.min(lookCards.length - 1, nearestLookIndex() + direction));
  const card = lookCards[targetIndex];
  const start = parseFloat(getComputedStyle(lookbook).paddingLeft);
  lookbook.scrollTo({
    left: card.offsetLeft - start,
    behavior: reduceMotion ? 'auto' : 'smooth'
  });
}

prevButton.addEventListener('click', () => scrollLookbook(-1));
nextButton.addEventListener('click', () => scrollLookbook(1));
lookbook.addEventListener('scrollend', updateLookbook);
lookbook.addEventListener('scroll', () => {
  window.clearTimeout(lookbook.scrollTimer);
  lookbook.scrollTimer = window.setTimeout(updateLookbook, 90);
}, { passive: true });
updateLookbook();

const lookDialog = document.querySelector('[data-look-dialog]');
const dialogImage = document.querySelector('[data-look-dialog-image]');
const dialogMark = document.querySelector('[data-look-dialog-mark]');
const dialogSeason = document.querySelector('[data-look-dialog-season]');
const dialogWorld = document.querySelector('[data-look-dialog-world]');
const dialogTitle = document.querySelector('[data-look-dialog-title]');
const dialogCopy = document.querySelector('[data-look-dialog-copy]');
const dialogDetail = document.querySelector('[data-look-dialog-detail]');

document.querySelectorAll('[data-look-image]').forEach((button) => {
  button.addEventListener('click', () => {
    dialogImage.src = button.dataset.lookImage;
    dialogImage.alt = button.querySelector('img')?.alt || '';
    dialogMark.src = button.dataset.lookMark;
    dialogSeason.textContent = button.dataset.lookSeason;
    dialogWorld.textContent = button.dataset.lookWorld;
    dialogTitle.textContent = button.dataset.lookTitle;
    dialogCopy.textContent = button.dataset.lookCopy;
    dialogDetail.textContent = button.dataset.lookDetail;
    lookDialog.showModal();
  });
});

document.querySelector('[data-close-look-dialog]').addEventListener('click', () => lookDialog.close());
lookDialog.addEventListener('click', (event) => {
  if (event.target === lookDialog) lookDialog.close();
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
