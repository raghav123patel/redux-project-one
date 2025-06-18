import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { RouterProvider } from "react-router-dom";

import appRoutes from "./Router/Routes";

function App() {
  return (
    <>
      <RouterProvider router={appRoutes} />
    </>
  );
}

export default App;
