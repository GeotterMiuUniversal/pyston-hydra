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

## ⭐ Cambiar precios: solo edita `precios.json`

**Un único archivo controla los precios de la web Y de la app móvil.** No hay que tocar código.

```
precios.json
├── negocio   → nombre, ciudad, dirección, WhatsApp, horarios
├── servicios → nombre, precio, duración, descripción
├── categorias→ filtros, frenos, aceites, llantas, eléctrico, accesorios
├── repuestos → nombre, marca, precio, categoría, modelos, stock
└── grua      → zona, disponibilidad, tarifa
```

Editas el archivo en GitHub → se actualiza la **web** y la **app** automáticamente.

### Formatos de precio admitidos

| En `precios.json` | Resultado en pantalla |
|---|---|
| `35` | `$35` |
| `"$35 – $50"` | `$35 – $50` |
| `{ "min": 35, "max": 50 }` | `$35 – $50` |
| `{ "desde": 150 }` | `Desde $150` |
| `{ "hasta": 45 }` | `Hasta $45` |
| `{ "texto": "Consultar" }` | `Consultar` |

### Ejemplo

```json
{
  "id": "aceite",
  "nombre": "Cambio de Aceite Sintético + Filtro + Revisión 15 Puntos",
  "precio": { "min": 15, "max": 25 },
  "duracion": "1 hora",
  "activo": true
}
```

> `activo: false` oculta el servicio sin borrarlo del archivo.

**Número de WhatsApp**: se cambia en `precios.json` → `negocio.whatsapp` (código de país + número, solo dígitos: `584129430088`).

## Estructura del Proyecto

```
pyston-hydra/
├── precios.json            # ⭐ FUENTE ÚNICA de precios y datos del negocio
├── index.html              # Landing page principal
├── css/
│   └── styles.css          # Estilos premium (carbón + dorado)
├── js/
│   ├── pricing.js          # Carga precios.json, formatea precios y crea enlaces de WhatsApp
│   └── main.js             # Menú móvil, animaciones, eventos
├── assets/
│   └── logo.svg            # Logo PYSTON HYDRA
├── mobile/                 # App móvil (React Native + Expo)
│   ├── App.js
│   ├── package.json
│   └── src/
│       ├── config/         # URL del catálogo + catálogo de respaldo
│       ├── services/       # catalogApi.js (fetch + formato de precios)
│       ├── hooks/          # useCatalog.js
│       ├── data/           # repairs.js (órdenes de reparación)
│       ├── theme/          # Colores y estilos base
│       ├── components/     # Componentes UI reutilizables
│       ├── screens/        # Pantallas de la app
│       └── navigation/     # Navegación (tabs + stack)
└── README.md
```

## Despliegue en GitHub Pages

1. Sube este repositorio a tu cuenta de GitHub.
2. Ve a **Settings → Pages**.
3. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. Tu página estará disponible en:
   `https://<tu-usuario>.github.io/pyston-hydra/`

## Configuración del Número de WhatsApp

Ya no se edita en el código. Define el número en `precios.json`:

```json
"negocio": {
  "whatsapp": "584129430088"
}
```

Formato: código de país + número, solo dígitos (sin `+`).

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
