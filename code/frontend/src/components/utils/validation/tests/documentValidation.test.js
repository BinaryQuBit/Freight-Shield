import { DocumentValidation } from "../documentValidation";

describe("DocumentValidation", () => {
  test("returns error message when value is empty", () => {
    const name = "Field";
    const value = "";
    const errorMessage = DocumentValidation(name, value);
    expect(errorMessage).toBe(`${name} is required`);
  });

  test("returns empty string when value is not empty", () => {
    const name = "Field";
    const value = "12345";
    const errorMessage = DocumentValidation(name, value);
    expect(errorMessage).toBe("");
  });
});
