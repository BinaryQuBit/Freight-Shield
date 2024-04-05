// Start of Password Validation
export const PasswordValidation = (password) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 8) {
    return "Must be at least 8 characters long";
  }
  return "";
};

// Start of Confirm Password Validation
export const ConfirmPasswordValidation = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return "";
};
