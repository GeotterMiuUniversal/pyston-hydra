const DEFAULT_DATA = {
  negocio: {
    nombre: 'PYSTON HYDRA',
    ciudad: 'Barquisimeto',
    estado: 'Estado Lara',
    pais: 'Venezuela',
    direccion: 'Barquisimeto, Estado Lara, Venezuela',
    whatsapp: '584129430088',
    horarios: [
      { dias: 'Lunes a Viernes', horario: '8:00 AM – 6:00 PM' },
      { dias: 'Sábado', horario: '8:00 AM – 1:00 PM' },
      { dias: 'Domingo', horario: 'Cerrado' },
    ],
  },
  servicios: [
    { id: 'mantenimiento', nombre: 'Mantenimiento General Preventivo', precio: { min: 35, max: 50 }, descripcion: 'Limpieza de carburador/cuerpo de aceleración, ajuste de guayas, frenos, lubricación de cadena y escaneo técnico completo.' },
    { id: 'aceite', nombre: 'Cambio de Aceite Sintético + Filtro + Revisión 15 Puntos', precio: { min: 15, max: 25 }, descripcion: 'Aceite sintético premium, filtro nuevo y revisión de 15 puntos de seguridad.' },
    { id: 'inyectores', nombre: 'Limpieza y Calibración de Inyectores (Ultrasonido)', precio: { min: 20, max: 30 }, descripcion: 'Lavado por ultrasonido, prueba de caudal y calibración electrónica.' },
    { id: 'motor', nombre: 'Reparación / Overhaul de Motor Completo', precio: { desde: 150 }, descripcion: 'Desarme, rectificado, ajuste de tolerancias y ensamblaje con componentes de primera.' },
    { id: 'electrico', nombre: 'Sistema Eléctrico & Diagnóstico Computarizado', precio: { min: 20, max: 35 }, descripcion: 'Escaneo OBD, análisis de sensores, bobinas, CDI y cableado completo.' },
    { id: 'suspension', nombre: 'Servicio Premium Suspenciones y Frenos ABS', precio: { min: 30, max: 45 }, descripcion: 'Regulación de suspensión, purgado ABS y pastillas cerámicas.' },
  ],
  categorias: [
    { id: 'filtros', nombre: 'Filtros & Kits', detalle: 'Aire · Aceite · Combustible' },
    { id: 'frenos', nombre: 'Frenos', detalle: 'Pastillas · Discos · ABS' },
    { id: 'aceites', nombre: 'Aceites Sintéticos', detalle: '10W-40 · 15W-50 · 20W-50' },
    { id: 'llantas', nombre: 'Llantas', detalle: 'Deportivas · Dual Sport' },
    { id: 'electrico', nombre: 'Eléctrico', detalle: 'CDI · Bobinas · Baterías' },
    { id: 'accesorios', nombre: 'Accesorios', detalle: 'Protección · Estilo · Touring' },
  ],
  repuestos: [
    { id: 'filtro-aire-kn', nombre: 'Filtro de aire deportivo', marca: 'K&N', precio: { desde: 38 }, categoria: 'filtros', modelos: 'Universal' },
    { id: 'pastillas-brembo', nombre: 'Pastillas de freno cerámicas', marca: 'Brembo', precio: { desde: 45 }, categoria: 'frenos', modelos: 'Honda CB · Yamaha MT' },
    { id: 'aceite-motul', nombre: 'Aceite sintético 10W-40 (1L)', marca: 'Motul', precio: { desde: 14 }, categoria: 'aceites', modelos: 'Universal' },
    { id: 'llanta-pirelli', nombre: 'Llanta deportiva 120/70-17', marca: 'Pirelli', precio: { desde: 120 }, categoria: 'llantas', modelos: 'Deportivas 600cc' },
    { id: 'bateria-litio', nombre: 'Batería de litio 12V', marca: 'Shorai', precio: { desde: 95 }, categoria: 'electrico', modelos: 'Universal' },
    { id: 'kit-cadena', nombre: 'Kit cadena + corona', marca: 'DID', precio: { desde: 85 }, categoria: 'accesorios', modelos: 'CB650R · MT-07' },
  ],
  grua: { zona: 'Barquisimeto y alrededores', precio: { texto: 'Consultar según distancia' }, disponible: true, horario: '24 horas' },
};

const DATA_URL = 'precios.json';

function digits(value) {
  return String(value || '').replace(/\D/g, '');
}

function currency(value) {
  return `$${Number(value).toLocaleString('es-VE')}`;
}

