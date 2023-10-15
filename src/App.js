import React from 'react';
import Map from './Components/Map';
import { Search } from './Components/Search';
import "leaflet/dist/leaflet.css";
import './App.css';

function App() {
  return (
    <main className='flexbox'>
      <Search />
      <Map />
    </main>
  );
}

export default App;
