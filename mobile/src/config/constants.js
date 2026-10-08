export const CONFIG = {
  REMOTE_CATALOG_URL:
    'https://geottermiuuniversal.github.io/pyston-hydra/precios.json',
  MAPS_URL: 'https://maps.google.com/?q=Barquisimeto,+Estado+Lara,+Venezuela',
  WAZE_URL: 'https://waze.com/ul?ll=10.0695,-69.3427&navigate=yes',
  POLL_MS: 15000,
};

export const REPAIR_STATUS = {
  DIAGNOSIS: { key: 'diagnosis', label: 'En diagnóstico', color: '#f0b429' },
  WAITING_PARTS: { key: 'waiting_parts', label: 'Esperando repuesto', color: '#e5534b' },
  IN_REPAIR: { key: 'in_repair', label: 'En reparación', color: '#4da3ff' },
  READY: { key: 'ready', label: 'Listo para entrega', color: '#6fdc8c' },
};

export const STATUS_FLOW = [
  REPAIR_STATUS.DIAGNOSIS,
  REPAIR_STATUS.WAITING_PARTS,
  REPAIR_STATUS.IN_REPAIR,
  REPAIR_STATUS.READY,
];