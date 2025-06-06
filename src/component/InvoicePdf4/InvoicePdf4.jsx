"use client"
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer"
import { useState } from "react"
import Invoice4Header from "./Invoice4Header"
import Invoice4Table from "./Invoice4Table"
import Invoice4Tax from "./Invoice4Tax"
import Invoice4ContinueFooter from "./Invoice4ContinueFooter"
import { ToWords } from 'to-words';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 10,
    fontSize: 8,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  section: {
    padding: 5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 5,
  },
  cell: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
  },
  lastCell: {
    flex: 1,
    padding: 5,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRightWidth: 0,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  companySection: {
    flexDirection: "row",
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  bold: {
    fontWeight: "bold",
  },
  textRight: {
    textAlign: "right",
  },
  textCenter: {
    textAlign: "center",
  },
  smallText: {
    fontSize: 8,
  },
  declarationSection: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  footer: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 8,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  companyNameSection: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderBottomWidth: 0,
  },
  TODRow: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    borderLeftWidth: 0,
    height: 103,
  },
  tableCellSlNo: {
    width: "8%",
    padding: 3,
    textAlign: "center",
  },
  tableCellDescription: {
    width: "25%",
    padding: 3,
  },
  tableCellHSN: {
    width: "12%",
    padding: 3,
    textAlign: "center",
  },
  tableCellGSTQuantity: {
    width: "15%",
    padding: 3,
    textAlign: "center",
    textTransform: "uppercase",
  },
  tableCellRate: {
    width: "12%",
    padding: 3,
    textAlign: "center",
  },
  tableCellRatePer: {
    width: "10%",
    padding: 3,
    textAlign: "center",
    textTransform: "uppercase",
  },
  tableCellAmount: {
    width: "18%",
    padding: 3,
    textAlign: "right",
  },
  taxTableCell: {
    flex: 1,
    padding: 3,
    textAlign: "center",
  },
  taxTableLastCell: {
    flex: 1,
    padding: 3,
    textAlign: "center",
  },
  taxRateAmountCell: {
    flex: 1,
    textAlign: "center",
    padding: 2,
  },
  taxTableNestedRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  signatureSection: {
    position: "absolute",
    bottom: 60,
    right: 20,
    textAlign: "center",
  },
  tableItems: {
    position: "absolute",
    top: 20,
  },
  totalRow: {
    position: "absolute",
    top: 250,
    fontSize: 10,
  },
  discountRow: {
    position: "absolute",
    top: 260,
    fontSize: 10,
  },
  cgstRow: {
    position: "absolute",
    top: 280,
    fontSize: 10,
  },
  sgstRow: {
    position: "absolute",
    top: 290,
    fontSize: 10,
  },
})

// Function to convert numbers to words
const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    },
  },
});

const chunkItems = (items, itemsPerPage) => {
  const chunks = []
  for (let i = 0; i < items.length; i += itemsPerPage) {
    chunks.push(items.slice(i, i + itemsPerPage))
  }
  return chunks
}

