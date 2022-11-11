const getLocalSunsetTime = (utcTime: string) => {
  const localDateTime = new Date(utcTime);
  const localTime = localDateTime.toString().split(' ')[4];
  return localTime;
};

export default getLocalSunsetTime;
