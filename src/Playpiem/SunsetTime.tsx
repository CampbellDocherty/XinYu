import { useEffect, useState } from 'react';
import useGetSunriseAndSunset from '../api/useGetSunriseAndSunset';
import { ONE_MINUTE } from './constants';
import useCalculateIsNightTime from './hooks/useCalculateIsNightTime';
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime);
    }, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);

  const { data, isLoading, isSuccess, refetch, isRefetching } =
    useGetSunriseAndSunset(lat, lng);

  useRefetchSunDataAtMidnight(time, refetch);

  const localSunsetTime = useGetLocalTime(data?.results.sunset);
  const localSunriseTime = useGetLocalTime(data?.results.sunrise);

  const isNightTime = useCalculateIsNightTime({
    time,
    localSunriseTime,
    localSunsetTime,
  });

  if (isLoading || isRefetching) {
    return (
      <Container>
        <p>Locating...</p>
      </Container>
    );
  }

  if (isSuccess && localSunsetTime) {
    return (
      <div>
        <CityText>{city}</CityText>
        <IconWrapper isNightTime={isNightTime}>
          <PlaySvg />
          <Lock isNightTime={isNightTime} />
        </IconWrapper>
        <p>Sunset: {localSunsetTime.readableTime}</p>
      </div>
    );
  }

  return null;
};
