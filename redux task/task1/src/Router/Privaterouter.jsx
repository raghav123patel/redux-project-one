
import UserList from "../Pages/users/UserList";
import UserDetail from "../Pages/users/UserDetail";
import UserDelete from "../Pages/users/UserDelete";
import UserUpdate from "../Pages/users/UserUpdate";
import { Navigate } from "react-router-dom";

const privateRoutes = (token) => [
  {
    path: "/list",
    element: token ? <UserList /> : <Navigate to="/login" />,
  },
  {
    path: "user/:id",
    element: token ? <UserDetail /> : <Navigate to="/login" />,
  },
  {
    path: "/delete/:id",
    element: token ? <UserDelete /> : <Navigate to="/login" />,
  },
  {
    path: "/user/update/:id",
    element: token ? <UserUpdate /> : <Navigate to="/login" />,
  },
];
export default privateRoutes;
