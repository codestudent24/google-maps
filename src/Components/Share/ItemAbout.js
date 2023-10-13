import React from 'react';
import './ItemAbout.css';
import { RatingSVG } from './svg';

const computedWorkloadColor = (workload) => {
  if (workload > 8) return '#ED280B'
  if (workload > 7) return '#C74609'
  if (workload > 5) return '#956D06'
  if (workload > 3) return '#6F8B03'
  return '#3CB301'
}

export function ItemAbout(props) {
  return (
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
      <p className='item__worktime'>{`Открыто до ${props.marker.worktime_till}`}</p>
      {props.showWorkload && <p className='item__workload'>
        <span style={{color: computedWorkloadColor(props.marker.workload)}}>{`Нагруженность`}</span>
        <span style={{backgroundColor: computedWorkloadColor(props.marker.workload)}}>{props.marker.workload}</span>
      </p>}
    </div>
  );
}
