import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <header className="bg-gray-800 w-full p-4">
      <nav className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="text-lg sm:text-2xl font-bold">IMS</span>
        </div>

        <div className="block lg:hidden">
          <button
            id="menu-toggle"
            className="flex items-center px-3 py-2 border rounded text-gray-400 border-gray-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center lg:w-auto">
          <ul className="text-sm lg:text-lg lg:flex lg:space-x-8 text-white mr-16">
            <li>
              <a href="#" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                About
              </a>
            </li>
            <li>
              <a href="/users" className="hover:text-gray-400">
                User Lists
              </a>
            </li>
            <li>
              <a href="/edit_profile" className="hover:text-gray-400">
                User Profile
              </a>
            </li>
          </ul>

          <div className="flex ml-4 lg:ml-0 space-x-4">
            <a
              href="/"
              className="text-sm lg:text-lg font-bold text-white hover:text-gray-400"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
