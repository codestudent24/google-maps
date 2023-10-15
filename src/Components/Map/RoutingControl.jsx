import { useEffect } from "react";
import { useSelector } from 'react-redux';
import L, { Icon } from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

require('lrm-graphhopper');

const customIconStart = new Icon({
  iconUrl: require('../../assets/geomarker2.png'),
  iconAnchor: [19, 38],
  iconSize: [38, 38]
})

const customIconEnd = new Icon({
  iconUrl: require('../../assets/bankicon3.png'),
  iconAnchor: [19, 38],
  iconSize: [38, 38]
})

export default function Routing() {
  const map = useMap();
  const destination = useSelector((state) => state.vtbData.destination)
  const myPosition = useSelector((state) => state.vtbData.myPosition)
  const vehicle = useSelector((state) => state.vtbData.vehicle)

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      position: 'topright',
      waypoints: [
        L.latLng([myPosition.latitude, myPosition.longitude]),
        L.latLng([destination.latitude, destination.longitude]),
      ],
      router: L.Routing.graphHopper('325208ff-f18b-447b-b302-19cc07ea8236' , {
        urlParameters: {
            vehicle: vehicle,
            locale: 'ru',
        },
      }),
      language: 'ru',
      lineOptions: {
        styles: [
          {
            color: '#757de8',
          },
        ],
      },
      createMarker: function(i, wp, nWps) {
        if (i === 0) return L.marker(wp.latLng, {icon: customIconStart });
        return L.marker(wp.latLng, {icon: customIconEnd });
      },
      routeWhileDragging: true
    })

    if (map && routingControl) map.addControl(routingControl)

    return () => map.removeControl(routingControl);
  }, [map, destination, myPosition, vehicle]);

  return null;
}