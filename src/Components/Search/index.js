import React, { useEffect } from 'react';
import { initialMarkers } from './mock';
import './Search.css';
import { SearchItem } from './SearchItem';
import { getDataFromAPI } from './utils';

export function Search(props) {
  useEffect(() => {
    async function getData() {
      console.log(await getDataFromAPI())
    }
    getData()
  }, [])

  return (
      <div className='search'>
        <ul className='search__list'>
          {initialMarkers.map((marker, index) =>
          <SearchItem
            marker={marker}
            key={index}
            myPosition={props.myPosition}
            setDestination={props.setDestination}
            setShowInfo={props.setShowInfo}
          />
          )}
        </ul>
      </div>
  );
}
