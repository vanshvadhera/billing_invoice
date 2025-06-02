"use client"
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer"
import { useState } from "react"
import Invoice4Header from "./Invoice4Header"
import Invoice4Table from "./Invoice4Table"
import Invoice4Tax from "./Invoice4Tax"

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

// Sample data matching the PDF exactly
const invoiceData = {
  seller: {
    name: "AVID RISE DIGITAL SOLUTATIONS",
    address: "Azizganj Anand Vihaar Near S.S College\nShahjahanpur",
    gstin: "09ACEFA9697B1Z3",
    state: "Uttar Pradesh, Code: 09",
    contact: "9307489221",
  },
  consignee: {
    name: "ULTRATECH CEMENT LIMITED",
    address: "SHAHJAHANPUR UNIT",
    gstin: "09AAACL6442L1Z8",
    state: "Uttar Pradesh, Code: 09",
  },
  buyer: {
    name: "ULTRATECH CEMENT LIMITED",
    address: "SHAHJAHANPUR UNIT",
    gstin: "09AAACL6442L1Z8",
    state: "Uttar Pradesh, Code: 09",
    placeOfSupply: "Uttar Pradesh",
  },
  invoice: {
    number: "04",
    date: "09-Apr-25",
    deliveryNote: "",
    modeTerms: "",
    buyerOrderNo: "",
    dated: "",
    dispatchDocNo: "",
    deliveryNoteDate: "",
    dispatchedThrough: "",
    destination: "SHAHJAHANPUR UNIT",
    termsOfDelivery: "",
  },
  items: [
    {
      slNo: 1,
      description: "Winding",
      hsn: "844540",
      // gstRate: "18%",
      quantity: "1.00 NOS",
      rate: 3500.0,
      amount: 3500.0,
    },
    {
      slNo: 2,
      description: "Bush",
      hsn: "8545",
      // gstRate: "18%",
      quantity: "1.00 NOS",
      rate: 2100.0,
      amount: 2100.0,
    },
    {
      slNo: 3,
      description: "Seal",
      hsn: "998711",
      // gstRate: "18%",
      quantity: "1.00 NOS",
      rate: 400.0,
      amount: 400.0,
    },
    { slNo: 4, description: "Apple Iphone", hsn: "99811", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    { slNo: 5, description: "Apple MackBook", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    { slNo: 6, description: "Apple Ipad", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    { slNo: 7, description: "Apple Tv", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    { slNo: 8, description: "Apple Airpods", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    { slNo: 9, description: "Apple Mouse", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    { slNo: 10, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    { slNo: 11, description: "Apple TrackPad", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    { slNo: 12, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    { slNo: 13, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    { slNo: 14, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    { slNo: 15, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    // { slNo: 16, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    // { slNo: 17, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
  ],
  calculations: {
    subTotal: 6000.0,
    discount: 400.0,
    taxableValue: 5600.0,
    cgst: 504.0,
    sgst: 504.0,
    total: 6608.0,
  },
  amountInWords: "INR Six Thousand Six Hundred Eight Rupees only",
  taxAmountInWords: "INR One Thousand Eight rupees Only",
  bankDetails: {
    bankName: "Bank of Baroda",
    accountNo: "77490200001522",
    branch: "LAL IMLI CHAURAHA SHAHJAHANPUR & BARB0VJSHPU",
  },
}

// Table header component
const TableHeader = () => (
  <View style={[styles.row, styles.tableHeader]} fixed>
    <Text style={styles.tableCellSlNo}>Sl No.</Text>
    <Text style={styles.tableCellDescription}>Description of Goods</Text>
    <Text style={styles.tableCellHSN}>HSN/SAC</Text>
    <Text style={styles.tableCellGSTQuantity}>GST Quantity</Text>
    <Text style={styles.tableCellRate}>Rate</Text>
    <Text style={styles.tableCellRatePer}>Rate per</Text>
    <Text style={styles.tableCellAmount}>Amount</Text>
  </View>
)

const TaxInvoicePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Invoice4Header invoiceData={invoiceData} />

      {/* Items Table */}
      <View style={[styles.table, { marginTop: "-20px", borderTopWidth: 0, position: 'relative' }]} wrap>
        <Invoice4Table />

        <View style={styles.tableItems} >
          {/* Table Rows */}
          {invoiceData.items.map((item, index) => (
            <View key={index} style={styles.row} wrap={false}>
              <Text style={styles.tableCellSlNo}>{item.slNo}</Text>
              <Text style={styles.tableCellDescription}>{item.description}</Text>
              <Text style={styles.tableCellHSN}>{item.hsn}</Text>
              <Text style={styles.tableCellGSTQuantity}>
                {item.gstRate} {item.quantity}
              </Text>
              <Text style={styles.tableCellRate}>{item.rate.toFixed(2)}</Text>
              <Text style={styles.tableCellRatePer}>NOS</Text>
              <Text style={styles.tableCellAmount}>{item.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalRow} >
          <View style={styles.row} wrap={false}>
            <Text style={styles.tableCellSlNo}></Text>
            <Text style={[styles.tableCellDescription, { textAlign: 'right', fontSize: 8, fontWeight: 'bold' }]}></Text>
            <Text style={styles.tableCellHSN}></Text>
            <Text style={styles.tableCellGSTQuantity}></Text>
            <Text style={styles.tableCellRate}></Text>
            <Text style={styles.tableCellRatePer}></Text>
            <Text style={[styles.tableCellAmount, { borderTopWidth: 1, fontSize: 8 }]}>6000</Text>
          </View>
        </View>
        <View style={styles.discountRow} >
          <View style={styles.row} wrap={false}>
            <Text style={styles.tableCellSlNo}></Text>
            <Text style={[styles.tableCellDescription, { textAlign: 'right', fontSize: 8, fontWeight: 'bold' }]}>Discount Given</Text>
            <Text style={styles.tableCellHSN}></Text>
            <Text style={styles.tableCellGSTQuantity}></Text>
            <Text style={styles.tableCellRate}></Text>
            <Text style={styles.tableCellRatePer}></Text>
            <Text style={[styles.tableCellAmount, { fontSize: 8 }]}>150</Text>
          </View>
        </View>
        <View style={styles.cgstRow} >
          <View style={styles.row} wrap={false}>
            <Text style={styles.tableCellSlNo}></Text>
            <Text style={[styles.tableCellDescription, { textAlign: 'right', fontSize: 8, fontWeight: 'bold' }]}>CGST</Text>
            <Text style={styles.tableCellHSN}></Text>
            <Text style={styles.tableCellGSTQuantity}></Text>
            <Text style={styles.tableCellRate}></Text>
            <Text style={styles.tableCellRatePer}></Text>
            <Text style={[styles.tableCellAmount, { fontSize: 8, fontWeight: 'bold' }]}>200</Text>
          </View>
        </View>
        <View style={styles.sgstRow} >
          <View style={styles.row} wrap={false}>
            <Text style={styles.tableCellSlNo}></Text>
            <Text style={[styles.tableCellDescription, { textAlign: 'right', fontSize: 8, fontWeight: 'bold' }]}>SGST</Text>
            <Text style={styles.tableCellHSN}></Text>
            <Text style={styles.tableCellGSTQuantity}></Text>
            <Text style={styles.tableCellRate}></Text>
            <Text style={styles.tableCellRatePer}></Text>
            <Text style={[styles.tableCellAmount, { fontSize: 8, fontWeight: 'bold' }]}>200</Text>
          </View>
        </View>

        {/* Empty rows to match PDF layout */}
        {/* {Array.from({ length: 3 }, (_, index) => (
          <View key={`empty-${index}`} style={styles.row} wrap={false}>
            <Text style={styles.tableCellSlNo}></Text>
            <Text style={styles.tableCellDescription}></Text>
            <Text style={styles.tableCellHSN}></Text>
            <Text style={styles.tableCellGSTQuantity}></Text>
            <Text style={styles.tableCellRate}></Text>
            <Text style={styles.tableCellRatePer}></Text>
            <Text style={styles.tableCellAmount}></Text>
          </View>
        ))} */}

        {/* Total row */}
        {/* <View style={styles.row} wrap={false}>
          <Text style={[styles.tableCellSlNo, { flex: 5, borderRightWidth: 0 }]}></Text>
          <Text style={[styles.tableCellRate, { flex: 1, borderRightWidth: 0, textAlign: "left" }]}>Total:</Text>
          <Text style={styles.tableCellAmount}>{invoiceData.calculations.subTotal.toFixed(2)}</Text>
        </View> */}

        {/* Discount Row */}
        {/* <View style={styles.row} wrap={false}>
          <Text style={[styles.tableCellSlNo, { flex: 5, borderRightWidth: 0 }]}></Text>
          <Text style={[styles.tableCellRate, { flex: 1, borderRightWidth: 0, textAlign: "left" }]}>
            Discount Given
          </Text>
          <Text style={styles.tableCellAmount}>{invoiceData.calculations.discount.toFixed(2)}</Text>
        </View> */}

        {/* CGST Row */}
        {/* <View style={styles.row} wrap={false}>
          <Text style={[styles.tableCellSlNo, { flex: 5, borderRightWidth: 0 }]}></Text>
          <Text style={[styles.tableCellRate, { flex: 1, borderRightWidth: 0, textAlign: "left" }]}>CGST</Text>
          <Text style={styles.tableCellAmount}>{invoiceData.calculations.cgst.toFixed(2)}</Text>
        </View> */}

        {/* SGST Row */}
        {/* <View style={styles.row} wrap={false}>
          <Text style={[styles.tableCellSlNo, { flex: 5, borderRightWidth: 0 }]}></Text>
          <Text style={[styles.tableCellRate, { flex: 1, borderRightWidth: 0, textAlign: "left" }]}>SGST</Text>
          <Text style={styles.tableCellAmount}>{invoiceData.calculations.sgst.toFixed(2)}</Text>
        </View> */}

        {/* Final Total Row */}
        <View style={[styles.row, { borderBottomWidth: 0, borderTopWidth: 1, borderRightWidth: 1 }]} wrap={false}>
          <Text style={[styles.tableCellSlNo, { flex: 5, borderRightWidth: 0 }]}></Text>
          <Text
            style={[styles.tableCellRate, { flex: 0.5, borderRightWidth: 0, textAlign: "left", fontWeight: "bold" }]}
          >
            Total
          </Text>
          <Text style={[styles.tableCellAmount, { fontWeight: "bold" }]}>
            {invoiceData.calculations.total.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Amount in Words */}
      <View style={[styles.section, { borderTopWidth: 0, borderBottomWidth: 0 }]}>
        <Text style={styles.bold}>Amount Chargeable (in words): {invoiceData.amountInWords}</Text>
      </View>

      {/* Tax Table */}
      {/* <View style={[styles.table, { borderTopWidth: 0 }]}>
        <View style={[styles.row, styles.tableHeader]}>
          <Text style={styles.taxTableCell}>Taxable Value</Text>
          <Text style={styles.taxTableCell}>Central Tax</Text>
          <Text style={styles.taxTableCell}>State Tax</Text>
          <Text style={styles.taxTableLastCell}>Total Tax Amount</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.taxTableCell}>{invoiceData.calculations.taxableValue.toFixed(2)}</Text>
          <View style={[styles.taxTableCell, { padding: 0 }]}>
            <View style={styles.taxTableNestedRow}>
              <Text style={styles.taxRateAmountCell}>Rate</Text>
              <Text style={styles.taxRateAmountCell}>Amount</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.taxRateAmountCell}>9%</Text>
              <Text style={styles.taxRateAmountCell}>{invoiceData.calculations.cgst.toFixed(2)}</Text>
            </View>
          </View>
          <View style={[styles.taxTableCell, { padding: 0 }]}>
            <View style={styles.taxTableNestedRow}>
              <Text style={styles.taxRateAmountCell}>Rate</Text>
              <Text style={styles.taxRateAmountCell}>Amount</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.taxRateAmountCell}>9%</Text>
              <Text style={styles.taxRateAmountCell}>{invoiceData.calculations.sgst.toFixed(2)}</Text>
            </View>
          </View>
          <Text style={styles.taxTableLastCell}>
            {(invoiceData.calculations.cgst + invoiceData.calculations.sgst).toFixed(2)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.taxTableCell}>{invoiceData.calculations.taxableValue.toFixed(2)}</Text>
          <Text style={styles.taxTableCell}>{invoiceData.calculations.cgst.toFixed(2)}</Text>
          <Text style={styles.taxTableCell}>{invoiceData.calculations.sgst.toFixed(2)}</Text>
          <Text style={styles.taxTableLastCell}>
            {(invoiceData.calculations.cgst + invoiceData.calculations.sgst).toFixed(2)}
          </Text>
        </View>
      </View> */}

      <Invoice4Tax />

      <View style={[styles.section, { borderBottomWidth: 1 }]}>
        <Text style={styles.bold}>Tax Amount (in words): {invoiceData.taxAmountInWords}</Text>
      </View>

      {/* Declaration and Bank Details */}
      <View style={styles.declarationSection}>
        <View style={styles.leftColumn}>
          <Text style={styles.bold}>Declaration</Text>
          <Text style={styles.smallText}>
            We declare that this invoice shows the actual price of the goods described and that all particulars are true
            and correct.
          </Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.bold}>Company's Bank Details</Text>
          <Text>Bank Name: {invoiceData.bankDetails.bankName}</Text>
          <Text>A/c No.: {invoiceData.bankDetails.accountNo}</Text>
          <Text>Branch & IFS Code: {invoiceData.bankDetails.branch}</Text>
        </View>
      </View>

      {/* Signature Section */}
      <View style={styles.signatureSection}>
        <Text style={styles.bold}>For {invoiceData.seller.name}</Text>
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
  </Document >
)

// Component to render the PDF download link
const InvoicePdf4 = () => {
  const [showViewer, setShowViewer] = useState(false)

  return (
    <div className="container mx-auto p-5">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Tax Invoice Generator</h2>
        <div className="space-x-4">
          <PDFDownloadLink
            document={<TaxInvoicePDF />}
            fileName="tax-invoice.pdf"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download Tax Invoice PDF")}
          </PDFDownloadLink>

          <button
            onClick={() => setShowViewer((prev) => !prev)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {showViewer ? "Hide PDF" : "View PDF"}
          </button>
        </div>
      </div>

      {showViewer && (
        <div className="mt-4 h-screen border border-gray-300">
          <PDFViewer width="100%" height="100%">
            <TaxInvoicePDF />
          </PDFViewer>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">Seller Information:</h4>
          <p className="font-bold">{invoiceData.seller.name}</p>
          <p>{invoiceData.seller.address}</p>
          <p>GSTIN: {invoiceData.seller.gstin}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">Invoice Details:</h4>
          <p>Invoice No: {invoiceData.invoice.number}</p>
          <p>Date: {invoiceData.invoice.date}</p>
          <p>Total Amount: ₹{invoiceData.calculations.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default InvoicePdf4
