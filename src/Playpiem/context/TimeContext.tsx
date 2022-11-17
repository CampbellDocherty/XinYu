import { createContext } from 'react';
import { Time } from '../schemas';

interface TimeContextType {
  readonly sunsetTime: Time;
  readonly sunriseTime: Time;
  readonly currentTime: Time;
  readonly isNightTime: boolean | undefined;
  readonly setSunsetTime: React.Dispatch<React.SetStateAction<Time>>;
  readonly setSunriseTime: React.Dispatch<React.SetStateAction<Time>>;
  readonly setCurrentTime: React.Dispatch<React.SetStateAction<Time>>;
  readonly setIsNightTime: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
}

export const defaultData = {
  sunsetTime: {
    unixTime: 0,
    readableTime: '',
  },
  sunriseTime: {
    unixTime: 0,
    readableTime: '',
  },
  currentTime: {
    unixTime: 0,
    readableTime: '',
  },
  isNightTime: undefined,
};

const TimeContext = createContext<TimeContextType>({
  ...defaultData,
  setSunsetTime: () => {},
  setCurrentTime: () => {},
  setSunriseTime: () => {},
  setIsNightTime: () => {},
});

export default TimeContext;
