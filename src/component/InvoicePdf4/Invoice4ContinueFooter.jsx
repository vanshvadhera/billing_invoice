import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    cell: {
        flex: 1,
        padding: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: "#000",
        height: 100,
        justifyContent: 'center',   
    },
})

const Invoice4ContinueFooter = () => {

    const ContinueTable = () => {
        return (
            <View style={styles.row}>
                <View style={styles.cell} >
                    <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold' }} >Continued On Nex Page</Text>
                </View>
            </View>
        )
    }

    return (
        <ContinueTable />
    )
}

export default Invoice4ContinueFooter