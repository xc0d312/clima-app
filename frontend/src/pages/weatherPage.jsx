import WeatherForm from '../components/WeatherForm.jsx';
import WeatherCard from '../components/WeatherCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { useWeather } from '../hooks/useWeather.js';
import '../styles/weather.css';

function WeatherPage() {
    const {
        weather,
        loading,
        error,
        buscarPorCiudad,
        buscarPorCoordenadas,
        ultimaBusqueda,
    } = useWeather();

    return (
        <main className="weather-page">
            <section className="weather-shell">
                <header className="weather-header">
                    <p className="eyebrow">Clima App</p>
                    <h1>Consulta el clima por ciudad o coordenadas</h1>
                    <p className="weather-intro">
                        Esta pantalla coordina la vista, mientras el
                        formulario captura datos, el hook maneja estado
                        y el service habla con el backend.
                    </p>
                </header>

                <WeatherForm
                    buscarPorCiudad={buscarPorCiudad}
                    buscarPorCoordenadas={buscarPorCoordenadas}
                    loading={loading}
                />

                {ultimaBusqueda && (
                    <p className="search-summary">
                        Ultima busqueda: <strong>{ultimaBusqueda}</strong>
                    </p>
                )}

                {loading && <LoadingState />}
                {error && <ErrorMessage message={error} />}
                {weather && !loading && <WeatherCard weather={weather} />}
            </section>
        </main>
    );
}

export default WeatherPage;

