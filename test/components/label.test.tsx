import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Label from "../../src/components/label";
import { describe, it, expect } from "vitest";
import React from "react";

describe("Label Component", () => {
  it("renders label with correct text and htmlFor", () => {
    render(<Label htmlFor="test-id" text="Test Label" />);

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("for", "test-id");
  });
});
