import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { setFullData } from '../../features/dataSlice';
import './Search.css';
import { SearchItem } from './SearchItem';
import { ItemInfo } from '../ItemInfo';
import { findItem } from './utils';
import { getDataFromAPI } from './utils';
import { useState } from 'react';

export function Search() {
  const vtbData = useSelector((state) => state.vtbData.data)
  const destination = useSelector((state) => state.vtbData.destination)
  const [selectedItem, setSelectedItem] = useState(vtbData[0])
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getData() {
      const dataFromAPI = await getDataFromAPI()
      dispatch(setFullData(dataFromAPI))
      console.log(dataFromAPI)
    }
    getData()
  }, [dispatch])

  return (
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
  );
}
