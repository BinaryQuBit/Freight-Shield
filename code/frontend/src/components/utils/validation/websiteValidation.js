// Start Of Website Validation
export const WebsiteValidation = (website) => {
  const trimmedWebsite = website.trim();

  if (trimmedWebsite === "") {
    return "";
  }
  const websitePattern =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  if (!websitePattern.test(trimmedWebsite)) {
    return "Website is invalid";
  }
  return "";
};
