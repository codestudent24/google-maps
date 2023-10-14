import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { initialMarkers } from './Components/Search/mock';
import Map from './Components/Map/Map1';
import { Search } from './Components/Search';
import "leaflet/dist/leaflet.css";
import './App.css';

function App() {
  const destination = useSelector((state) => state.vtbData.destination)
  const [myPosition, setMyPosition] = useState([55.671244, 37.618423])

  return (
    <main className='flexbox'>
      <Search destination={destination} myPosition={myPosition} setMyPosition={setMyPosition} />
      <Map destination={destination} myPosition={myPosition} markers={initialMarkers} />
    </main>
  );
}

export default App;
