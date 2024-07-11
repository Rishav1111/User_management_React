import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Edit_Profile } from "../../src/components/user_edit_profile";
import React from "react";

describe("Edit Prfile Component", () => {
  it("renders the edit page", () => {
    render(<Edit_Profile />);
    expect(screen.getByText("Edit Personal Details")).toBeInTheDocument();
  });

  it("renders the input fields with default values", () => {
    render(<Edit_Profile />);

    expect(screen.getByLabelText("Full Name:")).toHaveValue("Rishav Shrestha");
    expect(screen.getByLabelText("Email:")).toHaveValue(
      "shrestharishav3@gmail.com"
    );
    expect(screen.getByLabelText("Phone Number:")).toHaveValue("9808380424");
    expect(screen.getByLabelText("Gender:")).toHaveValue("Male");
    expect(screen.getByLabelText("DOB:")).toHaveValue("2003-12-19");
    expect(screen.getByLabelText("Age:")).toHaveValue(21);
  });

  it("allows users to edit the input fields", () => {
    render(<Edit_Profile />);

    const FullnameInput = screen.getByLabelText("Full Name:");
    fireEvent.change(FullnameInput, { target: { value: "New abcd" } });
    expect(FullnameInput).toHaveValue("New abcd");

    const emailInput = screen.getByLabelText("Email:");
    fireEvent.change(emailInput, { target: { value: "abc@gmail.com" } });
    expect(emailInput).toHaveValue("abc@gmail.com");

    const PhoneNumberInput = screen.getByLabelText("Phone Number:");
    fireEvent.change(PhoneNumberInput, { target: { value: "98888888888" } });
    expect(PhoneNumberInput).toHaveValue("98888888888");

    const GenderInput = screen.getByLabelText("Gender:");
    fireEvent.change(GenderInput, { target: { value: "Female" } });
    expect(GenderInput).toHaveValue("Female");

    const dobInput = screen.getByLabelText("DOB:");
    fireEvent.change(dobInput, { target: { value: "2000-01-01" } });
    expect(dobInput).toHaveValue("2000-01-01");

    const ageInput = screen.getByLabelText("Age:");
    fireEvent.change(ageInput, { target: { value: 22 } });
    expect(ageInput).toHaveValue(22);
  });

  it("should tigger handleSave when button is clicked", () => {
    window.alert = vi.fn();
    render(<Edit_Profile />);
    const button = screen.getByText("Save");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("User updated Successfully.");
  });
});
