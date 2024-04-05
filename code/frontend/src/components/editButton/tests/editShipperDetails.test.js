import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditShipperDetails from "../EditShipperDetails";

describe("EditShipperDetails Component", () => {
  it("renders with initial data", () => {
    const mockData = {
      firstName: "Raman",
      lastName: "Singh",
      companyPhoneNumber: "1234567890",
    };

    render(
      <EditShipperDetails isOpen={true} onClose={() => {}} data={mockData} />
    );

    expect(screen.getByLabelText(/First Name/i)).toHaveValue("Raman");
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue("Singh");
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue("1234567890");
  });

  it("triggers onClose callback when Close button is clicked", () => {
    const mockOnClose = jest.fn();

    render(
      <EditShipperDetails isOpen={true} onClose={mockOnClose} data={{}} />
    );

    fireEvent.click(screen.getByText(/Close/i));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("updates input values correctly", () => {
    const mockOnClose = jest.fn();

    render(
      <EditShipperDetails isOpen={true} onClose={mockOnClose} data={{}} />
    );

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);

    fireEvent.change(firstNameInput, { target: { value: "Raman" } });
    fireEvent.change(lastNameInput, { target: { value: "Singh" } });

    expect(firstNameInput).toHaveValue("Raman");
    expect(lastNameInput).toHaveValue("Singh");
  });
});
