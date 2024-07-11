import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import Navbar from "../../src/components/navbar";
import React from "react";

describe("Navbar", () => {
  it("renders the Navbar", () => {
    render(<Navbar />);
    expect(screen.getByText(/MySite/i)).toBeInTheDocument();
  });

  it("renders the Home link", () => {
    render(<Navbar />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it("renders the User Lists link", () => {
    render(<Navbar />);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  it("renders the Login link", () => {
    render(<Navbar />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
  it("renders the Signup link", () => {
    render(<Navbar />);
    expect(screen.getByText(/Signup/i)).toBeInTheDocument();
  });
});
