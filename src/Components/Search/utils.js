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