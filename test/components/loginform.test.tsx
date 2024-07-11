import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { LoginForm } from "../../src/components/login_page";
import React from "react";

const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("LoginForm", () => {
  it("renders the login form", () => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
  it("shows validation errors when form is incomplete", () => {
    renderWithRouter(<LoginForm />);

    const button = screen.getByRole("button", { name: /login/i });

    // Submit the form without filling it in
    fireEvent.click(button);

    // Assertions
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a password/i)).toBeInTheDocument();
  });
  it("renders the email input field", () => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("renders the password input field", () => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("enables the submit button when email and password are filled", () => {
    renderWithRouter(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(button).not.toBeDisabled();
  });

  it("shows validation errors when password is too short", () => {
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    // Fill in the form with a short password
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.click(button);
    expect(
      screen.getByText(/password must be at least 8 characters long/i)
    ).toBeInTheDocument();
  });

  it("shows a success message when the form is submitted", () => {
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    // Fill in the form
    fireEvent.change(emailInput, { target: { value: "rishav@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(button);

    expect(alertMock).toHaveBeenCalledWith("Login successful");
  });
});
