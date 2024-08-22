import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Signup } from "../../src/components/signup_page";
import React from "react";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});
const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe("Signup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the signup form", () => {
    renderWithRouter(<Signup />);
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  it("renders the full name input field", () => {
    renderWithRouter(<Signup />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  });

  it("renders the email input field", () => {
    renderWithRouter(<Signup />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });
  it("renders the phone Number input field", () => {
    renderWithRouter(<Signup />);
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  });
  it("renders the Password input field", () => {
    renderWithRouter(<Signup />);
    const passwordInput = screen.getByLabelText(/Password:/i, {
      selector: 'input[name="password"]',
    });
    expect(passwordInput).toBeInTheDocument();
  });
  it("renders the Confirm password input field", () => {
    renderWithRouter(<Signup />);
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
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
  it("show error message when password length is less than 8", () => {
    renderWithRouter(<Signup />);

    const PasswordInput = screen.getByLabelText(/Password:/i, {
      selector: "input[name='password']",
    });

    fireEvent.change(PasswordInput, { target: { value: "short" } });
    const button = screen.getByRole("button", { name: /Sign Up/i });

    fireEvent.click(button);
    expect(
      screen.getByText(/Password must be at least 8 characters long/i)
    ).toBeInTheDocument();
  });

  it("show error message when password and confirm password do not match", () => {
    renderWithRouter(<Signup />);

    const PasswordInput = screen.getByLabelText(/Password:/i, {
      selector: "input[name='password']",
    });
    const ConfirmpasswordInput = screen.getByLabelText(/Confirm Password/i);

    fireEvent.change(PasswordInput, { target: { value: "password123" } });
    fireEvent.change(ConfirmpasswordInput, {
      target: { value: "password1234" },
    });
    const button = screen.getByRole("button", { name: /Sign Up/i });
    fireEvent.click(button);
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it("submit the form when all fields are filled correctly", () => {
    const navigate = useNavigate();
    renderWithRouter(<Signup />);

    const FullnameInput = screen.getByLabelText(/Full Name/i);
    const EmailInput = screen.getByLabelText(/Email/i);
    const PhoneNumberInput = screen.getByLabelText(/Phone Number/i);
    const DOBInput = screen.getByLabelText(/DOB/i);
    const PasswordInput = screen.getByLabelText(/Password:/i, {
      selector: "input[name='password']",
    });
    const ConfirmpasswordInput = screen.getByLabelText(/Confirm Password/i);

    fireEvent.change(FullnameInput, { target: { value: "Rishav Shrestha" } });
    fireEvent.change(EmailInput, {
      target: { value: "shrestharishav@gmail.com" },
    });
    fireEvent.change(PhoneNumberInput, { target: { value: "98000000000" } });
    fireEvent.change(PasswordInput, { target: { value: "Rishav123" } });
    fireEvent.change(DOBInput, { target: { value: "2000-01-01" } });
    fireEvent.change(ConfirmpasswordInput, { target: { value: "Rishav123" } });
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    const button = screen.getByRole("button", { name: /Sign Up/i });
    fireEvent.click(button);
  });
});
