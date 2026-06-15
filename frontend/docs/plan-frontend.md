# Plan de trabajo — Frontend Clima App

## Reglas

- Cada paso tiene un objetivo claro y una validación concreta.
- Se avanza solo cuando el paso anterior está verificado.
- Las decisiones quedan registradas aquí.
- No se salta código sin entenderlo.

---

## Pasos

### [x] Paso 1 — Limpiar plantilla base de Vite

**Objetivo:** Partir de un lienzo limpio, sin el contenido por defecto de Vite.

**Cambios:**
- `App.jsx` pasó de 56 líneas (contador, logos, enlaces) a 9 líneas (solo `<h1>Clima App</h1>`)
- `App.css` pasó de ~230 líneas (estilos de la plantilla) a 10 líneas (flexbox centrado + título)
- Se eliminaron `hero.png`, `react.svg`, `vite.svg` de `assets/`
- Se eliminaron imports innecesarios (`useState`, imágenes)

**Validación:** La app muestra solo "Clima App" centrado en la pantalla. Sin logos, sin contador, sin enlaces.

**Decisión:** Se mantiene `index.css` y `main.jsx` intactos. La carpeta `assets/` se conserva vacía para usos futuros (íconos del clima, logo propio).

---

### [x] Paso 2 — Crear `services/climaService.js`

**Objetivo:** Tener una función que llame al backend y devuelva datos del clima.

**Qué hacer:**
- Crear `src/services/climaService.js`
- Implementar `obtenerClimaPorCiudad(ciudad)` que hace fetch a `GET /clima?ciudad=...`
- Implementar `obtenerClimaPorCoordenadas(latitud, longitud)` que hace fetch a `GET /clima?latitud=...&longitud=...`
- Se extrajo `consultarClima(url)` como función interna para evitar duplicar fetch + error + parse
- Se usó `URLSearchParams` para construir query params

**Validación:** Desde la consola del navegador se importó el servicio y se llamó a `obtenerClimaPorCiudad("Managua")`, obteniendo respuesta JSON exitosa.

**Problema resuelto:** Error de CORS. Se configuró `cors` en el backend para aceptar peticiones desde el origen del frontend.

---

### [ ] Paso 3 — Crear `hooks/useClima.js`

**Objetivo:** Extraer la lógica de estado (loading, data, error) a un hook reutilizable.

**Responsabilidades:**
- Exponer `consultarPorCiudad(ciudad)` y `consultarPorCoordenadas(lat, lon)`
- Manejar estados `{ data, loading, error }` con `useState`
- El hook no sabe de HTML ni de componentes, solo de estado y efectos

---

### [ ] Paso 4 — Crear `components/SearchForm.jsx`

**Objetivo:** Formulario que capture ciudad o coordenadas y lo comunique hacia arriba.

**Responsabilidades:**
- Input para ciudad (texto)
- Inputs para latitud y longitud (number)
- Botón "Consultar"
- Recibe `onSubmit(tipo, valor)` — solo emite eventos, no llama al backend

---

### [ ] Paso 5 — Crear `components/WeatherCard.jsx`

**Objetivo:** Mostrar los datos del clima de forma legible.

**Responsabilidades:**
- Recibe por props el objeto `clima` del backend
- Muestra: temperatura, sensación térmica, descripción, ubicación
- Si no hay datos, no renderiza nada o muestra "Sin datos"

---

### [ ] Paso 6 — Integrar todo en una página

**Objetivo:** Conectar formulario, hook y tarjeta en una sola pantalla funcional.

**Responsabilidades:**
- Manejar `onSubmit` desde el formulario → llamar al hook
- Pasar `{ data, loading, error }` a `WeatherCard`
- Mostrar spinner si `loading`, mensaje si `error`, tarjeta si `data`

**Decisión:** Se usará `App.jsx` como página principal. No se crea `pages/` hasta que haya más de una pantalla.

---

### [ ] Paso 7 — Mejorar experiencia

**Objetivo:** Pulir detalles de usabilidad.

- Manejar error visual ("Ciudad no encontrada")
- Deshabilitar botón mientras carga
- Mostrar hora de última actualización
- Estilos básicos

---

## Bitácora de decisiones

| # | Paso | Decisión | Fecha |
|---|------|----------|-------|
| 1 | Paso 1 | Mantener `index.css` y `main.jsx` intactos | — |
| 1 | Paso 1 | No eliminar carpeta `assets/`, se usará para íconos propios | — |
| 6 | Paso 6 | Usar `App.jsx` como única página. No crear `pages/` hasta que haya más rutas | — |
| 2 | Paso 2 | Se extrajo `consultarClima(url)` como función interna para evitar duplicar fetch | — |
| 2 | Paso 2 | Se usó `URLSearchParams` en lugar de concatenar strings manualmente | — |
| 2 | Paso 2 | Error de CORS resuelto configurando `cors` en el backend | — |

---

## Progreso

| Paso | Estado | Inicio | Fin |
|------|--------|--------|-----|
| 1. Limpiar plantilla | ✅ Completado | — | — |
| 2. Servicio de clima | ✅ Completado | — | — |
| 3. Hook useClima | ⬜ Pendiente | — | — |
| 4. SearchForm | ⬜ Pendiente | — | — |
| 5. WeatherCard | ⬜ Pendiente | — | — |
| 6. Integrar todo | ⬜ Pendiente | — | — |
| 7. Mejorar UX | ⬜ Pendiente | — | — |

---

## Siguiente paso

**Paso 3: Crear `hooks/useClima.js`**

Cuando quieras avanzar, te explico qué va a hacer el hook y por qué separarlo del componente.
