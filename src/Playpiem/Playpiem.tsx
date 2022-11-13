import { useEffect, useState } from 'react';
import useGetLocationByIp from '../api/useGetLocation';
import { SunsetTime } from './SunsetTime';
import { Container, Disclaimer } from './styles';

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
    return (
      <Container>
        <p>Locating...</p>
      </Container>
    );
  }

  if (isSuccess && lat && lng) {
    return (
      <Container>
        <SunsetTime lat={lat} lng={lng} city={data.city} />
        <Disclaimer>The location is determined by your ip address</Disclaimer>
      </Container>
    );
  }

  return null;
};

export default Playpiem;
