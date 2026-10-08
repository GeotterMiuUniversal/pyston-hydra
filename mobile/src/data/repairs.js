import { STATUS_FLOW, REPAIR_STATUS } from '../config/constants';

export const MOCK_ORDERS = [
  {
    id: 'PH-2026-0142',
    bike: 'Honda CB650R 2022',
    status: REPAIR_STATUS.IN_REPAIR,
    updated: 'Hace 2 horas',
    detail: 'Rectificado de cilindro en progreso. Entrega estimada: viernes.',
  },
  {
    id: 'PH-2026-0138',
    bike: 'Yamaha MT-07 2020',
    status: REPAIR_STATUS.WAITING_PARTS,
    updated: 'Ayer',
    detail: 'Esperando pastillas de freno ABS. Llegada estimada: mañana.',
  },
  {
    id: 'PH-2026-0129',
    bike: 'Honda CB650R 2022',
    status: REPAIR_STATUS.READY,
    updated: 'Hace 3 días',
    detail: 'Mantenimiento completado. Listo para retirar en el taller.',
  },
];

export const MOCK_BIKES = [
  { id: 1, model: 'Honda CB650R', year: 2022, plate: 'ABC123', mileage: 18450, nextService: '10,000 km · Aceite + Filtro' },
  { id: 2, model: 'Yamaha MT-07', year: 2020, plate: 'XYZ789', mileage: 32100, nextService: '35,000 km · Revisión completa' },
];

export const MOCK_HISTORY = [
  { date: '12 Sep 2026', service: 'Cambio de aceite sintético + filtro', cost: '$22', mileage: 18450 },
  { date: '28 Jul 2026', service: 'Limpieza y calibración de inyectores', cost: '$28', mileage: 16200 },
  { date: '10 May 2026', service: 'Mantenimiento preventivo general', cost: '$45', mileage: 13800 },
];

export function nextStatus(currentKey) {
  const index = STATUS_FLOW.findIndex((s) => s.key === currentKey);
  if (index < 0 || index === STATUS_FLOW.length - 1) return null;
  return STATUS_FLOW[index + 1];
}