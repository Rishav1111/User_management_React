import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import Label from "./label";
import Button from "./button";
import Input from "./input";

interface LoginForm {
  email: string;
  password: string;
  emailValidation: string;
  passwordValidation: string;
}

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  const navigate = useNavigate();
  const validateForm = () => {
    let isValid = true;
    setEmailValidation("");
    setPasswordValidation("");
    if (!email) {
      setEmailValidation("Please enter your email");
      isValid = false;
    }
    if (!password) {
      setPasswordValidation("Please enter a password");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordValidation("Password must be at least 8 characters long");
      isValid = false;
      setPassword("");
    }
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      alert("Login successful");
    }
  };

  return (
    <>
      <div className="flex md:flex flex-wrap content-center items-center w-40% m-28 p-5 max-w-4xl rounded-xl bg-white shadow-lg">
        <div className="flex flex-1 justify-center items-center p-10">
          <img className="w-30% h-full rounded" src="/login.jpg" alt="" />
        </div>
        <div className="text-gray-800 flex-1 items-center bg-transparent p-3">
          <form
            id="login"
            className="flex flex-col m-3 mt-5 p-5"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-5 text-center font-bold text-xl">Login</h2>
            <Label htmlFor="email" text="Email: " />
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailValidation && (
              <p className="text-red-500 text-sm mb-4">{emailValidation}</p>
            )}

            <Label htmlFor="password" text="Password:" />
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordValidation && (
              <p className="text-red-500 text-sm mb-4">{passwordValidation}</p>
            )}

            <div className="flex space-x-24">
              <div className="flex justify-center items-center text-xs font-bold text-gray-700 space-x-2">
                <input type="checkbox" id="rememberMe" name="rememberMe" />
                <Label htmlFor="rememberme" text="Remember Me" />
              </div>
              <a
                href="#"
                className="text-xs m-2 font-bold self-end text-gray-700 hover:text-blue-900"
              >
                {" "}
                Forget Password?
              </a>
            </div>
            <Button
              color="bg-gray-600 hover:bg-gray-700"
              type="submit"
              text="Login"
              onClick={() => {}}
            />
            <div className="flex justify-center items-center text-xs  text-gray-700 space-x-2">
              <div className="border-t border-gray-400 w-1/4"></div>
              <p className="text-xs">or login with</p>
              <div className="border-t border-gray-400 w-1/4"></div>
            </div>
            <div className="flex justify-center items-center space-x-2 mt-4 cursor-pointer">
              {/* <FaFacebook /> */}
              <FcGoogle />
            </div>

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
