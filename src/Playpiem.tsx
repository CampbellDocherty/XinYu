import { useState } from 'react';
import useGetSunriseAndSunset from './api/useGetSunriseAndSunset';

const Playpiem = () => {
  const [consented, setConsented] = useState(false);
  const [lng, setLng] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);

  const { data } = useGetSunriseAndSunset();
  console.log({ data });

  const getLocation = () => {
    if (!navigator.geolocation) {
      return null;
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          return null;
        }
      );
    }
  };

  const onClick = () => {
    setConsented(true);
    getLocation();
  };

  return (
    <>
      <h1>Can we get your location?</h1>
      <button onClick={onClick}>Yes</button>
      <button>No</button>
      {consented && <p>London</p>}
      {consented && <p>Sunset: 20:00</p>}
      {lng && <p>{lng}</p>}
      {lat && <p>{lat}</p>}
    </>
  );
};

export default Playpiem;
