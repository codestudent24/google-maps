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
    return marker.latitude === destination.latitude && marker.longitude === destination.longitude
  })
}

const urlAPI = '/api/v1/bank/branch'

export const getDataFromAPI = async (
  minLat = 40,
  minLon = 20,
  maxLat = 60,
  maxLon = 40,
  limit = 20,
  filter = false,
  individual = false,
  legal_entity = false,
  invalid = false,
  privilegy = false,
  weekend = false,
  late_evening = false
) => {
  let query = `?minLat=${minLat}&minLon=${minLon}&maxLat=${maxLat}&maxLon=${maxLon}&limit=${limit}`
  if (filter) query += `&filter=${filter}&individual=${individual}&legal_entity=${legal_entity}&invalid=${invalid}&privilegy=${privilegy}&weekend=${weekend}&late_evening=${late_evening}`
  try {
    const response = await fetch(`${urlAPI}${query}`, {
      method: "GET",
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