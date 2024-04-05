import { SelectValidation } from "../selectValidation";

describe("SelectValidation", () => {
  test("returns error message when option is not selected", () => {
    const errorMessage = SelectValidation("");
    expect(errorMessage).toBe("Please select an option");
  });

  test("returns empty string when option is selected", () => {
    const errorMessage = SelectValidation("Option 1");
    expect(errorMessage).toBe("");
  });
});
