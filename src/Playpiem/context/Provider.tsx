import { ReactNode, useEffect, useState } from 'react';
import useGetLocationByIp from '../../api/useGetLocation';
import useGetSunriseAndSunset from '../../api/useGetSunriseAndSunset';
import { ONE_MINUTE } from '../constants';
import useCalculateIsNightTime from '../hooks/useCalculateIsNightTime';
import useGetLocalTime from '../hooks/useGetLocalTime';
import useRefetchSunDataAtMidnight from '../hooks/useRefetchSunDataAtMidnight';
import { Location, Time } from '../schemas';
import getCurrentTime from '../timeCalculations/getCurrentTime';
import Context from './Context';

const DEFAULT_LONDON_LOCATION = {
  city: 'London',
  lng: '	-0.118092',
  lat: '51.509865',
};

const Provider = ({ children }: { readonly children: ReactNode }) => {
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
    isError: errorFetchingLocation,
  } = useGetLocationByIp();

  const {
    data: sunData,
    isLoading,
    isSuccess,
    refetch,
    isRefetching,
  } = useGetSunriseAndSunset(location);

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

  useEffect(() => {
    if (errorFetchingLocation) {
      setLocation(DEFAULT_LONDON_LOCATION);
    }
  }, [errorFetchingLocation]);

  const providerData = {
    isLocating,
    isLoading: isLoading || isRefetching,
    isSuccess,
    errorFetchingLocation,
    userHasBeenLocated,
    location,
    sunset: localSunsetTime?.readableTime,
    isNightTime,
  };

  return <Context.Provider value={providerData}>{children}</Context.Provider>;
};

export default Provider;
