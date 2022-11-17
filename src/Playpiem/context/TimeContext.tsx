import { createContext } from 'react';

interface TimeContextType {
  readonly isLoading: boolean;
  readonly isLocating: boolean;
  readonly userHasBeenLocated: boolean;
  readonly isSuccess: boolean;
  readonly city: string;
  readonly isNightTime: boolean | undefined;
  readonly sunset: string | undefined;
}

const TimeContext = createContext<TimeContextType>({
  isLoading: true,
  isLocating: true,
  isSuccess: false,
  userHasBeenLocated: false,
  city: '',
  isNightTime: undefined,
  sunset: '',
});

export default TimeContext;
