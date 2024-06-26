import { TableData } from "./tabledata";
import { TableHeader } from "./tableheader";
import Navbar from "./navbar";
export const UserList = () => {
  const users = [
    {
      id: 1,
      fullName: "Rishav Shrestha",
      email: "shrestharishav3@gmail.com",
      phoneNumber: "9888888888",
      gender: "Male",
      age: 21,
      image: "./photo.jpg",
    },
    {
      id: 2,
      fullName: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      gender: "Male",
      age: 30,
      image: "./photo.jpg",
    },
    {
      id: 3,
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNumber: "0987654321",
      gender: "Female",
      age: 25,
      image: "./photo.jpg",
    },
    {
      id: 4,
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNumber: "0987654321",
      gender: "Female",
      age: 25,
      image: "./photo.jpg",
    },
    {
      id: 5,
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNumber: "0987654321",
      gender: "Female",
      age: 25,
      image: "./photo.jpg",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="bg-white p-5 h-auto m-20 w-auto rounded shadow-lg overflow-y-auto">
        <h2 className="mb-5 text-center font-bold text-sm sm:text-2xl">
          User Lists
        </h2>
        <div className="overflow-y-scroll overflow-x-auto max-h-96">
          <table className="w-full mb-5 table-auto">
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Full Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Phone Number</TableHeader>
                <TableHeader>Gender</TableHeader>
                <TableHeader>Age</TableHeader>
                <TableHeader>Image</TableHeader>
                <TableHeader>Action</TableHeader>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                console.log(user);
                return (
                  <tr key={user.id}>
                    <TableData>{user.id}</TableData>
                    <TableData>{user.fullName}</TableData>
                    <TableData>{user.email}</TableData>
                    <TableData>{user.phoneNumber}</TableData>
                    <TableData>{user.gender}</TableData>
                    <TableData>{user.age}</TableData>
                    <TableData>
                      <img
                        className="w-16 h-16 rounded-full object-cover"
                        src={user.image}
                        alt={user.fullName}
                      />
                    </TableData>
                    <TableData>Action</TableData>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
