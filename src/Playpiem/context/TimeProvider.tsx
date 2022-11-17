import { ReactNode, useEffect, useState } from 'react';
import useGetLocationByIp from '../../api/useGetLocation';
import useGetSunriseAndSunset from '../../api/useGetSunriseAndSunset';
import { ONE_MINUTE } from '../constants';
import useCalculateIsNightTime from '../hooks/useCalculateIsNightTime';
import useGetLocalTime from '../hooks/useGetLocalTime';
import useRefetchSunDataAtMidnight from '../hooks/useRefetchSunDataAtMidnight';
import { Location, Time } from '../schemas';
import getCurrentTime from '../timeCalculations/getCurrentTime';
import SunsetContext from './TimeContext';

const TimeProvider = ({ children }: { readonly children: ReactNode }) => {
  const [location, setLocation] = useState<Location>({
    city: '',
    lng: '',
    lat: '',
  });
  const [time, setTime] = useState<Time>(getCurrentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime);
    }, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);

  const {
    data,
    isLoading: isLocating,
    isSuccess: userHasBeenLocated,
  } = useGetLocationByIp();

  const {
    data: sunData,
    isLoading,
    isSuccess,
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
    if (userHasBeenLocated) {
      const [lat, lng] = data.loc.split(',');
      setLocation({ city: data.city, lat, lng });
    }
  }, [data, userHasBeenLocated]);

  const providerData = {
    isLocating,
    isLoading: isLoading || isRefetching,
    isSuccess,
    userHasBeenLocated,
    location,
    sunset: localSunsetTime?.readableTime,
    isNightTime,
  };

  return (
    <SunsetContext.Provider value={providerData}>
      {children}
    </SunsetContext.Provider>
  );
};

export default TimeProvider;
