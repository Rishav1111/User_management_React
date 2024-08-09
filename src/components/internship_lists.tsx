import { TableData } from "./tabledata";
import { TableHeader } from "./tableheader";
import Cookies from "js-cookie";
import Button from "./button";
import Navbar from "./navbar";
import React, { useEffect, useState } from "react";

interface Internship {
  id: number;
  joinedDate: Date;
  completionDate: Date;
  isCertified: string;
  mentorName: string;
  user: { fullname: string };
}

export const InternList = () => {
  const [internship, setInternship] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setError("Token not found");
      setLoading(false);
      return;
    }
    fetch("http://localhost:3000/api/getInternships", {
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
          setInternship(data);
        } else {
          throw new Error("Response is not an array");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching internship data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  //   const handleDelete = (id: number) => {
  //     const token = Cookies.get("token");
  //     fetch(`http://localhost:3000/api/deleteUser/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,

  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           return response.text().then((text) => {
  //             throw new Error(
  //               `Error: ${response.status} ${response.statusText}\n${text}`
  //             );
  //           });
  //         }
  //         // Remove the user from the local state
  //         setUsers(users.filter((user) => user.id !== id));
  //       })
  //       .catch((error) => {
  //         console.error("Error deleting user:", error);
  //         setError(error.message);
  //       });
  //   };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-white p-5 h-full m-24 w-auto rounded shadow-lg overflow-y-auto">
        <h2 className="mb-5 text-center font-bold text-sm sm:text-2xl">
          User Lists
        </h2>
        <div className="overflow-y-scroll overflow-x-auto max-h-96">
          <table className="w-full mb-5 table-auto">
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Joined Date</TableHeader>
                <TableHeader>Completion Date</TableHeader>
                <TableHeader>Certified</TableHeader>
                <TableHeader>Mentor Name</TableHeader>
                <TableHeader>Student</TableHeader>
                <TableHeader>Action</TableHeader>
              </tr>
            </thead>
            <tbody>
              {internship.map((intern) => (
                <tr key={intern.id}>
                  <TableData>{intern.id}</TableData>
                  <TableData>{intern.joinedDate}</TableData>
                  <TableData>{intern.completionDate}</TableData>
                  <TableData>{intern.isCertified ? "Yes" : "No"}</TableData>
                  <TableData>{intern.mentorName}</TableData>
                  <TableData>{intern.user.fullname}</TableData>

                  <TableData>
                    <Button
                      color="bg-blue-600 hover:bg-blue-900"
                      type="submit"
                      text="Edit"
                      onClick={() => {}}
                    />
                    <Button
                      color="bg-red-600 hover:bg-red-900"
                      type="submit"
                      text="Delete"
                      onClick={() => {}}
                    />
                  </TableData>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
