
import LoginForm from "../Pages/auth/LoginForm";
import  RegisterForm  from "../Pages/auth/RegisterForm";
import ForgotPassword  from "../Pages/auth/ForgotPassword";
import  ResetPassword from "../Pages/auth/ResetPassword";
import  VerifyEmail  from "../Pages/auth/VerifyEmail";
import { Navigate}  from "react-router-dom";

 const publicRoutes = () => [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/verification/:token/:id",
    element: <VerifyEmail />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/reset-password/:userId/:authToken",
    element: <ResetPassword />,
  },
];
export default publicRoutes;
