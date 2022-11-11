import { useQuery } from 'react-query';
import { IP_LOCATION_TOKEN } from '../Playpiem/constants';
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
  console.log(IP_LOCATION_TOKEN);
  return useQuery(
    'GET_LOCATION_BY_IP',
    (): Promise<IpLocationResponse> =>
      fetchApi(`https://ipinfo.io/json?token=${IP_LOCATION_TOKEN}`)
  );
};

export default useGetLocationByIp;
