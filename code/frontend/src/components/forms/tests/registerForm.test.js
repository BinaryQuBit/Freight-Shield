import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "../registerForm";

const renderForm = () => {
  return render(
    <MemoryRouter>
      <RegisterForm />
    </MemoryRouter>
  );
};

describe("RegisterForm", () => {
  it("renders RegisterForm component correctly", () => {
    renderForm();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Create an Account")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Already have an Account?")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });
});
