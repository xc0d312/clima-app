# Clima App

Aplicación web para consultar el clima actual en español. Permite buscar por nombre de ciudad o por coordenadas geográficas.

## Stack

- **Frontend:** React 19, Vite 8
- **Backend:** Node.js, Express 4
- **APIs:** Open-Meteo (clima + geocodificación)
- **Contenedores:** Docker, Docker Compose

## Arquitectura

### Backend (capas)

```
routes -> controllers -> services -> integrations -> Open-Meteo API
                                  -> utils (códigos WMO)
```

- **routes** — define las URLs disponibles
- **controllers** — maneja request/response HTTP
- **services** — lógica de negocio (orquestación)
- **integrations** — llamadas a APIs externas
- **utils** — mapeo de códigos de clima a español

### Frontend

```
pages -> components (WeatherForm, WeatherCard, LoadingState, ErrorMessage)
      -> hooks (useWeather)
      -> services (weatherApi)
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Info de la API |
| GET | `/health` | Health check |
| GET | `/clima?ciudad=Managua` | Clima por ciudad |
| GET | `/clima?latitud=12.13&longitud=-86.25` | Clima por coordenadas |

## Variables de Entorno

### Backend (`backend/.env`)

```env
BACKEND_PORT=3000
API_CLIMA_URL=https://api.open-meteo.com/v1/forecast
API_GEOLOCATION_URL=https://geocoding-api.open-meteo.com/v1/search
```

### Frontend (`frontend/.env`)

```env
VITE_BACKEND_URL=http://localhost:3000
```

## Ejecución

### Local

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### Docker

```bash
docker-compose up --build
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Licencia

MIT
