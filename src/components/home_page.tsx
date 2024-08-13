import React from "react";
import Navbar from "./navbar";
export const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full overflow-hidden h-screen flex items-center justify-center text-center font-bold">
        <h1 className="text-6xl">Welcome</h1>
      </div>
      ;
    </>
  );
};
