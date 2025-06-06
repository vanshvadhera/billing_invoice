import React from 'react'
import { Text, View, StyleSheet } from "@react-pdf/renderer"

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
        height: 72,
    },
})

const InvoiceHeader = ({ formData }) => (
    <>
        <Text style={styles.header}>TAX INVOICE</Text>
        <View style={styles.companySection}>
            <View style={styles.leftColumn}>
                <View style={styles.companyNameSection} >
                    <Text style={styles.bold}>{formData?.businessName}</Text>
                    <Text>{formData?.businessAddress}</Text>
                    <Text>GSTIN/UIN: {"--"}</Text>
                    <Text>Email: {formData?.businessEmail}</Text>
                    <Text>Contact: {formData?.businessNumber}</Text>
                </View>
                {/* Consignee Section */}
                <View style={[styles.section, styles.companyNameSection, { marginTop: "-2px", paddingBottom: "10px" }]}>
                    <Text style={styles.bold}>Consignee (Ship to)</Text>
                    <Text style={styles.bold}>{formData?.shipToName}</Text>
                    <Text>{formData?.shipToAddress}</Text>
                    <Text>GSTIN/UIN: {formData?.shipToGst}</Text>
                    <Text>Email: {formData?.shipToEmail}</Text>
                    <Text style={{ marginBottom: "5px" }}>Contact: {formData?.shipToMobile}</Text>
                </View>
                {/* Buyer Section */}
                <View style={[styles.section, styles.companyNameSection, { marginTop: "-12px", borderBottomWidth: 1 }]}>
                    <Text style={styles.bold}>Buyer (Bill to)</Text>
                    <Text style={styles.bold}>{formData?.billName}</Text>
                    <Text>{formData?.billAddress}</Text>
                    <Text>GSTIN/UIN: {formData?.gst_no}</Text>
                    <Text>Email: {formData?.billEmail}</Text>
                    <Text>Contact: {formData?.billMobile}</Text>
                </View>
            </View>
            <View style={styles.rightColumn}>
                <View style={styles.row}>
                    <Text style={[styles.cell, styles.bold]}>Invoice No: {formData?.invoiceNumber}</Text>
                    <Text style={[styles.lastCell, styles.bold]}>Dated: {formData?.date}</Text>
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
                    <Text style={{ marginTop: "4px" }}></Text>
                </View>
            </View>
        </View>
    </>
)

const Invoice4Header = ({ formData }) => {
    return (
        <InvoiceHeader formData={formData} />
    )
}

export default Invoice4Header