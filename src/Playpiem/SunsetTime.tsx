import { useEffect, useMemo, useState } from 'react';
import useGetSunriseAndSunset from '../api/useGetSunriseAndSunset';
import { ONE_MINUTE } from './constants';
import useRefetchSunDataAtMidnight from './hooks/useRefetchSunDataAtMidnight';
import PlaySvg from './icons/PlaySvg';
import { Time } from './schemas';
import { CityText, Container, IconWrapper, Lock } from './styles';
import getCurrentTime from './timeCalculations/getCurrentTime';
import getLocalSunsetTime from './timeCalculations/getLocalSunsetTime';

export const SunsetTime = ({
  lat,
  lng,
  city,
}: {
  readonly lat: string;
  readonly lng: string;
  readonly city: string;
}) => {
  const [time, setTime] = useState<Time | null>(getCurrentTime);

  const { data, isLoading, isSuccess, refetch } = useGetSunriseAndSunset(
    lat,
    lng
  );
  useRefetchSunDataAtMidnight(time, refetch);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime);
    }, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);

  const localSunsetTime: Time | undefined = useMemo(() => {
    if (data) {
      const utcSunset = data.results.sunset;
      const sunsetTime = getLocalSunsetTime(utcSunset);
      return sunsetTime;
    }
  }, [data]);

  const localSunriseTime: Time | undefined = useMemo(() => {
    if (data) {
      const utcSunrise = data.results.sunrise;
      const sunriseTime = getLocalSunsetTime(utcSunrise);
      return sunriseTime;
    }
  }, [data]);
  const isNightTime = useMemo(() => {
    if (!time || !localSunsetTime || !localSunriseTime) {
      return false;
    }
    const isAfterSunset = time.unixTime > localSunsetTime.unixTime;
    const isBeforeSunrise = time.unixTime < localSunriseTime.unixTime;
    if (isBeforeSunrise || isAfterSunset) {
      return true;
    }
    return false;
  }, [time, localSunsetTime, localSunriseTime]);

  if (isLoading) {
    return (
      <Container>
        <p>Locating...</p>
      </Container>
    );
  }

  if (isSuccess) {
    return (
      <>
        <CityText>{city}</CityText>
        <IconWrapper isNightTime={isNightTime}>
          <PlaySvg />
          <Lock isNightTime={isNightTime} />
        </IconWrapper>
        <p>Sunset: {localSunsetTime?.readableTime}</p>
      </>
    );
  }

  return null;
};
