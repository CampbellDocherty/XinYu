import { useEffect, useMemo, useState } from 'react';
import useGetSunriseAndSunset from '../api/useGetSunriseAndSunset';
import { MIDNIGHT_WITHOUT_SECONDS, ONE_MINUTE } from './constants';
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime);
    }, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);

  const {
    data: sunData,
    isLoading: sunDataLoading,
    isSuccess: sunDataSuccess,
    refetch,
  } = useGetSunriseAndSunset(lat, lng);

  useEffect(() => {
    if (time) {
      const { readableTime } = time;
      const timeWithoutSeconds = readableTime.split(':').slice(0, -1).join(':');

      const currentTimeIsMidnight =
        timeWithoutSeconds === MIDNIGHT_WITHOUT_SECONDS;

      if (currentTimeIsMidnight) {
        refetch();
      }
    }
  }, [time, refetch]);

  const localSunsetTime: Time | undefined = useMemo(() => {
    if (sunData) {
      const utcSunset = sunData.results.sunset;
      const sunsetTime = getLocalSunsetTime(utcSunset);
      return sunsetTime;
    }
  }, [sunData]);

  const localSunriseTime: Time | undefined = useMemo(() => {
    if (sunData) {
      const utcSunrise = sunData.results.sunrise;
      const sunriseTime = getLocalSunsetTime(utcSunrise);
      return sunriseTime;
    }
  }, [sunData]);
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

  if (sunDataLoading) {
    return (
      <Container>
        <p>Locating...</p>
      </Container>
    );
  }

  if (sunDataSuccess) {
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
