// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux'
// import {
//   TileLayer,
//   MapContainer,
//   Marker,
//   Popup,
//   ZoomControl,
// } from "react-leaflet";
// import RoutingControl from './RoutingControl'
// import { LocationMarker, customBankIcon } from "./mapUtils";
// import './Map.css'
// import { getByAddress, setData, setDestination } from "../../features/dataSlice";

// const checkSelected = (array, value) => {
//   return array.includes(value) ? 'params__tag selected' : 'params__tag'
// }

// const Map = () => {
//   const vtbData = useSelector((state) => state.vtbData.data)
//   const myPosition = useSelector((state) => state.vtbData.myPosition)
//   const [filters, setFilters] = useState([])
//   const [address, setAddress] = useState('')
//   const [map, setMap] = useState(null);

//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(setData({filters}))
//   }, [filters, dispatch])

//   useEffect(() => {
//     console.log('MAP CHANGED', map)
//   }, [map])

//   return (
//     <section className="map-container">
//       <div className="map-container__params">
//         <div className="params__input-container">
//           <input type="text" placeholder="Адрес офиса" onChange={(e) => {setAddress(e.target.value)}}/>
//           <span onClick={() => {
//             dispatch(getByAddress(address))
//           }}>Найти</span>
//         </div>
//         <div className="params__tags">
//           <button
//             className={checkSelected(filters, 'rating')}
//             onClick={() => {
//             if (filters.includes('rating')) {
//               const newFilters = filters.filter((el) => el !== 'rating')
//               setFilters(newFilters)
//             } else {
//               setFilters([...filters, 'rating'])
//             }
//           }}>
//             высокий рейтинг
//             {filters.includes('rating')}
//           </button>
//           <button
//             className={checkSelected(filters, 'workload')}
//             onClick={() => {
//             if (filters.includes('workload')) {
//               const newFilters = filters.filter((el) => el !== 'workload')
//               setFilters(newFilters)
//             } else {
//               setFilters([...filters, 'workload'])
//             }
//           }}>нет очереди</button>
//           <button className={checkSelected(filters, 'closest')}>самый близкий</button>
//           <button className="params__tag">где я?</button>
//         </div>

//       </div>
//   );
// };

// export default Map;