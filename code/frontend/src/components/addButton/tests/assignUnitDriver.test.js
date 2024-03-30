import { render, fireEvent, waitFor } from "@testing-library/react";
import AssignUnitDriver from "../AssignUnitDriver";

const renderAssignUnitDriver = (props) => {
  return render(<AssignUnitDriver {...props} />);
};

describe("AssignUnitDriver Component", () => {
  it("renders the component without crashing", () => {
    renderAssignUnitDriver({ isOpen: true, onClose: () => {}, units: [], driverData: [], selectedLoadId: "" });
  });

  it("renders all labels correctly", () => {
    const { getByText } = renderAssignUnitDriver({ isOpen: true, onClose: () => {}, units: [], driverData: [], selectedLoadId: "" });
    expect(getByText("Select Unit")).toBeInTheDocument();
    expect(getByText("Select Driver")).toBeInTheDocument();
    expect(getByText("Close")).toBeInTheDocument();
    expect(getByText("Assign")).toBeInTheDocument();
  });

});
