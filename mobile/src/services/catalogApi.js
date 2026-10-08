import { CONFIG } from '../config/constants';
import { DEFAULT_CATALOG } from '../config/defaultCatalog';

let cache = null;
let inFlight = null;

function digits(value) {
  return String(value || '').replace(/\D/g, '');
}

function currency(value) {
  return `$${Number(value).toLocaleString('es-VE')}`;
}

export function formatPrice(value) {
  if (value === null || value === undefined || value === '') return 'Consultar';
  if (typeof value === 'number') return currency(value);
  if (typeof value === 'string') return value;
  if (value.texto) return value.texto;
  if (value.desde !== undefined && value.desde !== null) return `Desde ${currency(value.desde)}`;
  if (value.hasta !== undefined && value.hasta !== null) return `Hasta ${currency(value.hasta)}`;
  if (value.min !== undefined && value.max !== undefined) return `${currency(value.min)} – ${currency(value.max)}`;
  if (value.min !== undefined) return `Desde ${currency(value.min)}`;
  return 'Consultar';
}

function normalize(raw) {
  const data = raw && Array.isArray(raw.servicios) ? raw : DEFAULT_CATALOG;
  return {
    source: raw && Array.isArray(raw.servicios) ? 'precios.json' : 'local',
    negocio: data.negocio || DEFAULT_CATALOG.negocio,
    servicios: (data.servicios || [])
      .filter((s) => s.activo !== false)
      .map((s) => ({
        id: s.id,
        name: s.nombre,
        price: formatPrice(s.precio),
        duration: s.duracion || null,
        description: s.descripcion || '',
      })),
    repuestos: (data.repuestos || []).map((p) => ({
      id: p.id,
      name: p.nombre,
      brand: p.marca || '',
      price: formatPrice(p.precio),
      category: p.categoria || '',
      models: p.modelos || 'Universal',
      inStock: p.stock !== false,
    })),
    categorias: data.categorias || DEFAULT_CATALOG.categorias,
    grua: data.grua || DEFAULT_CATALOG.grua,
  };
}

export async function loadCatalog({ force = false } = {}) {
  if (cache && !force) return cache;
  if (inFlight) return inFlight;

  inFlight = fetch(`${CONFIG.REMOTE_CATALOG_URL}?t=${Date.now()}`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((json) => {
      cache = normalize(json);
      return cache;
    })
    .catch(() => {
      cache = normalize(DEFAULT_CATALOG);
      cache.offline = true;
      return cache;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}

export function getCachedCatalog() {
  return cache;
}

export function whatsAppLink(message, catalog) {
  const numero = digits(catalog?.negocio?.whatsapp) || digits(DEFAULT_CATALOG.negocio.whatsapp);
  const negocio = catalog?.negocio || DEFAULT_CATALOG.negocio;
  const texto = message(negocio);
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

export const messages = {
  servicio: (negocio, serviceName) =>
    `Hola ${negocio.nombre || 'PYSTON HYDRA'}, me interesa el servicio de ${serviceName} para mi moto [Modelo/Año]. Quisiera agendar una revisión en su taller de ${negocio.ciudad || 'Barquisimeto'}.`,
  general: (negocio) =>
    `Hola ${negocio.nombre || 'PYSTON HYDRA'}, quisiera información sobre sus servicios para mi motocicleta. Me interesa agendar una revisión en su taller de ${negocio.ciudad || 'Barquisimeto'}.`,
  repuesto: (negocio, part) =>
    `Hola ${negocio.nombre || 'PYSTON HYDRA'}, me interesa el repuesto "${part.name}" (${part.brand}) para mi moto. ¿Disponibilidad y precio final?`,
  cita: (negocio, serviceName, modelo, fecha) =>
    `Hola ${negocio.nombre || 'PYSTON HYDRA'}, quisiera agendar cita para ${serviceName}. Moto: ${modelo || '[Modelo/Año]'}. Fecha preferida: ${fecha || '[Indicar fecha]'}.`,
  grua: (negocio, ubicacion, modelo) =>
    `Hola ${negocio.nombre || 'PYSTON HYDRA'}, necesito Grúa / Auxilio Mecánico en ${negocio.ciudad || 'Barquisimeto'}. Moto: ${modelo || '[Modelo/Año]'}. Ubicación: ${ubicacion || '[Indicar dirección]'}.`,
};