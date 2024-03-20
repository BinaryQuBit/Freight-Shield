export const EmptyValidation = (name, value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
        return `${name} is required`;
    }
    return "";
};