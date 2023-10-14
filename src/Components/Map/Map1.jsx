import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from "leaflet";
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster"
import RoutingControl from './RoutingControl'
import './Map.css'
import { getByAddress, setData, setDestination } from "../../features/dataSlice";
import { useEffect } from "react";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const checkSelected = (array, value) => {
  return array.includes(value) ? 'params__tag selected' : 'params__tag'
}

// const validPoint = /-?\d+\.\d+, -?\d+\.\d+/

// const getCenter = (point1, point2) => {
//   return [point2[0] - point1[0], point2[1] - point1[1]]
// }

const Map = (props) => {
  const vtbData = useSelector((state) => state.vtbData.data)
  const myPosition = useSelector((state) => state.vtbData.myPosition)
  const [filters, setFilters] = useState([])
  const [address, setAddress] = useState('')
  const [routeVehicle, setRouteVehicle] = useState('car')
  const [map, setMap] = useState(null);

  const dispatch = useDispatch()

  const customBankIcon = new Icon({
    iconUrl: require('../../assets/bankicon.png'),
    iconAnchor: [19, 38],
    iconSize: [38, 38]
  })

  // const createCustomCLusterIcon = (cluster) => {
  //   return new divIcon({
  //     html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
  //     className: "custom-marker-cluster",
  //     iconSize: point(33, 33, true)
  // })
  // }

  useEffect(() => {
    dispatch(setData({filters}))
  }, [filters, dispatch])

  return (
    <section className="map-container">
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
            onClick={() => {
            if (filters.includes('rating')) {
              const newFilters = filters.filter((el) => el !== 'rating')
              setFilters(newFilters)
            } else {
              setFilters([...filters, 'rating'])
            }
          }}>
            высокий рейтинг
            {filters.includes('rating')}
          </button>
          <button
            className={checkSelected(filters, 'workload')}
            onClick={() => {
            if (filters.includes('workload')) {
              const newFilters = filters.filter((el) => el !== 'workload')
              setFilters(newFilters)
            } else {
              setFilters([...filters, 'workload'])
            }
          }}>нет очереди</button>
          <button className={checkSelected(filters, 'closest')}>самый близкий</button>
        </div>

      </div>
      <MapContainer
        center={[myPosition.latitude, myPosition.longitude]}
        zoom={13}
        zoomControl={true}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={map => {
          map.on("click", function (e) {
            alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
          });
          setMap(map)
        }}
      >
        {vtbData.map((marker, index) =>
          <Marker
            position={[marker.latitude, marker.longitude]}
            icon={customBankIcon}
            key={index}
          >
          <Popup autoClose={true} closeOnClick={true} >
            <h2 style={{textAlign: 'center'}}>{marker.name}</h2>
            <h4
              style={{cursor: 'pointer'}}
              onClick={() => {dispatch(setDestination({
                latitude: marker.latitude,
                longitude: marker.longitude
              }))
            }}>построить маршрут</h4>
          </Popup>
        </Marker>
        )}
        <ZoomControl position="bottomright" />
        <RoutingControl />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={maps.base}
        />
      </MapContainer>
    </section>
  );
};

export default Map;