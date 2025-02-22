import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./context/UserContext.jsx";
import CaptainProvider from "./context/CaptainContext.jsx";
import SocketProvider from "./context/SocketContext.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CaptainProvider>
      <UserProvider>
        <SocketProvider>
          <BrowserRouter>
            <ToastContainer />
            <App />
          </BrowserRouter>
        </SocketProvider>
      </UserProvider>
    </CaptainProvider>
  </React.StrictMode>
);
