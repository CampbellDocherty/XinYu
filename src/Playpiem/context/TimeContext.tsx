import { createContext } from 'react';

interface TimeContextType {
  readonly isLoading: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;
  readonly isNightTime: boolean | undefined;
  readonly sunset: string | undefined;
}

const TimeContext = createContext<TimeContextType>({
  isLoading: true,
  isSuccess: false,
  isError: false,
  isNightTime: undefined,
  sunset: '',
});

export default TimeContext;
