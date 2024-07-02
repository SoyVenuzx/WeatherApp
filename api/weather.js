import axios from 'axios'
import { apiKey } from '../utils/constants.js'

const forecastEndpoint = ({ cityName, lang }) => `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${lang}&appid=${apiKey}`

const apiCall = async endpoint => {
  const options = {
    method: 'GET',
    url: endpoint
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.log({ error })
    return null
  }
}

export const fetchWeatherForecast = params => {
  return apiCall(forecastEndpoint(params))
}
