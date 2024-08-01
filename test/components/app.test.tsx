import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import App from "../../src/App";
import React from "react";

describe("App Component", () => {
  it("renders LoginForm component for the root route", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });

  it("renders Signup component for the /signup route", () => {
    window.history.pushState({}, "Signup", "/signup");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  it("renders Edit_Profile component for the /edit_profile route", () => {
    window.history.pushState({}, "Edit Profile", "/edit_profile");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /edit personal details/i })
    ).toBeInTheDocument();
  });

  it("renders UserList component for the /users route", () => {
    window.history.pushState({}, "User List", "/users");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /user lists/i })
    ).toBeInTheDocument();
  });
});
