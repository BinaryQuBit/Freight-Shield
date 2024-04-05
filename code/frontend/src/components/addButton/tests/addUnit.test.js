import { render } from "@testing-library/react";
import AddUnit from "../addUnit";

const renderAddUnit = (props) => {
  return render(<AddUnit {...props} />);
};

describe("AddUnit Component", () => {
  it("renders the component without crashing", () => {
    renderAddUnit({ isOpen: true, onClose: () => {} });
  });

  it("renders all text content correctly", () => {
    const { getByText } = renderAddUnit({ isOpen: true, onClose: () => {} });
    expect(getByText("Add New Unit")).toBeInTheDocument();
    expect(getByText("Unit Number")).toBeInTheDocument();
    expect(getByText("Select Type")).toBeInTheDocument();
    expect(getByText("Truck")).toBeInTheDocument();
    expect(getByText("Trailer")).toBeInTheDocument();
  });
});
