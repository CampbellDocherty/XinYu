import { useQuery } from 'react-query';
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

const useGetSunriseAndSunset = (lat: number | null, lng: number | null) => {
  const fetchApi = useFetchApi();

  const locationAvailable = !!lat && !!lng;

  return useQuery(
    'GET_SUNRISE_AND_SUNSET',
    (): Promise<SunriseAndSunsetResponse> =>
      fetchApi(
        'https://api.sunrise-sunset.org/json?lat=51.4790545&lng=-0.2820995&date=today'
      ),
    { enabled: locationAvailable }
  );
};

export default useGetSunriseAndSunset;