const PRICING = {
  data: DEFAULT_DATA,
  source: 'fallback',

  formatPrice(value) {
    if (value === null || value === undefined || value === '') return 'Consultar';
    if (typeof value === 'number') return currency(value);
    if (typeof value === 'string') return value;
    if (value.texto) return value.texto;
    if (value.desde !== undefined && value.desde !== null) return `Desde ${currency(value.desde)}`;
    if (value.hasta !== undefined && value.hasta !== null) return `Hasta ${currency(value.hasta)}`;
    if (value.min !== undefined && value.max !== undefined) return `${currency(value.min)} – ${currency(value.max)}`;
    if (value.min !== undefined) return `Desde ${currency(value.min)}`;
    return 'Consultar';
  },

  async load() {
    try {
      const res = await fetch(`${DATA_URL}?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data || !Array.isArray(data.servicios)) throw new Error('JSON invalido');
      PRICING.data = data;
      PRICING.source = 'precios.json';
    } catch (error) {
      PRICING.data = DEFAULT_DATA;
      PRICING.source = 'fallback';
      console.warn('No se pudo cargar precios.json, se usan valores por defecto.', error.message);
    }
    return PRICING.data;
  },

  get negocio() {
    return PRICING.data.negocio || DEFAULT_DATA.negocio;
  },

  get servicios() {
    return (PRICING.data.servicios || []).filter((s) => s.activo !== false);
  },

  get repuestos() {
    return PRICING.data.repuestos || [];
  },

  get categorias() {
    return PRICING.data.categorias || [];
  },

  get whatsapp() {
    return digits(PRICING.negocio.whatsapp) || digits(DEFAULT_DATA.negocio.whatsapp);
  },

  servicioById(id) {
    return PRICING.servicios.find((s) => s.id === id);
  },

  formatPhone() {
    const d = PRICING.whatsapp;
    return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
  },

  link(message) {
    return `https://wa.me/${PRICING.whatsapp}?text=${encodeURIComponent(message)}`;
  },

  serviceMessage(serviceName) {
    return `Hola ${PRICING.negocio.nombre || 'PYSTON HYDRA'}, me interesa el servicio de ${serviceName} para mi moto [Modelo/Año]. Quisiera agendar una revisión en su taller de ${PRICING.negocio.ciudad || 'Barquisimeto'}.`;
  },

  genericMessage() {
    return `Hola ${PRICING.negocio.nombre || 'PYSTON HYDRA'}, quisiera información sobre sus servicios para mi motocicleta. Me interesa agendar una revisión en su taller de ${PRICING.negocio.ciudad || 'Barquisimeto'}.`;
  },

  partMessage(part) {
    return `Hola ${PRICING.negocio.nombre || 'PYSTON HYDRA'}, me interesa el repuesto "${part.nombre}" (${part.marca}) para mi moto. ¿Disponibilidad y precio final?`;
  },

  renderPrices() {
    document.querySelectorAll('[data-price-for]').forEach((el) => {
      const svc = PRICING.servicioById(el.dataset.priceFor);
      if (svc) el.textContent = PRICING.formatPrice(svc.precio);
    });

    document.querySelectorAll('[data-category-price]').forEach((el) => {
      const items = PRICING.repuestos.filter((p) => p.categoria === el.dataset.categoryPrice);
      if (!items.length) return;
      const lowest = items.reduce((min, p) => {
        const raw = p.precio && (p.precio.desde ?? p.precio.min);
        return Number(raw) < min ? Number(raw) : min;
      }, Infinity);
      el.textContent = isFinite(lowest) ? `Desde $${lowest.toLocaleString('es-VE')}` : '';
    });
  },

  renderHorarios() {
    const target = document.querySelector('[data-horarios]');
    const hours = PRICING.negocio.horarios || [];
    if (!target || !hours.length) return;
    target.innerHTML = hours
      .map((h) => `<span class="hours-row"><strong>${h.dias}</strong> · ${h.horario}</span>`)
      .join('');
  },

  renderPhone() {
    document.querySelectorAll('[data-phone-display]').forEach((el) => {
      el.textContent = PRICING.formatPhone();
    });
  },

  renderPartsCatalog(query = '') {
    const grid = document.getElementById('parts-catalog');
    if (!grid) return;
    const q = query.trim().toLowerCase();
    const items = PRICING.repuestos.filter((p) =>
      !q || `${p.nombre} ${p.marca} ${p.modelos} ${p.categoria}`.toLowerCase().includes(q)
    );

    if (!items.length) {
      grid.innerHTML = `<p class="parts-empty">Sin resultados para "${query}". Escribenos y lo conseguimos.</p>`;
      return;
    }

    grid.innerHTML = items
      .map(
        (p) => `
      <article class="part-item">
        <div class="part-item__top">
          <div>
            <h4 class="part-item__name">${p.nombre}</h4>
            <p class="part-item__meta">${p.marca} · ${p.modelos}</p>
          </div>
          <span class="part-item__price">${PRICING.formatPrice(p.precio)}</span>
        </div>
        <div class="part-item__foot">
          <span class="part-item__stock ${p.stock === false ? 'is-out' : ''}">${p.stock === false ? 'Bajo pedido' : 'En stock'}</span>
          <button class="part-item__btn" data-wa-part="${p.id}">Solicitar por WhatsApp</button>
        </div>
      </article>`
      )
      .join('');

    grid.querySelectorAll('[data-wa-part]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const part = PRICING.repuestos.find((p) => p.id === btn.dataset.waPart);
        if (part) window.open(PRICING.link(PRICING.partMessage(part)), '_blank', 'noopener');
      });
    });
  },

  apply() {
    document.querySelectorAll('[data-source]').forEach((el) => {
      el.textContent = PRICING.source === 'precios.json' ? 'precios.json' : 'valores locales';
    });
    PRICING.renderPrices();
    PRICING.renderHorarios();
    PRICING.renderPhone();

    const search = document.getElementById('parts-search');
    if (search) {
      search.addEventListener('input', (e) => PRICING.renderPartsCatalog(e.target.value));
    }
    PRICING.renderPartsCatalog();
  },
};

window.PRICING = PRICING;