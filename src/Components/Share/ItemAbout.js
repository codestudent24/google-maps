import React from 'react';
import { RatingSVG } from './svg';
import './ItemAbout.css';

const computedWorkloadColor = (workload=3) => {
  if (workload > 8) return '#ED280B'
  if (workload > 7) return '#C74609'
  if (workload > 5) return '#956D06'
  if (workload > 3) return '#6F8B03'
  return '#3CB301'
}

export function ItemAbout(props) {
  const workload = Math.round(props.point.waiting_time / 10)
  let rating = Math.floor((110 - props.point.waiting_time) / 20)
  if (rating > 5) rating = 5
  return (
    <div className='item__info'>
      <p className='item__name'>{props.point.name || 'ВТБ'}</p>
      <p className='item__address'>
        {`${props.point.street}, ${props.point.house},`}
        <br />
        {props.point.city}
      </p>
      <p className='item__rating'>
        <RatingSVG rating={rating}/>
        {rating}
      </p>
      <p className='item__worktime'>{`Открыто до ${props.point.schedule_till.slice(0, -3)}`}</p>
      {props.showWorkload && <p className='item__workload'>
        <span style={{color: computedWorkloadColor(workload)}}>{`Нагруженность`}</span>
        <span style={{backgroundColor: computedWorkloadColor(workload)}}>{Math.round(workload)}</span>
      </p>}
    </div>
  );
}
