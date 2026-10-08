# PYSTON HYDRA — App Móvil (React Native + Expo)

Aplicación del cliente para el taller PYSTON HYDRA (Barquisimeto, Venezuela).

## Funcionalidades

| Pantalla | Descripción |
|---|---|
| **Inicio** | Servicios y tarifas con solicitud directa por WhatsApp, accesos a rastreo y grúa. |
| **Mi Moto** | Expediente digital: historial de mantenimientos, kilometraje y próximas revisiones. |
| **Citas** | Agendar cita en el taller o solicitar Grúa / Auxilio Mecánico en Barquisimeto. |
| **Repuestos** | Catálogo con buscador por nombre, marca o modelo de moto. |
| **Rastreo** | Estatus de reparación en tiempo real: En diagnóstico → Esperando repuesto → En reparación → Listo para entrega. |

## Ejecutar en desarrollo

```bash
cd mobile
npm install
npx expo start
```

Escanea el código QR con Expo Go (Android/iOS) o presiona `a` / `i` para emuladores.

## Configuración

Edita `src/config/constants.js`:

- `WHATSAPP_NUMBER`: número del taller (código país + número, sin `+`).
- `SERVICES`: catálogo de servicios y precios.
- `PARTS_CATEGORIES`: categorías del catálogo de repuestos.
- `REPAIR_STATUS`: estados del flujo de reparación.

## Estructura

```
src/
├── theme/colors.js        # Paleta carbón + dorado, espaciados, radios
├── config/constants.js    # WhatsApp, servicios, repuestos, estados
├── components/            # PrimaryButton, ServiceCard, SearchBar, StatusBadge, BikeCard
├── screens/               # Home, BikeProfile, Booking, PartsCatalog, Tracking
└── navigation/            # Tabs + Stack (React Navigation)
```

## Notas de producción

- Reemplaza los datos mock (`MOCK_BIKES`, `MOCK_PARTS`, `MOCK_ORDERS`) por llamadas a tu backend (Firebase, Supabase o API propia).
- Para notificaciones push de estatus, integra Expo Notifications o Firebase Cloud Messaging.
