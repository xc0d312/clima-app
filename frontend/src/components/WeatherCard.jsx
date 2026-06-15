function WeatherCard({ weather }) {
  const { ubicacion, climaActual } = weather;

  return (
    <section className="weather-card">
      <div className="weather-card-header">
        <p className="eyebrow">Resultado actual</p>
        <h2>{climaActual.descripcion}</h2>
      </div>

      <div className="weather-main">
        <p className="temperature">{climaActual.temperatura}°C</p>
        <p className="feels-like">
          Sensacion termica: {climaActual.sensacionTermica}°C
        </p>
      </div>

      <div className="weather-details">
        <article>
          <span>Lluvia</span>
          <strong>{climaActual.lluvia ?? 0} mm</strong>
        </article>
        <article>
          <span>Momento</span>
          <strong>{climaActual.esDeDia ? 'Dia' : 'Noche'}</strong>
        </article>
        <article>
          <span>Latitud</span>
          <strong>{ubicacion.latitud}</strong>
        </article>
        <article>
          <span>Longitud</span>
          <strong>{ubicacion.longitud}</strong>
        </article>
      </div>
    </section>
  );
}

export default WeatherCard;
