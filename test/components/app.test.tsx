import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../../src/App";
import React from "react";

describe("App Component", () => {
  it("renders Login component for the /login route", () => {
    window.history.pushState({}, "Login", "/login");
    render(<App />);
    expect(screen.getByRole("heading", { name: /Login/i })).toBeInTheDocument();
  });

  it("renders Signup component for the /signup route", () => {
    window.history.pushState({}, "Signup", "/signup");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  it("renders CreateUserForm component for the /createUser route", () => {
    window.history.pushState({}, "Add User", "/createUser");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /add user/i })
    ).toBeInTheDocument();
  });

  it("renders HomePage component for the / route", () => {
    window.history.pushState({}, "Home", "/");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /Welcome/i })
    ).toBeInTheDocument();
  });

  it("renders Dashboard component for the /dashboard route", () => {
    window.history.pushState({}, "Dashboard", "/dashboard");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /dashboard/i })
    ).toBeInTheDocument();
  });
});