const TaxInvoicePDF = ({ formData }) => {
  console.log("Form Data in PDF:", formData);

  const itemsPerPage = 15
  const itemChunks = chunkItems(formData?.items, itemsPerPage)
  const totalPages = itemChunks.length

  console.log("Total Pages:", totalPages, itemChunks);


  return (
    <Document>
      {itemChunks.map((pageItems, pageIndex) => {
        const isFirstPage = pageIndex === 0
        const isLastPage = pageIndex === totalPages - 1
        const showFullFooter = isLastPage

        return (
          <Page key={pageIndex} size="A4" style={styles.page}>
            {/* Header - show on first page only */}
            {isFirstPage && <Invoice4Header formData={formData} />}

            {/* Continuation header for subsequent pages */}
            {!isFirstPage && (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.header}>TAX INVOICE (Continued)</Text>
                <Text style={[styles.textCenter, { fontSize: 10, marginBottom: 10 }]}>
                  Invoice No: {formData?.invoiceNumber} | Date: {formData?.date}
                </Text>
              </View>
            )}

            {/* Items Table */}
            <View
              style={[
                styles.table,
                { marginTop: isFirstPage ? "-20px" : "0px", borderTopWidth: 0, position: "relative" },
              ]}
              wrap
            >
              <Invoice4Table />

              <View style={styles.tableItems}>
                {/* Table Rows for current page */}
                {pageItems?.map((item, index) => (
                  <View key={index} style={styles.row} wrap={false}>
                    <Text style={styles.tableCellSlNo}>{index + 1}</Text>
                    <Text style={styles.tableCellDescription}>{item?.description}</Text>
                    <Text style={styles.tableCellHSN}>{item?.hsnCode}</Text>
                    <Text style={styles.tableCellGSTQuantity}>
                      {item?.quantity} {item?.selectedOption?.item?.unit_measure}
                    </Text>
                    <Text style={styles.tableCellRate}>{item?.rate?.toFixed(2)}</Text>
                    <Text style={styles.tableCellRatePer}>{item?.selectedOption?.item?.unit_measure}</Text>
                    <Text style={styles.tableCellAmount}>{item?.total?.toFixed(2)}</Text>
                  </View>
                ))}
              </View>

              {/* Show calculation rows only on last page */}
              {showFullFooter && (
                <>
                  <View style={styles.totalRow}>
                    <View style={styles.row} wrap={false}>
                      <Text style={styles.tableCellSlNo}></Text>
                      <Text
                        style={[styles.tableCellDescription, { textAlign: "right", fontSize: 8, fontWeight: "bold" }]}
                      ></Text>
                      <Text style={styles.tableCellHSN}></Text>
                      <Text style={styles.tableCellGSTQuantity}></Text>
                      <Text style={styles.tableCellRate}></Text>
                      <Text style={styles.tableCellRatePer}></Text>
                      <Text style={[styles.tableCellAmount, { borderTopWidth: 1, fontSize: 8 }]}>{formData?.subTotal?.toFixed(2)}</Text>
                    </View>
                  </View>
                  {formData?.discount?.isDiscountApplicable && <View style={styles.discountRow}>
                    <View style={styles.row} wrap={false}>
                      <Text style={styles.tableCellSlNo}></Text>
                      <Text
                        style={[styles.tableCellDescription, { textAlign: "right", fontSize: 8, fontWeight: "bold" }]}
                      >
                        Discount Given {formData?.discount?.discountType === "percent" ? `(${formData?.discount?.discountPercentage}%)` : "(Flat)"}
                      </Text>
                      <Text style={styles.tableCellHSN}></Text>
                      <Text style={styles.tableCellGSTQuantity}></Text>
                      <Text style={styles.tableCellRate}></Text>
                      <Text style={styles.tableCellRatePer}></Text>
                      <Text style={[styles.tableCellAmount, { fontSize: 8 }]}>{Number(formData?.totalDiscount)?.toFixed(2)}</Text>
                    </View>
                  </View>}
                  {formData?.tax?.isTaxApplicable && formData?.tax?.taxType === "IGST" && <View style={styles.cgstRow}>
                    <View style={styles.row} wrap={false}>
                      <Text style={styles.tableCellSlNo}></Text>
                      <Text
                        style={[styles.tableCellDescription, { textAlign: "right", fontSize: 8, fontWeight: "bold" }]}
                      >
                        IGST
                      </Text>
                      <Text style={styles.tableCellHSN}></Text>
                      <Text style={styles.tableCellGSTQuantity}></Text>
                      <Text style={styles.tableCellRate}></Text>
                      <Text style={styles.tableCellRatePer}></Text>
                      <Text style={[styles.tableCellAmount, { fontSize: 8, fontWeight: "bold" }]}>{formData?.totalTax?.toFixed(2)}</Text>
                    </View>
                  </View>}
                  {formData?.tax?.isTaxApplicable && formData?.tax?.taxType !== "IGST" && <View style={styles.cgstRow}>
                    <View style={styles.row} wrap={false}>
                      <Text style={styles.tableCellSlNo}></Text>
                      <Text
                        style={[styles.tableCellDescription, { textAlign: "right", fontSize: 8, fontWeight: "bold" }]}
                      >
                        CGST
                      </Text>
                      <Text style={styles.tableCellHSN}></Text>
                      <Text style={styles.tableCellGSTQuantity}></Text>
                      <Text style={styles.tableCellRate}></Text>
                      <Text style={styles.tableCellRatePer}></Text>
                      <Text style={[styles.tableCellAmount, { fontSize: 8, fontWeight: "bold" }]}>{(formData?.totalTax / 2)?.toFixed(2)}</Text>
                    </View>
                  </View>}
                  {formData?.tax?.isTaxApplicable && formData?.tax?.taxType !== "IGST" && <View style={styles.sgstRow}>
                    <View style={styles.row} wrap={false}>
                      <Text style={styles.tableCellSlNo}></Text>
                      <Text
                        style={[styles.tableCellDescription, { textAlign: "right", fontSize: 8, fontWeight: "bold" }]}
                      >
                        SGST
                      </Text>
                      <Text style={styles.tableCellHSN}></Text>
                      <Text style={styles.tableCellGSTQuantity}></Text>
                      <Text style={styles.tableCellRate}></Text>
                      <Text style={styles.tableCellRatePer}></Text>
                      <Text style={[styles.tableCellAmount, { fontSize: 8, fontWeight: "bold" }]}>{(formData?.totalTax / 2)?.toFixed(2)}</Text>
                    </View>
                  </View>}

                  {/* Final Total Row Only on Last Page */}
                  <View
                    style={[styles.row, { borderBottomWidth: 0, borderTopWidth: 1, borderRightWidth: 1 }]}
                    wrap={false}
                  >
                    <Text style={[styles.tableCellSlNo, { flex: 5, borderRightWidth: 0 }]}></Text>
                    <Text
                      style={[
                        styles.tableCellRate,
                        { flex: 0.5, borderRightWidth: 0, textAlign: "left", fontWeight: "bold" },
                      ]}
                    >
                      Total
                    </Text>
                    <Text style={[styles.tableCellAmount, { fontWeight: "bold" }]}>
                      {formData?.total?.toFixed(2)}
                    </Text>
                  </View>
                </>
              )}
            </View>

            {/* Continue Footer - show on all pages except last */}
            {!showFullFooter && <Invoice4ContinueFooter />}

            {/* Full Footer Sections - show only on last page */}
            {showFullFooter && (
              <>
                {/* Amount in Words Only on Last Page */}
                <View style={[styles.section, { borderTopWidth: 0, borderBottomWidth: 0 }]}>
                  <Text style={styles.bold}>Amount Chargeable (in words): {toWords.convert(formData?.total)}</Text>
                </View>

                {/* Tax Section Only on Last Page */}
                {formData?.tax?.isTaxApplicable && <Invoice4Tax formData={formData} />}

                {/* Tax Amount in Words Only on Last Page */}
                {formData?.tax?.isTaxApplicable && <View style={[styles.section, { borderBottomWidth: 1 }]}>
                  <Text style={styles.bold}>Tax Amount (in words): {toWords.convert(formData?.totalTax.toFixed(0))}</Text>
                </View>}
              </>
            )}

            {/* Declaration and Bank Details on each page */}
            <View style={styles.declarationSection}>
              <View style={styles.leftColumn}>
                <Text style={styles.bold}>Declaration</Text>
                <Text style={styles.smallText}>
                  {formData?.notes}
                </Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.bold}>Company's Bank Details</Text>
                <Text>Bank Name: {formData?.bankDetails?.bankName}</Text>
                <Text>A/c No.: {formData?.bankDetails?.accountNumber}</Text>
                <Text>Branch & IFS Code: {formData?.bankDetails?.branchName} & {formData?.bankDetails?.ifscCode} </Text>
              </View>
            </View>

            {/* Signature Section on each page */}
            <View style={styles.signatureSection}>
              <Text style={styles.bold}>For {formData?.businessName}</Text>
              <Text style={{ marginTop: 30 }}>Authorised Signatory</Text>
            </View>

            {/* Footer */}
            <Text style={styles.footer}>This is a Computer Generated Invoice</Text>
            <Text style={[styles.footer, { marginTop: 5 }]}>E. & O.E</Text>

            {/* Page Number */}
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
              fixed
            />
          </Page>
        )
      })}
    </Document >
  )
}



