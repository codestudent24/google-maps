import React from 'react';
import { YMaps, Map, SearchControl } from 'react-yandex-maps'
import './Map.css';
import ErrorBoundary from '../../ErrorBoundary';

const mapState = { center: [55.76, 37.64], zoom: 13 };
/*
const mapOptions = {
  // modules: ["geocode", "SuggestView"],
  // defaultOptions: { suppressMapOpenBlock: true },
  width: 600,
  height: 400,
};

const geolocationOptions = {
  defaultOptions: { maxWidth: 128 },
  defaultData: { content: "Determine" },
};

const initialState = {
  title: "",
  center: [55.749451, 37.542824],
  zoom: 12,
};
*/
export const MapComponent = () => {
  return (
    <YMaps
      query={{ apikey: "130cd972-fc9d-481f-9532-88691fb09c97", lang: "ru_RU" }}
    >
      <ErrorBoundary fallback="error">
        <Map state={mapState} width={"800px"} height={"600px"} >
          <SearchControl  options={{
            float: "right",
            floatIndex: 300,
            provider: "yandex#search",
            geoObjectStandardPreset: "islands#blueDotIcon",
            placeholderContent: "Поиск мест и адресов",
            maxWidth: 320,
            size: "large" }} />
        </Map>
      </ErrorBoundary>
      <div className='map-container'>
      </div>
    </YMaps>
  )
}