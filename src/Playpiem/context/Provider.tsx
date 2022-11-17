import { ReactNode, useContext, useEffect, useState } from 'react';
import useGetSunriseAndSunset from '../../api/useGetSunriseAndSunset';
import { ONE_MINUTE } from '../constants';
import useCalculateIsNightTime from '../hooks/useCalculateIsNightTime';
import useGetLocalTime from '../hooks/useGetLocalTime';
import useRefetchSunDataAtMidnight from '../hooks/useRefetchSunDataAtMidnight';
import { Time } from '../schemas';
import getCurrentTime from '../timeCalculations/getCurrentTime';
import Context from './Context';
import LocationContext from './LocationContext';

const Provider = ({ children }: { readonly children: ReactNode }) => {
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

  return <Context.Provider value={providerData}>{children}</Context.Provider>;
};

export default Provider;
