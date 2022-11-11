import useGetLocationByIp from './api/useGetSunriseAndSunset copy';

const Holding = () => {
  const { isLoading } = useGetLocationByIp();

  if (isLoading) {
    return <p>Locating...</p>;
  }
  return null;
};

export default Holding;
