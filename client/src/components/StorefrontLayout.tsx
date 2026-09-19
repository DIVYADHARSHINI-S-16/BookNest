import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./Navbar.css";

export default function StorefrontLayout() {
  return (
    <div className="storefront">
      <Navbar />
      <div className="container page">
        <Outlet />
      </div>
    </div>
  );
}
