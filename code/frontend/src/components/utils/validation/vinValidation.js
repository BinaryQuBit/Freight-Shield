export const VinValidation = (vin) => {
    const trimmedVin = vin.trim();

    if (trimmedVin === "") {
        return "VIN is Required";
    }

    const vinPattern = /^[A-HJ-NPR-Za-hj-npr-z0-9]{11,17}$/;
    if (!vinPattern.test(trimmedVin)) {
        return "VIN must be between 11 to 17 alphanumeric characters and must exclude I, O, and Q.";
    }
    return "";
};
