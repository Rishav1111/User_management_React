import React from "react";
import { NavLink, useRouteError } from "react-router-dom";
import { HomePage } from "./home_page";

export const ErrorPage = () => {
  const error = useRouteError();

  if (typeof error === "object" && error !== null && "status" in error) {
    const status = error.status;

    if (status === 404) {
      return (
        <section className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <figure className="mb-4">
              <img
                className="w-full max-w-3xl h-auto mx-auto rounded-lg"
                src="/404-page.gif"
                alt="404 page"
              />
            </figure>
            <p className="text-2xl text-gray-600 m-4">
              Oops! The page you're looking for doesn't exist.
            </p>

            <NavLink
              to="/"
              className="px-6 py-3 bg-red-600 hover:bg-red-800 text-white font-semibold rounded-lg"
            >
              Go back To HomePage
            </NavLink>
          </div>
        </section>
      );
    }
  }

  return null;
};
