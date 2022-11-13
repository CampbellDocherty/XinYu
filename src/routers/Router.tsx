import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Playpiem from '../Playpiem';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Playpiem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
