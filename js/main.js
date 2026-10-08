const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

const closeMenu = () => {
  nav.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

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

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-wa-service]');
  if (!trigger) return;
  e.preventDefault();
  window.open(PRICING.link(PRICING.serviceMessage(resolveServiceName(trigger))), '_blank', 'noopener');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 0.08}s`;
  observer.observe(el);
});

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const duration = 1600;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString('es-VE');
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

PRICING.load().then(() => PRICING.apply());