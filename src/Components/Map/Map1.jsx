import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import RoutingControl from './RoutingControl'
import { LocationMarker, customBankIcon } from "./mapUtils";
import './Map.css'
import { getByAddress, setData, setDestination } from "../../features/dataSlice";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const checkSelected = (array, value) => {
  return array.includes(value) ? 'params__tag selected' : 'params__tag'
}

const Map = () => {
  const vtbData = useSelector((state) => state.vtbData.data)
  const myPosition = useSelector((state) => state.vtbData.myPosition)
  const [filters, setFilters] = useState([])
  const [address, setAddress] = useState('')
  const [map, setMap] = useState(null);

  const mapRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setData({filters}))
  }, [filters, dispatch])

  useEffect(() => {
    console.log('MAP CHANGED', map)
  }, [map])

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
          <button className="params__tag">где я?</button>
        </div>

      </div>
      <MapContainer
        center={[myPosition.latitude, myPosition.longitude]}
        zoom={13}
        zoomControl={false}
        doubleClickZoom={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={map => setMap(map)}
        ref={mapRef}
      >
      {mapRef && mapRef.current &&
        <>
          <LocationMarker />
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
        </>
      }
      </MapContainer>
    </section>
  );
};

export default Map;