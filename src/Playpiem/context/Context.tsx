import { createContext } from 'react';
import { Location } from '../schemas';

interface ContextType {
  readonly isLoading: boolean;
  readonly isLocating: boolean;
  readonly userHasBeenLocated: boolean;
  readonly isSuccess: boolean;
  readonly errorFetchingLocation: boolean;
  readonly location: Location;
  readonly isNightTime: boolean | undefined;
  readonly sunset: string | undefined;
}

const Context = createContext<ContextType>({
  isLoading: true,
  isLocating: true,
  isSuccess: false,
  errorFetchingLocation: false,
  userHasBeenLocated: false,
  isNightTime: undefined,
  location: {
    city: '',
    lng: '',
    lat: '',
  },
  sunset: '',
});

export default Context;
