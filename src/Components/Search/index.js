import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { setFullData } from '../../features/dataSlice';
import './Search.css';
import { SearchItem } from './SearchItem';
import { ItemInfo } from '../ItemInfo';
import { getDataFromAPI } from './utils';
import { useState } from 'react';

export function Search() {
  const vtbData = useSelector((state) => state.vtbData.data)
  const myPosition = useSelector((state) => state.vtbData.myPosition)
  const [selectedItem, setSelectedItem] = useState(vtbData[0])
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getData(latitude, longitude) {
      const dataFromAPI = await getDataFromAPI(
        latitude - 0.2,
        longitude - 0.2,
        latitude + 0.2,
        longitude + 0.2
      )
      dispatch(setFullData(dataFromAPI))
      console.log(dataFromAPI)
    }
    if (myPosition.latitude && myPosition.longitude) getData(myPosition.latitude, myPosition.longitude)
  }, [dispatch, myPosition])

  return (
    <>
    {vtbData.length > 0 &&
      <>
          <div className='search'>
          <ul className='search__list'>
            {vtbData.map((point, index) =>
            <SearchItem
              point={point}
              key={index}
              setShowInfo={setShowInfo}
              setSelectedItem = {setSelectedItem}
            />
            )}
          </ul>
        </div>
        <ItemInfo point={selectedItem} showInfo={showInfo} setShowInfo={setShowInfo} />
      </>
    }
    {vtbData.length === 0 &&
    <div className='search'>
      <div
        className='search__empty'
        onClick={async () => {
          const dataFromAPI = await getDataFromAPI(
            // myPosition.latitude - 20,
            // myPosition.longitude - 100,
            // myPosition.latitude + 20,
            // myPosition.longitude + 20
            30, 30, 90, 180
          ) || []
          dispatch(setFullData(dataFromAPI))
          console.log(dataFromAPI)
        }}
      >
        Кажется, возле Bac отделений нет. Нажите здесь, чтобы расширить поиск!
      </div>
    </div>
    }
  </>
  );
}
