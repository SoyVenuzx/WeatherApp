export const currentTime = (timezoneIn, dtIn) => {
  const d = new Date()
  const localTime = d.getTime()
  const localOffset = d.getTimezoneOffset() * 60000
  const utc = localTime + localOffset
  const cityOffset = utc + (1000 * timezoneIn)
  const fechaActual = new Date(cityOffset)

  const horas = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const horaFormateada = (horas % 12 || 12 ) + ':' + (minutos < 10 ? '0' : '') + minutos + (horas < 12 ? ' AM' : ' PM');

  const opcionesFecha = { weekday: 'long', day: 'numeric', month: 'short' };
  const fechaFormateada = fechaActual.toLocaleString('es-ES', opcionesFecha);

  const resultadoFinal = `${horaFormateada} - ${fechaFormateada}`;

  return resultadoFinal
}
