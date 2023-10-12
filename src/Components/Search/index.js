import React, { useEffect } from 'react';
import { initialMarkers } from './mock';
import './Search.css';
import { SearchItem } from './SearchItem';

export function Search(props) {
  useEffect(() => {
    console.log('now destination is', props.destination)
  }, [props.destination])

  return (
      <div className='search'>
        <ul className='search__list'>
          {initialMarkers.map((marker, index) =>
          <SearchItem marker={marker} index={index} myPosition={props.myPosition} setDestination={props.setDestination}/>
          )}
        </ul>
      </div>
  );
}
