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
    fontSize: 10,
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottom: "1 solid #ccc",
    paddingBottom: 10,
  },
  bold: {
    fontWeight: 700,
    fontSize: 12,
  },
  section: {
    marginBottom: 14,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderTop: "1 solid #ccc",
    borderBottom: "1 solid #ccc",
    paddingVertical: 6,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottom: "1 solid #eee",
  },
  col: {
    flex: 1,
    paddingHorizontal: 4,
  },
  totalSectionWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalSection: {
    width: "50%",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  noItem: {
    textAlign: "center",
    margin: "10px 0",
  },
  itemSection: {
    border: "1px solid #dbdfea",
  },
  signature: {
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "center"
  },
  userInfo: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: 'row'
  }
});


// PDF Component
const InvoicePDF = ({
  signature_url,
  logo,
  invoiceData,
}) => {

  const logoUrl = logo || invoiceData?.logo;
  const signature = signature_url || invoiceData?.sigUrl;

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={logoUrl} style={{ width: 100, height: 100, objectFit: "cover" }} />
            <View>
              <Text style={styles.bold}>{invoiceData?.invoiceName}</Text>
              <Text>Invoice No: {invoiceData?.invoiceNumber}</Text>
              <Text>Date: {invoiceData?.date ? new Date(invoiceData?.date)?.toLocaleDateString("en-GB") : ""}</Text>
            </View>
          </View>
          <View style={styles.userInfo}>

            <View style={styles.section}>
              <Text style={styles.bold}>From:</Text>
              <Text>{invoiceData?.businessName}</Text>
              <Text>{invoiceData?.businessAddress}</Text>
              <Text>{invoiceData?.businessEmail}</Text>
              <Text>{invoiceData?.businessPhone}, {invoiceData?.businessNumber}</Text>
            </View>

            {invoiceData?.billName && (
              <View style={styles.section}>
                <Text style={styles.bold}>Bill To:</Text>
                <Text>{invoiceData?.billName}</Text>
                <Text>{invoiceData?.billAddress}</Text>
                <Text>{invoiceData?.billEmail}</Text>
                <Text>{invoiceData?.billMobile}</Text>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.bold}>Ship To:</Text>
              <Text>{invoiceData?.shipToName}</Text>
              <Text>{invoiceData?.shipToAddress}</Text>
              <Text>{invoiceData?.shipToEmail}</Text>
              <Text>{invoiceData?.shipToMobile}</Text>
            </View>

          </View>

          <View style={styles.section}>
            <View style={styles.tableHeader}>
              <Text style={styles.col}>Item Name</Text>
              <Text style={styles.col}>Description</Text>
              <Text style={styles.col}>HSN Code</Text>
              <Text style={styles.col}>Rate</Text>
              <Text style={styles.col}>Qty</Text>
              <Text style={styles.col}>Amount</Text>
            </View>
            <View style={styles.itemSection}>
              {invoiceData?.items?.length > 0 ? (
                invoiceData?.items?.map((item, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.col}>{item?.description}</Text>
                    <Text style={styles.col}>{item?.details}</Text>
                    <Text style={styles.col}>{item?.hsnCode}</Text>
                    <Text style={styles.col}>{item?.rate}</Text>
                    <Text style={styles.col}>{item?.quantity}</Text>
                    <Text style={styles.col}>₹{item?.total}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noItem}>No items added</Text>
              )}
            </View>
          </View>

          <View style={styles.totalSectionWrapper}>
            <View style={styles.totalSection}>
              <View style={styles.total}>
                <Text>Subtotal</Text>
                <Text>₹ {invoiceData?.subTotal}</Text>
              </View>

              {invoiceData?.discountLabel && (
                <View style={styles.total}>
                  <Text>{invoiceData?.discountLabel}</Text>
                  <Text>- ₹{parseFloat(invoiceData?.discountTotal || 0)?.toFixed(2)}</Text>
                </View>
              )}

              {invoiceData?.cgstLabel && (
                <View style={styles.total}>
                  <Text>{invoiceData?.cgstLabel}</Text>
                  <Text>₹{invoiceData?.cgstTax}</Text>
                </View>
              )}

              {invoiceData?.taxLabelWithPercentage && (
                <View style={styles.total}>
                  <Text>{invoiceData?.taxLabelWithPercentage}</Text>
                  <Text>₹{invoiceData?.calculatedTaxValue}</Text>
                </View>
              )}

              {invoiceData?.sgstLabel && (
                <View style={styles.total}>
                  <Text>{invoiceData?.sgstLabel}</Text>
                  <Text>₹{invoiceData?.sgstTax}</Text>
                </View>
              )}

              <View style={styles.total}>
                <Text style={styles.bold}>Grand Total</Text>
                <Text style={styles.bold}>₹{invoiceData?.calculatedTotal}</Text>
              </View>
            </View>
          </View>
          {signature && (
            <View style={styles.signature}>
              <Image
                src={signature}
                alt="Signature"
                style={{ width: 100, height: 50 }}
              />
            </View>
          )}
          {invoiceData?.additionalDetails && (
            <View style={styles.section}>
              <Text style={styles.bold}>Notes:</Text>
              <Text>{invoiceData?.additionalDetails}</Text>
            </View>
          )}
        </Page>
      </Document>


    </>


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
    console.log("Printing Data:", location.state);

  }, [location.state]);

  // const editPdf = () => {
  //   navigate("/invoice/new-invoice", { state: invoiceData });
  //   alert("hello")
  // };

  return (
    <div className="container my-5">
      <div className="row mx-2 flex-wrap">
        <div
          className="col-md-9 position-sticky top-0 z-3 py-2 px-0"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <div className="d-flex justify-end">
            {/* <div className="btn-group" role="group" aria-label="Basic outlined example">

              <button
                type="button"
                className="btn btn-outline-secondary active border-start"
                onClick={editPdf}
              >
                Edit
              </button>
            </div> */}

            <PDFDownloadLink
              document={<InvoicePDF {...props} invoiceData={invoiceData} />}
              fileName={`Invoice_${invoiceData?.invoiceNumber || "Download"}.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  <button className="btn btn-outline-secondary active border-start" disabled>Preparing PDF...</button>
                ) : (
                  <button className="btn btn-outline-secondary active border-start">Download PDF</button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>

        <div className="col-md-9 position-relative z-1">
          <div className="row left-side-invoice border py-5 px-3 mt-2">
            <div className="tm_invoice_wrap">
              <div className="tm_invoice tm_style1 px-4 py-5" id="tm_download_section">
                <div className="tm_invoice_in">
                  <div className="tm_invoice_head tm_align_center tm_mb20">
                    <div className="tm_invoice_left">
                      <div className="tm_logo">
                        <img src={invoiceData?.logo} alt="Logo" />
                      </div>
                    </div>
                    <div className="tm_invoice_right tm_text_right">
                      <div className="tm_primary_color tm_f50 tm_text_uppercase">
                        {invoiceData?.invoiceName}
                      </div>
                    </div>
                  </div>

                  <div className="tm_invoice_info tm_mb20 d-flex justify-content-end">
                    <div className="tm_invoice_info_list">
                      <p className="tm_invoice_number tm_m0">
                        Invoice No:{" "}
                        <b className="tm_primary_color">{invoiceData?.invoiceNumber}</b>
                      </p>
                      <p className="tm_invoice_date tm_m0">
                        Date:{" "}
                        <b className="tm_primary_color">
                          {invoiceData?.date
                            ? new Date(invoiceData.date).toLocaleDateString("en-GB")
                            : ""}
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
                        {invoiceData?.businessName}
                        <br />
                        {invoiceData?.businessAddress}
                        <br />
                        {invoiceData?.businessEmail}
                        <br />
                        {invoiceData?.businessPhone}, {invoiceData?.businessNumber}
                      </p>
                    </div>

                    {invoiceData?.billName && (
                      <div className="tm_invoice_left">
                        <p className="tm_mb2">
                          <b className="tm_primary_color">Bill to:</b>
                        </p>
                        <p>
                          {invoiceData?.billName}
                          <br />
                          {invoiceData?.billAddress}
                          <br />
                          {invoiceData?.billEmail}
                          <br />
                          {invoiceData?.billMobile}
                        </p>
                      </div>
                    )}


                    <div className="tm_invoice_righ tm_text_right">
                      <p className="tm_mb2">
                        <b className="tm_primary_color">Ship To:</b>
                      </p>
                      <p>
                        {invoiceData?.shipToName}
                        <br />
                        {invoiceData?.shipToAddress}
                        <br />
                        {invoiceData?.shipToEmail}
                        <br />
                        {invoiceData?.shipToMobile}
                      </p>
                    </div>

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
                              <th className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right">
                                AMOUNT
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoiceData?.items?.length > 0 ? (
                              invoiceData.items.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.description}</td>
                                  <td>{item.details}</td>
                                  <td>{item.hsnCode}</td>
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
                              <td className="tm_width_3 tm_primary_color tm_border_none tm_bold">Subtotal</td>
                              <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">
                              ₹ {invoiceData?.subTotal}
                              </td>
                            </tr>

                            {invoiceData?.discountLabel && (
                              <tr>
                                <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                                  {invoiceData.discountLabel}
                                </td>
                                <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                                  - ₹
                                  {!isNaN(invoiceData.discountTotal)
                                    ? parseFloat(invoiceData.discountTotal).toFixed(2)
                                    : "0.00"}
                                </td>
                              </tr>
                            )}

                            {invoiceData?.cgstLabel && (
                              <tr>
                                <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                                  {invoiceData.cgstLabel}
                                </td>
                                <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                                  ₹{invoiceData.cgstTax}
                                </td>
                              </tr>
                            )}

                            {invoiceData?.taxLabelWithPercentage && (
                              <tr>
                                <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                                  {invoiceData.taxLabelWithPercentage}
                                </td>
                                <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                                  ₹{invoiceData.calculatedTaxValue}
                                </td>
                              </tr>
                            )}

                            {invoiceData?.sgstLabel && (
                              <tr>
                                <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                                  {invoiceData.sgstLabel}
                                </td>
                                <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                                  ₹{invoiceData.sgstTax}
                                </td>
                              </tr>
                            )}

                            <tr>
                              <td className="tm_width_3 tm_primary_color tm_border_none tm_pt0">Total</td>
                              <td className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                                {invoiceData?.calculatedTotal}
                              </td>
                            </tr>

                            <tr className="tm_border_top tm_border_bottom">
                              <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">Grand Total</td>
                              <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right">
                                {invoiceData?.calculatedTotal}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {invoiceData?.signature_url && (
                    <div className="d-flex justify-content-end tm_mb10 mt-5">
                      <img
                        src={invoiceData.signature_url}
                        alt="Signature"
                        width="200"
                        height="200"
                      />
                    </div>
                  )}

                  {invoiceData?.additionalDetails && (
                    <div className="tm_padd_15_20 tm_round_border">
                      <p className="tm_mb5">
                        <b className="tm_primary_color">Notes</b>
                      </p>
                      {invoiceData.additionalDetails}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default InvoiceGenerator;
