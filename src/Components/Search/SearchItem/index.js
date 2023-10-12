import React, { useEffect } from 'react';
import { calculateDistance } from '../utils';
import './SearchItem.css';
import { RatingSVG } from './svg';
import walkerImage from '../../../assets/walker.png'

const computedWorkloadColor = (workload) => {
  if (workload > 8) return '#ED280B'
  if (workload > 7) return '#C74609'
  if (workload > 5) return '#956D06'
  if (workload > 3) return '#6F8B03'
  return '#3CB301'
}

export function SearchItem(props) {
  useEffect(() => {
    console.log('now destination is', props.destination)
  }, [props.destination])

  return (
          <li className="search__item flexbox" key={props.index} onClick={() => {
            props.setDestination(props.marker.position)
          }}>
            <div className='item__info'>
              <p className='item__name'>{props.marker.name}</p>
              <p className='item__address'>
                {`${props.marker.address.street}, ${props.marker.address.building},`}
                <br />
                {props.marker.address.city}
              </p>
              <p className='item__rating'>
                <RatingSVG rating={props.marker.rating}/>
                {props.marker.rating}
              </p>
              <p className='item__worktime'>{`работает ${props.marker.worktime}`}</p>
              <p className='item__workload'>
                <span style={{color: computedWorkloadColor(props.marker.workload)}}>{`Нагруженность`}</span>
                <span style={{backgroundColor: computedWorkloadColor(props.marker.workload)}}>{props.marker.workload}</span>
                </p>
            </div>
            <div className='item__distance'>
              <div className='search__distance'>
                <img src={walkerImage} alt='walk distance' className='distance__image'/>
                {`${calculateDistance(props.myPosition, props.marker.position)}`}
              </div>
            </div>
          </li>
  );
}
