import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeContext from './context/TimeContext';
import PlaySvg from './icons/PlaySvg';
import { CityText, Disclaimer, IconWrapper, Lock, PlayButton } from './styles';

const SunsetTime = () => {
  const navigate = useNavigate();
  const { isNightTime, sunset, location } = useContext(TimeContext);

  const onClick = () => {
    if (!isNightTime) {
      return;
    }

    navigate('/night');
  };

  return (
    <>
      <CityText>{location.city}</CityText>
      <IconWrapper isNightTime={isNightTime}>
        <PlayButton onClick={onClick} isNightTime={isNightTime}>
          <PlaySvg />
        </PlayButton>
        <Lock isNightTime={isNightTime} />
      </IconWrapper>
      <p>Sunset: {sunset}</p>
      <Disclaimer>The location is determined by your ip address</Disclaimer>
    </>
  );
};

export default SunsetTime;
