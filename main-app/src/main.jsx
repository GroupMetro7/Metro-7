import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./Contexts/ContextProvider.jsx";
import './assets/css/Base.sass'
import './assets/bootstrap/popper.jsx'
import './assets/bootstrap/bootstrap.css'
import './assets/bootstrap/bootstrap.jsx'

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <ContextProvider>
      <RouterProvider router={router}/>
      </ContextProvider>
    </StrictMode>
);
