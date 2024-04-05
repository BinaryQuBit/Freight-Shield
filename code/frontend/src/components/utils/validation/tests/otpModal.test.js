import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import OTPModal from "../otpModal";
import axios from "axios";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("OTPModal", () => {
  const onCloseOTPMock = jest.fn();
  const onModalCloseMock = jest.fn();
  const email = "rsa1492uregina.ca";
  const password = "123456789";
  const confirmPassword = "123456789";

  test("renders OTP modal with correct elements", () => {
    render(
      <OTPModal
        isOTPOpen={true}
        onCloseOTP={onCloseOTPMock}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onModalClose={onModalCloseMock}
      />
    );

    expect(screen.getByText("OTP Verification")).toBeInTheDocument();
  });

  test("calls onCloseOTP and onModalClose when modal is closed", async () => {
    render(
      <OTPModal
        isOTPOpen={true}
        onCloseOTP={onCloseOTPMock}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onModalClose={onModalCloseMock}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByLabelText("Close"));
    });

    expect(onCloseOTPMock).toHaveBeenCalled();
    expect(onModalCloseMock).toHaveBeenCalled();
  });

  test("enters OTP and verifies successfully", async () => {
    const mockPost = jest.spyOn(axios, "post").mockResolvedValueOnce({});

    render(
      <OTPModal
        isOTPOpen={true}
        onCloseOTP={onCloseOTPMock}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onModalClose={onModalCloseMock}
      />
    );

    const otpInputs = screen.getAllByRole("textbox");
    otpInputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: index + 1 } });
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Verify"));
    });

    expect(mockPost).toHaveBeenCalledWith("/verifyOTP", {
      email,
      password,
      confirmPassword,
      otpNumber: "123456",
    });

    expect(onCloseOTPMock).toHaveBeenCalled();
  });
});
