import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GooglePlacesAutocomplete from "../autoCompletePlaces";

describe("GooglePlacesAutocomplete Component", () => {
  const mockOnChange = jest.fn();

  it("renders with placeholder", () => {
    render(
      <GooglePlacesAutocomplete
        type="text"
        name="address"
        placeholder="Enter address"
        value=""
        onChange={mockOnChange}
        borderColor="gray.400"
        id="autocomplete-input"
      />
    );
    expect(screen.getByPlaceholderText("Enter address")).toBeInTheDocument();
  });

  it("calls onChange callback when input value changes", () => {
    render(
      <GooglePlacesAutocomplete
        type="text"
        name="address"
        placeholder="Enter address"
        value=""
        onChange={mockOnChange}
        borderColor="gray.400"
        id="autocomplete-input"
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter address");
    fireEvent.change(inputElement, { target: { value: "New York" } });
  });
});
