import React, { useEffect, useState } from 'react';
import './App.css';
import "leaflet/dist/leaflet.css";
import Map from './Components/Map/Map1';

const initialMarkers = [
  {
    name: 'ВТБ 1',
    position: [55.751244, 37.608423],
  },
  {
    name: 'ВТБ 2',
    position: [55.651244, 37.618423],
  },
  {
    name: 'ВТБ 3',
    position: [55.751244, 37.718423]
  }
]

const kmPerLatDegree = 111.134861111
const kmPerLngDegree = 111.321377778

const calculateDistance = (point1, point2) => {
  const widthCorrect = Math.cos( (point1[1] + point2[1]) / 360)
  const widthKm = widthCorrect * Math.abs(point1[1] - point2[1]) * kmPerLngDegree
  const heightKm = Math.abs(point1[0] - point2[0]) * kmPerLatDegree
  const result = Math.sqrt(widthKm*widthKm + heightKm*heightKm).toFixed(3)
  const resulrKm = Math.floor(result)
  const resultMeters = Math.round((result - resulrKm) * 1000)
  if (resulrKm !== 0) return `${resulrKm} км ${resultMeters} м`
  return `${resultMeters} м`
}

function App() {
  const [destination, setDestination] = useState(initialMarkers[0].position)
  const [myPosition, setMyPosition] = useState([55.671244, 37.618423])

  useEffect(() => {
    console.log('now destination is', destination)
  }, [destination])

  return (
    <main className='flexbox'>
      <div className='points'>
        <ul className='points__list'>
          {initialMarkers.map((marker, index) =>
          <li className="points__item" key={index} onClick={() => {
            setDestination(marker.position)
          }}>
            <span className='points__name'>{marker.name}</span>
            <span className='points__distance'>{`${calculateDistance(myPosition, marker.position)}`}</span>
          </li>
          )}
        </ul>
      </div>
      <Map destination={destination} myPosition={myPosition} markers={initialMarkers} />
    </main>

  );
}

export default App;
