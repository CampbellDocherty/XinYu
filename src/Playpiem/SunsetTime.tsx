import { useEffect, useState } from 'react';
import useGetSunriseAndSunset from '../api/useGetSunriseAndSunset';
import { ONE_MINUTE } from './constants';
import useCalculateIsNightTime from './hooks/useCalculateIsNightTime';
import useGetLocalTime from './hooks/useGetLocalTime';
import useRefetchSunDataAtMidnight from './hooks/useRefetchSunDataAtMidnight';
import PlaySvg from './icons/PlaySvg';
import { Time } from './schemas';
import { CityText, Disclaimer, IconWrapper, Lock } from './styles';
import getCurrentTime from './timeCalculations/getCurrentTime';

type LocationProps = {
  readonly lat: string;
  readonly lng: string;
  readonly city: string;
};

const SunsetTime = ({ location }: { readonly location: LocationProps }) => {
  const { lat, lng, city } = location;
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
    return <p>Locating...</p>;
  }

  if (isSuccess && localSunsetTime) {
    return (
      <>
        <CityText>{city}</CityText>
        <IconWrapper isNightTime={isNightTime}>
          <PlaySvg />
          <Lock isNightTime={isNightTime} />
        </IconWrapper>
        <p>Sunset: {localSunsetTime.readableTime}</p>
        <Disclaimer>The location is determined by your ip address</Disclaimer>
      </>
    );
  }

  return null;
};

export default SunsetTime;
