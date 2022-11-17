import { useQuery } from 'react-query';
import { Location } from '../Playpiem/schemas';
import useFetchApi from './useFetchApi';

enum SunriseApiStatus {
  OK = 'OK',
  INVALID_REQUEST = 'INVALID_REQUEST',
  INVALID_DATE = 'INVALID_DATE',
  UNKOWN_ERROR = 'UNKOWN_ERROR',
}

type SunriseAndSunsetData = {
  readonly sunrise: string;
  readonly sunset: string;
  readonly day_length: string;
};

type SunriseAndSunsetResponse = {
  readonly results: SunriseAndSunsetData;
  readonly status: SunriseApiStatus;
};

const useGetSunriseAndSunset = (location: Location) => {
  const fetchApi = useFetchApi();
  const { lng, lat } = location;
  const locationAvailable = !!lng && !!lat;
  return useQuery(
    'GET_SUNRISE_AND_SUNSET',
    (): Promise<SunriseAndSunsetResponse> =>
      fetchApi(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today&formatted=0`
      ),
    { enabled: locationAvailable }
  );
};

export default useGetSunriseAndSunset;
