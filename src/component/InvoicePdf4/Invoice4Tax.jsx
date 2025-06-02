import React from 'react'
import { Text, View, StyleSheet } from "@react-pdf/renderer"

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

const Invoice4Tax = () => {
    const TaxTable = () => {
        return (
            <View style={[styles.table, { borderTopWidth: 0 }]}>
                <View style={[styles.row, styles.tableHeader]}>
                    <Text style={[styles.cell, styles.textCenter]}>Taxable Value</Text>
                    <Text style={[styles.cell, styles.textCenter]}>Central Tax</Text>
                    <Text style={[styles.cell, styles.textCenter]}>State Tax</Text>
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
        )
    }

    return (
        <TaxTable />
    )
}

export default Invoice4Tax