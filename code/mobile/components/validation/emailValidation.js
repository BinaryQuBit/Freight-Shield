export const EmailValidation = (email) => {
    const trimmedEmail = email.trim();
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
        return "Email is required";
    }
    if (!emailPattern.test(trimmedEmail)) {
        return "Email is invalid";
    }
    return "";
  };