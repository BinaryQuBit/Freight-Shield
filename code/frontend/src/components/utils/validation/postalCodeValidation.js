// Start of Postal Code Validation
export const PostalCodeValidation = (postalCode) => {
  const trimmedPostalCode = postalCode.trim();

  if (!trimmedPostalCode) {
    return "Postal code is required";
  }

  const postalCodePattern = /^[A-Z0-9]{6}(?:-[A-Z0-9]{2,5})?$/i;
  if (!postalCodePattern.test(trimmedPostalCode)) {
    return "Postal code is invalid";
  }

  return "";
};