// Component to render the PDF download link
const InvoicePdf4 = ({ formData, generatePdf }) => {
  const [showViewer, setShowViewer] = useState(true)
  console.log("Form Data:", formData);


  return (
    <div className="flex flex-row p-3 gap-3">
      <div style={{ width: "40%" }} >
        <div className="text-center mb-8">
          <h2 className="fs-1 font-bold mb-2">{formData?.invoiceName}</h2>
          <div className="space-x-4">
            <div onClick={() => {
              generatePdf();
            }}>
              <PDFDownloadLink
                document={<TaxInvoicePDF formData={formData} />}
                fileName="tax-invoice.pdf"
                className="btn btn-primary"
              >
                {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Generate Invoice")}
              </PDFDownloadLink>
            </div>

            {/* <button
              onClick={() => setShowViewer((prev) => !prev)}
              className="btn btn-success btn-lg"
              style={{ marginLeft: "10px" }}
            >
              {showViewer ? "Hide PDF" : "View PDF"}
            </button> */}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="fs-4 font-semibold mb-2">Buyer Information:</h4>
            <p className="font-bold fs-6">{formData?.billName}</p>
            <p className="fs-6">{formData?.billAddress}</p>
            <p className="fs-6">GSTIN: {formData?.gst_no}</p>
          </div>
          <div>
            <h4 className="fs-4 font-semibold mb-2">Invoice Details:</h4>
            <p className="font-bold fs-6">Invoice No: {formData?.invoiceNumber}</p>
            <p className="fs-6">Date: {formData?.date}</p>
            <p className="fs-6">Total Amount: ₹{formData?.total?.toFixed(2)}</p>
          </div>
        </div>
      </div>


      {showViewer && (
        <div className="w-full h- border border-gray-300" style={{ height: 'calc(100vh - 250px)' }}>
          <PDFViewer width="100%" height="100%">
            <TaxInvoicePDF formData={formData} />
          </PDFViewer>
        </div>
      )}
    </div>
  )
}

export default InvoicePdf4
