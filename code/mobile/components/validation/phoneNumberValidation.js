// Phone Number Validation

export const PhoneNumberValidation = (phone) => {
    const trimmedPhone = phone.trim();
  
    if (!trimmedPhone) {
      return "Phone number is required";
    }
  
    const phonePattern = /^\+?[1-9]\d{9}$/;
    if (!phonePattern.test(trimmedPhone)) {
      return "Phone number is invalid";
    }
  
    return "";
  };