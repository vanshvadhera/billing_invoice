// components/InvoicePreview.js
import React from "react";

export default function InvoicePdf({ formData }) {
  const {
    logo,
    invoiceName,
    invoiceNumber,
    date,
    businessName,
    businessAddress,
    businessEmail,
    businessPhone,
    businessNumber,
    billName,
    billAddress,
    billEmail,
    billMobile,
    shipToName,
    copyBilling,
    shipToAddress,
    shipToEmail,
    shipToMobile,
    items = [],
    subtotal,
    discountLabel,
    discountTotal,
    cgstLabel,
    cgstTax,
    sgstLabel,
    sgstTax,
    taxLabelWithPercentage,
    calculatedTaxValue,
    calculatedTotal,
    signature_url,
    additionalDetails,
  } = formData || {};

  return (
    // <div className="row left-side-invoice border py-5 px-3 mt-2 z-1">
      <div className="tm_invoice_wrap">
        <div className="tm_invoice tm_style1 px-4 py-5" id="tm_download_section">
          <div className="tm_invoice_in">
            <div className="tm_invoice_head tm_align_center tm_mb20">
              <div className="tm_invoice_left">
                <div className="tm_logo">
                  <img src={logo} alt="Logo" />
                </div>
              </div>
              <div className="tm_invoice_right tm_text_right">
                <div className="tm_primary_color tm_f50 tm_text_uppercase">
                  {invoiceName}
                </div>
              </div>
            </div>

            <div className="tm_invoice_info tm_mb20 d-flex justify-content-end">
              <div className="tm_invoice_info_list">
                <p className="tm_invoice_number tm_m0">
                  Invoice No: <b className="tm_primary_color">{invoiceNumber}</b>
                </p>
                <p className="tm_invoice_date tm_m0">
                  Date:{" "}
                  <b className="tm_primary_color">
                    {date ? new Date(date).toLocaleDateString("en-GB") : ""}
                  </b>
                </p>
              </div>
            </div>

            <div className="tm_invoice_head tm_mb10">
              <div className="tm_invoice_lef">
                <p className="tm_mb2"><b className="tm_primary_color">From:</b></p>
                <p>
                  {businessName}<br />
                  {businessAddress}<br />
                  {businessEmail}<br />
                  {businessPhone}, {businessNumber}
                </p>
              </div>

              {billName && (
                <div className="tm_invoice_left">
                  <p className="tm_mb2"><b className="tm_primary_color">Bill to:</b></p>
                  <p>
                    {billName}<br />
                    {billAddress}<br />
                    {billEmail}<br />
                    {billMobile}
                  </p>
                </div>
              )}

              {copyBilling === "no" && shipToName && (
                <div className="tm_invoice_righ tm_text_right">
                  <p className="tm_mb2"><b className="tm_primary_color">Ship To:</b></p>
                  <p>
                    {shipToName}<br />
                    {shipToAddress}<br />
                    {shipToEmail}<br />
                    {shipToMobile}
                  </p>
                </div>
              )}
            </div>

            <div className="tm_table tm_style1 tm_mb10">
              <div className="tm_round_border">
                <div className="tm_table_responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg">Item Name</th>
                        <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg">Description</th>
                        <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">HSN Code</th>
                        <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">Rate</th>
                        <th className="tm_width_1 tm_semi_bold tm_primary_color tm_gray_bg">Qty</th>
                        <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.length > 0 ? (
                        items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.select}</td>
                            <td>{item.details}</td>
                            <td>{item.hsncode}</td>
                            <td>{item.rate}</td>
                            <td>{item.quantity}</td>
                            <td className="tm_text_right">₹{item.total}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center m-0">No items added</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="tm_invoice_footer d-flex justify-content-end">
                <div className="tm_right_footer">
                  <table>
                    <tbody>
                      <tr>
                        <td className="tm_width_3 tm_primary_color tm_border_none tm_bold">Subtotal</td>
                        <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">
                          {subtotal}
                        </td>
                      </tr>
                      {discountLabel && (
                        <tr>
                          <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">{discountLabel}</td>
                          <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                            - ₹{!isNaN(discountTotal) ? parseFloat(discountTotal).toFixed(2) : "0.00"}
                          </td>
                        </tr>
                      )}
                      {cgstLabel && (
                        <tr>
                          <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">{cgstLabel}</td>
                          <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">₹{cgstTax}</td>
                        </tr>
                      )}
                      {taxLabelWithPercentage && (
                        <tr>
                          <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">{taxLabelWithPercentage}</td>
                          <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">₹{calculatedTaxValue}</td>
                        </tr>
                      )}
                      {sgstLabel && (
                        <tr>
                          <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">{sgstLabel}</td>
                          <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">₹{sgstTax}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">Total</td>
                        <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                          {calculatedTotal}
                        </td>
                      </tr>
                      <tr className="tm_border_top tm_border_bottom">
                        <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">Grand Total</td>
                        <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right">
                          {calculatedTotal}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {signature_url && (
              <div className="d-flex justify-content-end tm_mb10 mt-5">
                <img src={signature_url} alt="Signature" width="200" height="200" />
              </div>
            )}

            {additionalDetails && (
              <div className="tm_padd_15_20 tm_round_border">
                <p className="tm_mb5"><b className="tm_primary_color">Notes</b></p>
                {additionalDetails}
              </div>
            )}
          </div>
        </div>
      </div>
    // </div>
  );
}
