import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./Contexts/ContextProvider.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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

// check if SW is registered
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
