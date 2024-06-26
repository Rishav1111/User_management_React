import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Label from "./label";
import Button from "./button";
import Input from "./input";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const navigate = useNavigate();
  const validateForm = () => {
    if (!email || !password) {
      setValidationMessage("Please enter email and password!");
      return false;
    }
    if (password.length < 8) {
      setValidationMessage("Password must be at least 8 characters long!");
      setPassword("");
      return false;
    }
    setValidationMessage("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      navigate("/edit_profile");
    }
  };

  return (
    <>
      <div className="flex md:flex flex-wrap content-center items-center w-40% m-24 p-5 max-w-4xl rounded-xl bg-white shadow-lg">
        <div className="flex flex-1 justify-center items-center p-10">
          <img className="w-30% h-full rounded" src="/login.jpg" alt="" />
        </div>
        <div className="text-gray-800 flex-1 items-center bg-transparent p-3">
          <h2 className="mb-5 text-center font-bold text-xl">Login</h2>
          <form
            id="login"
            className="flex flex-col m-3 mt-5 p-5"
            onSubmit={handleSubmit}
          >
            <Label htmlFor="email" text="Email: " />
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label htmlFor="password" text="Password:" />
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {validationMessage && (
              <p className="text-red-500 text-sm mb-4">{validationMessage}</p>
            )}
            <a
              href="#"
              className="text-sm mb-5 font-bold self-end text-gray-700 hover:text-blue-900"
            >
              {" "}
              Forget Password?
            </a>
            <Button type="submit" text="Login" />
            <div className="flex self-center text-sm">
              <p className="mt-4">Don't have an account?</p>
              <a href="/signup" className="mt-4 hover:text-blue-900 font-bold">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
