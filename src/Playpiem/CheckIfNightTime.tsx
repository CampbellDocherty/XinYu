import { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeContext from './context/TimeContext';

const CheckIfNightTime = ({ children }: { readonly children: ReactNode }) => {
  const navigate = useNavigate();
  const { isNightTime } = useContext(TimeContext);

  useEffect(() => {
    if (!isNightTime) {
      navigate('/');
    }
  }, [isNightTime, navigate]);

  return <>{children}</>;
};

export default CheckIfNightTime;
