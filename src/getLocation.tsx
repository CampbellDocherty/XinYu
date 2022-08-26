export const LONDON_LAT = 51.4790946;
export const LONDON_LNG = -0.2820046;
const LONDON_POSITION = {
  lat: LONDON_LAT,
  lng: LONDON_LNG,
};

const getLocation = () => {
  if (!navigator.geolocation) {
    return LONDON_POSITION;
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      () => {
        return LONDON_POSITION;
      }
    );
  }
  return LONDON_POSITION;
};

export default getLocation;
