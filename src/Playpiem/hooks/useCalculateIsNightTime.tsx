import { useMemo } from 'react';
import { Time } from '../schemas';

interface CaluclateNightTimeHookArgs {
  readonly time: Time | null;
  readonly localSunriseTime: Time | undefined;
  readonly localSunsetTime: Time | undefined;
}

const useCalculateIsNightTime = ({
  time,
  localSunriseTime,
  localSunsetTime,
}: CaluclateNightTimeHookArgs) => {
  const isNightTime = useMemo(() => {
    if (!time || !localSunsetTime || !localSunriseTime) {
      return false;
    }
    const isAfterSunset = time.unixTime > localSunsetTime.unixTime;
    const isBeforeSunrise = time.unixTime < localSunriseTime.unixTime;
    if (isBeforeSunrise || isAfterSunset) {
      return true;
    }
    return false;
  }, [time, localSunsetTime, localSunriseTime]);

  return isNightTime;
};

export default useCalculateIsNightTime;
