import { createContext } from 'react';
import { Location } from '../schemas';

interface TimeContextType {
  readonly isLoading: boolean;
  readonly isLocating: boolean;
  readonly userHasBeenLocated: boolean;
  readonly isSuccess: boolean;
  readonly location: Location;
  readonly isNightTime: boolean | undefined;
  readonly sunset: string | undefined;
}

const TimeContext = createContext<TimeContextType>({
  isLoading: true,
  isLocating: true,
  isSuccess: false,
  userHasBeenLocated: false,
  isNightTime: undefined,
  location: {
    city: '',
    lng: '',
    lat: '',
  },
  sunset: '',
});

export default TimeContext;
