import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet'
import './Map.css';
import { Icon, point, divIcon } from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster"
import RoutingMachine from './RoutingControl';

// const mapState = { center: [55.76, 37.64], zoom: 13 };

export const MapComponent = () => {
  // eslint-disable-next-line
  const [map, setMap] = useState(null);
  // eslint-disable-next-line
  const [start, setStart] = useState([55.651244, 37.518423])
  // eslint-disable-next-line
  const [end, setEnd] = useState([55.751244, 37.618423])

  const markers = [
    {
      geocode: [55.651244, 37.518423],
      popUp: "point 1"
    },
    {
      geocode: [55.751244, 37.518423],
      popUp: "point 2"
    },
    {
      geocode: [55.751244, 37.618423],
      popUp: "point 3"
    },
  ]

  const customIcon = new Icon({
    iconUrl: require('../../assets/geomarker.png'),
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
  <MapContainer
    center={[55.751244, 37.618423]}
    zoom={13}
    whenReady={map => setMap(map)}
  >

    <MarkerClusterGroup
      chunkedLoading
      iconCreateFunction={createCustomCLusterIcon}
    >
      {markers.map((marker, index) =>
        <Marker
          position={marker.geocode}
          icon={customIcon}
          key={index}
        >
          <Popup>
            <h2>{marker.popUp}</h2>
          </Popup>
        </Marker>
      )}
    </MarkerClusterGroup>
    <RoutingMachine
      position={'topright'}
      start={start}
      end={end}
      color={'#757de8'}
    />
    <LayersControl position='topbottom'>
      <LayersControl.BaseLayer checked name="Map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  </MapContainer>
  )
}