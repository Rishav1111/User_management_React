import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/login_page";
import { Signup } from "./components/signup_page";
import { EditProfile } from "./components/user_edit_profile";
import { CreateUserForm } from "./components/add_user";
import { UserList } from "./components/user_lists";
import React from "react";
import { HomePage } from "./components/home_page";
import { RegisterUser } from "./components/register_user";
import { Dashboard } from "./components/dashboard";
import { InternList } from "./components/internship_lists";
import { ChangePassword } from "./components/change_password";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createUser" element={<CreateUserForm />} />
        <Route path="/register/user" element={<RegisterUser />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit_profile" element={<EditProfile />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/internships" element={<InternList />} />
        <Route path="/user/change_password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
