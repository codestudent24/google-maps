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

const getRandomWorkload = () => {
  return Math.round(Math.random() * 10)
}

const getRandomRating = () => {
  return Math.round(Math.random() * 5)
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
        if (!item.workload) item.workload = getRandomWorkload()
        setData.push(item)
      }
      if (setData.length > 0) {
        state.destination.latitude = setData[0].latitude
        state.destination.longitude = setData[0].longitude
      }
      state.fullData = setData
      state.data = setData
    },
    setData: (state, action) => {
      let filteredData = state.fullData
      console.log(action.payload)
      console.log(filteredData)
      if (action.payload.filters.includes('rating')) filteredData = filteredData.filter((bank) => bank.rating >=4 )
      console.log(filteredData)
      if (action.payload.filters.includes('workload')) filteredData = filteredData.filter((bank) => bank.workload <=4 )
      console.log(filteredData)
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