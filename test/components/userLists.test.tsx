import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { UserList } from "../../src/components/user_lists";

describe("UserList Component", () => {
  it("renders without crashing", () => {
    render(<UserList />);
    expect(
      screen.getByRole("heading", { name: /User Lists/i })
    ).toBeInTheDocument();
  });

  it("renders table headers correctly", () => {
    render(<UserList />);
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Image")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("renders user data correctly", () => {
    render(<UserList />);
    const rows = screen.getAllByRole("row");

    const row1 = within(rows[1]);
    expect(row1.getByText("Rishav Shrestha")).toBeInTheDocument();
    expect(row1.getByText("shrestharishav3@gmail.com")).toBeInTheDocument();
    expect(row1.getByText("9888888888")).toBeInTheDocument();
    expect(row1.getByText("Male")).toBeInTheDocument();
    expect(row1.getByText("21")).toBeInTheDocument();
    expect(row1.getByAltText("Rishav Shrestha")).toBeInTheDocument();
  });

  it("renders Edit and Delete buttons for each user", () => {
    render(<UserList />);
    expect(screen.getAllByText("Edit").length).toBe(5);
    expect(screen.getAllByText("Delete").length).toBe(5);
  });
});
