import React, { useEffect, useState } from "react";
import { Icon, point, divIcon } from "leaflet";
import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup
} from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster"
import RoutingControl from './RoutingControl'
import './Map.css'

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

// const validPoint = /-?\d+\.\d+, -?\d+\.\d+/

const getCenter = (point1, point2) => {
  return [point2[0] - point1[0], point2[1] - point1[1]]
}

const Map = (props) => {
  const [start, setStart] = useState(props.myPosition)
  const [end, setEnd] = useState(props.destination)
  const [mapCenter, setMapCenter] = useState(getCenter(start, end))
  const [routeVehicle, setRouteVehicle] = useState('car')
  const [map, setMap] = useState(null);

  useEffect(() => {
    console.log('START NOW:', start)
  }, [start])

  useEffect(() => {
    setEnd(props.destination)
    setMapCenter(getCenter(props.myPosition, props.destination))
  }, [props.destination, props.myPosition])

  const customBankIcon = new Icon({
    iconUrl: require('../../assets/bankicon.png'),
    iconAnchor: [19, 38],
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
      <MapContainer
        center={mapCenter}
        zoom={13}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={map => setMap(map)}
      >
        {props.markers.map((marker, index) =>
          <Marker
            position={marker.position}
            icon={customBankIcon}
            key={index}
          >
          <Popup autoClose={true} closeOnClick={true} >
            <h2 style={{textAlign: 'center'}}>{marker.name}</h2>
            <h4 style={{cursor: 'pointer'}} onClick={() => {setEnd(marker.position)}}>построить маршрут</h4>
          </Popup>
        </Marker>
        )}
        <RoutingControl start={start} end={end} routeVehicle={routeVehicle} />
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