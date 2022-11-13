const convertUtcTimeToLocalTime = (utcTime: string) => {
  const localDateTime = new Date(utcTime);
  const unixTime = localDateTime.getTime();
  const localTime = localDateTime.toString().split(' ')[4];
  return { readableTime: localTime, unixTime };
};

export default convertUtcTimeToLocalTime;
