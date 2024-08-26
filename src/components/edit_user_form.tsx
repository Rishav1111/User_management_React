import React, { useState } from "react";
import { User } from "./user_lists";
import Cookies from "js-cookie";
import Label from "./label";
import Button from "./button";
import Input from "./input";
import { toast } from "react-toastify";

interface EditUserFormProps {
  user: User;

  onUpdateUser: (updatedUser: User) => void;

  onClose: () => void;
}

export const EditUserForm: React.FC<EditUserFormProps> = ({
  user,
  onUpdateUser,
  onClose,
}) => {
  const [fullname, setFullname] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [DOB, setDOB] = useState(
    user.DOB ? new Date(user.DOB).toISOString().substring(0, 10) : "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = { ...user, fullname, email, phoneNumber, DOB };
    const token = Cookies.get("token");

    fetch(`http://localhost:3000/api/updateUser/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `Error: ${response.status} ${response.statusText}\n${text}`,
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        onUpdateUser(data);

        toast.success("User updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="h-full ">
      <h2 className="font-bold text-2xl text-center m-4">Edit User</h2>
      <form>
        <div className="mb-4">
          <Label htmlFor="fullname" text="Full Name" />
          <Input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            id={"fullname"}
            name={"fullname"}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email" text="Email" />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id={"email"}
            name={"email"}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="phoneNumber" text="Phone Number" />
          <Input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            id={"phoneNumber"}
            name={"phoneNumber"}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="DOB" text="DOB" />
          <Input
            type="date"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            id={"DOB"}
            name={"DOB"}
          />
        </div>
        <div className="flex space-x-2 justify-center">
          <Button
            type="submit"
            text="Save"
            color="bg-blue-600 hover:bg-blue-900"
            onClick={handleSubmit}
          />
          <Button
            type="button"
            text="Cancel"
            color="bg-red-600 hover:bg-red-900"
            onClick={(e) => onClose()}
          />
        </div>
      </form>
    </div>
  );
};
