import { useEffect, useMemo, useState } from 'react';
import useGetSunriseAndSunset from './api/useGetLocation';
import useGetLocationByIp from './api/useGetSunriseAndSunset copy';
import getLocation, { LONDON_LAT, LONDON_LNG } from './getLocation';
import {
  ButtonWrapper,
  ConsentButton,
  Container,
  LocationConsentWrapper,
} from './styles';

const getLocalSunsetTime = (utcTime: string) => {
  const localDateTime = new Date(utcTime);
  console.log(localDateTime);
  const localTime = localDateTime.toString().split(' ')[4];
  return localTime;
};

const getCurrentTime = () => {
  const localDateTime = new Date();
  const localTime = localDateTime.toString().split(' ')[4];
  return localTime;
};

const Playpiem = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [lng, setLng] = useState<string | null>(null);
  const [lat, setLat] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const { data, isLoading } = useGetSunriseAndSunset(lat, lng);
  const { data: ipData, isLoading: ipIsLoading } = useGetLocationByIp();
  console.log(ipData, ipIsLoading);

  const onClickYes = async () => {
    setIsLocating(true);
    const location = await getLocation();
    setLat(location.lat);
    setLng(location.lng);
    setIsLocating(false);
  };

  const onClickNo = () => {
    setLat(LONDON_LAT);
    setLng(LONDON_LNG);
  };

  const localSunsetTime = useMemo(() => {
    if (data) {
      const utcSunset = data.results.sunset;
      const sunsetTime = getLocalSunsetTime(utcSunset);
      return sunsetTime;
    }
  }, [data]);

  useEffect(() => {
    const currentTime = getCurrentTime();
    setTime(currentTime);
  }, []);

  const isNightTime = useMemo(() => {
    if (!time || !localSunsetTime) {
      return false;
    }
    if (time > localSunsetTime) {
      return true;
    }
    return false;
  }, [time, localSunsetTime]);

  return (
    <Container isNightTime={isNightTime}>
      {!data && !isLoading && !isLocating && (
        <LocationConsentWrapper>
          <p>Can we use your location?</p>
          <ButtonWrapper>
            <ConsentButton onClick={onClickYes}>Yes</ConsentButton>
            <ConsentButton onClick={onClickNo}>No</ConsentButton>
          </ButtonWrapper>
        </LocationConsentWrapper>
      )}
      {(isLocating || isLoading) && <p>Locating...</p>}
      {localSunsetTime && <p>Sunset: {localSunsetTime}</p>}
    </Container>
  );
};

export default Playpiem;
