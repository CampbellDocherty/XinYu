const getCurrentTime = () => {
  const localDateTime = new Date();
  const localTime = localDateTime.toString().split(' ')[4];
  return localTime;
};

export default getCurrentTime;
