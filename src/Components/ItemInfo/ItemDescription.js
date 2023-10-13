import React, { useState } from 'react'

const isActive = (current, active) => {
  return current === active ? 'button-description active' : 'button-description'
}

export const ItemDescription = () => {
  const [active, setActive] = useState(0)
  return (
    <>
      <div className='button-container'>
        <button className={isActive(0, active)} onClick={() => {setActive(0)}}>Нагруженность</button>
        <button className={isActive(1, active)} onClick={() => {setActive(1)}}>Отзывы</button>
        <button className={isActive(2, active)} onClick={() => {setActive(2)}}>Особенности</button>
      </div>
      <hr />
    </>
  )
}