import { ReactNode, useContext, useEffect, useState } from 'react';
import useGetSunriseAndSunset from '../../api/useGetSunriseAndSunset';
import { ONE_MINUTE } from '../constants';
import useCalculateIsNightTime from '../hooks/useCalculateIsNightTime';
import useGetLocalTime from '../hooks/useGetLocalTime';
import useRefetchSunDataAtMidnight from '../hooks/useRefetchSunDataAtMidnight';
import { Time } from '../schemas';
import getCurrentTime from '../timeCalculations/getCurrentTime';
import LocationContext from './LocationContext';
import TimeContext from './TimeContext';

const TimeProvider = ({ children }: { readonly children: ReactNode }) => {
  const { location } = useContext(LocationContext);
  const [time, setTime] = useState<Time>(getCurrentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime);
    }, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);

  const { data, isLoading, isSuccess, isError, refetch, isRefetching } =
    useGetSunriseAndSunset(location);

  useRefetchSunDataAtMidnight(time, refetch);

  const localSunsetTime = useGetLocalTime(data?.results.sunset);
  const localSunriseTime = useGetLocalTime(data?.results.sunrise);

  const isNightTime = useCalculateIsNightTime({
    time,
    localSunriseTime,
    localSunsetTime,
  });

  const providerData = {
    isLoading: isLoading || isRefetching,
    isSuccess,
    isError,
    sunset: localSunsetTime?.readableTime,
    isNightTime,
  };

  return (
    <TimeContext.Provider value={providerData}>{children}</TimeContext.Provider>
  );
};

export default TimeProvider;
