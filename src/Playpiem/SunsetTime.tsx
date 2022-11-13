import { useEffect, useMemo, useState } from 'react';
import useGetSunriseAndSunset from '../api/useGetSunriseAndSunset';
import { ONE_MINUTE } from './constants';
import useGetLocalTime from './hooks/useGetLocalTime';
import useRefetchSunDataAtMidnight from './hooks/useRefetchSunDataAtMidnight';
import PlaySvg from './icons/PlaySvg';
import { Time } from './schemas';
import { CityText, Container, IconWrapper, Lock } from './styles';
import getCurrentTime from './timeCalculations/getCurrentTime';

type SunsetTimeProps = {
  readonly lat: string;
  readonly lng: string;
  readonly city: string;
};

export const SunsetTime = ({ lat, lng, city }: SunsetTimeProps) => {
  const [time, setTime] = useState<Time | null>(getCurrentTime);

  const { data, isLoading, isSuccess, refetch, isRefetching } =
    useGetSunriseAndSunset(lat, lng);

  useRefetchSunDataAtMidnight(time, refetch);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime);
    }, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);

  const localSunsetTime = useGetLocalTime(data?.results.sunset);
  const localSunriseTime = useGetLocalTime(data?.results.sunrise);

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

  if (isLoading || isRefetching) {
    return (
      <Container>
        <p>Locating...</p>
      </Container>
    );
  }

  if (isSuccess) {
    return (
      <div>
        <CityText>{city}</CityText>
        <IconWrapper isNightTime={isNightTime}>
          <PlaySvg />
          <Lock isNightTime={isNightTime} />
        </IconWrapper>
        <p>Sunset: {localSunsetTime?.readableTime}</p>
      </div>
    );
  }

  return null;
};
