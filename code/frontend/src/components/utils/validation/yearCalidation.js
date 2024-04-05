// Start of Year Validation
export const YearValidation = (year) => {
  const trimmedYear = String(year).trim();

  if (trimmedYear === "") {
    return "Year is required";
  }
  const yearPattern = /^[0-9]{4}$/;
  if (!yearPattern.test(trimmedYear)) {
    return "Year must be in YYYY format";
  }

  const parsedYear = parseInt(trimmedYear, 10);
  const currentYear = new Date().getFullYear();

  if (parsedYear < 1900 || parsedYear > currentYear + 1) {
    return `Year must be between 1900 and ${currentYear + 1}`;
  }

  return "";
};
