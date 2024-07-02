import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'

import { ImSpinner8 } from 'react-icons/im'

import { debounce } from 'lodash'
import { getWeatherIcon } from '../utils/icons'
import { currentTime } from '../utils/dateFunctions'
import { TbTemperatureCelsius } from 'react-icons/tb'
import { BsEye, BsThermometer, BsWater, BsWind } from 'react-icons/bs'
import { IoMdSearch } from 'react-icons/io'
import { apiKey } from '../utils/constants'
import axios from 'axios'

const App = () => {
  const [weatherData, setWeatherData] = useState({})
  const [location, setLocation] = useState('Culiacan')
  const [inputValue, setInputValue] = useState('')

  const [loadIcon, setLoadIcon] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [loading, setLoading] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')

  //* Fetch Data
  useEffect(() => {
    setLoading(true)
    const LANG = 'sp'
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=${LANG}&appid=${apiKey}`

    axios.get(URL).then(({ data }) => {
      setTimeout(() => {
        console.log({ dataFetched: data })

        setWeatherData(data)
        setLoadIcon(true)
        setLoading(false)
      }, 700);
    }).catch(error => {
      console.log({ error })

      setErrorMsg(error)
      setLoading(false)
    })

  }, [location])

  //* Error msg 
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 1500);

    return () => clearTimeout(timer)
  }, [errorMsg])

  const handleSearch = (e) => {

    if (inputValue) setLocation(inputValue)

    const input = document.querySelector('input')

    if (!input.value) {
      setAnimate(true)

      setTimeout(() => {
        setAnimate(false)
      }, 500);
    }

    input.value = ''

    e.preventDefault()
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])

  if (Object.keys(weatherData).length === 0) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-screen bg-center bg-no-repeat bg-cover bg-gradientBg'>
        <div>
          <ImSpinner8 className='text-5xl text-white animate-spin' />
        </div>
      </div>
    )
  }

  const getIcon = loadIcon ? getWeatherIcon(weatherData.weather[0].main) : ''

  return (
    <div className='flex flex-col justify-center items-center px-4 w-full h-screen bg-center bg-no-repeat bg-cover bg-gradientBg lg:px-0'>
      {errorMsg && <div className='w-full text-center max-w-[80vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-1 lg:top-10 p-2 capitalize rounded-md z-50'>
        {`${errorMsg.response.data.message}`}
      </div>}
      {/* Form */}
      <form className={`${animate ? 'animate-shake' : 'animate-none'} mb-8 w-full h-16 rounded-full bg-black/30 max-w-[450px] backdrop-blur-[32px]`}>
        <div className='flex relative justify-between items-center p-2 h-full'>
          <input
            onChange={({ target: { value } }) => setInputValue(value)}
            className='flex-1 text-white bg-transparent outline-none placeholder:text-white text-[15px] font-light pl-6 h-full'
            type='text'
            placeholder='Busca por ciudad o por país'
          />
          <button onClick={handleSearch} className='bg-[#1ab8ed] w-20 h-12 rounded-full flex justify-center items-center transition hover:bg-[#15abdd]'>
            <IoMdSearch className='text-2xl text-white' />
          </button>
        </div>
      </form>
      {/* Card */}
      <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        {
          loading ? (
            <div className='flex justify-center items-center w-full h-full'>
              <ImSpinner8 className='text-5xl text-white animate-spin' />
            </div>
          ) : (
            <div>
              {/* card top */}
              <div className='flex gap-x-5 items-center'>
                {/* Icon */}
                <div className='text-[87px]'>{getIcon}</div>

                <div>
                  {/* Country name */}
                  <div className='text-2xl font-semibold'>
                    {weatherData.name}, {weatherData.sys?.country}
                  </div>

                  {/* Date */}
                  <div>
                    {currentTime(weatherData.timezone, weatherData.dt)}
                  </div>
                </div>
              </div>
              {/* card body */}
              <div className='my-20'>
                <div className='flex justify-center items-center'>
                  {/* Temp */}
                  <div className='text-[144px] leading-none font-light'>
                    {parseInt(weatherData.main?.temp)}
                  </div>

                  {/* Celsius */}
                  <div className='text-4x1'>
                    <TbTemperatureCelsius className='text-3xl' />
                  </div>
                </div>

                {/* Weather description */}
                <div className='text-center capitalize'>
                  {loadIcon ? weatherData.weather[0].description : ''}
                </div>
              </div>
              {/* card bottom */}
              <div className='flex flex-col gap-y-6 mx-auto max-w-[378px]'>
                <div className='flex gap-x-8 justify-between'>
                  <div className='flex gap-x-2 items-center w-full'>
                    <div className='text-[18px]'>
                      {/* Icon */}
                      <BsEye />
                    </div>
                    <div className='text-sm'>
                      Visibilidad <span className='ml-2'>{weatherData.visibility / 1000} km</span>
                    </div>
                  </div>

                  <div className='flex gap-x-2 items-center w-full'>
                    <div className='text-[18px]'>
                      {/* Icon */}
                      <BsThermometer />
                    </div>
                    <div className='flex text-sm'>
                      Sens. Térmica
                      <div className='flex ml-2'>
                        {parseInt(weatherData.main?.feels_like)}
                        <TbTemperatureCelsius />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-x-8 justify-between'>
                  <div className='flex gap-x-2 items-center w-full'>
                    <div className='text-[18px]'>
                      {/* Icon */}
                      <BsWater />
                    </div>
                    <div className='text-sm'>
                      Humedad <span className='ml-2'>{weatherData.main?.humidity} %</span>
                    </div>
                  </div>

                  <div className='flex gap-x-2 items-center w-full'>
                    <div className='text-[18px]'>
                      {/* Icon */}
                      <BsWind />
                    </div>
                    <div className='text-sm'>
                      Viento
                      <span className='ml-2'>
                        {weatherData.wind?.speed} m/s
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )

}

export default App
