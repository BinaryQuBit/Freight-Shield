export const EmptyValidation = (name, value) => {
    if (!value) {
        return `${name} is required`;
    }
    return "";
};
