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
  DOB: number;
  role: { name: string }[];
}

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
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
    const fetchUsers = async () => {
      try {
        const endpoint = searchQuery
          ? `http://localhost:3000/api/search/users?q=${encodeURIComponent(searchQuery)}`
          : "http://localhost:3000/api/getUsers";

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(
            `Error: ${response.status} ${response.statusText}\n${errorMessage}`,
          );
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(
            searchQuery ? data.map((result: any) => result._source) : data,
          );
        } else {
          throw new Error("Response is not an array");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery]);

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
                `Error: ${response.status} ${response.statusText}\n${text}`,
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
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
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
      <div className="bg-white p-5 m-20 w-2/3  rounded shadow-lg">
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

        <div className=" overflow-x-auto h-96">
          <table className="w-full mb-5 table-auto">
            <thead className="sticky top-0 ">
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Full Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Phone Number</TableHeader>

                <TableHeader>DOB</TableHeader>

                <TableHeader>Action</TableHeader>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <TableData>{user.id}</TableData>
                    <TableData>{user.fullname}</TableData>
                    <TableData>{user.email}</TableData>
                    <TableData>{user.phoneNumber}</TableData>
                    <TableData>
                      {user.DOB
                        ? new Date(user.DOB).toISOString().slice(0, 10)
                        : "Invalid Date"}
                    </TableData>
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center font-bold">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedUser && (
          <EditUserForm
            user={selectedUser}
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
