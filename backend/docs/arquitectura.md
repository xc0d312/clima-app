# Arquitectura

## Objetivo

Separar responsabilidades para que cada archivo tenga un motivo claro para cambiar.

## Capas

### `routes`

- Define endpoints
- Conecta URL con controller
- No pone reglas de negocio

### `controllers`

- Trabaja con `req` y `res`
- Lee query params
- Devuelve codigos HTTP y mensajes de error
- Decide que caso de uso ejecutar

### `services`

- Implementa la logica del caso de uso
- Orquesta pasos del sistema
- Valida reglas del dominio
- No conoce Express

### `integrations`

- Llama servicios externos
- Traduce respuestas de APIs externas al formato que necesitamos
- Aisla dependencias externas del resto de la app

### `utils`

- Helpers reutilizables
- Constantes o mapeos auxiliares

## Flujo

### Consulta por ciudad

1. request HTTP
2. route
3. controller
4. service
5. integration geocoding
6. integration weather
7. respuesta JSON

### Consulta por coordenadas

1. request HTTP
2. route
3. controller
4. service
5. integration weather
6. respuesta JSON

## Ejemplo en este proyecto

- `weatherRoutes.js`: expone `/clima`
- `climaController.js`: interpreta `ciudad`, `latitud` y `longitud`
- `climaService.js`: decide como resolver el caso de uso
- `geocodingService.js`: busca coordenadas desde una ciudad
- `weatherService.js`: consulta el clima actual
- `weatherCodeMap.js`: traduce codigos del proveedor externo

