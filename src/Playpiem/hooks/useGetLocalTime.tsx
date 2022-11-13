import { useMemo } from 'react';
import { Time } from '../schemas';
import getLocalSunsetTime from '../timeCalculations/getLocalSunsetTime';

const useGetLocalTime = (utcTime: string | undefined) => {
  const localTime: Time | undefined = useMemo(() => {
    if (utcTime) {
      const time = getLocalSunsetTime(utcTime);
      return time;
    }
  }, [utcTime]);

  return localTime;
};

export default useGetLocalTime;
