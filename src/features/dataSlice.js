import { createSlice } from '@reduxjs/toolkit'
import { initialMarkers } from '../Components/Search/mock'

const initialState = {
  fullData: initialMarkers,
  data: initialMarkers,
  vehicle: 'car',
  destination: {
    latitude: initialMarkers[0].latitude,
    longitude: initialMarkers[0].longitude
  },
  myPosition: {
    latitude: 55.671244,
    longitude: 37.618423
  }
}

export const getRandomRating = () => {
  return Math.round(Math.random() * 5)
}

const isClose = (bank, position) => {
  const long = (position.longitude - bank.longitude) * (position.longitude - bank.longitude)
  const lat = (position.latitude - bank.latitude) * (position.latitude - bank.latitude)
  return Math.sqrt(long + lat) < 0.05
}

export const dataSlice = createSlice({
  name: 'vtbData',
  initialState,
  reducers: {
    setFullData: (state, action) => {
      const setData = []
      for (let i=0; i<action.payload.length; i++) {
        const item = action.payload[i]
        if (!item.name) item.name = 'ВТБ'
        if (!item.rating) item.rating = getRandomRating()
        setData.push(item)
      }
      if (setData.length > 0 && state.destination) {
        state.destination.latitude = setData[0].latitude
        state.destination.longitude = setData[0].longitude
      }
      state.fullData = setData
      state.data = setData
    },
    setData: (state, action) => {
      let filteredData = action.payload.data
      if (action.payload.filters.includes('rating')) filteredData = filteredData.filter((bank) => bank.waiting_time < 40 )
      if (action.payload.filters.includes('workload')) filteredData = filteredData.filter((bank) => bank.waiting_time <= 50 )
      if (action.payload.filters.includes('closest')) filteredData = filteredData.filter((bank) => isClose(bank, action.payload.position))
      state.data = [...filteredData]
    },
    getByAddress: (state, action) => {
      const filteredData = state.fullData.filter((bank) => {
        const address = (bank.city + ', ' + bank.street).toLocaleLowerCase()
        return address.includes(action.payload.toLocaleLowerCase())
      })
      state.data = [...filteredData]
    },
    setVehicle: (state, action) => {
      state.vehicle = action.payload
    },
    setDestination: (state, action) => {
      state.destination.latitude = action.payload.latitude
      state.destination.longitude = action.payload.longitude
    },
    setMyPosition: (state, action) => {
      state.myPosition.latitude = action.payload.latitude
      state.myPosition.longitude = action.payload.longitude
    }
  }
})

export const { setFullData, setData, setDestination, setMyPosition, getByAddress, setVehicle } = dataSlice.actions

export default dataSlice.reducer