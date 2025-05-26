// components/InvoicePreview.js
import React from "react";

export default function InvoicePdf2({ formData }) {
    const { additionalDetails } = formData || {};
    return (
        <div className="bg-white p-3">
            <p className="text-center fs-4 text-black">TAX INVOICE</p>

            <div className="row border mt-2 mx-3">
                <div className="col-md-6 bg-danger" style={{ height: "150px" }}></div>
                <div className="col-md-6 bg-success" style={{ height: "150px" }}></div>
            </div>
        </div>
    );
}
