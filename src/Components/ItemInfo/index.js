import React from 'react'
import vtbImage from '../../assets/vtb-image.png'
import { ButtonContainer } from './ButtonContainer'
import './ItemInfo.css'
import { ItemAbout } from '../Share/ItemAbout'
import { ItemDescription } from './ItemDescription'

const resize = (isShow) => {
  return isShow ? 'item-description' : 'item-description hidden'
}

export const ItemInfo = (props) => {
  return (
    <div className={resize(props.showInfo)} >
      <div
        className='item-description__close'
        onClick={() => {props.setShowInfo(false)}}
      >
        <span>x</span>
      </div>
      <img src={vtbImage} alt="vtb" className='item-description__image' />
      {props.point && <ItemAbout point = {props.point} />}
      <ButtonContainer setShowInfo={props.setShowInfo} latitude={props.point.latitude} longitude={props.point.longitude} />
      <ItemDescription />
    </div>
  )
}