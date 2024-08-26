import React from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";

export const Applayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-grow flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};
