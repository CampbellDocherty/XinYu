import { useMemo, useState } from 'react';
import useGetSunriseAndSunset from './api/useGetSunriseAndSunset';
import getLocation, { LONDON_LAT, LONDON_LNG } from './getLocation';

const getLocalTime = (utcTime: string) => {
  const localDateTime = new Date(utcTime);
  const localTime = localDateTime.toString().split(' ')[4];
  return localTime;
};

const Playpiem = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [lng, setLng] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);

  const { data, isSuccess } = useGetSunriseAndSunset(lat, lng);

  const onClickYes = () => {
    setIsLocating(true);
    const location = getLocation();
    setLat(location.lat);
    setLng(location.lng);
  };

  const onClickNo = () => {
    setLat(LONDON_LAT);
    setLng(LONDON_LNG);
  };

  const locationFound = isSuccess && data;

  const localSunsetTime = useMemo(() => {
    if (data) {
      const sunsetTime = getLocalTime(data.results.sunset);
      return sunsetTime;
    }
  }, [data]);

  return (
    <>
      <h1>
        Can we get your location? If you say no, we will just go with London!
      </h1>
      <button onClick={onClickYes}>Yes</button>
      <button onClick={onClickNo}>No</button>
      {isLocating && !locationFound && <p>Locating...</p>}
      {locationFound && <p>Sunset: {localSunsetTime}</p>}
    </>
  );
};

export default Playpiem;
