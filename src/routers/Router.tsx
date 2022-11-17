import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Playpiem from '../Playpiem';
import CheckIfNightTime from '../Playpiem/CheckIfNightTime';
import Night from '../Playpiem/Night';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Playpiem />} />
        <Route
          path="/night"
          element={
            <CheckIfNightTime>
              <Night />
            </CheckIfNightTime>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
