import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetSunriseAndSunset from '../api/useGetSunriseAndSunset';
import { ONE_MINUTE } from './constants';
import TimeContext from './context/TimeContext';
import useCalculateIsNightTime from './hooks/useCalculateIsNightTime';
import useGetLocalTime from './hooks/useGetLocalTime';
import useRefetchSunDataAtMidnight from './hooks/useRefetchSunDataAtMidnight';
import PlaySvg from './icons/PlaySvg';
import { Time } from './schemas';
import { CityText, Disclaimer, IconWrapper, Lock, PlayButton } from './styles';
import getCurrentTime from './timeCalculations/getCurrentTime';

type LocationProps = {
  readonly lat: string;
  readonly lng: string;
  readonly city: string;
};

const SunsetTime = ({ location }: { readonly location: LocationProps }) => {
  const { lat, lng, city } = location;
  const navigate = useNavigate();
  const timeContext = useContext(TimeContext);
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

  useEffect(() => {
    console.log(isNightTime);
    const { setCurrentTime, setIsNightTime, setSunriseTime, setSunsetTime } =
      timeContext;
    if (time) setCurrentTime(time);
    if (localSunriseTime) setSunriseTime(localSunriseTime);
    if (localSunsetTime) setSunsetTime(localSunsetTime);
    setIsNightTime(isNightTime);
  }, [localSunriseTime, localSunsetTime, isNightTime, time, timeContext]);

  if (isLoading || isRefetching) {
    return <p>Locating...</p>;
  }

  const onClick = () => {
    if (!isNightTime) {
      return;
    }

    navigate('/night');
  };

  if (isSuccess && localSunsetTime) {
    return (
      <>
        <CityText>{city}</CityText>
        <IconWrapper isNightTime={isNightTime}>
          <PlayButton onClick={onClick} isNightTime={isNightTime}>
            <PlaySvg />
          </PlayButton>
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
