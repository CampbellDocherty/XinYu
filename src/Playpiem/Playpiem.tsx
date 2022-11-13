import useGetLocationByIp from '../api/useGetLocation';
import SunsetTime from './SunsetTime';

const Playpiem = () => {
  const { data, isLoading, isSuccess } = useGetLocationByIp();

  if (isLoading) {
    return <p>Locating...</p>;
  }

  if (isSuccess) {
    const { loc, city } = data;
    const [lat, lng] = loc.split(',');
    const location = { lat, lng, city };
    return <SunsetTime location={location} />;
  }

  return null;
};

export default Playpiem;
