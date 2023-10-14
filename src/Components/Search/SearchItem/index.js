import React from 'react';
import { useSelector } from 'react-redux'
import { calculateDistance } from '../utils';
import walkerImage from '../../../assets/walker.png'
import { ItemAbout } from '../../Share/ItemAbout';
import './SearchItem.css';

export function SearchItem(props) {
  const myPosition = useSelector((state) => state.vtbData.myPosition)

  return (
          <li className="search__item flexbox" onClick={() => {
            props.setShowInfo(true)
            props.setSelectedItem(props.point)
          }}>
            {props.point && <ItemAbout point={props.point} showWorkload={true} />}
            <div className='item__distance'>
              <div className='search__distance'>
                <img src={walkerImage} alt='walk distance' className='distance__image'/>
                {`${calculateDistance([myPosition.latitude, myPosition.longitude], [props.point.latitude, props.point.longitude])}`}
              </div>
            </div>
          </li>
  );
}
