export const LONDON_LAT = 51.4790946;
export const LONDON_LNG = -0.2820046;
const LONDON_POSITION = {
  lat: LONDON_LAT,
  lng: LONDON_LNG,
};

const getLocation = async () => {
  if (!navigator.geolocation) {
    return LONDON_POSITION;
  }
  const pos: any = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  return {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude,
  };
};

export default getLocation;
