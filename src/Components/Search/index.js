import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { setFullData } from '../../features/dataSlice';
import { SearchItem } from './SearchItem';
import { ItemInfo } from '../ItemInfo';
import { getDataFromAPI } from './utils';
import './Search.css';

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
          const dataFromAPI = await getDataFromAPI(41, 30, 77, 180) || []
          dispatch(setFullData(dataFromAPI))
        }}
      >
        Кажется, возле Bac отделений нет. Нажите здесь, чтобы расширить поиск!
      </div>
    </div>
    }
  </>
  );
}
