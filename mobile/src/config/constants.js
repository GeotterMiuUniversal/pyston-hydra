export const CONFIG = {
  WHATSAPP_NUMBER: '584123456789',
  BUSINESS_NAME: 'PYSTON HYDRA',
  CITY: 'Barquisimeto',
  ADDRESS: 'Barquisimeto, Estado Lara, Venezuela',
  HOURS: 'Lun – Vie 8:00 AM – 6:00 PM · Sáb 8:00 AM – 1:00 PM',
  MAPS_URL: 'https://maps.google.com/?q=Barquisimeto,+Estado+Lara,+Venezuela',
  WAZE_URL: 'https://waze.com/ul?ll=10.0695,-69.3427&navigate=yes',
};

export const REPAIR_STATUS = {
  DIAGNOSIS: { key: 'diagnosis', label: 'En diagnóstico', color: '#f0b429' },
  WAITING_PARTS: { key: 'waiting_parts', label: 'Esperando repuesto', color: '#e5534b' },
  IN_REPAIR: { key: 'in_repair', label: 'En reparación', color: '#4da3ff' },
  READY: { key: 'ready', label: 'Listo para entrega', color: '#6fdc8c' },
};

export const SERVICES = [
  {
    id: 'mantenimiento',
    name: 'Mantenimiento General Preventivo',
    price: '$35 – $50',
    description: 'Limpieza de carburador, ajuste de guayas, frenos, lubricación de cadena y escaneo técnico.',
  },
  {
    id: 'aceite',
    name: 'Cambio de Aceite Sintético + Filtro',
    price: '$15 – $25',
    description: 'Aceite sintético premium, filtro nuevo y revisión de 15 puntos.',
  },
  {
    id: 'inyectores',
    name: 'Limpieza y Calibración de Inyectores',
    price: '$20 – $30',
    description: 'Lavado por ultrasonido y calibración electrónica.',
  },
  {
    id: 'motor',
    name: 'Overhaul de Motor Completo',
    price: 'Desde $150',
    description: 'Desarme, rectificado y ensamblaje con componentes de primera.',
  },
  {
    id: 'electrico',
    name: 'Sistema Eléctrico & Diagnóstico',
    price: '$20 – $35',
    description: 'Escaneo OBD, análisis de sensores y cableado completo.',
  },
  {
    id: 'suspension',
    name: 'Suspenciones y Frenos ABS',
    price: '$30 – $45',
    description: 'Regulación de suspensión, purgado ABS y pastillas cerámicas.',
  },
];

export const PARTS_CATEGORIES = [
  { id: 'filtros', name: 'Filtros & Kits', meta: 'Aire · Aceite · Combustible' },
  { id: 'frenos', name: 'Frenos', meta: 'Pastillas · Discos · ABS' },
  { id: 'aceites', name: 'Aceites Sintéticos', meta: '10W-40 · 15W-50 · 20W-50' },
  { id: 'llantas', name: 'Llantas', meta: 'Deportivas · Dual Sport' },
  { id: 'electrico', name: 'Eléctrico', meta: 'CDI · Bobinas · Baterías' },
  { id: 'accesorios', name: 'Accesorios', meta: 'Protección · Estilo · Touring' },
];
