import { VinValidation } from "../vinValidation";

describe("VinValidation", () => {
  test("returns error message when VIN is empty", () => {
    const errorMessage = VinValidation("");
    expect(errorMessage).toBe("VIN is Required");
  });

  test("returns error message when VIN length is less than 11", () => {
    const errorMessage = VinValidation("1234567890");
    expect(errorMessage).toBe(
      "VIN must be between 11 to 17 alphanumeric characters and must exclude I, O, and Q."
    );
  });

  test("returns error message when VIN length is more than 17", () => {
    const errorMessage = VinValidation("1GNEK13Z82R1776829");
    expect(errorMessage).toBe(
      "VIN must be between 11 to 17 alphanumeric characters and must exclude I, O, and Q."
    );
  });

  test("returns empty string when VIN is valid", () => {
    const errorMessage = VinValidation("1GNEK13Z82R177682");
    expect(errorMessage).toBe("");
  });
});
