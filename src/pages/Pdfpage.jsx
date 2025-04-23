import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font,
  Image,
} from "@react-pdf/renderer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    // fontFamily: "Metropolis",
    fontSize: 12,
    lineHeight: 1.6,
  },
  section: { marginBottom: 10 },
  header: { flexDirection: "row", justifyContent: "space-between" },
  bold: { fontWeight: "bold" },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    paddingBottom: 5,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #eee",
    paddingVertical: 4,
  },
  col: { flex: 1 },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footer: { textAlign: "right", marginTop: 20 },
});

// PDF Component
const InvoicePDF = ({
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
  copyBilling,
  shipToName,
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
  additionalDetails,
  signature_url,
  logo,
  invoiceData,
}) => {

  const logoUrl = invoiceData?.logo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.bold}>{invoiceName}</Text>
          <View>
            <Text>Invoice No: {invoiceNumber}</Text>
            <Text>Date: {new Date(date).toLocaleDateString("en-GB")}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>From:</Text>
          <Image src={logoUrl} style={{ width: 100, height: 50 }} />
          <Text>{businessAddress}</Text>
          <Text>{businessEmail}</Text>
          <Text>
            {businessPhone}, {businessNumber}
          </Text>
        </View>

        {billName && (
          <View style={styles.section}>
            <Text style={styles.bold}>Bill To:</Text>
            <Text>{billName}</Text>
            <Text>{billAddress}</Text>
            <Text>{billEmail}</Text>
            <Text>{billMobile}</Text>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text style={[styles.col, styles.bold]}>Item Name</Text>
            <Text style={[styles.col, styles.bold]}>Description</Text>
            <Text style={[styles.col, styles.bold]}>HSN Code</Text>
            <Text style={[styles.col, styles.bold]}>Rate</Text>
            <Text style={[styles.col, styles.bold]}>Qty</Text>
            <Text style={[styles.col, styles.bold]}>Amount</Text>
          </View>
          {items?.length > 0 ? (
            items.map((item, index) => (
              <View style={styles.row} key={index}>
                <Text style={styles.col}>{item.select}</Text>
                <Text style={styles.col}>{item.details}</Text>
                <Text style={styles.col}>{item.hsncode}</Text>
                <Text style={styles.col}>{item.rate}</Text>
                <Text style={styles.col}>{item.quantity}</Text>
                <Text style={styles.col}>₹{item.total}</Text>
              </View>
            ))
          ) : (
            <Text>No items added</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.total}>
            <Text>Subtotal</Text>
            <Text>₹{subtotal}</Text>
          </View>
          {discountLabel && (
            <View style={styles.total}>
              <Text>{discountLabel}</Text>
              <Text>- ₹{parseFloat(discountTotal || 0).toFixed(2)}</Text>
            </View>
          )}
          {cgstLabel && (
            <View style={styles.total}>
              <Text>{cgstLabel}</Text>
              <Text>₹{cgstTax}</Text>
            </View>
          )}
          {taxLabelWithPercentage && (
            <View style={styles.total}>
              <Text>{taxLabelWithPercentage}</Text>
              <Text>₹{calculatedTaxValue}</Text>
            </View>
          )}
          {sgstLabel && (
            <View style={styles.total}>
              <Text>{sgstLabel}</Text>
              <Text>₹{sgstTax}</Text>
            </View>
          )}
          <View style={styles.total}>
            <Text style={styles.bold}>Grand Total</Text>
            <Text style={styles.bold}>₹{calculatedTotal}</Text>
          </View>
        </View>

        {additionalDetails && (
          <View style={styles.section}>
            <Text style={styles.bold}>Notes:</Text>
            <Text>{additionalDetails}</Text>
          </View>
        )}
      </Page>
    </Document>
  );

};

// Final Component
const InvoiceGenerator = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setInvoiceData(location.state);
    }
  }, [location.state]);

  const editPdf = (data) => {
    navigate("/invoice/new-invoice", { state: data });
  };
  const {
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
    copyBilling,
    shipToName,
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
    additionalDetails,
    signature_url,
    logo,
  } = props;
  {
    console.log(logo);
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      {/* HTML Preview */}
      <div className="tm_invoice_wrap">
        <div
          className="tm_invoice tm_style1 px-4 py-5"
          id="tm_download_section"
        >
          <div className="tm_invoice_in">
            <div className="tm_invoice_head tm_align_center tm_mb20">
              <div className="tm_invoice_left">
                <div className="tm_logo">
                  <img src={invoiceData?.logo} alt="Logo" />
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
                  Invoice No:{" "}
                  <b className="tm_primary_color">{invoiceNumber}</b>
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
                <p className="tm_mb2">
                  <b className="tm_primary_color">From:</b>
                </p>
                <p>
                  {businessName}
                  <br />
                  {businessAddress}
                  <br />
                  {businessEmail}
                  <br />
                  {businessPhone}, {businessNumber}
                </p>
              </div>

              {billName && (
                <div className="tm_invoice_left">
                  <p className="tm_mb2">
                    <b className="tm_primary_color">Bill to:</b>
                  </p>
                  <p>
                    {billName}
                    <br />
                    {billAddress}
                    <br />
                    {billEmail}
                    <br />
                    {billMobile}
                  </p>
                </div>
              )}

              {copyBilling === "no" && shipToName && (
                <div className="tm_invoice_righ tm_text_right">
                  <p className="tm_mb2">
                    <b className="tm_primary_color">Ship To:</b>
                  </p>
                  <p>
                    {shipToName}
                    <br />
                    {shipToAddress}
                    <br />
                    {shipToEmail}
                    <br />
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
                        <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg">
                          Item Name
                        </th>
                        <th className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg">
                          Description
                        </th>
                        <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                          HSN Code
                        </th>
                        <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                          Rate
                        </th>
                        <th className="tm_width_1 tm_semi_bold tm_primary_color tm_gray_bg">
                          Qty
                        </th>
                        <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right">
                          AMOUNT
                        </th>
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
                          <td colSpan="6" className="text-center m-0">
                            No items added
                          </td>
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
                        <td className="tm_width_3 tm_primary_color tm_border_none tm_bold">
                          Subtotal
                        </td>
                        <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">
                          {subtotal}
                        </td>
                      </tr>
                      {discountLabel && (
                        <tr>
                          <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                            {discountLabel}
                          </td>
                          <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                            - ₹
                            {!isNaN(discountTotal)
                              ? parseFloat(discountTotal).toFixed(2)
                              : "0.00"}
                          </td>
                        </tr>
                      )}
                      {cgstLabel && (
                        <tr>
                          <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                            {cgstLabel}
                          </td>
                          <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                            ₹{cgstTax}
                          </td>
                        </tr>
                      )}
                      {taxLabelWithPercentage && (
                        <tr>
                          <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                            {taxLabelWithPercentage}
                          </td>
                          <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                            ₹{calculatedTaxValue}
                          </td>
                        </tr>
                      )}
                      {sgstLabel && (
                        <tr>
                          <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                            {sgstLabel}
                          </td>
                          <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                            ₹{sgstTax}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                          Total
                        </td>
                        <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                          {calculatedTotal}
                        </td>
                      </tr>
                      <tr className="tm_border_top tm_border_bottom">
                        <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">
                          Grand Total
                        </td>
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
                <img
                  src={signature_url}
                  alt="Signature"
                  width="200"
                  height="200"
                />
              </div>
            )}

            {additionalDetails && (
              <div className="tm_padd_15_20 tm_round_border">
                <p className="tm_mb5">
                  <b className="tm_primary_color">Notes</b>
                </p>
                {additionalDetails}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PDF Download Button */}
      <PDFDownloadLink
        document={<InvoicePDF {...props} invoiceData={invoiceData} />}
        fileName={`Invoice_${invoiceNumber || "Download"}.pdf`}
      >
        {({ loading }) =>
          loading ? (
            <button disabled>Preparing PDF...</button>
          ) : (
            <button className="btn btn-primary mt-3">Download PDF</button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default InvoiceGenerator;
