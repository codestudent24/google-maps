import React, { useState } from 'react';
import { initialMarkers } from './Components/Search/mock';
import Map from './Components/Map/Map1';
import { Search } from './Components/Search';
import "leaflet/dist/leaflet.css";
import './App.css';
import { ItemInfo } from './Components/ItemInfo';
import { findItem } from './Components/Search/utils';

function App() {
  const [destination, setDestination] = useState(initialMarkers[0].position)
  const [myPosition, setMyPosition] = useState([55.671244, 37.618423])
  const [showInfo, setShowInfo] = useState(true)

  return (
    <main className='flexbox'>
      <Search destination={destination} setDestination={setDestination} myPosition={myPosition} setMyPosition={setMyPosition} setShowInfo={setShowInfo} />
      <ItemInfo marker={findItem(initialMarkers, destination)} showInfo={showInfo} setShowInfo={setShowInfo} />
      <Map destination={destination} myPosition={myPosition} markers={initialMarkers} />
    </main>
  );
}

export default App;
