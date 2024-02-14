export const PhoneNumberValidation = (phone) => {
  const phonePattern = /^\+?[1-9]\d{9,14}$/;
  if (!phone) {
    return "Phone number is required";
  }
  if (!phonePattern.test(phone)) {
    return "Phone number is invalid";
  }
  return "";
};

// const phoneNumberRegex = /^[0-9]{10}$/;