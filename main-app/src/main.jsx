import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import './assets/css/Base.sass'
import './assets/bootstrap/popper.jsx'
import './assets/bootstrap/bootstrap.css'
import './assets/bootstrap/bootstrap.jsx'
import { ContextProvider } from "./Contexts/ContextProvider.jsx";
import SWdev from "./SWdev.js";
createRoot(document.getElementById("root")).render(
    <StrictMode>
      <ContextProvider>
      <RouterProvider router={router}/>
      </ContextProvider>
    </StrictMode>
);
SWdev();