import { useEffect, useState } from "react";
import NewPageInput from "./NewPageInput";
import { getUserProfile } from "./ApiFunction";

export default function FromBusinessSection({formData}) {


  return (
    <div className="col-md-6 mt-3">
      <h5 className="text-secondary">From</h5>
      <div className="d-flex flex-column my-3 gap-3">
        <NewPageInput
          label="Name"
          name="businessName"
          value={formData.companyName || ""}
          placeholder="Business Name"
          type="text"
          readOnly

        />
        <NewPageInput
          label="Email"
          name="businessEmail"
          value={formData.email || ""}
          placeholder="name@business.com"
          type="email"
          readOnly

        />
        <NewPageInput
          label="Address"
          name="businessAddress"
          value={formData.address || ""}
          placeholder="Street"
          type="text"
          readOnly

        />
        <NewPageInput
          label="Phone"
          name="businessPhone"
          value={formData.phoneNumber || ""}
          placeholder="(123) 456 789"
          type="number"
          readOnly

        />
        <NewPageInput
          label="Business Number"
          name="businessNumber"
          value={formData.contactNumber || ""}
          placeholder="123-456-789"
          type="number"
          readOnly

        />

        {/* Collapsible Additional Fields */}
        <div className="row align-items-center flex-row">
          <div className="col-md-3"></div>
          <div className="col-md-8">
            <a
              className="fs-o8 text-decoration-underline text-dark"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <i className="fa fa-plus me-1"></i>
              Show additional business details
            </a>
          </div>
          <div
            id="collapseOne"
            className="accordion-collapse collapse mt-3"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <NewPageInput
              label="Website"
              name="websiteUrl"
              value={formData.websiteUrl || ""}
              placeholder="https://example-website.com"
              type="text"
              readOnly

            />
            <div className="mt-3">
              <NewPageInput
                label="Owner"
                name="businessOwner"
                value={formData.name || ""}
                placeholder="Business owner name"
                type="text"
                readOnly

              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
