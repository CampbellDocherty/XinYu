import { ReactNode, useEffect, useState } from 'react';
import useGetLocationByIp from '../../api/useGetLocation';
import useGetSunriseAndSunset from '../../api/useGetSunriseAndSunset';
import { ONE_MINUTE } from '../constants';
import useCalculateIsNightTime from '../hooks/useCalculateIsNightTime';
import useGetLocalTime from '../hooks/useGetLocalTime';
import useRefetchSunDataAtMidnight from '../hooks/useRefetchSunDataAtMidnight';
import { Time } from '../schemas';
import getCurrentTime from '../timeCalculations/getCurrentTime';
import SunsetContext from './TimeContext';

const TimeProvider = ({ children }: { readonly children: ReactNode }) => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState<{
    readonly lng: string;
    readonly lat: string;
  }>({ lng: '', lat: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const [time, setTime] = useState<Time | null>(getCurrentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime);
    }, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);

  const {
    data,
    isLoading: isLocating,
    isSuccess: locatingSuccess,
  } = useGetLocationByIp();
  const {
    data: sunData,
    isLoading: isLoadingSunData,
    isSuccess: sundataSuccess,
    refetch,
    isRefetching,
  } = useGetSunriseAndSunset(location.lat, location.lng);

  useRefetchSunDataAtMidnight(time, refetch);

  const localSunsetTime = useGetLocalTime(sunData?.results.sunset);
  const localSunriseTime = useGetLocalTime(sunData?.results.sunrise);

  const isNightTime = useCalculateIsNightTime({
    time,
    localSunriseTime,
    localSunsetTime,
  });

  useEffect(() => {
    if (!isLocating && !isLoadingSunData && !isRefetching) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isLocating, isLoadingSunData, isRefetching]);

  useEffect(() => {
    if (!sundataSuccess && !locatingSuccess) {
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
    }
  }, [sundataSuccess, locatingSuccess]);

  useEffect(() => {
    if (locatingSuccess) {
      const [lat, lng] = data.loc.split(',');
      setLocation({ lat, lng });
      setCity(data.city);
    }
  }, [data, locatingSuccess]);

  const providerData = {
    isLoading,
    isSuccess,
    sunset: localSunsetTime?.readableTime,
    city,
    isNightTime,
  };

  return (
    <SunsetContext.Provider value={providerData}>
      {children}
    </SunsetContext.Provider>
  );
};

export default TimeProvider;
