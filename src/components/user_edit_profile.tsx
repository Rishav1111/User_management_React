import Label from "./label";
import Button from "./button";
import Input from "./input";
import Navbar from "./navbar";
import { useState } from "react";
import React from "react";

interface EditProfileForm {
  fullname: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  age: string;
}

export const Edit_Profile = () => {
  const [fullname, setFullname] = useState("Rishav Shrestha");
  const [email, setEmail] = useState("shrestharishav3@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("9808380424");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("2003-12-19");
  const [age, setAge] = useState("");

  const handleSave = () => {
    alert("User updated Successfully.");
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col flex-wrap items-center p-5 h-auto w-3/5 m-10 rounded bg-white shadow-lg">
        <h2 className="mb-5 text-center font-bold text-xl">
          Edit Personal Details
        </h2>
        <img
          className="w-32 h-32 rounded-full"
          src="/profile.jpg"
          alt="User image"
        />
        <h5 className="mt-2 cursor-pointer hover:text-blue-600">Edit Photo</h5>

        <div className="text-base bg-zinc-300 mt-5 p-5 w-4/5 grid gap-2 grid-cols-2 rounded-lg flex-wrap mb-4">
          <Label htmlFor="fullname" text="Full Name:" />
          <Input
            type="text"
            id="fullname"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <Label htmlFor="email" text="Email:" />
          <Input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="phonenumber" text="Phone Number:" />
          <Input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={phoneNumber}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setPhoneNumber(e.target.value)}
          />
          <Label htmlFor="gender" text="Gender:" />
          <Input
            type="text"
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <Label htmlFor="date" text="DOB:" />
          <Input
            type="date"
            id="date"
            name="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <Label htmlFor="number" text="Age:" />
          <Input
            type="number"
            id="number"
            name="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <Button
          type="button"
          text="Save"
          color="bg-gray-600 hover:bg-gray-700"
          onClick={handleSave}
        />
      </div>
    </>
  );
};
