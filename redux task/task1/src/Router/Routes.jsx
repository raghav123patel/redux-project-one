// src/routes.js
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Registration';
import Userlist from '../pages/user/Userlist';
import Emailverification from '../pages/auth/Emailverification'
import UserDetail from '../pages/user/UserDetail'
import EditUserdetail from '../pages/user/EditUserdetail'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import PublicRouter from './Publicrouter';
import PrivateRouter from './Privaterouter';

const appRoutes = createBrowserRouter([
  {
    element: <PublicRouter />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/register', element: <Registration /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/reset-password/:userId/:token', element: <ResetPassword /> },
      { path: '/verification/:evtoken/:id', element: <Emailverification /> },
    ]
  },
  {
    element: <PrivateRouter />,
    children: [
      { path: '/userlist', element: <Userlist /> },
      { path: '/user/:id', element: <UserDetail /> },
      { path: '/edit-user/:id', element: <EditUserdetail /> },
    ]
  }
]);

export default appRoutes;
