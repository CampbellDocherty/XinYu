import { useState } from 'react';
import useGetSunriseAndSunset from './api/useGetSunriseAndSunset';

const LONDON_LAT = 51.4790946;
const LONDON_LNG = -0.2820046;

const Playpiem = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [lng, setLng] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);

  const { data } = useGetSunriseAndSunset(lat, lng);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLat(LONDON_LAT);
      setLng(LONDON_LNG);
      return;
    } else {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setIsLocating(false);
        },
        () => {
          return null;
        }
      );
    }
  };

  const onClick = () => {
    getLocation();
  };

  const onClickNo = () => {
    setLat(LONDON_LAT);
    setLng(LONDON_LNG);
  };

  const locationFound = !!lng && !!lat;

  return (
    <>
      <h1>
        Can we get your location? If you say no, we will just go with London!
      </h1>
      <button onClick={onClick}>Yes</button>
      <button onClick={onClickNo}>No</button>
      {isLocating && <p>Locating...</p>}
      {locationFound && <p>London</p>}
      {locationFound && <p>Sunset: {data?.results.sunset}</p>}
    </>
  );
};

export default Playpiem;
