import getLocationByIp from './location-by-ip';
import getSunriseAndSunset from './sunrise-and-sunset';

const setDefaultResponses = () => {
  getSunriseAndSunset();
  getLocationByIp();
};

export default setDefaultResponses;
