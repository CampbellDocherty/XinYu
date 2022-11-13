import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Playpiem from '../Playpiem';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Playpiem />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
