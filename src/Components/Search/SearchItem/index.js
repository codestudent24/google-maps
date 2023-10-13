import React, { useEffect } from 'react';
import { calculateDistance } from '../utils';
import walkerImage from '../../../assets/walker.png'
import { ItemAbout } from '../../Share/ItemAbout';
import './SearchItem.css';

export function SearchItem(props) {
  useEffect(() => {
    console.log('now destination is', props.destination)
  }, [props.destination])

  return (
          <li className="search__item flexbox" onClick={() => {
            props.setShowInfo(true)
            props.setDestination(props.marker.position)
          }}>
            <ItemAbout marker={props.marker} showWorkload={true} />
            <div className='item__distance'>
              <div className='search__distance'>
                <img src={walkerImage} alt='walk distance' className='distance__image'/>
                {`${calculateDistance(props.myPosition, props.marker.position)}`}
              </div>
            </div>
          </li>
  );
}
