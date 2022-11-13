import { useMemo } from 'react';
import { Time } from '../schemas';
import convertUtcTimeToLocalTime from '../timeCalculations/getLocalSunsetTime';

const useGetLocalTime = (utcTime: string | undefined) => {
  const localTime: Time | undefined = useMemo(() => {
    if (utcTime) {
      const time = convertUtcTimeToLocalTime(utcTime);
      return time;
    }
  }, [utcTime]);

  return localTime;
};

export default useGetLocalTime;
