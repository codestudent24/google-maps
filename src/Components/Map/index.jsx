import React, { useState, useRef } from "react";
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
import { setDestination } from "../../features/dataSlice";
import { Tags } from "./Tags";
import './Map.css'

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const Map = () => {
  const vtbData = useSelector((state) => state.vtbData.data)
  const myPosition = useSelector((state) => state.vtbData.myPosition)
  const [map, setMap] = useState(null);

  const mapRef = useRef(null)

  const dispatch = useDispatch()

  return (
    <section className="map-container">
      <Tags />
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