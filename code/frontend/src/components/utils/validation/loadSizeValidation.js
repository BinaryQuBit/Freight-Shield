// Start of Load Size Validation
export const LoadSizeValidation = (number) => {
  if (number === null || number === undefined || number.trim() === "") {
    return "Number is required";
  }

  const trimmedNumber = number.trim();

  const numberPattern = /^\d+$/;
  if (!numberPattern.test(trimmedNumber)) {
    return "Please enter a whole number";
  }

  if (parseInt(trimmedNumber, 10) < 1) {
    return "Load cannot be less than 1";
  }

  return "";
};
