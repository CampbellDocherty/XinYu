import { createContext } from 'react';
import { Location } from '../schemas';

interface LocationContextType {
  readonly isLocating: boolean;
  readonly hasLocated: boolean;
  readonly errorLocating: boolean;
  readonly location: Location;
}

const LocationContext = createContext<LocationContextType>({
  isLocating: true,
  errorLocating: false,
  hasLocated: false,
  location: {
    city: '',
    lng: '',
    lat: '',
  },
});

export default LocationContext;
