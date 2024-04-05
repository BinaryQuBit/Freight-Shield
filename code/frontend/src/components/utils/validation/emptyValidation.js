// Start of Empty Validation
export const EmptyValidation = (name, value) => {
  if (value === null || value === undefined) {
    return `${name} does not exist`;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return `${name} is required`;
  }
  return "";
};
