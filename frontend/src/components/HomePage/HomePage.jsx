import React from "react";
import Listing from "../Listing/Listing";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const HomePage = () => {
  return (
    <div>
      <Outlet />
      <Navbar />
      <Listing />
    </div>
  );
};

export default HomePage;

