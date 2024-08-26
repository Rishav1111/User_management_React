import React, { useState } from "react";
import Cookies from "js-cookie";
import Label from "./label";
import Button from "./button";
import Input from "./input";
import Navbar from "./navbar";

export const CreateUserForm = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [DOB, setDOB] = useState("");
  const [role, setRole] = useState("user");
  const [fullnameValidation, setFullnameValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [phoneNumberValidation, setPhoneNumberValidation] = useState("");
  const [DOBValidation, setDOBValidation] = useState("");

  const validateForm = () => {
    let isValid = true;
    setFullnameValidation("");
    setEmailValidation("");
    setPhoneNumberValidation("");
    setDOBValidation("");

    if (!fullname) {
      setFullnameValidation("Please enter your full name");
      isValid = false;
    }
    if (!email) {
      setEmailValidation("Please enter your email");
      isValid = false;
    }
    if (!phoneNumber) {
      setPhoneNumberValidation("Please enter your phone number.");
      isValid = false;
    }
    if (!DOB) {
      setDOBValidation("Please enter your age");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const token = Cookies.get("token");
        const response = await fetch(
          "http://localhost:3000/api/createUserByAdmin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              fullname,
              email,
              phoneNumber,
              DOB,
              roleId: role,
            }),
          },
        );

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          alert("User created successfully");
          setFullname("");
          setEmail("");
          setPhoneNumber("");
          setDOB("");
          setRole("user");
        } else {
          alert("Failed to create user");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);

        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-1/2">
        <div className="w-full max-w-md bg-white m-2 p-5 rounded-md">
          <h2 className="font-bold text-lg text-center mb-4">Add User</h2>
          <form id="createUserForm" className="flex flex-col p-5 w-full ">
            <Label htmlFor="fullname" text="Full Name:" />
            <Input
              type="text"
              name="fullname"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <p className="text-red-500 text-sm mb-4">{fullnameValidation}</p>
            <Label htmlFor="email" text="Email:" />
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-red-500 text-sm mb-4">{emailValidation}</p>
            <Label htmlFor="phoneNumber" text="Phone Number:" />
            <Input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <p className="text-red-500 text-sm mb-4">{phoneNumberValidation}</p>
            <Label htmlFor="date" text="DOB:" />
            <Input
              type="date"
              id="date"
              name="date"
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
            />
            <p className="text-red-500 text-sm mb-4">{DOBValidation}</p>
            <Label htmlFor="role" text="Role:" />
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border  bg-slate-200 border-gray-300 p-2 rounded-md"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>

            <Button
              type="submit"
              text="Add User"
              onClick={handleSubmit}
              color="bg-blue-500 hover:bg-blue-800"
            />
          </form>
        </div>
      </div>
    </>
  );
};
