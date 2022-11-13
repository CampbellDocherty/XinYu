import { useEffect, useState } from 'react';
import useGetLocationByIp from '../api/useGetLocation';
import SunsetTime from './SunsetTime';

const Playpiem = () => {
  const [lng, setLng] = useState<string | null>(null);
  const [lat, setLat] = useState<string | null>(null);

  const { data, isLoading, isSuccess } = useGetLocationByIp();

  useEffect(() => {
    if (data) {
      const { loc: location } = data;
      const [userLat, userLng] = location.split(',');
      setLat(userLat);
      setLng(userLng);
    }
  }, [data]);

  if (isLoading) {
    return <p>Locating...</p>;
  }

  if (isSuccess && lat && lng) {
    return <SunsetTime lat={lat} lng={lng} city={data.city} />;
  }

  return null;
};

export default Playpiem;
