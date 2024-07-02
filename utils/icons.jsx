//* Icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from 'react-icons/io'

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
} from 'react-icons/bs'

// Icons
export const getWeatherIcon = value => {
  switch (value.toLowerCase()) {
    case 'clouds':
      return <IoMdCloudy />

    case 'haze':
      return <BsCloudHaze2Fill />

    case 'rain':
      return <IoMdRainy className='text-[#31cafb]' />

    case 'clear':
      return (<><IoMdSunny className='text-[#ffde33]' /></>)

    case 'drizzle':
      return <BsCloudDrizzleFill className='text-[#31cafb]' />

    case 'snow':
      return <IoMdSnow className='text-[#31cafb]' />

    case 'thunderstorm':
      return <IoMdThunderstorm />

    default:
      return <IoMdSunny className='text-[#ffde33]' />
  }
}