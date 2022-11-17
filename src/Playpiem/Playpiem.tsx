import { useContext } from 'react';
import SunsetTime from './SunsetTime';
import LocationContext from './context/LocationContext';
import TimeContext from './context/TimeContext';

const Playpiem = () => {
  const { isLoading, isSuccess, isError } = useContext(TimeContext);
  const { isLocating } = useContext(LocationContext);

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
