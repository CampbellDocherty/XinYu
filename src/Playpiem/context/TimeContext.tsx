import { createContext } from 'react';

interface TimeContextType {
  readonly isLoading: boolean;
  readonly isSuccess: boolean;
  readonly city: string;
  readonly isNightTime: boolean | undefined;
  readonly sunset: string | undefined;
}

const TimeContext = createContext<TimeContextType>({
  isLoading: true,
  isSuccess: false,
  city: '',
  isNightTime: undefined,
  sunset: '',
});

export default TimeContext;
