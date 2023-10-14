import { useDispatch } from 'react-redux'
import { setMyPosition } from "../../features/dataSlice";
import { useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";

export function LocationMarker() {
  const dispatch = useDispatch()

  const map = useMapEvents({
    dblclick() {
    map.locate()
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom())
      dispatch(setMyPosition({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      }))
    },
  })
  return null
}

export const customBankIcon = new Icon({
  iconUrl: require('../../assets/pointicon.png'),
  iconAnchor: [19, 38],
  iconSize: [38, 38]
})