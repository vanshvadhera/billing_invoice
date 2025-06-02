import React from 'react'
import { Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#000",
        alignItems: "center",
        minHeight: 20,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    bodyRow: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#000",
        alignItems: "center",
        minHeight: 300,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    tableHeader: {
        backgroundColor: "#f0f0f0",
        fontWeight: "bold",
    },
    tableCellSlNo: {
        width: "8%",
        padding: 5,
        paddingBottom: 3,
        borderRightWidth: 1,
        borderRightColor: "#000",
        borderRightStyle: "solid",
        textAlign: "center",
    },
    tableCellDescription: {
        width: "25%",
        padding: 5,
        paddingBottom: 3,
        borderRightWidth: 1,
        borderRightColor: "#000",
        borderRightStyle: "solid",
    },
    tableCellHSN: {
        width: "12%",
        padding: 5,
        paddingBottom: 3,
        borderRightWidth: 1,
        borderRightColor: "#000",
        borderRightStyle: "solid",
        textAlign: "center",
    },
    tableCellGSTQuantity: {
        width: "15%",
        padding: 5,
        paddingBottom: 3,
        borderRightWidth: 1,
        borderRightColor: "#000",
        borderRightStyle: "solid",
        textAlign: "center",
    },
    tableCellRate: {
        width: "12%",
        padding: 5,
        paddingBottom: 3,
        borderRightWidth: 1,
        borderRightColor: "#000",
        borderRightStyle: "solid",
        textAlign: "center",
    },
    tableCellRatePer: {
        width: "10%",
        padding: 5,
        paddingBottom: 3,
        borderRightWidth: 1,
        borderRightColor: "#000",
        borderRightStyle: "solid",
        textAlign: "center",
    },
    tableCellAmount: {
        width: "18%",
        padding: 5,
        paddingBottom: 3,
        textAlign: "right",
    },
})

const TableHeader = () => {
    return (

        <View style={[styles.row, styles.tableHeader]}>
            <Text style={[styles.tableCellSlNo, { height: "100%" }]}>Sl No.</Text>
            <Text style={[styles.tableCellDescription, { height: "100%" }]}>Description of Goods</Text>
            <Text style={[styles.tableCellHSN, { height: "100%" }]}>HSN/SAC</Text>
            <Text style={[styles.tableCellGSTQuantity, { height: "100%" }]}>Quantity</Text>
            <Text style={[styles.tableCellRate, { height: "100%" }]}>Rate</Text>
            <Text style={[styles.tableCellRatePer, { height: "100%" }]}>Rate per</Text>
            <Text style={[styles.tableCellAmount, { height: "100%" }]}>Amount</Text>
        </View>
    )
}
const TableBody = () => {
    return (
        <View style={[styles.bodyRow]}>
            <Text style={[styles.tableCellSlNo, { height: "100%" }]}></Text>
            <Text style={[styles.tableCellDescription, { height: "100%" }]}></Text>
            <Text style={[styles.tableCellHSN, { height: "100%" }]}></Text>
            <Text style={[styles.tableCellGSTQuantity, { height: "100%" }]}></Text>
            <Text style={[styles.tableCellRate, { height: "100%" }]}></Text>
            <Text style={[styles.tableCellRatePer, { height: "100%" }]}></Text>
            <Text style={[styles.tableCellAmount, { height: "100%" }]}></Text>
        </View>
    )
}

const Invoice4Table = () => {
    return (
        <View>
            <TableHeader />
            <TableBody />
        </View>
    )
}

export default Invoice4Table