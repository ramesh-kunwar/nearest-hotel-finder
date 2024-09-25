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
import Dashboard from "./components/Admin/Dashboard.jsx";
import AddHotel from "./components/Admin/AddHotel.jsx";
import ListingById from "./components/Listing/ListingById.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import NearestListing from "./components/Listing/NearestListing.jsx";
import AdminHotelDetails from "./components/Admin/AdminHotelDetails.jsx";
import AddRooms from "./components/Admin/AddRooms.jsx";
import RoomById from "./components/Listing/rooms/RoomById.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />

      <Route path="/" index={true} element={<HomePage />} />
      <Route path="/hotel/:hotelId" element={<ListingById />} />
      <Route path="/hotel/:hotelId/:roomId" element={<RoomById />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/nearest" element={<NearestListing />} />
      </Route>

      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/addHotel" element={<AddHotel />} />
        <Route path="/admin/hotels/:hotelId" element={<AdminHotelDetails />} />
        <Route path="/admin/hotels/:hotelId/rooms" element={<AddRooms />} />
      </Route>
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
