import Label from "./label";
import Button from "./button";
import Input from "./input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();
  const validateForm = () => {
    if (!fullname || !email || !phoneNumber || !password || !confirmPassword) {
      setValidationMessage("Please fill all the fields");
      return false;
    }
    if (password.length < 8) {
      setValidationMessage("Password must be at least 8 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      setValidationMessage("Passwords do not match");
      return false;
    }

    setValidationMessage("");
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      navigate("/login");
    }
  };
  const handleLoginClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    navigate("/");
  };

  return (
    <div className="flex flex-wrap content-center items-center w-full h-3/4 mt-8 p-2 max-w-4xl rounded-xl bg-white shadow-lg">
      <div className="flex flex-1 justify-center items-center p-10">
        <img className="w-full h-full rounded" src="/login.jpg" alt="" />
      </div>
      <div className="text-gray-800 flex-1 items-center bg-transparent p-3">
        <h2 className="mb-5 text-center font-bold text-xl">Sign Up</h2>
        <form
          id="signup"
          className="flex flex-wrap flex-col m-3 mt-5 p-5"
          onClick={handleSubmit}
        >
          <Label htmlFor="fullname" text="Full Name:" />
          <Input
            type="text"
            name="fullname"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <Label htmlFor="email" text="Email:" />
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="phonenumber" text="Phone Number:" />
          <Input
            type="tel"
            name="phonenumber"
            id="phonenumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Label htmlFor="password" text="Password:" />
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label htmlFor="confirmpassword" text="Confirm Password:" />
          <Input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {validationMessage && (
            <p className="text-red-500 text-sm mb-4">{validationMessage}</p>
          )}
          <Button type="submit" text="Sign Up" />
          <div className="flex self-center text-sm">
            <p className="mt-4">Already have an account?</p>
            <a
              href="/"
              className="mt-4 hover:text-blue-900 font-bold"
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
