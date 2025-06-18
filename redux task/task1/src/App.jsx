import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import  publicRoutes  from "./Router/publicRoutes";
import  privateRoutes  from "./Router/privateRoutes";

function App() {
  const getToken = localStorage.getItem("token");
  const [token, setToken] = useState(getToken);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: token ? <Navigate to="/list" /> : <Navigate to="/login" />,
    },
    ...publicRoutes({ setToken }), 
    ...privateRoutes({ token }),  
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
