export const PostalCodeValidation = (postalCode) => {
  const postalCodePattern = /^[A-Z0-9]{2,8}(?:-[A-Z0-9]{2,5})?$/i;

  if (!postalCode) {
    return "Postal code is required";
  }
  if (!postalCodePattern.test(postalCode)) {
    return "Postal code is invalid";
  }
  return "";
};

// const postalCodeRegex = /^[A-Za-z0-9]{5,6}$/;