// components/InvoicePreview.js
import React from "react";
import { ToWords } from 'to-words';

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

export default function InvoicePdf2({ formData }) {
    const { additionalDetails } = formData || {};
    const items = [
        { description: "Winding", hsn: "844540", gst: "18%", qty: 1, rate: 3500, per: "NOS", amount: 3500 },
        { description: "Bush", hsn: "8545", gst: "18%", qty: 1, rate: 2100, per: "NOS", amount: 2100 },
        { description: "Seal", hsn: "998711", gst: "18%", qty: 1, rate: 400, per: "NOS", amount: 400 },
    ];

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const discount = 400;
    const taxableAmount = subtotal - discount;
    const cgst = taxableAmount * 0.09;
    const sgst = taxableAmount * 0.09;
    const total = taxableAmount + cgst + sgst;

    const taxableValue = 5600;
    const centralTax = 504;
    const stateTax = 504;
    const totalTax = 1008;


    return (
        <div className="bg-white p-3">
            <p className="text-center fs-4 text-black">TAX INVOICE</p>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <tbody>
                        {/* Company Info + Invoice Info */}
                        <tr>
                            <td rowSpan="3" colSpan="4">
                                <strong>AVID RISE DIGITAL SOLUTATIONS</strong><br />
                                Azizganj Anand Vihaar Near S.S College<br />
                                Shahjahanpur<br />
                                GSTIN/UIN: 09ACEFA9697B1Z3<br />
                                State Name: Uttar Pradesh, Code: 09<br />
                                Contact : 9307489221
                            </td>
                            <td colSpan="2" >Invoice No:<strong> 04</strong></td>
                            <td colSpan="2">Dated:<strong> 09-Apr-25</strong></td>
                        </tr>
                        <tr>
                            <td colSpan="2">Delivery Note</td>
                            <td colSpan="2">Mode/Terms of Payment</td>
                        </tr>
                        <tr>
                            <td colSpan="2">Buyer's Order No.</td>
                            <td colSpan="2">Dated</td>
                        </tr>

                        {/* Order, Dispatch & Terms */}
                        <tr>
                            <td rowSpan="3" colSpan="4">
                                <strong>Consignee (Ship to)</strong><br />
                                <strong>ULTRATECH CEMENT LIMITED</strong><br />
                                SHAHJAHANPUR UNIT<br />
                                GSTIN/UIN : 09AAACL6442L1Z8<br />
                                State Name : Uttar Pradesh, Code : 09
                            </td>
                            <td colSpan="2">Dispatch Doc No.</td>
                            <td colSpan="2">Delivery Note Date</td>
                        </tr>
                        <tr>
                            <td colSpan="2">Dispatched through</td>
                            <td colSpan="2">Destination</td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td colSpan="4">
                                <strong>Buyer (Bill to)</strong><br />
                                <strong>ULTRATECH CEMENT LIMITED</strong><br />
                                SHAHJAHANPUR UNIT<br />
                                GSTIN/UIN : 09AAACL6442L1Z8<br />
                                State Name : Uttar Pradesh, Code : 09<br />
                                Place of Supply : Uttar Pradesh
                            </td>
                            <td colSpan="4" >Terms of Delivery <br />
                                <strong>Ex-Factory</strong>
                            </td>
                        </tr>
                        <tr className="">
                            <th className="border-r px-2 py-1 w-16">Sl No.</th>
                            <th colSpan={3} className="border-r px-2 py-1">Description of Goods</th>
                            <th className="border-r px-2 py-1">HSN</th>
                            <th className="border-r px-2 py-1">Rate</th>
                            <th className="border-r px-2 py-1">Quantity</th>
                            <th className="px-2 py-1">Amount</th>
                        </tr>
                        {items.map((item, i) => (
                            <tr key={i} className="">
                                <td className="border-r text-center">{i + 1}</td>
                                <td colSpan={3} className="border-r ">{item.description}</td>
                                <td className="border-r text-center">{item.hsn}</td>
                                <td className="border-r text-right">{item.rate.toFixed(2)}</td>
                                <td className="border-r font-bold text-center">{item.qty.toFixed(2)} {item.per}</td>
                                <td className="text-right font-bold">{item.amount.toFixed(2)}</td>
                            </tr>
                        ))}

                        {/* Discount and Tax Rows */}
                        <tr className="align-top">
                            <td colSpan="4" className="border-r text-left px-2 py-1" rowSpan={4}></td>
                            <td colSpan="2" className="border-r text-right px-2">Sub Total</td>
                            <td colSpan="2" className="text-right px-2">{subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="border-r text-right px-2">Discount</td>
                            <td colSpan="2" className="text-right px-2">{discount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="border-r text-right font-bold px-2">CGST</td>
                            <td colSpan="2" className="text-right font-bold px-2">{cgst.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="text-right font-bold border-r px-2">SGST</td>
                            <td colSpan="2" className="text-right font-bold px-2">{sgst.toFixed(2)}</td>
                        </tr>

                        {/* Total Row */}
                        <tr className="border-t font-bold">
                            <td colSpan="4" className="border-r text-right px-2"></td>
                            <td colSpan="2" className="border-r text-right">Total</td>
                            <td colSpan="2" className="text-right px-2">{total.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={8}>
                                Total Amount (in words): <strong>  {toWords.convert(total)}</strong>
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={2} colSpan={2}>Taxable Value</th>
                            {/* <th colSpan={2} className="text-center">Central Tax</th>
                            <th colSpan={2} className="text-center">State Tax</th> */}
                            <th colSpan={4} className="text-center">Integrated Tax</th>
                            <th rowSpan={2} colSpan={2}>Total Tax Amount</th>
                        </tr>
                        <tr>
                            {/* <th colSpan={1}>Rate</th>
                            <th colSpan={1}>Amount</th>
                            <th colSpan={1}>Rate</th>
                            <th colSpan={1}>Amount</th> */}
                            <th colSpan={2}>Rate</th>
                            <th colSpan={2}>Amount</th>
                        </tr>
                        <tr>
                            <td colSpan={2}>{taxableValue.toFixed(2)}</td>
                            {/* <td colSpan={2}>9%</td>
                            <td colSpan={2}>{centralTax.toFixed(2)}</td> */}
                            <td colSpan={2}>9%</td>
                            <td colSpan={2}>{stateTax.toFixed(2)}</td>
                            <td colSpan={2}>{totalTax.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={8}>
                                Tax Amount (in words): <strong>  {toWords.convert(totalTax)}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} rowSpan={3} style={{ width: '50%', verticalAlign: 'top' }} className="">
                                <strong>Declaration</strong> <br />
                                <p style={{ fontSize: '12px', marginTop: '8px' }}>
                                    We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.
                                </p>
                            </td>
                            <td colSpan={4} rowSpan={3} style={{ width: '50%', verticalAlign: 'top' }} className="">
                                <strong>Company’s Bank Details</strong><br />
                                Bank Name : <strong>Bank of Baroda</strong><br />
                                A/c No. : <strong>77490200001522</strong><br />
                                Branch & IFS Code : <strong>LAL IMLI CHAURAHA SHAHJAHANPUR & BARB0VJSHPU</strong><br />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="text-center fs-6 text-grey mb-0">This is a Computer Generated Invoice </p>
        </div>
    );
}
