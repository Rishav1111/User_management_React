import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/login_page";
import { Signup } from "./components/signup_page";
import { Edit_Profile } from "./components/user_edit_profile";
import { UserList } from "./components/user_lists";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit_profile" element={<Edit_Profile />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
