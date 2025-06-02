"use client"
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer"
import { useState } from "react"

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: 10,
        fontSize: 10,
        fontFamily: "Helvetica",
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        // marginBottom: 10,
    },
    section: {
        padding: 10,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#000",
    },
    row: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#000",
        alignItems: "center",
        minHeight: 25,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
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
        // marginBottom: 15,
        // borderWidth: 1,
        // borderColor: "#000",
        // padding: 10,
    },
    leftColumn: {
        flex: 1,
        // paddingRight: 10,
    },
    rightColumn: {
        flex: 1,
        // paddingLeft: 10,
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
        marginTop: 25,
        gap: 10,
    },
    footer: {
        textAlign: "center",
        marginTop: 20,
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
})

// Sample data - replace with your actual data
const invoiceData = {
    seller: {
        name: "AVID RISE DIGITAL SOLUTIONS",
        address: "Azizganj Anand Vihar Near S.S College\nShahjahanpur",
        gstin: "09AACFA9697B1Z3",
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
        destination: "",
        termsOfDelivery: "Ex-Factory",
    },
    items: [
        { slNo: 1, description: "Winding", hsn: "844540", rate: 3500.0, quantity: "1.00 NOS", amount: 3500.0 },
        { slNo: 2, description: "Bush", hsn: "8545", rate: 2100.0, quantity: "1.00 NOS", amount: 2100.0 },
        { slNo: 3, description: "Seal", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        { slNo: 4, description: "Apple Iphone", hsn: "99811", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        { slNo: 5, description: "Apple MackBook", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        { slNo: 6, description: "Apple Ipad", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        { slNo: 7, description: "Apple Tv", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        { slNo: 8, description: "Apple Airpods", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        { slNo: 9, description: "Apple Mouse", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        { slNo: 10, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        // { slNo: 11, description: "Apple TrackPad", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        // { slNo: 12, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        // { slNo: 13, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        // { slNo: 14, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        // { slNo: 15, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        // { slNo: 16, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
        // { slNo: 17, description: "Apple Keyboard", hsn: "998711", rate: 400.0, quantity: "1.00 NOS", amount: 400.0 },
    ],
    calculations: {
        subTotal: 9000.0,
        discount: 400.0,
        cgst: 504.0,
        sgst: 504.0,
        total: 9608.0,
    },
    bankDetails: {
        bankName: "Bank of Baroda",
        accountNo: "77490200001522",
        branch: "LAL IMLI CHAURAHA SHAHJAHANPUR & BARBOVJSHPU",
    },
}

// Header component to be reused on each page
const InvoiceHeader = () => (
    <>
        <Text style={styles.header}>TAX INVOICE</Text>
        <View style={styles.companySection}>
            <View style={styles.leftColumn}>
                <View style={styles.companyNameSection} >
                    <Text style={styles.bold}>{invoiceData.seller.name}</Text>
                    <Text>{invoiceData.seller.address}</Text>
                    <Text>GSTIN/UIN: {invoiceData.seller.gstin}</Text>
                    <Text>State Name: {invoiceData.seller.state}</Text>
                    <Text>Contact: {invoiceData.seller.contact}</Text>
                </View>
                {/* Consignee Section */}
                <View style={[styles.section, styles.companyNameSection, { marginTop: "-2px", paddingBottom: "10px" }]}>
                    <Text style={styles.bold}>Consignee (Ship to)</Text>
                    <Text style={styles.bold}>{invoiceData.consignee.name}</Text>
                    <Text>{invoiceData.consignee.address}</Text>
                    <Text>GSTIN/UIN: {invoiceData.consignee.gstin}</Text>
                    <Text style={{ marginBottom: "5px" }}>State Name: {invoiceData.consignee.state}</Text>
                </View>
                {/* Buyer Section */}
                <View style={[styles.section, styles.companyNameSection, { marginTop: "-12px", borderBottomWidth: 1 }]}>
                    <Text style={styles.bold}>Buyer (Bill to)</Text>
                    <Text style={styles.bold}>{invoiceData.buyer.name}</Text>
                    <Text>{invoiceData.buyer.address}</Text>
                    <Text>GSTIN/UIN: {invoiceData.buyer.gstin}</Text>
                    <Text>State Name: {invoiceData.buyer.state}</Text>
                    <Text>Place of Supply: {invoiceData.buyer.placeOfSupply}</Text>
                </View>
            </View>
            <View style={styles.rightColumn}>
                <View style={styles.row}>
                    <Text style={[styles.cell, styles.bold]}>Invoice No: {invoiceData.invoice.number}</Text>
                    <Text style={[styles.lastCell, styles.bold]}>Dated: {invoiceData.invoice.date}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>Delivery Note</Text>
                    <Text style={styles.lastCell}>Mode/Terms of Payment</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>Buyer's Order No.</Text>
                    <Text style={styles.lastCell}>Dated</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>Dispatch Doc No.</Text>
                    <Text style={styles.lastCell}>Delivery Note Date</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>Dispatched through</Text>
                    <Text style={styles.lastCell}>Destination</Text>
                </View>
                <View style={styles.TODRow}>
                    <Text style={styles.bold}>Terms of Delivery:</Text>
                    <Text style={{ marginTop: "4px" }}>{invoiceData.invoice.termsOfDelivery}</Text>
                </View>
            </View>
        </View>
    </>
)

// Table header component
const TableHeader = () => (
    <View style={[styles.row, styles.tableHeader]} fixed>
        <Text style={[styles.cell, styles.textCenter]}>Sl No.</Text>
        <Text style={[styles.cell, styles.textCenter]}>Description of Goods</Text>
        <Text style={[styles.cell, styles.textCenter]}>HSN</Text>
        <Text style={[styles.cell, styles.textCenter]}>Rate</Text>
        <Text style={[styles.cell, styles.textCenter]}>Quantity</Text>
        <Text style={[styles.lastCell, styles.textCenter]}>Amount</Text>
    </View>
)

const TaxInvoicePDF = () => (
    <Document>
        {/* First Page */}
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <InvoiceHeader />

            {/* <View style={styles.row}>
                <Text style={styles.cell}>Terms of Delivery</Text>
                <Text style={styles.lastCell}>{invoiceData.invoice.termsOfDelivery}</Text>
            </View> */}

            {/* Items Table */}
            <View style={[styles.table, { marginTop: '-12px', borderTopWidth: 0 }]} wrap>
                {/* Table Header */}
                <TableHeader />

                {/* Table Rows */}
                {invoiceData.items.map((item, index) => (
                    <View key={index} style={styles.row} wrap={false}>
                        <Text style={[styles.cell, styles.textCenter]}>{item.slNo}</Text>
                        <Text style={styles.cell}>{item.description}</Text>
                        <Text style={[styles.cell, styles.textCenter]}>{item.hsn}</Text>
                        <Text style={[styles.cell, styles.textRight]}>{item.rate.toFixed(2)}</Text>
                        <Text style={[styles.cell, styles.textCenter]}>{item.quantity}</Text>
                        <Text style={[styles.lastCell, styles.textRight]}>{item.amount.toFixed(2)}</Text>
                    </View>
                ))}
            </View>

            {/* Calculation Section - Will be moved to the last page */}
            <View style={[styles.table, { borderTopWidth: 0 }]}>
                {/* Calculation Rows */}
                <View style={[styles.row, { borderTopWidth: 0 }]}>
                    <Text style={[styles.cell, { flex: 4 }]}></Text>
                    <Text style={[styles.cell, styles.textRight, styles.bold]}>Sub Total</Text>
                    <Text style={[styles.lastCell, styles.textRight]}>{invoiceData.calculations.subTotal.toFixed(2)}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.cell, { flex: 4 }]}></Text>
                    <Text style={[styles.cell, styles.textRight]}>Discount</Text>
                    <Text style={[styles.lastCell, styles.textRight]}>{invoiceData.calculations.discount.toFixed(2)}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.cell, { flex: 4 }]}></Text>
                    <Text style={[styles.cell, styles.textRight]}>CGST</Text>
                    <Text style={[styles.lastCell, styles.textRight]}>{invoiceData.calculations.cgst.toFixed(2)}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.cell, { flex: 4 }]}></Text>
                    <Text style={[styles.cell, styles.textRight]}>SGST</Text>
                    <Text style={[styles.lastCell, styles.textRight]}>{invoiceData.calculations.sgst.toFixed(2)}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.cell, { flex: 4 }]}></Text>
                    <Text style={[styles.cell, styles.textRight, styles.bold]}>Total</Text>
                    <Text style={[styles.lastCell, styles.textRight, styles.bold]}>
                        {invoiceData.calculations.total.toFixed(2)}
                    </Text>
                </View>
            </View>

            {/* Amount in Words */}
            <View style={styles.section}>
                <Text style={styles.bold}>Total Amount (in words): Nine Thousand Six Hundred Eight Rupees Only</Text>
            </View>

            {/* Tax Table */}
            <View style={[styles.table, { borderTopWidth: 0 }]}>
                <View style={[styles.row, styles.tableHeader]}>
                    <Text style={[styles.cell, styles.textCenter]}>Taxable Value</Text>
                    <Text style={[styles.cell, styles.textCenter]}>Integrated Tax</Text>
                    <Text style={[styles.lastCell, styles.textCenter]}>Total Tax Amount</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.cell, styles.textCenter]}>8600.00</Text>
                    <View style={styles.cell}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ flex: 1, textAlign: "center" }}>Rate</Text>
                            <Text style={{ flex: 1, textAlign: "center" }}>Amount</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ flex: 1, textAlign: "center" }}>9%</Text>
                            <Text style={{ flex: 1, textAlign: "center" }}>504.00</Text>
                        </View>
                    </View>
                    <Text style={[styles.lastCell, styles.textCenter]}>1008.00</Text>
                </View>
            </View>

            <View style={[styles.section, { borderBottomWidth: 1 }]}>
                <Text style={styles.bold}>Tax Amount (in words): One Thousand Eight Rupees Only</Text>
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

            {/* Footer */}
            <Text style={styles.footer}>This is a Computer Generated Invoice</Text>

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
const InvoicePdf = () => {
    const [showViewer, setShowViewer] = useState(false)

    return (
        <div className="container my-5">
            <div className="text-center">
                <h2 className="mb-4">Tax Invoice Generator</h2>
                <PDFDownloadLink document={<TaxInvoicePDF />} fileName="tax-invoice.pdf" className="btn btn-primary btn-lg">
                    {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download Tax Invoice PDF")}
                </PDFDownloadLink>
            </div>
            <button
                onClick={() => setShowViewer((prev) => !prev)}
                style={{
                    padding: "8px 16px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                {showViewer ? "Hide PDF" : "View PDF"}
            </button>

            <div className="mt-4">
                {showViewer && (
                    <div style={{ marginTop: "20px", height: "90vh", border: "1px solid #ccc" }}>
                        <PDFViewer width="100%" height="100%">
                            <TaxInvoicePDF />
                        </PDFViewer>
                    </div>
                )}
                <h4>Invoice Preview Data:</h4>
                <div className="row">
                    <div className="col-md-6">
                        <h6>Seller Information:</h6>
                        <p>
                            <strong>{invoiceData.seller.name}</strong>
                        </p>
                        <p>{invoiceData.seller.address}</p>
                        <p>GSTIN: {invoiceData.seller.gstin}</p>
                    </div>
                    <div className="col-md-6">
                        <h6>Invoice Details:</h6>
                        <p>Invoice No: {invoiceData.invoice.number}</p>
                        <p>Date: {invoiceData.invoice.date}</p>
                        <p>Total Amount: ₹{invoiceData.calculations.total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoicePdf
