// components/InvoicePreview.js
import React from "react";

export default function InvoicePdf2({ formData }) {
    const { additionalDetails } = formData || {};
    return (
        <div className="bg-white p-3">
            <p className="text-center fs-4 text-black">TAX INVOICE</p>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <tbody>
                        {/* Company Info + Invoice Info */}
                        <tr>
                            <td rowSpan="3" colSpan="2">
                                <strong>AVID RISE DIGITAL SOLUTATIONS</strong><br />
                                Azizganj Anand Vihaar Near S.S College<br />
                                Shahjahanpur<br />
                                GSTIN/UIN: 09ACEFA9697B1Z3<br />
                                State Name: Uttar Pradesh, Code: 09<br />
                                Contact : 9307489221
                            </td>
                            <td><strong>Invoice No.</strong></td>
                            <td><strong>04</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Dated</strong></td>
                            <td><strong>09-Apr-25</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Delivery Note</strong></td>
                            <td>Mode/Terms of Payment</td>
                        </tr>

                        {/* Order, Dispatch & Terms */}
                        <tr>
                            <td colSpan="2">
                                <strong>Consignee (Ship to)</strong><br />
                                <strong>ULTRATECH CEMENT LIMITED</strong><br />
                                SHAHJAHANPUR UNIT<br />
                                GSTIN/UIN : 09AAACL6442L1Z8<br />
                                State Name : Uttar Pradesh, Code : 09
                            </td>
                            <td><strong>Buyer's Order No.</strong></td>
                            <td>Dated</td>
                        </tr>

                        <tr>
                            <td colSpan="2">
                                <strong>Buyer (Bill to)</strong><br />
                                <strong>ULTRATECH CEMENT LIMITED</strong><br />
                                SHAHJAHANPUR UNIT<br />
                                GSTIN/UIN : 09AAACL6442L1Z8<br />
                                State Name : Uttar Pradesh, Code : 09<br />
                                Place of Supply : Uttar Pradesh
                            </td>
                            <td><strong>Dispatch Doc No.</strong></td>
                            <td>Delivery Note Date</td>
                        </tr>

                        <tr>
                            <td colSpan="2"></td>
                            <td><strong>Dispatched through</strong></td>
                            <td>Destination</td>
                        </tr>

                        <tr>
                            <td colSpan="4">
                                <strong>Terms of Delivery</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
