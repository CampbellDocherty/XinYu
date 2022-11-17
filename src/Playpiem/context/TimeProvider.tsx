import { ReactNode, useState } from 'react';
import SunsetContext, { defaultData } from './TimeContext';

const TimeProvider = ({ children }: { readonly children: ReactNode }) => {
  const [sunsetTime, setSunsetTime] = useState(defaultData.sunsetTime);
  const [sunriseTime, setSunriseTime] = useState(defaultData.sunriseTime);
  const [currentTime, setCurrentTime] = useState(defaultData.currentTime);
  const [isNightTime, setIsNightTime] = useState<boolean | undefined>(
    defaultData.isNightTime
  );

  const data = {
    sunsetTime,
    sunriseTime,
    currentTime,
    isNightTime,
    setIsNightTime,
    setCurrentTime,
    setSunriseTime,
    setSunsetTime,
  };

  return (
    <SunsetContext.Provider value={data}>{children}</SunsetContext.Provider>
  );
};

export default TimeProvider;
