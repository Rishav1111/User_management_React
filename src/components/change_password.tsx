import Navbar from "./navbar";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Input from "./input";
import Button from "./button";
import { jwtDecode } from "jwt-decode";
import Label from "./label";

interface DecodedToken {
  id: number;
}

export const ChangePassword = () => {
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [oldpasswordValidation, setOldpasswordValidation] = useState("");
  const [newpasswordValidation, setNewpasswordValidation] = useState("");
  const [confirmpasswordValidation, setConfirmpasswordValidation] =
    useState("");

  const token = Cookies.get("token");
  const decodedToken = jwtDecode<DecodedToken>(token);

  const userId = decodedToken.id;

  const validateForm = () => {
    let isValid = true;
    setOldpasswordValidation("");
    setNewpasswordValidation("");
    setConfirmpasswordValidation("");
    if (!oldpassword) {
      setOldpasswordValidation("Please enter your old password");
      isValid = false;
    }
    if (!newpassword) {
      setNewpasswordValidation("Please enter a new password");
      isValid = false;
    } else if (newpassword.length < 8) {
      setNewpasswordValidation("Password must be at least 8 characters long");
      isValid = false;
    } else if (newpassword === oldpassword) {
      setNewpasswordValidation(
        "New password must be different from old password"
      );
      isValid = false;
    }
    if (!confirmpassword) {
      setConfirmpasswordValidation("Please confirm your password");
      isValid = false;
    }
    if (newpassword !== confirmpassword) {
      setConfirmpasswordValidation("Passwords do not match");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/changePassword/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ oldpassword, newpassword, confirmpassword }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          toast.success("Password changed successfully");
          setOldpassword("");
          setNewpassword("");
          setConfirmpassword("");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        toast.error("Failed to change password");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen w-1/2">
        <div className="w-4/5 max-w-sm bg-white p-5 rounded-md">
          <h2 className="text-lg p-2 m-4 text-center font-bold">
            Create a new Password
          </h2>

          <form className="m-2">
            <div className=" m-6">
              <Label htmlFor="oldpassword" text="Old Password:" />
              <Input
                type="password"
                name="oldpassword"
                id="oldpassword"
                value={oldpassword}
                onChange={(e) => setOldpassword(e.target.value)}
              />
              <p className="text-red-500 text-sm mb-4">
                {oldpasswordValidation}
              </p>

              <Label htmlFor="newpassword" text="New Password:" />

              <Input
                type="password"
                name="newPassword"
                id="newPassword"
                value={newpassword}
                onChange={(e) => setNewpassword(e.target.value)}
              />
              <p className="text-red-500 text-sm mb-4">
                {newpasswordValidation}
              </p>
              <Label htmlFor="confirmpassword" text="Confirm Password:" />

              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <p className="text-red-500 text-sm mb-4">
                {confirmpasswordValidation}
              </p>

              <div className="flex items-center justify-center">
                <Button
                  text="Save"
                  onClick={handleSubmit}
                  type={"button"}
                  color={"bg-blue-600 hover:bg-blue-700"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
