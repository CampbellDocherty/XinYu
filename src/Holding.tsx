import useGetLocationByIp from './api/useGetSunriseAndSunset copy';
import { Container } from './styles';

const Holding = () => {
  const { data, isLoading, isSuccess } = useGetLocationByIp();

  if (isLoading) {
    return (
      <Container>
        <p>Locating...</p>
      </Container>
    );
  }

  if (isSuccess) {
    return (
      <Container>
        <p>{`${data.city}: ${data.loc}`}</p>
      </Container>
    );
  }

  return null;
};

export default Holding;
