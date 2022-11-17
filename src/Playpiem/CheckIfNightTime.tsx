import { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeContext from './context/Context';

const CheckIfNightTime = ({ children }: { readonly children: ReactNode }) => {
  const navigate = useNavigate();
  const { isNightTime, isSuccess } = useContext(TimeContext);

  useEffect(() => {
    if (isSuccess && !isNightTime) {
      navigate('/');
    }
  }, [isNightTime, navigate, isSuccess]);

  return <>{children}</>;
};

export default CheckIfNightTime;
