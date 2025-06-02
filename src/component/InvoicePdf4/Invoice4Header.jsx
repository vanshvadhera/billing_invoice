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

const InvoiceHeader = ({ invoiceData }) => (
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

const Invoice4Header = ({ invoiceData }) => {
    return (
        <InvoiceHeader invoiceData={invoiceData} />
    )
}

export default Invoice4Header