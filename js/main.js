const header = document.getElementById('header');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const hamburger = document.getElementById('hamburger');

const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

function openMenu() {
  sidebar.classList.add('open');
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add('open'));
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  setTimeout(() => {
    if (!sidebar.classList.contains('open')) overlay.hidden = true;
  }, 350);
}

function showSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  document.querySelectorAll('.section-content').forEach((sec) => sec.classList.remove('active'));
  target.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.target === id);
  });

  scrollToTopInstant();
  closeMenu();
}

function scrollToTopInstant() {
  const root = document.documentElement;
  const prev = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  root.style.scrollBehavior = prev;
}

hamburger.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

document.querySelectorAll('.nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => showSection(btn.dataset.target));
});

document.querySelectorAll('[data-go]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(el.dataset.go);
  });
});

function resolveServiceName(el) {
  const id = el.dataset.waServiceId;
  const svc = id && PRICING.servicioById(id);
  return svc ? svc.nombre : el.dataset.waService;
}

document.querySelectorAll('[data-wa-service]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(PRICING.link(PRICING.serviceMessage(resolveServiceName(el))), '_blank', 'noopener');
  });
});

document.querySelectorAll('[data-wa-generic]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(PRICING.link(PRICING.genericMessage()), '_blank', 'noopener');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

PRICING.apply();
PRICING.load().then(() => PRICING.apply());
