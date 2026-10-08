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

Los **precios, servicios, repuestos, horarios y número de WhatsApp** NO están en el código.
Todo se lee del archivo `precios.json` publicado en GitHub Pages:

```
https://geottermiuuniversal.github.io/pyston-hydra/precios.json
```

- `src/config/constants.js` → URL del catálogo, estados de reparación y enlaces de mapas.
- `src/services/catalogApi.js` → descarga, normaliza y formatea el catálogo (con copia local de respaldo si no hay internet).
- `src/config/defaultCatalog.js` → copia local de respaldo (última versión conocida).
- `src/hooks/useCatalog.js` → hook React para leer el catálogo y refrescarlo.

Si editas `precios.json` en GitHub, la web y la app muestran los precios nuevos automáticamente.

## Estructura

```
src/
├── config/defaultCatalog.js  # Respaldo local del catálogo
├── config/constants.js       # URL del catálogo, estados, mapas
├── services/catalogApi.js    # Fetch + normalización + formateo de precios
├── hooks/useCatalog.js       # Hook de React para el catálogo
├── data/repairs.js           # Órdenes de reparación (mock hasta conectar backend)
├── theme/colors.js           # Paleta carbón + dorado
├── components/               # PrimaryButton, ServiceCard, SearchBar, StatusBadge, BikeCard
├── screens/                  # Home, BikeProfile, Booking, PartsCatalog, Tracking
└── navigation/               # Tabs + Stack (React Navigation)
```

## Notas de producción

- Reemplaza `src/data/repairs.js` (mocks) por tu backend: Firebase (Firestore + listeners en tiempo real) o una API propia.
- `useCatalog` ya está preparado: al conectar Firestore, sustituye `loadCatalog()` por la consulta al servidor.
- Para notificaciones push de estatus, integra Expo Notifications o Firebase Cloud Messaging.
