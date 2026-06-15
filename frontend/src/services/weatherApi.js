const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/clima`;

export async function obtenerClimaPorCiudad(ciudad) {
  const params = new URLSearchParams({ ciudad });
  return consultarClima(`${baseUrl}?${params.toString()}`);
}

export async function obtenerClimaPorCoordenadas(latitud, longitud) {
  const params = new URLSearchParams({ latitud, longitud });
  return consultarClima(`${baseUrl}?${params.toString()}`);
}

async function consultarClima(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'No se pudo obtener el clima');
  }

  return data;
}
