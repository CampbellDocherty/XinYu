import { useEffect, useState } from 'react';
import useGetSunriseAndSunset from './api/useGetLocation';
import useGetLocationByIp from './api/useGetSunriseAndSunset copy';
import { Container } from './styles';

const Holding = () => {
  const [lng, setLng] = useState<string | null>(null);
  const [lat, setLat] = useState<string | null>(null);

  const { data, isLoading, isSuccess } = useGetLocationByIp();
  const { data: sunData, isSuccess: sunDataSuccess } = useGetSunriseAndSunset(
    lat,
    lng
  );

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

  if (isSuccess && sunDataSuccess) {
    return (
      <Container>
        <p>{`${data.city}: ${data.loc}`}</p>
        <p>
          The sun will set at {sunData.results.sunset}, come back then to see
          the content
        </p>
      </Container>
    );
  }

  return null;
};

export default Holding;
