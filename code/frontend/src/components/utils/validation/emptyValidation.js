export const EmptyValidation = (name, value) => {
    // Check if value is null or undefined before attempting to trim
    if (value === null || value === undefined) {
        return `${name} does not exist`;
    }

    // Proceed with trimming since we now know value is neither null nor undefined
    const trimmedValue = value.trim();

    if (!trimmedValue) {
        return `${name} is required`;
    }
    return "";
};

