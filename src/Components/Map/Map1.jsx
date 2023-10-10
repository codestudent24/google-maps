import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
  TileLayer,
  MapContainer,
  LayersControl
} from "react-leaflet";

import RoutingControl from './RoutingControl'

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const validPoint = /-?\d+\.\d+, -?\d+\.\d+/

const Map = () => {
  const [start, setStart] = useState([55.651244, 37.518423])
  const [end, setEnd] = useState([55.751244, 37.618423])
  const [map, setMap] = useState(null);

  const startRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    console.log('START NOW:', start)
  }, [start])

  return (
    <>
      <input type="text" placeholder="Начало пути" ref={startRef} />
      <input type="text" placeholder="Конец пути" ref={endRef} />
      <button onClick={() => {
        if (startRef.current && endRef.current) {
          const startString = startRef.current.value;
          const endString = endRef.current.value;
          console.log(startString, endString)
          if (startString.match(validPoint) === null || endString.match(validPoint) === null) {
            console.log('неверные данные')
          } else {
            const startArray = startString.trim().split(', ')
            const endArray = endString.trim().split(', ')
            console.log(startArray, endArray)
            console.log(...startArray)
            setStart(startArray)
            setEnd(endArray)
          }
        }
      }}>Построить маршрут</button>
      <MapContainer
        center={[55.751244, 37.518423]}
        zoom={13}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={map => setMap(map)}
      >
        {/* *************** */}
        {/* Pass in our custom control layer here, inside of the map container */}
        {/* *************** */}
        <RoutingControl start={start} end={end} />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default Map;