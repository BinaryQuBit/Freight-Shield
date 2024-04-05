import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostedLoadEdit from "../PostedLoadEdit";

const renderPostedLoadEdit = (load) => {
  return render(
    <PostedLoadEdit isOpen={true} onClose={() => {}} load={load} />
  );
};

describe("PostedLoadEdit Component", () => {
  const mockLoad = {
    _id: "123",
    pickUpLocation: "Pickup Location",
    pickUpDate: "2024-04-01",
    pickUpTime: "08:00",
    dropOffDate: "2024-04-02",
    dropOffTime: "18:00",
    dropOffLocation: "Dropoff Location",
    unitRequested: "Dry Van",
    typeLoad: "Full Load",
    sizeLoad: "10",
    additionalInformation: "Additional Information",
    pickUpCity: "Pickup City",
    dropOffCity: "Dropoff City",
    pickUpLAT: "40.7128",
    pickUpLNG: "-74.0060",
    dropOffLAT: "34.0522",
    dropOffLNG: "-118.2437",
    price: "1000",
    additionalDocument: "additionalDocument.pdf",
  };

  it("renders with initial data", () => {
    renderPostedLoadEdit(mockLoad);
    expect(screen.getByLabelText(/Pick Up Location/i)).toHaveValue(
      "Pickup Location"
    );
  });

  it("triggers onClose callback when Close button is clicked", () => {
    const mockOnClose = jest.fn();
    renderPostedLoadEdit(mockLoad, mockOnClose);
    fireEvent.click(screen.getByText(/Close/i));
  });

  it("updates input values correctly", () => {
    const mockOnClose = jest.fn();
    renderPostedLoadEdit(mockLoad, mockOnClose);
    const pickUpLocationInput = screen.getByLabelText(/Pick Up Location/i);
    const newPickUpLocation = "New Pickup Location";
    fireEvent.change(pickUpLocationInput, {
      target: { value: newPickUpLocation },
    });
  });
});
