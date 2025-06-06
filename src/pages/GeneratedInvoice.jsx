import { useState } from "react";
import "../../public/css/GeneratedInvoice.css";
import { useLocation, useNavigate } from "react-router-dom";
import InvoicePdf from "../component/InvoicePdf";
import { addUpdateInvoice } from "../component/ApiFunction";
import { getUserId } from "../../Helper";
import InvoicePdf2 from "../component/InvoicePdf2";
import InvoicePdf3 from "../component/InvoicePdf3";
import InvoicePdf4 from "../component/InvoicePdf4/InvoicePdf4";

export default function GeneratedInvoice() {
  const { state: formData } = useLocation();
  const navigate = useNavigate();
  const [creatingBill, setCreatingBill] = useState(false);

  // console.log("Generated Invoice Data:", formData);


  // const [emailShare, setEmailShare] = useState("");
  // const handleInputEmailShare = (event) => {
  //   const { value } = event.target;
  //   setEmailShare(value);
  // };
  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const handleEditClick = () => {
    navigate("/invoice/new-invoice", { state: formData });
  };

  // const {
  //   logo,
  //   invoiceName,
  //   invoiceNumber,
  //   date,
  //   businessName,
  //   businessAddress,
  //   businessEmail,
  //   businessPhone,
  //   businessNumber,
  //   billName,
  //   billAddress,
  //   billEmail,
  //   billMobile,
  //   shipToName,
  //   copyBilling,
  //   shipToAddress,
  //   shipToEmail,
  //   shipToMobile,
  //   items = [],
  //   subtotal,
  //   discountLabel,
  //   discountTotal,
  //   cgstLabel,
  //   cgstTax,
  //   sgstLabel,
  //   sgstTax,
  //   taxLabelWithPercentage,
  //   calculatedTaxValue,
  //   calculatedTotal,
  //   signature_url,
  //   additionalDetails,

  // } = formData || {};

  const generatePdf = () => {
    const data = formData;
    if (!data) return;
    setCreatingBill(true);
    data.user_id = getUserId();
    data.status = "active";
    // console.log("✅ Final Data (JSON):", JSON.stringify(data, null, 2));
    addUpdateInvoice(data, navigate);
  };

  return (
    <div className="my-5">
      <div className="row mx-2 flex-wrap ">
        <div
          className="position-sticky top-0 z-3 py-2 "
          style={{ backgroundColor: "whitesmoke" }}
        >
          <div className="d-flex justify-content-between">
            <div
              className="btn-group gap-2"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                className="btn btn-outline-primary"
                style={{
                  fontWeight: "500",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                Preview
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                style={{
                  fontWeight: "500",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                }}
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
            {/* <button
              type="button"
              className="btn btn-outline-primary"
              style={{
                fontWeight: "500",
                padding: "8px 20px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={generatePdf}
              disabled={formData?.billName === "" || creatingBill}
            >
              {creatingBill ? "Creating.." : "Create Bill"}
            </button> */}
          </div>
        </div>

        <div className="position-relative z-1">
          {/* <InvoicePdf3 formData={formData} /> */}
          <InvoicePdf4 formData={formData} generatePdf={generatePdf} />
          {/* <InvoicePdf formData={formData} /> */}
        </div>
      </div>
    </div>
  );
}
