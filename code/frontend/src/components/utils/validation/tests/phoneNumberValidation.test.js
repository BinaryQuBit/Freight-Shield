import { PhoneNumberValidation } from "../phoneNumberValidation";

describe("PhoneNumberValidation", () => {
  test("returns error message when phone number is empty", () => {
    const errorMessage = PhoneNumberValidation("");
    expect(errorMessage).toBe("Phone number is required");
  });

  test("returns error message when phone number is invalid", () => {
    const errorMessage2 = PhoneNumberValidation("+12345");
    expect(errorMessage2).toBe("Phone number is invalid");
    const errorMessage3 = PhoneNumberValidation("+123456789a");
    expect(errorMessage3).toBe("Phone number is invalid");
  });

  test("returns empty string when phone number is valid", () => {
    const errorMessage = PhoneNumberValidation("+1234567890");
    expect(errorMessage).toBe("");
  });
});
