const getCurrentTime = () => {
  const localUnixTime = new Date().getTime();
  return localUnixTime;
};

export default getCurrentTime;
