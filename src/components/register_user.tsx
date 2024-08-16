import React, { useState } from "react";
import Label from "./label";
import Button from "./button";
import Input from "./input";
import { useLocation, useNavigate } from "react-router-dom";

export const RegisterUser = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [confirmPasswordValidation, setConfirmPasswordValidation] =
    useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const validateForm = () => {
    let isValid = true;
    setPasswordValidation("");
    setConfirmPasswordValidation("");
    if (!password) {
      setPasswordValidation("Please enter a password");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordValidation("Password must be at least 8 characters long");
      isValid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordValidation("Please confirm your password");
      isValid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordValidation("Passwords do not match");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/register/user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, token, confirmPassword }),
          }
        );

        await response.json();

        if (response.ok) {
          alert("User registered successfully");
          navigate("/login");
        } else {
          alert("Failed to register user");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-1/2">
      <div className="w-full max-w-md bg-white m-2 p-5 rounded-md">
        <h2 className="text-lg p-2 text-center font-bold">
          Create a new Password
        </h2>

        <form>
          <div>
            <Label htmlFor="password" text="Password:" />
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-red-500 text-sm mb-4">{passwordValidation}</p>

            <Label htmlFor="confirmPassword" text="Confirm Password:" />

            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="text-red-500 text-sm mb-4">
              {confirmPasswordValidation}
            </p>

            <Button
              text="Register"
              onClick={handleSubmit}
              type={"button"}
              color={"bg-blue-500"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
