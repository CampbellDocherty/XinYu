import { useEffect, useMemo, useState } from 'react';
import useGetSunriseAndSunset from '../api/useGetLocation';
import useGetLocationByIp from '../api/useGetSunriseAndSunset copy';
import { Container, Disclaimer } from './styles';
import getCurrentTime from './timeCalculations/getCurrentTime';
import getLocalSunsetTime from './timeCalculations/getLocalSunsetTime';

const ONE_MINUTE = 60000;

const Playpiem = () => {
  const [lng, setLng] = useState<string | null>(null);
  const [lat, setLat] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(getCurrentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime);
    }, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);

  const { data, isLoading, isSuccess } = useGetLocationByIp();
  const {
    data: sunData,
    isLoading: sunDataLoading,
    isSuccess: sunDataSuccess,
  } = useGetSunriseAndSunset(lat, lng);

  const localSunsetTime = useMemo(() => {
    if (sunData) {
      const utcSunset = sunData.results.sunset;
      const sunsetTime = getLocalSunsetTime(utcSunset);
      return sunsetTime;
    }
  }, [sunData]);

  useEffect(() => {
    if (data) {
      const { loc: location } = data;
      const [userLat, userLng] = location.split(',');
      setLat(userLat);
      setLng(userLng);
    }
  }, [data]);

  const isNightTime = useMemo(() => {
    if (!time || !localSunsetTime) {
      return false;
    }
    if (time > localSunsetTime) {
      return true;
    }
    return false;
  }, [time, localSunsetTime]);

  if (isLoading || sunDataLoading) {
    return (
      <Container>
        <p>Locating...</p>
      </Container>
    );
  }

  if (isSuccess && sunDataSuccess) {
    return (
      <Container isNightTime={isNightTime}>
        <p>{data.city}</p>
        <p>Sunset: {localSunsetTime}</p>
        <Disclaimer>The location is determined by your ip address</Disclaimer>
      </Container>
    );
  }

  return null;
};

export default Playpiem;
