export const LoadSizeValidation = (number) => {
    const numberPattern = /^\d+$/;
  
    if (number === null || number === undefined || number === '') {
      return "Number is required";
    }
    if (!numberPattern.test(number)) {
      return "Please enter a whole number";
    }
    if (parseInt(number, 10) < 1) {
      return "Load cannot be less than 1 foot";
    }
    return "";
  };
  