import React from "react";
import Navbar from "./navbar";
export const Dashboard = () => {
  return (
    <>
      <Navbar />
      <h1 className="text-xl mb-4">Dashboard</h1>
      <div className="w-full h-screen flex items-center justify-center text-center font-bold overflow-hidden">
        <div className="flex space-x-4">
          <div className="bg-gray-200 p-4 rounded shadow-md">
            <h2 className="text-lg">Total Users</h2>
            <div className="text-2xl">0</div>
          </div>
          <div className="bg-gray-200 p-4 rounded shadow-md">
            <h2 className="text-lg">Total Internships</h2>
            <div className="text-2xl">0</div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};
