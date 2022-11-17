import { useContext } from 'react';
import SunsetTime from './SunsetTime';
import TimeContext from './context/Context';

const Playpiem = () => {
  const { isLoading, isLocating, isSuccess, isError } = useContext(TimeContext);

  if (isLoading || isLocating) {
    return <p>Locating...</p>;
  }

  if (isError) {
    return <p>Something went wrong, please try again</p>;
  }

  if (isSuccess) {
    return <SunsetTime />;
  }

  return null;
};

export default Playpiem;
