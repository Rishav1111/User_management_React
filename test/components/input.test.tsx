import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Input from "../../src/components/input";
import { describe, it, expect } from "vitest";
import React from "react";

describe("Input Component", () => {
  it("renders input with correct props", () => {
    render(
      <Input
        type="text"
        id="test-id"
        name="test-name"
        value="test-value"
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("id", "test-id");
    expect(inputElement).toHaveAttribute("name", "test-name");
    expect(inputElement).toHaveValue("test-value");
  });
});
