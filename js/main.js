const CONFIG = {
  WHATSAPP_NUMBER: '584129430088',
  BUSINESS_NAME: 'PYSTON HYDRA',
  CITY: 'Barquisimeto'
};

function buildWhatsAppUrl(message) {
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function serviceMessage(serviceName) {
  return `Hola ${CONFIG.BUSINESS_NAME}, me interesa el servicio de ${serviceName} para mi moto [Modelo/Año]. Quisiera agendar una revisión en su taller de ${CONFIG.CITY}.`;
}

function genericMessage() {
  return `Hola ${CONFIG.BUSINESS_NAME}, quisiera información sobre sus servicios para mi motocicleta. Me interesa agendar una revisión en su taller de ${CONFIG.CITY}.`;
}

function openWhatsApp(message) {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener');
}

document.querySelectorAll('[data-wa-service]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsApp(serviceMessage(el.dataset.waService));
  });
});

document.querySelectorAll('[data-wa-generic]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    openWhatsApp(genericMessage());
  });
});

const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
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

const counters = document.querySelectorAll('[data-count]');
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

counters.forEach((el) => counterObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
