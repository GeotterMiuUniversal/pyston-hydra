# PYSTON HYDRA — Landing Page

Plataforma digital para **PYSTON HYDRA**, taller de motos de alta gama y venta de repuestos exclusivos ubicado en **Barquisimeto, Estado Lara, Venezuela**.

> Ingeniería, Evolución y Rendimiento para tu Motocicleta.

---

## Características

- **Landing page responsiva** (Desktop + Mobile) con estética premium: tonos carbón oscuro, detalles dorados cepillados y tipografías elegantes (Cinzel + Manrope).
- **Catálogo de servicios con tarifas reales en USD** del mercado de Barquisimeto.
- **Integración dinámica con WhatsApp**: cada tarjeta de servicio abre WhatsApp con un mensaje predefinido que incluye el nombre del servicio.
- **Secciones**: Inicio (Hero), Servicios & Tarifas, Repuestos Exclusivos, Diagnóstico Express, Ubicación & Contacto.
- **Botones de navegación** Google Maps y Waze hacia Barquisimeto.
- Animaciones de aparición al hacer scroll, contadores animados, menú móvil y botón flotante de WhatsApp.

## Estructura del Proyecto

```
pyston-hydra/
├── index.html              # Landing page principal
├── css/
│   └── styles.css          # Estilos premium (carbón + dorado)
├── js/
│   └── main.js             # Lógica WhatsApp, menú móvil, animaciones
├── assets/
│   └── logo.svg            # Logo PYSTON HYDRA
├── mobile/                 # App móvil (React Native + Expo)
│   ├── App.js
│   ├── package.json
│   └── src/
│       ├── theme/          # Colores y estilos base
│       ├── config/         # Constantes (WhatsApp, API)
│       ├── components/     # Componentes UI reutilizables
│       ├── screens/        # Pantallas de la app
│        └── navigation/   # Navegación (tabs + stack)
└── README.md
```

## Despliegue en GitHub Pages

1. Sube este repositorio a tu cuenta de GitHub.
2. Ve a **Settings → Pages**.
3. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. Tu página estará disponible en:
   `https://<tu-usuario>.github.io/pyston-hydra/`

## Configuración Obligatoria: Número de WhatsApp

Abre `js/main.js` y reemplaza el número en el objeto `CONFIG`:

```js
const CONFIG = {
  WHATSAPP_NUMBER: '584123456789',  // ← Coloca tu número real (código país + número, sin "+")
  BUSINESS_NAME: 'PYSTON HYDRA',
  CITY: 'Barquisimeto'
};
```

Formato: código de país + número, solo dígitos. Ejemplo Venezuela: `58412XXXXXXX`.

## Formato del Mensaje de WhatsApp

Al hacer clic en **"Solicitar Servicio"**, se abre WhatsApp con:

> Hola PYSTON HYDRA, me interesa el servicio de **[Nombre del Servicio]** para mi moto **[Modelo/Año]**. Quisiera agendar una revisión en su taller de Barquisimeto.

## App Móvil (React Native + Expo)

La carpeta `mobile/` contiene la arquitectura base de la app del cliente:

- **Expediente Digital de la Moto**: historial de mantenimientos, kilometraje y próximas revisiones.
- **Solicitud de Citas y Grúa/Auxilio Mecánico** en Barquisimeto.
- **Catálogo de Repuestos** con buscador por modelo de moto.
- **Rastreo de estatus** de reparación en tiempo real (En diagnóstico → Esperando repuesto → Listo para entrega).

### Ejecutar la app

```bash
cd mobile
npm install
npx expo start
```

## Servicios y Tarifas (USD)

| Servicio | Precio |
|---|---|
| Mantenimiento General Preventivo | $35 – $50 |
| Cambio de Aceite Sintético + Filtro + Revisión 15 Puntos | $15 – $25 |
| Limpieza y Calibración de Inyectores (Ultrasonido) | $20 – $30 |
| Reparación / Overhaul de Motor Completo | Desde $150 |
| Sistema Eléctrico & Diagnóstico Computarizado | $20 – $35 |
| Servicio Premium Suspenciones y Frenos ABS | $30 – $45 |

## Contacto

- **Ubicación**: Barquisimeto, Estado Lara, Venezuela
- **Horarios**: Lun – Vie 8:00 AM – 6:00 PM · Sáb 8:00 AM – 1:00 PM
- **WhatsApp**: Configurable en `js/main.js`

---

© 2026 PYSTON HYDRA · Barquisimeto, Lara, Venezuela.
