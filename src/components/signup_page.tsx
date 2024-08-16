import Label from "./label";
import Button from "./button";
import { FcGoogle } from "react-icons/fc";
import Input from "./input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [DOB, setdob] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullnameValidation, setFullnameValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [dobValidation, setDobValidation] = useState("");
  const [phoneNumberValidation, setPhoneNumberValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [confirmPasswordValidation, setConfirmPasswordValidation] =
    useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    // Reset validation messages
    setFullnameValidation("");
    setEmailValidation("");
    setPhoneNumberValidation("");
    setPasswordValidation("");
    setConfirmPasswordValidation("");
    setDobValidation("");

    if (!fullname) {
      setFullnameValidation("Please enter your full name");
      isValid = false;
    }
    if (!email) {
      setEmailValidation("Please enter your email");
      isValid = false;
    }
    if (!phoneNumber) {
      setPhoneNumberValidation("Please enter your phone number");
      isValid = false;
    }
    if (!DOB) {
      setDobValidation("Please select your date of birth");
      isValid = false;
    }
    if (!password) {
      setPasswordValidation("Please enter a password");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordValidation("Password must be at least 8 characters long");
      isValid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordValidation("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3000/api/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname,
            email,
            phoneNumber,
            password,
            DOB,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(`Signup failed: ${errorData.message}`);
          return;
        }

        alert("Signup successfully");
        navigate("/login");
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleLoginClick = (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("/login");
  };

  return (
    <div className="flex flex-wrap content-center items-center w-full h-screen m-8 p-2 max-w-4xl rounded-xl bg-white shadow-lg">
      <div className="flex flex-1 justify-center items-center p-10">
        <img className="w-full h-full rounded" src="/login.jpg" alt="" />
      </div>
      <div className="text-gray-800 flex-1 items-center bg-transparent p-3">
        <form
          id="signup"
          className="flex flex-wrap flex-col m-3 mt-5 p-5"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-5 text-center font-bold text-xl">Sign Up</h2>
          <Label htmlFor="fullname" text="Full Name:" />
          <Input
            type="text"
            name="fullname"
            id="fullname"
            value={fullname}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setFullname(e.target.value)}
          />
          {fullnameValidation && (
            <p className="text-red-500 text-sm">{fullnameValidation}</p>
          )}
          <Label htmlFor="email" text="Email:" />
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setEmail(e.target.value)}
          />
          {emailValidation && (
            <p className="text-red-500 text-sm">{emailValidation}</p>
          )}
          <Label htmlFor="phonenumber" text="Phone Number:" />
          <Input
            type="tel"
            name="phonenumber"
            id="phonenumber"
            value={phoneNumber}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setPhoneNumber(e.target.value)}
          />
          {phoneNumberValidation && (
            <p className="text-red-500 text-sm">{phoneNumberValidation}</p>
          )}
          <Label htmlFor="dob" text="DOB:" />
          <Input
            type="date"
            name="dob"
            id="dob"
            value={DOB}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setdob(e.target.value)}
          />
          {dobValidation && (
            <p className="text-red-500 text-sm">{dobValidation}</p>
          )}
          <Label htmlFor="password" text="Password:" />
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setPassword(e.target.value)}
          />
          {passwordValidation && (
            <p className="text-red-500 text-sm">{passwordValidation}</p>
          )}
          <Label htmlFor="confirmpassword" text="Confirm Password:" />
          <Input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordValidation && (
            <p className="text-red-500 text-sm">{confirmPasswordValidation}</p>
          )}
          <Button
            type="submit"
            text="Sign Up"
            color="bg-gray-600 hover:bg-gray-700"
            onClick={() => {}}
          />
          <div className="flex justify-center items-center text-xs  text-gray-700 space-x-2">
            <div className="border-t border-gray-400 w-1/4"></div>
            <p className="text-xs">or signup with</p>
            <div className="border-t border-gray-400 w-1/4"></div>
          </div>
          <div className="flex justify-center items-center space-x-2 mt-1 cursor-pointer">
            {/* <FaFacebook /> */}
            <FcGoogle />
          </div>

          <div className="flex self-center text-sm">
            <p className="mt-2">Already have an account?</p>
            <a
              href="/login"
              className="mt-2 hover:text-blue-900 font-bold"
              onClick={handleLoginClick}
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
