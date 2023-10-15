import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getByAddress, setData } from "../../features/dataSlice";
import { getDataFromAPI } from "../Search/utils";

const checkSelected = (array, value) => {
  return array.includes(value) ? 'params__tag selected' : 'params__tag'
}

const handleFilter = (filtersArray, filterName, callback) => {
  if (filtersArray.includes(filterName)) {
    const newFilters = filtersArray.filter((el) => el !== filterName)
    callback(newFilters)
  } else {
    callback([...filtersArray, filterName])
  }
}

export const Tags = () => {
  const [filters, setFilters] = useState([])
  const [query, setQuery] = useState(['individual', 'legal_entity'])
  const [address, setAddress] = useState('')
  const myPosition = useSelector((state) => state.vtbData.myPosition)

  const dispatch = useDispatch()

  useEffect(() => {
    async function updateData(query, filters) {
      let data
      if (query.length > 0) {
        data = await getDataFromAPI(
          myPosition.latitude - 0.2,
          myPosition.longitude - 0.2,
          myPosition.latitude + 0.2,
          myPosition.longitude + 0.2,
          20,
          true,
          query.includes('individual'),
          query.includes('legal_entity'),
          query.includes('invalid'),
          query.includes('privilegy'),
          query.includes('weekend'),
          query.includes('late_evening')
        ) || []
      } else {
        data = await getDataFromAPI(
          myPosition.latitude - 0.2,
          myPosition.longitude - 0.2,
          myPosition.latitude + 0.2,
          myPosition.longitude + 0.2,
          20
        ) || []
      }
      dispatch(setData({filters, data, position: myPosition}))
    }
    updateData(query, filters)
  }, [filters, query, myPosition, dispatch])

  return (
    <div className="map-container__params">
    <div className="params__input-container">
      <input type="text" placeholder="Адрес офиса" onChange={(e) => {setAddress(e.target.value)}}/>
      <span onClick={() => {
        dispatch(getByAddress(address))
      }}>Найти</span>
    </div>
    <div className="params__tags">
      <button
        className={checkSelected(filters, 'rating')}
        onClick={() => { handleFilter(filters, 'rating', setFilters) }}
      >высокий рейтинг</button>
      <button
        className={checkSelected(filters, 'workload')}
        onClick={() => { handleFilter(filters, 'workload', setFilters) }}
      >нет очереди</button>
      <button
        className={checkSelected(filters, 'closest')}
        onClick={() => { handleFilter(filters, 'closest', setFilters) }}
      >близко от меня</button>
      <button
        className={checkSelected(query, 'individual')}
        onClick={() => { handleFilter(query, 'individual', setQuery) }}
      >физические лица</button>
      <button
        className={checkSelected(query, 'legal_entity')}
        onClick={() => { handleFilter(query, 'legal_entity', setQuery) }}
      >юридические лица</button>
      <button
        className={checkSelected(query, 'privilegy')}
        onClick={() => { handleFilter(query, 'privilegy', setQuery) }}
      >привилегия</button>
      <button
        className={checkSelected(query, 'invalid')}
        onClick={() => { handleFilter(query, 'invalid', setQuery) }}
      >пандус</button>
      <button
        className={checkSelected(query, 'weekend')}
        onClick={() => { handleFilter(query, 'weekend', setQuery) }}
      >работает по выходным</button>
      <button
        className={checkSelected(query, 'late_evening')}
        onClick={() => { handleFilter(query, 'late_evening', setQuery) }}
      >работает допоздна</button>
      <button
        className='params__tag'
        onClick={() => { setQuery([]); setFilters([]) }}
      >показать все</button>
    </div>
  </div>
  )
}