// Website Validation

export const WebsiteValidation = (website) => {
    if (website === "") {
        return "";
    }
    const websitePattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    if (!websitePattern.test(website)) {
        return "Website is invalid";
    }
    return "";
};
