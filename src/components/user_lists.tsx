import { TableData } from "./tabledata";
import { TableHeader } from "./tableheader";
import Cookies from "js-cookie";
import Button from "./button";
import Navbar from "./navbar";
import React, { useEffect, useState } from "react";
import { Modal } from "./edit_modal";
import DeleteModal from "./delete_modal";
import { EditUserForm } from "./edit_user_form";
import { toast } from "react-toastify";

export interface User {
  id: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  age: number;
  role: { name: string }[];
}

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seletedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setError("Token not found");
      setLoading(false);
      return;
    }
    fetch("http://localhost:3000/api/getUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `Error: ${response.status} ${response.statusText}\n${text}`
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const filteredUsers = data.filter(
            (user: User) =>
              user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.phoneNumber.includes(searchQuery)
          );
          setUsers(filteredUsers);
        } else {
          throw new Error("Response is not an array");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [searchQuery, users]);

  const handleDelete = (id: number) => {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete !== null) {
      const token = Cookies.get("token");
      fetch(`http://localhost:3000/api/deleteUser/${userToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(
                `Error: ${response.status} ${response.statusText}\n${text}`
              );
            });
          }

          setUsers(users.filter((user) => user.id !== userToDelete));
          toast.success("User deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          setError(error.message);
        })
        .finally(() => {
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
        });
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdate = (updatedUser: User) => {
    console.log(updatedUser);
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    handleCloseModal();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-white p-5 h-auto m-10 w-auto rounded shadow-lg overflow-y-auto min-h-[300px] max-h-[600px]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-center font-bold text-sm sm:text-2xl">
            User Lists
          </h2>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-60"
          />
        </div>

        <div className="overflow-y-scroll overflow-x-auto max-h-96">
          <table className="w-full mb-5 table-auto">
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Full Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Phone Number</TableHeader>

                <TableHeader>Age</TableHeader>

                <TableHeader>Action</TableHeader>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <TableData>{user.id}</TableData>
                  <TableData>{user.fullname}</TableData>
                  <TableData>{user.email}</TableData>
                  <TableData>{user.phoneNumber}</TableData>
                  <TableData>{user.age}</TableData>

                  <TableData>
                    <Button
                      color="bg-blue-600 hover:bg-blue-900"
                      type="submit"
                      text="Edit"
                      onClick={() => handleEdit(user)}
                    />
                    <Button
                      color="bg-red-600 hover:bg-red-900"
                      type="submit"
                      text="Delete"
                      onClick={() => handleDelete(user.id)}
                    />
                  </TableData>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {seletedUser && (
          <EditUserForm
            user={seletedUser}
            onUpdateUser={handleUpdate}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};
