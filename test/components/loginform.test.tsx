import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { LoginForm } from "../../src/components/login_page";
import React from "react";
import Cookies from "js-cookie";

const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(Cookies, "set").mockImplementation(() => {});
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

  it("navigates to the correct page based on the role in the token", async () => {
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    // Mock the fetch response to include a token with a specific role
    window.fetch = vi.fn<() => Promise<Response>>(
      () =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              token: "mockedTokenWithRole",
            }),
        }) as unknown as Promise<Response>
    );

    // Mock decoding the token
    vi.spyOn(window, "atob").mockImplementation(() => {
      return JSON.stringify({ role: ["admin"] });
    });

    fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(button);

    // Verify that navigation happens to the appropriate route based on the role
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/login",
        expect.objectContaining({
          method: "POST",
        })
      );
    });

    // Test the navigation logic to the admin dashboard here
  });

  it("navigates to the correct page based on the role in the token (User)", async () => {
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });
    window.fetch = vi.fn<() => Promise<Response>>(
      () =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              token: "mockedTokenWithUserRole",
            }),
        }) as unknown as Promise<Response>
    );

    vi.spyOn(window, "atob").mockImplementation(() => {
      return JSON.stringify({ role: ["user"] });
    });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/login",
        expect.objectContaining({
          method: "POST",
        })
      );
    });

    // Test the navigation logic to the user dashboard here
  });
});
