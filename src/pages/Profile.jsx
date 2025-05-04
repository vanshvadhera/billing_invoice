import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import SignatureCanvas from "../component/SignatureCanvas"
import { getUserProfile, updateProfile } from "../component/ApiFunction"
import LogoInput from "../component/LogoInput"

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
    store_code: "",
    isCodeSetup: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState(null)
  const [signature, setSignature] = useState(null)
  const phoneExp = /^\d{10}$/
  const emailExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

  const handleSignatureUpload = (signatureUrl) => {
    console.log("Received logo URL:", signatureUrl)

    if (signatureUrl) {
      setSignature(signatureUrl)
      setFormData((prevData) => ({
        ...prevData,
        signature_logo: signatureUrl,
      }))
    }
  }

  const handleUploadSuccess = (fileUrl) => {
    console.log("Received logo URL:", fileUrl)

    if (fileUrl) {
      setUploadedLogoUrl(fileUrl)
      setFormData((prevData) => ({
        ...prevData,
        logo: fileUrl,
      }))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const isPhoneValid = phoneExp.test(formData.phoneNumber)
  const isEmailValid = emailExp.test(formData.email)

  const handleSubmit = (e) => {
    let reloadSite = formData.isCodeSetup ? false : true
    e.preventDefault()
    console.log(formData)
    formData.isCodeSetup = formData.store_code ? true : false
    setIsSubmitting(true)
    updateProfile(setIsSubmitting, formData, reloadSite)
    // if (reloadSite) {
    //   window.location.reload()
    // }
  }

  const accessToken = Cookies.get("access_token")

  useEffect(() => {
    const user_id = formData.user_id

    if (user_id && accessToken) {
      setLoading(true)
      getUserProfile(setLoading, setFormData)
    }
  }, [formData.user_id, accessToken])

  const isFormValid = isPhoneValid && isEmailValid

  return (
    <div className="container my-5">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* User Profile Section */}
          <div className="card mb-4 border-0">
            <div className="card-header bg-light">
              <h5 className="mb-0 fw-semibold">User Profile</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Email"
                  />
                  {!isEmailValid && formData.email && (
                    <div className="text-danger small mt-1">Please enter a valid email address.</div>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Phone Number"
                  />
                  {!isPhoneValid && formData.phoneNumber && (
                    <div className="text-danger small mt-1">Please enter a valid 10-digit phone number.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Store Information Section */}
          <div className="card mb-4 border-0">
            <div className="card-header bg-light">
              <h5 className="mb-0 fw-semibold">Store Information</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {["companyName", "address", "gstNumber", "stateName", "contactNumber"].map((field) => (
                  <div className="col-md-4" key={field}>
                    <label className="form-label text-capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                    />
                  </div>
                ))}
                <div className="col-md-4" key={"Store Code"}>
                  <div className="flex flex-row gap-2" >
                    <label className="form-label text-capitalize">{"Store Code"}</label>
                    <span className="text-red-600 font-semibold">(can only be set once)</span>
                  </div>
                  <input
                    type="text"
                    name={"store_code"}
                    value={formData.store_code}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder={"Eg. INV"}
                    disabled={formData.isCodeSetup}
                  />
                </div>
              </div>

              <div className="flex flex-row mt-4 gap-10">
                <SignatureCanvas
                  onUploadSuccess={handleSignatureUpload}
                  preview={formData?.signature_logo}
                />
                <div>

                  <LogoInput
                    onUploadSuccess={handleUploadSuccess}
                    preview={formData?.logo}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="card mb-4 border-0">
            <div className="card-header bg-light">
              <h5 className="mb-0 fw-semibold">Bank Details</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {["bankName", "accountNumber", "branch", "ifscCode"].map((field) => (
                  <div className="col-md-3" key={field}>
                    <label className="form-label text-capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-end mt-4">
            <button type="submit" className="btn btn-dark px-4 py-2" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Updating...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
