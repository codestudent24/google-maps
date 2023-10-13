const kmPerLatDegree = 111.134861111
const kmPerLngDegree = 111.321377778

export const calculateDistance = (point1, point2) => {
  const widthCorrect = Math.cos( (point1[1] + point2[1]) / 360)
  const widthKm = widthCorrect * Math.abs(point1[1] - point2[1]) * kmPerLngDegree
  const heightKm = Math.abs(point1[0] - point2[0]) * kmPerLatDegree
  const result = Math.sqrt(widthKm*widthKm + heightKm*heightKm).toFixed(3)
  const resulrKm = Math.floor(result)
  const resultMeters = Math.round((result - resulrKm) * 1000)
  if (resulrKm !== 0) return `${resulrKm} км ${resultMeters} м`
  return `${resultMeters} м`
}

export const findItem = (array, destination) => {
  return array.find((marker) => {
    return marker.position[0] === destination[0] && marker.position[1] === destination[1]
  })
}

const urlAPI = 'https://virtserver.swaggerhub.com/Salex1440/BankBranchService/1.0.0/api/v1/bank/branch'

export const getDataFromAPI = async (
  minLat = 55.6,
  minLon = 37.6,
  maxLat = 55.8,
  maxLon = 37.8,
  limit = 5
) => {
  const query = `?minLat=${minLat}&minLon=${minLon}&maxLat=${maxLat}&maxLon=${maxLon}$limit=${limit}`
  try {
    const response = await fetch(`${urlAPI}${query}`, {
      headers: {
        "Content-Type": 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Getting data from API failed`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.log('Oops, error occured:\n', error.message)
  }
}