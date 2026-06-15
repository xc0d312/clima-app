import { useState } from 'react';

function WeatherForm({ buscarPorCiudad, buscarPorCoordenadas, loading }) {
  const [modo, setModo] = useState('ciudad');
  const [ciudad, setCiudad] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (modo === 'ciudad') {
      if (!ciudad.trim()) {
        return;
      }

      buscarPorCiudad(ciudad.trim());
      return;
    }

    if (!latitud.trim() || !longitud.trim()) {
      return;
    }

    buscarPorCoordenadas(latitud.trim(), longitud.trim());
  }

  return (
    <section className="weather-panel">
      <div className="mode-switch" aria-label="Tipo de busqueda">
        <button
          type="button"
          className={modo === 'ciudad' ? 'active' : ''}
          onClick={() => setModo('ciudad')}
        >
          Buscar por ciudad
        </button>
        <button
          type="button"
          className={modo === 'coordenadas' ? 'active' : ''}
          onClick={() => setModo('coordenadas')}
        >
          Buscar por coordenadas
        </button>
      </div>

      <form className="weather-form" onSubmit={handleSubmit}>
        {modo === 'ciudad' ? (
          <>
            <label htmlFor="city">Ciudad</label>
            <input
              type="text"
              id="city"
              value={ciudad}
              onChange={(event) => setCiudad(event.target.value)}
              placeholder="Ejemplo: Managua"
            />
          </>
        ) : (
          <div className="coordinates-grid">
            <div>
              <label htmlFor="latitude">Latitud</label>
              <input
                type="text"
                id="latitude"
                value={latitud}
                onChange={(event) => setLatitud(event.target.value)}
                placeholder="Ejemplo: 12.1364"
              />
            </div>
            <div>
              <label htmlFor="longitude">Longitud</label>
              <input
                type="text"
                id="longitude"
                value={longitud}
                onChange={(event) => setLongitud(event.target.value)}
                placeholder="Ejemplo: -86.2514"
              />
            </div>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Consultando...' : 'Buscar clima'}
        </button>
      </form>
    </section>
  );
}

export default WeatherForm;
