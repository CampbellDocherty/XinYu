import { useQuery } from 'react-query';
import useFetchApi from './useFetchApi';

type IpLocationResponse = {
  readonly ip: string;
  readonly city: string;
  readonly region: string;
  readonly country: string;
  readonly loc: string;
  readonly org: string;
  readonly postal: string;
  readonly timezone: string;
};

const useGetLocationByIp = () => {
  const fetchApi = useFetchApi();
  return useQuery(
    'GET_LOCATION_BY_IP',
    (): Promise<IpLocationResponse> =>
      fetchApi(`https://ipinfo.io/json?token=a5e5afb9617ec8`)
  );
};

export default useGetLocationByIp;
