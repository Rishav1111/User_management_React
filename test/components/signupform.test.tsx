import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Signup } from "../../src/components/signup_page";
import React from "react";

const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe("Signup", () => {
  it("renders the signup form", () => {
    renderWithRouter(<Signup />);
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when form is incomplete", () => {
    renderWithRouter(<Signup />);

    const button = screen.getByRole("button", { name: /Sign Up/i });

    // Submit the form without filling it in
    fireEvent.click(button);

    // Assertions
    expect(
      screen.getByText(/please enter your full name/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please enter your phone number/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a password/i)).toBeInTheDocument();
  });
});
