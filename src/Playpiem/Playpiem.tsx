import { useContext } from 'react';
import SunsetTime from './SunsetTime';
import TimeContext from './context/Context';

const Playpiem = () => {
  const { isLoading, isLocating, isSuccess, userHasBeenLocated } =
    useContext(TimeContext);

  if (isLoading || isLocating || !isSuccess || !userHasBeenLocated) {
    return <p>Locating...</p>;
  }

  if (isSuccess || userHasBeenLocated) {
    return <SunsetTime />;
  }

  return null;
};

export default Playpiem;
