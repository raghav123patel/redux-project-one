
import { Navigate, Outlet } from 'react-router-dom';

const PublicRouter = () => {
  const token = localStorage.getItem("token");

  return !token ? <Outlet /> : <Navigate to="/userlist" replace />;
};

export default PublicRouter;
