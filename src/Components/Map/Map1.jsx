import React, { useEffect, useState, useRef } from "react";
import L, { Icon, point, divIcon } from "leaflet";
import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"
import RoutingControl from './RoutingControl'
import './Map.css'

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const validPoint = /-?\d+\.\d+, -?\d+\.\d+/

const getCenter = (point1, point2) => {
  return [point2[0] - point1[0], point2[1] - point1[1]]
}

const Map = (props) => {
  const [start, setStart] = useState(props.myPosition)
  const [end, setEnd] = useState(props.destination)
  const [mapCenter, setMapCenter] = useState(getCenter(start, end))
  const [map, setMap] = useState(null);

  const startRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    console.log('START NOW:', start)
  }, [start])

  useEffect(() => {
    setEnd(props.destination)
    setMapCenter(getCenter(props.myPosition, props.destination))
  }, [props.destination, props.myPosition])

  const customBankIcon = new Icon({
    iconUrl: require('../../assets/bankicon.png'),
    iconSize: [38, 38]
  })

  const createCustomCLusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
  })
  }

  return (
    <section className="map-container">
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
        center={mapCenter}
        zoom={13}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={map => setMap(map)}
      >
        {/* *************** */}
        {/* Pass in our custom control layer here, inside of the map container */}
        {/* *************** */}
        {props.markers.map((marker, index) =>
          <Marker
            position={marker.position}
            icon={customBankIcon}
            key={index}
          >
          <Popup>
            <h2>{marker.name}</h2>
          </Popup>
        </Marker>
        )}
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
    </section>
  );
};

export default Map;