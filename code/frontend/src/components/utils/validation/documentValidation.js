// Start of Document Validation
export const DocumentValidation = (name, value) => {
  if (!value) {
    return `${name} is required`;
  }
  return "";
};
