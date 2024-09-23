import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store.js";
import RegisterPage from "./components/Register/RegisterPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";

import { Toaster } from "react-hot-toast";
import LoginPage from "./components/Login/LoginPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/home" index={true} element={<HomePage />} />

      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
    </>,
  ),
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />

      <Toaster />
    </Provider>
  </StrictMode>,
);
