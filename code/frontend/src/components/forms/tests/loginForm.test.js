import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../loginForm";

const renderForm = () => {
  return render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
};

describe("Log in form ", () => {
  it("renders without crashing", () => {
    const { getByText } = renderForm();
    expect(getByText("Log In")).toBeInTheDocument();
    expect(getByText("Forgot Password")).toBeInTheDocument();
    expect(getByText("Create an Account")).toBeInTheDocument();
    expect(getByText("Your Ultimate Loadboard Solution!")).toBeInTheDocument();
  });
});
