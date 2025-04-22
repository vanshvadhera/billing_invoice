import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SignatureCanvas from "../component/SignatureCanvas";
import Swal from "sweetalert2";
import { getUserProfile, updateProfile } from "../component/ApiFunction";
import LogoInput from "../component/LogoInput";

export default function Profile() {
  const [formData, setFormData] = useState({
    user_id: Cookies.get("user_id"),
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    address: "",
    gstNumber: "",
    stateName: "",
    contactNumber: "",
    bankName: "",
    accountNumber: "",
    branch: "",
    ifscCode: "",
    status: "true",
    logo: "",
    signature_logo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState(null);
  const [signature, setSignature] = useState(null);
  const phoneExp = /^\d{10}$/;
  const emailExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleSignatureUpload = (signatureUrl) => {
    console.log("Received logo URL:", signatureUrl);

    if (signatureUrl) {
      setSignature(signatureUrl);

      setFormData((prevData) => ({
        ...prevData,
        signature_logo: signatureUrl,
      }));
    }
  };
  const handleUploadSuccess = (fileUrl) => {
    console.log("Received logo URL:", fileUrl);

    if (fileUrl) {
      setUploadedLogoUrl(fileUrl);

      setFormData((prevData) => ({
        ...prevData,
        logo: fileUrl,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const isPhoneValid = phoneExp.test(formData.phoneNumber);
  const isEmailValid = emailExp.test(formData.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsSubmitting(true);
    updateProfile(setIsSubmitting, formData);
  };

  const accessToken = Cookies.get("access_token");

  useEffect(() => {
    const user_id = formData.user_id;

    if (user_id && accessToken) {
      setLoading(true);
      getUserProfile(setLoading, setFormData);
    }
  }, [formData.user_id, accessToken]);

  const isFormValid = isPhoneValid && isEmailValid;
  return (
    <>
      <div className="container my-5">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <form
            className="accordion accordion-flush"
            id="accordionFlushExample"
            onSubmit={handleSubmit}
          >
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  User Profile
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="row g-2">
                    <div className="col-md-4">
                      <label htmlFor="name" className="text-dark fs-o8">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="email" className="text-dark fs-o8">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="Email"
                      />
                      {!isEmailValid && formData.email && (
                        <div className="text-danger fs-08 mt-2">
                          Please enter a valid email address.
                        </div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="phoneNumber" className="text-dark fs-o8">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="Phone Number"
                      />
                      {!isPhoneValid && formData.phoneNumber && (
                        <div className="text-danger fs-08 mt-2">
                          Please enter a valid 10-digit phone number.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item my-2">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Store Information
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="row g-2">
                    <div className="col-md-4">
                      <label htmlFor="companyName" className="text-dark fs-o8">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="address" className="text-dark fs-o8">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="Address"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="gstNumber" className="text-dark fs-o8">
                        GST Number
                      </label>
                      <input
                        type="text"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="GST Number"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="stateName" className="text-dark fs-o8">
                        State Name
                      </label>
                      <input
                        type="text"
                        name="stateName"
                        value={formData.stateName}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="State Name"
                      />
                    </div>
                    <div className="col-md-4">
                      <label
                        htmlFor="contactNumber"
                        className="text-dark fs-o8"
                      >
                        Contact Number
                      </label>
                      <input
                        type="number"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="Contact Number"
                      />
                    </div>
                    <div className="row px-0 mt-2">
                      <div className="col-lg-3 col-md-6 col-12 d-flex">
                        <SignatureCanvas
                          onUploadSuccess={handleSignatureUpload}
                          preview={formData?.signature_logo}
                        />
                      </div>
                      <div className="col-lg-3 col-md-6 col-12">
                        <LogoInput
                          onUploadSuccess={handleUploadSuccess}
                          preview={formData?.logo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Bank Details
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <div className="row g-2">
                    <div className="col-md-4">
                      <label htmlFor="bankName" className="text-dark fs-o8">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="Bank Name"
                      />
                    </div>
                    <div className="col-md-4">
                      <label
                        htmlFor="accountNumber"
                        className="text-dark fs-o8"
                      >
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="Account Number"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="branch" className="text-dark fs-o8">
                        Branch
                      </label>
                      <input
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="Branch"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="ifscCode" className="text-dark fs-o8">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                        className="py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        placeholder="IFSC Code"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-end mt-3">
              <button
                className="btn bg-dark text-white"
                type="submit"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
