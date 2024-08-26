import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginForm } from "./components/login_page";
import { Signup } from "./components/signup_page";
import { EditProfile } from "./components/user_edit_profile";
import { CreateUserForm } from "./components/add_user";
import { UserList } from "./components/user_lists";
import { HomePage } from "./components/home_page";
import { RegisterUser } from "./components/register_user";
import { Dashboard } from "./components/dashboard";
import { InternList } from "./components/internship_lists";
import { ChangePassword } from "./components/change_password";
import { ErrorPage } from "./components/error_page";
import { Applayout } from "./components/layout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,

        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/createUser",
        element: <CreateUserForm />,
      },
      {
        path: "/register/user",
        element: <RegisterUser />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/edit_profile",
        element: <EditProfile />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/internships",
        element: <InternList />,
      },
      {
        path: "/user/change_password",
        element: <ChangePassword />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
