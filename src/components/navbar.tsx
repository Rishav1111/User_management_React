import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Button from "./button";

interface DecodedToken {
  role: string[];
}

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setRole(decodedToken.role);
      setIsLoggedIn(true);
    } catch (error) {
      Cookies.remove("token");
      setIsLoggedIn(false);
    }
  }, [navigate]);

  const handleLogout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-800 w-full p-4">
      <nav className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="text-lg sm:text-2xl font-bold">UBA-IMS</span>
        </div>

        {/* Mobile menu button */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMobileMenu}
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

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:items-center lg:w-auto">
          {isLoggedIn ? (
            <>
              <ul className="text-sm lg:text-lg lg:flex lg:space-x-8 text-white mr-16">
                {role.includes("admin") && (
                  <>
                    <li>
                      <a href="/dashboard" className="hover:text-gray-400">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="/createUser" className="hover:text-gray-400">
                        Add User
                      </a>
                    </li>
                    <li>
                      <a href="/users" className="hover:text-gray-400">
                        User Lists
                      </a>
                    </li>
                    <li>
                      <a href="/internships" className="hover:text-gray-400">
                        Internship Lists
                      </a>
                    </li>
                    <li>
                      <a href="/edit_profile" className="hover:text-gray-400">
                        User Profile
                      </a>
                    </li>
                  </>
                )}
                {role.includes("user") && (
                  <>
                    <li>
                      <a href="/" className="hover:text-gray-400">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/edit_profile" className="hover:text-gray-400">
                        User Profile
                      </a>
                    </li>
                  </>
                )}
              </ul>

              <div className="flex ml-4 mt-2 lg:ml-0 space-x-4">
                <Button
                  color="bg-red-600 hover:bg-red-900"
                  type="button"
                  text="Logout"
                  onClick={handleLogout}
                />
              </div>
            </>
          ) : (
            <div className="flex space-x-4">
              <Button
                color="bg-blue-600 hover:bg-blue-900"
                type="button"
                text="Login"
                onClick={() => navigate("/login")}
              />
              <Button
                color="bg-blue-600 hover:bg-blue-900"
                type="button"
                text="Signup"
                onClick={() => navigate("/signup")}
              />
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden fixed inset-y-0 right-0 bg-gray-800 bg-opacity-100 flex flex-col items-center space-y-4 p-4 w-1/2 transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={toggleMobileMenu}
            className="self-end text-gray-400 hover:text-white"
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Close</title>
              <path d="M10 8.586l3.293-3.293 1.414 1.414L11.414 10l3.293 3.293-1.414 1.414L10 11.414 6.707 14.707 5.293 13.293 8.586 10 5.293 6.707 6.707 5.293 10 8.586z" />
            </svg>
          </button>
          {isLoggedIn ? (
            <>
              <ul className="text-lg text-white space-y-4">
                {role.includes("admin") && (
                  <>
                    <li>
                      <a href="/dashboard" className="hover:text-gray-400">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a href="/createUser" className="hover:text-gray-400">
                        Add User
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
                  </>
                )}
                {role.includes("user") && (
                  <>
                    <li>
                      <a href="/" className="hover:text-gray-400">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/edit_profile" className="hover:text-gray-400">
                        User Profile
                      </a>
                    </li>
                  </>
                )}
              </ul>

              <Button
                color="bg-red-600 hover:bg-red-900"
                type="button"
                text="Logout"
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <Button
                color="bg-blue-600 hover:bg-blue-900"
                type="button"
                text="Login"
                onClick={() => navigate("/login")}
              />
              <Button
                color="bg-blue-600 hover:bg-blue-900"
                type="button"
                text="Signup"
                onClick={() => navigate("/signup")}
              />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
