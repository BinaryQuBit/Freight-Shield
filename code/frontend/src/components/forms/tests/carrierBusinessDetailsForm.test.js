import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CarrierCompanyDetailsForm from "../carrierBusinessDetailsForm";

const renderForm = () => {
    return render(
        <MemoryRouter>
            <CarrierCompanyDetailsForm />
        </MemoryRouter>
    );
}

describe("Carrier Company Details Form Component", () => {
    it("renders without crashing", () => {
        renderForm();
    });

    it("display all input fields", () => {
        const { getByText } = renderForm();
        const businessDetailsText = getByText("Business Details");
        expect(businessDetailsText).toBeInTheDocument();

        const businessNameLabel = getByText("Business Name *");
        expect(businessNameLabel).toBeInTheDocument();

        const doingBusinessAsLabel = getByText("Doing Business As");
        expect(doingBusinessAsLabel).toBeInTheDocument();

        const businessNumberLabel = getByText("Business Number *");
        expect(businessNumberLabel).toBeInTheDocument();

        const canadianCarrierCodeLabel = getByText("Canadian Carrier Code *");
        expect(canadianCarrierCodeLabel).toBeInTheDocument();

        const nationalSafetyCodeLabel = getByText("National Safety Code *");
        expect(nationalSafetyCodeLabel).toBeInTheDocument();

        const wcbLabel = getByText("WCB Number *");
        expect(wcbLabel).toBeInTheDocument();

        const websiteLabel = getByText("Website");
        expect(websiteLabel).toBeInTheDocument();

        const logoutButton = getByText("Logout");
        expect(logoutButton).toBeInTheDocument();

        const nextButton = getByText("Next");
        expect(nextButton).toBeInTheDocument();
    });

});
