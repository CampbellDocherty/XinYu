import useGetLocationByIp from '../api/useGetLocation';
import SunsetTime from './SunsetTime';

const Playpiem = () => {
  const { data, isLoading, isSuccess } = useGetLocationByIp();

  if (isLoading) {
    return <p>Locating...</p>;
  }

  if (isSuccess) {
    const { loc: location } = data;
    const [lat, lng] = location.split(',');
    return <SunsetTime lat={lat} lng={lng} city={data.city} />;
  }

  return null;
};

export default Playpiem;
