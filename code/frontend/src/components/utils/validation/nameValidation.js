// Name Validation

export const FirstNameValidation = (firstName) => {
    if (!firstName) {
      return "First name is required";
    }
    return "";
  };

  export const LastNameValidation = (lastName) => {
    if (!lastName) {
      return "Last name is required";
    }
    return "";
  };