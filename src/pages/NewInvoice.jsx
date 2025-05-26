import { useState, useEffect, useRef } from "react";
import NewPageInput from "../component/NewPageInput";
import ItemRow from "../component/ItemRow";
import {
  addUpdateInvoice,
  getClients,
  getLastInvoiceNumber,
  getUserProfile,
} from "../component/ApiFunction";
import BillingShippingSection from "../component/BillingShippingSection";
import FromBusinessSection from "../component/FromBusinessSection";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserId } from "../../Helper";
import CustomModal from "../component/CustomModal";
import CreateClient from "./client/CreateClient";

export default function NewInvoice() {
  const [invoiceName, setInvoiceName] = useState("New Invoice");
  const [currentDate, setCurrentDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [isShipTo, setIsShipTo] = useState(false);
  const [copyBilling, setCopyBilling] = useState("yes");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [itemRow, setItemRow] = useState([
    {
      id: 1,
      selectedItemId: "",
      selectedItemName: "",
      description: "",
      details: "",
      hsnCode: "",
      rate: "",
      quantity: "",
      total: 0,
      isChecked: false,
    },
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state || null;

  const [discount, setDiscount] = useState({
    isDiscountApplicable: false,
    discountType: "none",
    discountPercentage: "",
    discountFlat: "",
  })
  const [tax, setTax] = useState({
    isTaxApplicable: false,
    taxType: "none",
    taxPercentage: "",
  })
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [createClientModal, setCreateClientModal] = useState(false);
  const [creatingbill, setCreatingBill] = useState(false);

  const hanldeDiscount = (data, type) => {
    // console.log("data", data, "type", type);

    if (type === "type") {
      if (data === "none") {
        setDiscount({
          ...discount,
          isDiscountApplicable: false,
          discountType: data,
          discountPercentage: "",
          discountFlat: "",
        });
        return
      }
      setDiscount({
        ...discount,
        isDiscountApplicable: true,
        discountType: data,
        discountPercentage: "",
        discountFlat: "",
      });
    }
    if (type === "percent") {
      setDiscount({
        ...discount,
        discountPercentage: data,
        discountFlat: "",
      });
    }
    if (type === "flat") {
      setDiscount({
        ...discount,
        discountFlat: data,
        discountPercentage: "",
      });
    }


  }

  const handleTax = (data, type) => {
    if (type === "type") {
      if (data === "none") {
        setTax({
          ...tax,
          isTaxApplicable: false,
          taxType: data,
          taxPercentage: "",
        });
        return
      }
      setTax({
        ...tax,
        isTaxApplicable: true,
        taxType: data,
        taxPercentage: "",
      });
    }
    if (type === "other") {
      setTax({
        ...tax,
        taxPercentage: data,
      });
    }
  }

  const [shipToFields, setShipToFields] = useState({
    shipToName: "",
    shipToEmail: "",
    shipToAddress: "",
    shipToMobile: "",
    shipToGst: "",
  });

  const formRef = useRef(null);

  const fetchLastInvoiceNumber = async () => {
    const lastinvoicenumber = await getLastInvoiceNumber();
    let invoiceNumber = `${formData?.store_code}-${lastinvoicenumber + 1}`;
    setInvoiceNumber(invoiceNumber);
  }

  // Fetch last invoice number
  useEffect(() => {
    if (editData) {
      setInvoiceNumber(editData?.invoiceNumber || "");
    } else {
      fetchLastInvoiceNumber();
    }
  }, [editData, formData?.store_code]);

  // Fetching user profile and setting initial values
  useEffect(() => {
    getUserProfile(setLoading, setFormData);
    // console.log("editData", editData);
    if (editData) {
      console.log(editData);
      setSelectedClient({
        name: editData?.billName,
        email: editData?.billEmail,
        address: editData?.billAddress,
        mobile_number: editData?.billMobile,
        gst_no: editData?.gst_no,
      });

      setIsShipTo(!!editData.shipToName);
      setCopyBilling(
        editData?.shipToName || editData?.shipToEmail ? "no" : "yes"
      );
      setShipToFields({
        shipToName: editData?.shipToName || "",
        shipToEmail: editData?.shipToEmail || "",
        shipToAddress: editData?.shipToAddress || "",
        shipToMobile: editData?.shipToMobile || "",
        shipToGst: editData?.shipToGst || "",
      });
      setInvoiceName(editData?.invoiceName || "invoice");
      setCurrentDate(editData?.date || "");
      setItemRow(editData?.items || []);
      setDiscount(editData?.discount || {
        isDiscountApplicable: false,
        discountType: "none",
        discountPercentage: "",
        discountFlat: "",
      });
      setTax(editData?.tax || {
        isTaxApplicable: false,
        taxType: "none",
        taxPercentage: "",
      });
      setTotalTax(editData?.totalTax || 0);
      setTotalDiscount(editData?.totalDiscount || 0);
      setSubTotal(editData?.subTotal || 0);
      setTotal(editData?.total || 0);
      setInvoiceNumber(editData?.invoiceNumber || "");

    } else {
      const today = new Date().toISOString().split("T")[0];
      setCurrentDate(today);
    }

  }, [editData]);

  const handleClientSelect = (selectedOption) => {
    const client = selectedOption ? selectedOption.client : null;
    setSelectedClient(client);

    if (selectedOption.value === "new-client") {
      setCreateClientModal(true);
    }
  };

  const fetchClients = () => getClients(setClients, setLoading);

  useEffect(() => {
    fetchClients();
  }, []);

  // const successClientApi = fetchClients;

  const clientOptions = [
    ...clients.map((client) => ({
      value: client._id,
      label: client.name,
      client: client,
    })),
    {
      value: "new-client",
      label: (
        <span>
          <i className="fa fa-plus" style={{ marginRight: "5px" }}></i>
          Add New Client
        </span>
      ),
      client: null,
    },
  ];

  const handleFocus = (e) => {
    const position = taxpercentage.length - 1;
    e.target.setSelectionRange(0, position);
  };

  const getInvoiceFormData1 = (formRef, shipToFields, copyBilling) => {
    const form = formRef.current;
    if (!form) return null;

    const formData = new FormData(form);
    const data = {};
    const items = [];

    formData.forEach((value, key) => {
      const match = key.match(/^Item(\w+)\[(\d+)\]$/);
      if (match) {
        const field = match[1];
        const index = parseInt(match[2]);

        if (!items[index]) items[index] = {};
        items[index][field.toLowerCase()] = value;
      } else {
        data[key] = value;
      }
    });

    Object.entries(shipToFields).forEach(([key, value]) => {
      data[key] = value;
    });
    data.items = items;

    const numberValue = formData.get("invoiceNumber");
    if (numberValue) {
      data.invoiceNumber = `INV${numberValue}`;
    }
    const logoImage = formData.get("logoImage");
    // data.copyBilling = copyBilling;
    return data;


    return data;
  };

  const getInvoiceFormData2 = (formRef, shipToFields, copyBilling) => {

    // console.log("selectedClient", selectedClient);
    // console.log("formData", formData);
    // console.log("itemRow", itemRow);
    // console.log("currentDate", currentDate);
    // console.log("discount", discount);
    // console.log("tax", tax);
    // console.log("totalTax", totalTax);
    // console.log("totalDiscount", totalDiscount);
    // console.log("subTotal", subTotal);
    // console.log("total", total);
    // console.log("copyBilling", copyBilling);
    // console.log("shipToFields", shipToFields);

    let data = {
      billAddress: selectedClient?.address || "",
      billEmail: selectedClient?.email || "",
      billMobile: selectedClient?.mobile_number || "",
      billName: selectedClient?.name || "",
      gst_no: selectedClient?.gst_no || "",
      businessAddress: formData?.address || "",
      businessEmail: formData?.email || "",
      businessName: formData?.companyName || "",
      businessNumber: formData?.contactNumber || "",
      businessPhone: formData?.phoneNumber || "",
      logo: formData?.logo || "",
      sigUrl: formData?.signature_logo || "",
      date: currentDate,
      invoiceName: invoiceName,
      invoiceNumber: invoiceNumber, // Populate if needed
      tax: tax,
      discount: discount,
      totalTax: totalTax,
      totalDiscount: totalDiscount,
      subTotal: subTotal,
      total: total,
      balanceAmount: balanceAmount,
      items: itemRow?.filter(item => item?.selectedItemId !== "new-item"),
      invoice_id: editData?.invoice_id || "",
      ...(copyBilling === "yes"
        ? {
          shipToName: selectedClient?.name || "",
          shipToEmail: selectedClient?.email || "",
          shipToAddress: selectedClient?.address || "",
          shipToMobile: selectedClient?.mobile_number || "",
          shipToGst: selectedClient?.gst_no || "",
        }
        : {
          shipToName: shipToFields?.shipToName || "",
          shipToEmail: shipToFields?.shipToEmail || "",
          shipToAddress: shipToFields?.shipToAddress || "",
          shipToMobile: shipToFields?.shipToMobile || "",
          shipToGst: shipToFields?.shipToGst || "",
        }),
    };
    return data;
  };

  const handlePreviewClick = () => {
    const data = getInvoiceFormData2(formRef, shipToFields, copyBilling);
    if (!data) return;
    console.log("✅ Final Data to be sentr:", data);
    navigate("/invoice/preview-invoice", { state: data });
  };

  const generatePdf = () => {
    const data = getInvoiceFormData2(formRef, shipToFields, copyBilling);
    if (!data) return;
    setCreatingBill(true);
    data.user_id = getUserId();
    data.status = "active";
    console.log("✅ Final Data (JSON):", data);
    addUpdateInvoice(data, navigate);
  };

  const handleInoivceTitleChange = (e) => {
    setInvoiceName(e.target.value);
  };

  const handleGrandTotalChange = (grandTotal) => {
    const parsedTotal = Number(grandTotal);
    if (isNaN(parsedTotal)) return;

    setSubTotal(parsedTotal);

    let discountAmount = calculateDiscount(parsedTotal, discount);
    let priceAfterDiscount = Math.max(parsedTotal - discountAmount, 0);

    let totalTax = calculateTax(priceAfterDiscount, tax);
    let finalAmount = priceAfterDiscount + totalTax;

    setTotal(Math.round(finalAmount));
    setBalanceAmount(Math.round(finalAmount));
    setTotalDiscount(discountAmount);
    setTotalTax(totalTax);
  };

  const calculateDiscount = (amount, discount) => {
    if (!discount?.isDiscountApplicable) return 0;
    if (discount?.discountType === "percent") {
      return (amount * discount?.discountPercentage) / 100;
    }
    if (discount?.discountType === "flat amount") {
      return discount?.discountFlat || 0;
    }
    return 0;
  };

  const calculateTax = (amount, tax) => {
    if (!tax?.isTaxApplicable) return 0;
    let percentage = tax?.taxType === "CGST_SGST" || tax?.taxType === "IGST" ? 18 : tax?.taxPercentage || 0;
    return (amount * percentage) / 100;
  };

  const handleNewClient = (clientData) => {
    console.log("clientData", clientData);
    setSelectedClient(clientData);
  }

  return (
    <div className="container my-5">
      {loading ? (
        <>
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row mx-2 flex-wrap">
            <div
              className="col-md-9  position-sticky top-0 z-3 py-2 px-0"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <div className="d-flex justify-content-between  ">
                <div
                  className="btn-group gap-2"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    style={{
                      fontWeight: "500",
                      padding: "8px 20px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    onClick={handlePreviewClick}
                  >
                    Preview
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    style={{
                      fontWeight: "500",
                      padding: "8px 20px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Edit
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  style={{
                    fontWeight: "500",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={generatePdf}
                  disabled={selectedClient === null || creatingbill}
                >
                  {creatingbill ? "Creating.." : "Create Bill"}
                </button>
              </div>
            </div>
            <div className="col-md-9 position-relative z-1">
              <form
                className="row left-side-invoice border py-5 px-3 mt-2"
                ref={formRef}
              >
                <div className="col-md-6">
                  <input
                    type="text"
                    value={invoiceName}
                    name="invoiceName"
                    onChange={handleInoivceTitleChange}
                    className="py-1 px-2 w-50 border-1 border-secondary-subtle input-field rounded"
                  />
                </div>
                <div className="col-md-6 ">
                  <div className="logo-input d-flex justify-content-end position-relative my-lg-0 my-md-0 mt-2">
                    <img
                      src={formData.logo}
                      alt="Logo"
                      className="image_width"
                    />
                    <input type="hidden" value={formData.logo} name="logo" />
                  </div>
                </div>

                <FromBusinessSection formData={formData} />

                <BillingShippingSection
                  clientOptions={clientOptions}
                  handleClientSelect={handleClientSelect}
                  selectedClient={selectedClient}
                  isShipTo={isShipTo}
                  setIsShipTo={setIsShipTo}
                  copyBilling={copyBilling}
                  setCopyBilling={setCopyBilling}
                  shipToFields={shipToFields}
                  setShipToFields={setShipToFields}
                />
                <hr className="mt-2 mb-0" />
                <div className="col-md-6">
                  <div className="d-flex flex-column my-3 gap-3 ">
                    <NewPageInput
                      label="Inv Number"
                      name="invoiceNumber"
                      placeholder="INV"
                      type="number"
                      invoiceNumber={invoiceNumber}
                    />
                    <div className="row align-items-center flex-row">
                      <div className="col-md-3">
                        <label htmlFor="name" className="text-dark fs-o8">
                          Date
                        </label>
                      </div>
                      <div className="col-md-9">
                        <input
                          type="date"
                          value={currentDate}
                          onChange={(e) => setCurrentDate(e.target.value)}
                          name="date"
                          max={new Date().toISOString().split("T")[0]}
                          className="py-2 px-2 border-1 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <ItemRow
                  editData={editData}
                  onGrandTotalChange={handleGrandTotalChange}
                  itemRow={itemRow}
                  setItemRow={setItemRow}
                />

                {/* Sub Total Section */}
                <div className="row  mt-3">
                  <div className="col-12 justify-content-end d-flex ">
                    <div className="col-xl-2 col-sm-6 col-8">
                      <span className="fs-o8 fw-medium">Subtotal</span>
                    </div>
                    <div className="col-md-2 ">
                      <span className="fs-o8 fw-medium">
                        <i className="fa-solid fa-indian-rupee-sign me-1 "></i>
                        {subTotal || "0.00"}
                      </span>
                    </div>
                  </div>

                  {/* Discount Section Bill */}
                  {discount?.isDiscountApplicable && (
                    <div className="col-12 justify-content-end d-flex">
                      <div className="col-xl-2 col-sm-6 col-8">
                        {/* Discount Heading */}
                        <span className="fs-o8 fw-medium">
                          Discount
                          {discount?.discountType === "percent"
                            ? ` (${discount?.discountPercentage || "0"}%)`
                            : discount?.discountType === "flat"
                              ? ` (${discount?.discountFlat})`
                              : ""}
                        </span>
                      </div>
                      <div className="col-md-2">
                        <span className="fs-o8 fw-medium">
                          <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                          {totalDiscount || "0.00"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Tax Section Bill */}
                  {tax?.isTaxApplicable && (
                    <>
                      {tax?.taxType === "CGST_SGST" && (
                        <>
                          {/* CGST */}
                          <div className="col-12 justify-content-end d-flex">
                            <div className="col-xl-2 col-sm-6 col-8">
                              <span className="fs-o8 fw-medium">
                                CGST (9.00%)
                              </span>
                            </div>
                            <div className="col-md-2">
                              <span className="fs-o8 fw-medium">
                                <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                                {totalTax / 2 || "0.00"}
                              </span>
                            </div>
                          </div>

                          {/* SGST */}
                          <div className="col-12 justify-content-end d-flex">
                            <div className="col-xl-2 col-sm-6 col-8">
                              <span className="fs-o8 fw-medium">
                                SGST (9.00%)
                              </span>
                            </div>
                            <div className="col-md-2">
                              <span className="fs-o8 fw-medium">
                                <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                                {totalTax / 2 || "0.00"}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {tax?.taxType === "IGST" && (
                        <>
                          {/* IGST */}
                          <div className="col-12 justify-content-end d-flex">
                            <div className="col-xl-2 col-sm-6 col-8">
                              <span className="fs-o8 fw-medium">
                                IGST (18.00%)
                              </span>
                            </div>
                            <div className="col-md-2">
                              <span className="fs-o8 fw-medium">
                                <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                                {totalTax || "0.00"}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {tax?.taxType === "other" && (
                        <div className="col-12 justify-content-end d-flex">
                          <div className="col-xl-2 col-sm-6 col-8">
                            <span className="fs-o8 fw-medium">
                              Tax ({tax?.taxPercentage || "0.00"}%)
                            </span>
                          </div>
                          <div className="col-md-2">
                            <span className="fs-o8 fw-medium">
                              <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                              {totalTax || "0.00"}
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Total */}
                  <div className="col-12 justify-content-end d-flex">
                    <div className="col-xl-2 col-sm-6 col-8">
                      <span className="fs-o8 fw-medium">Total</span>
                    </div>
                    <div className="col-md-2">
                      <span className="fs-o8 fw-medium">
                        <i className="fa-solid fa-indian-rupee-sign me-1 "></i>
                        {total || "0.00"}
                      </span>
                    </div>
                  </div>

                  {/* Balance Due */}
                  <div className="col-12 justify-content-end d-flex">
                    <div className="col-xl-2 col-sm-6 col-8">
                      <span className="fs-o8 fw-bold">Balance Due</span>
                    </div>
                    <div className="col-md-2">
                      <span className="fs-o8 fw-bold">
                        <i className="fa-solid fa-indian-rupee-sign me-1 "></i>
                        {balanceAmount || "0.00"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additionaly Notes */}
                <div className="col-12 px-0">
                  <div className={`col-md-3 `}>
                    <label htmlFor="name" className="text-dark fs-o8">
                      Notes
                    </label>
                  </div>
                  <textarea
                    name="additionalDetails"
                    className="py-2 px-2 border-1 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100 mt-2 resize-none"
                    placeholder="Notes - any relevant information not covered, additional terms and conditions"
                    rows="6"
                    value={formData?.notes}
                    disabled={true}
                    // onChange={(e) => setAdditionalNotes(e.target.value)}
                  />
                </div>

                {/* Signature */}
                <div className="w-auto">
                  <img
                    src={formData?.signature_logo}
                    alt="signature"
                    className="image_width_signature"
                  />
                </div>
              </form>
            </div>

            {/* Tax & Discount Section */}
            <div className="col-md-3 ">
              <p className="fs-o8 border-bottom border-dark mt-2">
                Tax
              </p>

              <div className="row align-items-center mx-0 mt-3">
                <div className="col-md-3 px-0">
                  <label htmlFor="optionSelect" className="text-dark fs-o8">
                    Type
                  </label>
                </div>
                {/* Tax DropDown */}
                <div className="col-md-9 ps-2 pe-0">
                  <select
                    id="optionSelect"
                    value={tax?.taxType}
                    onChange={(e) => {
                      handleTax(e.target.value, "type");
                    }}
                    className="py-2 px-2 border-1 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                  >
                    <option value="none">None</option>
                    <option value="CGST_SGST">CGST & SGST</option>
                    <option value="IGST">IGST</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Other Tax Options */}
              {tax?.taxType === "other" && (
                <>
                  <div className="row align-items-center mx-0 mt-2">
                    <div className="col-md-3 px-0">
                      <label className="text-dark fs-o8">Percent</label>
                    </div>
                    <div className="col-md-9 ps-2 pe-0">
                      <input
                        type="text"
                        value={tax?.taxPercentage}
                        name="taxpercentage"
                        onChange={(e) => handleTax(e.target.value, "other")}
                        placeholder="0.000%"
                        onFocus={handleFocus}
                        className="py-2 px-2 border-1 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Discount Section */}
              <p className="fs-o8 border-bottom border-dark mt-4">
                Discount
              </p>

              {/* Discount Type Dropdown */}
              <div className="row align-items-center mx-0 mt-3">
                <div className="col-md-3 px-0">
                  <label className="text-dark fs-o8">Type</label>
                </div>
                <div className="col-md-9 ps-2 pe-0">
                  <select
                    value={discount?.discountType}
                    onChange={(e) => hanldeDiscount(e.target.value, "type")}
                    className="py-2 px-2 border-1 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                  >
                    <option value="none">None</option>
                    <option value="percent">Percent</option>
                    <option value="flat amount">Flat Amount</option>
                  </select>
                </div>
              </div>

              {/* Discount input Field */}
              {discount?.discountType !== "none" && (
                <div className="row align-items-center mx-0 mt-2">
                  <div className="col-md-3 px-0">
                    <label className="text-dark fs-o8">{discount?.discountType === "percent" ? "Percent" : "Amount"}</label>
                  </div>
                  <div className="col-md-9 ps-2 pe-0">
                    <input
                      type="number"
                      value={discount?.discountType === "percent" ? discount?.discountPercentage : discount?.discountFlat}
                      name="discountPercentage"
                      onChange={(e) => hanldeDiscount(e.target.value, discount?.discountType === "percent" ? "percent" : "flat")}
                      placeholder={discount?.discountType === "percent" ? "0.000%" : "0.00"}
                      className="py-2 px-2 border-1 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        </>
      )}
      <CustomModal
        isOpen={createClientModal}
        onClose={() => {
          setCreateClientModal(false)
        }}
      >
        <CreateClient onClose={() => {
          setCreateClientModal(false)
        }} location={"invoice"} handleNewClient={handleNewClient} />
      </CustomModal>
    </div>
  );
}
