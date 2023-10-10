import { useEffect } from "react";
import L, { Icon } from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const customIcon = new Icon({
  iconUrl: require('../../assets/geomarker.png'),
  iconSize: [38, 38]
})

export default function Routing(props) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      position: 'topleft',
      waypoints: [
        L.latLng(props.start), // 55.651244, 37.518423
        L.latLng(props.end) // 55.751244, 37.618423
      ],
      lineOptions: {
        styles: [
          {
            color: '#757de8',
          },
        ],
      },
      createMarker: function(i, wp, nWps) {
        return L.marker(wp.latLng, {icon: customIcon });
      },
      routeWhileDragging: true
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, props.start, props.end]);

  return null;
}