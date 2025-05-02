import { useState, useEffect, useRef } from "react";
import NewPageInput from "../component/NewPageInput";
import ItemRow from "../component/ItemRow";
import {
  addUpdateInvoice,
  getClients,
  getUserProfile,
} from "../component/ApiFunction";
import ClientFormModal from "../component/ClientFormModal";
import BillingShippingSection from "../component/BillingShippingSection";
import FromBusinessSection from "../component/FromBusinessSection";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserId } from "../../Helper";

export default function NewInvoice() {
  const [invoiceName, setInvoiceName] = useState("New Invoice");
  const [selectedOptionTax, setSelectedOptionTax] = useState("none");
  const [selectedOptionDiscount, setSelectedOptionDiscount] = useState("none");
  const [isTaxApplicable, setIsTaxApplicable] = useState(false);
  const [isDiscountApplicable, setIsDiscountApplicable] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [grandTotal, setGrandTotal] = useState("0.00");
  const [taxLabletChange, setTaxLabletChange] = useState("Tax");
  const [taxpercentage, setTaxpercentage] = useState("");
  const [discountpercentage, setDiscountpercentage] = useState("0.000%");
  const [totalTaxPrice, setTotalTaxPrice] = useState(0);
  const [discountAmountPercentage, setDiscountAmountPercentage] = useState("");
  const [discountTotal, setDiscountTotal] = useState("");
  const [previewStatus, setPreviewStatus] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [isShipTo, setIsShipTo] = useState(false);
  const [copyBilling, setCopyBilling] = useState("yes");
  const editData = location.state || null;

  const [shipToFields, setShipToFields] = useState({
    shipToName: "",
    shipToEmail: "",
    shipToAddress: "",
    shipToMobile: "",
    shipToGst: "",
  });
  const formRef = useRef(null);

  useEffect(() => {
    getUserProfile(setLoading, setFormData);

    if (editData) {
      // Manually set the fields based on editData
      console.log(editData);
      setSelectedClient({
        name: editData.billName,
        email: editData.billEmail,
        address: editData.billAddress,
        mobile_number: editData.billMobile,
        gst_no: editData.gst_no,
      });

      setIsShipTo(!!editData.shipToName);
      setCopyBilling(
        editData.shipToName || editData.shipToEmail ? "no" : "yes"
      );
      setShipToFields({
        shipToName: editData.shipToName || "",
        shipToEmail: editData.shipToEmail || "",
        shipToAddress: editData.shipToAddress || "",
        shipToMobile: editData.shipToMobile || "",
        shipToGst: editData.shipToGst || "",
      });

      setTableData(editData.items || []);
      setGrandTotal(editData.grandTotal || "0.00");
      setTaxpercentage(editData.taxpercentage || "");
      setDiscountpercentage(editData.discountpercentage || "0.000%");
      setTotalTaxPrice(editData.totalTaxPrice || 0);
      setDiscountAmountPercentage(editData.discountAmountPercentage || "");
      setDiscountTotal(editData.discountTotal || "");
      setSelectedOptionTax(editData.selectedOptionTax || "none");
      setSelectedOptionDiscount(editData.selectedOptionDiscount || "none");
      setIsTaxApplicable(editData.isTaxApplicable || false);
      setIsDiscountApplicable(editData.isDiscountApplicable || false);
      setInvoiceName(editData.invoiceName || "invoice");
      setCurrentDate(editData.date || "");
      console.log(editData.date);
      setAdditionalNotes(editData.additionalDetails || "");
      setSelectedOptionTax(editData.selectedOptionTax || "");
    } else {
      const today = new Date().toISOString().split("T")[0];
      setCurrentDate(today);
    }

  }, [editData]);

  const handleClientSelect = (selectedOption) => {
    const client = selectedOption ? selectedOption.client : null;
    setSelectedClient(client);

    if (selectedOption.value === "new-client") {
      setShowClientModal(true);
    }
  };

  const closeModal = () => {
    setShowClientModal(false);
  };

  const fetchClients = () => getClients(setClients, setLoading);

  useEffect(() => {
    fetchClients();
  }, []);

  const successClientApi = fetchClients;

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

  const handleCheckedPriceChange = (newPrice) => {
    setTotalTaxPrice(newPrice);
  };

  const handleSelectChangeTax = (e) => {
    const value = e.target.value;
    setSelectedOptionTax(value)
    setIsTaxApplicable(value === "CGST_SGST" || value === "other");
  };

  const handleSelectChangeDicount = (e) => {
    const selectedValue = e.target.value;
    setSelectedOptionDiscount(selectedValue);
    setIsDiscountApplicable(
      selectedValue === "percent" || selectedValue === "flat amount"
    );
  };

  const calculateTotal = () => {
    let baseAmount = Number(grandTotal);

    let discountAmount = 0;
    if (selectedOptionDiscount === "percent" && discountpercentage) {
      discountAmount = (baseAmount * parseFloat(discountpercentage)) / 100;
    } else if (
      selectedOptionDiscount === "flat amount" &&
      discountAmountPercentage
    ) {
      discountAmount = parseFloat(discountAmountPercentage);
    }

    const discountedSubtotal = baseAmount - discountAmount;

    let taxPercent = 0;
    if (isTaxApplicable && taxpercentage) {
      taxPercent = parseFloat(String(taxpercentage).replace("%", ""));
    }

    let taxAmount = 0;
    if (selectedOptionTax === "CGST_SGST") {
      taxAmount = (discountedSubtotal * taxPercent) / 100;
    } else {
      taxAmount = (discountedSubtotal * taxPercent) / 100;
    }

    let totalAmount = discountedSubtotal + taxAmount;
    totalAmount = totalAmount < 0 ? 0 : totalAmount;

    return totalAmount.toFixed(2);
  };

  const handleDiscountAmountPercentage = (e) => {
    setDiscountAmountPercentage(e.target.value);
  };

  const handleTaxpercentage = (e) => {
    let value = e.target.value;

    value = value.replace("%", "");

    setTaxpercentage(value + "%");
  };

  useEffect(() => {
    let discount = 0;

    if (selectedOptionDiscount === "percent" && !isNaN(discountpercentage)) {
      discount = (grandTotal * parseFloat(discountpercentage)) / 100;
    } else if (
      selectedOptionDiscount === "flat amount" &&
      !isNaN(discountAmountPercentage)
    ) {
      discount = parseFloat(discountAmountPercentage);
    }

    setDiscountTotal(discount);
  }, [
    grandTotal,
    selectedOptionDiscount,
    discountpercentage,
    discountAmountPercentage,
  ]);

  const handleDiscountpercentage = (e) => {
    setDiscountpercentage(e.target.value);
  };

  const handleFocus = (e) => {
    const position = taxpercentage.length - 1;
    e.target.setSelectionRange(0, position);
  };

  const handleTaxLableChange = (e) => {
    setTaxLabletChange(e.target.value);
  };

  const handleTableDataChange = (data) => {
    setTableData(data);
  };

  const safeToFixed = (value, digits = 2) => {
    const num = parseFloat(String(value).replace("%", ""));
    return !isNaN(num) ? num.toFixed(digits) : "0.00";
  };

  const getInvoiceFormData = (formRef, shipToFields, copyBilling) => {
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
    data.selectedOptionTax = selectedOptionTax;
    data.items = items;

    const numberValue = formData.get("invoiceNumber");
    if (numberValue) {
      data.invoiceNumber = `INV${numberValue}`;
    }
    const logoImage = formData.get("logoImage");
    data.logoImageName = logoImage?.name || null;
    data.copyBilling = copyBilling;
    data.isTaxApplicable = isTaxApplicable;
    return data;
  };

  const handlePreviewClick = () => {
    const data = getInvoiceFormData(formRef, shipToFields, copyBilling);
    if (!data) return;
    console.log("✅ Final Data to be sentr:", JSON.stringify(data, null, 2));
    setPreviewStatus(true);
    navigate("/invoice/preview-invoice", { state: data });
  };

  const generatePdf = () => {
    const data = getInvoiceFormData(formRef, shipToFields, copyBilling);
    if (!data) return;
    data.user_id = getUserId();
    data.status = "active";
    console.log("✅ Final Data (JSON):", JSON.stringify(data, null, 2));
    addUpdateInvoice(data, navigate);
  };

  const handleInoivceTitleChange = (e) => {
    setInvoiceName(e.target.value);
  };

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  const handleGrandTotalChange = (grandTotal) => {
    setGrandTotal(grandTotal);
  };

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
          <ClientFormModal
            showClientModal={showClientModal}
            closeModal={closeModal}
            onSuccess={successClientApi}
          />

          <div className="row mx-2 flex-wrap">
            <div
              className="col-md-9  position-sticky top-0 z-3 py-2 px-0"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <div className="d-flex justify-content-between  ">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <button
                    type="button"
                    className="btn btn-outline-secondary active"
                    onClick={handlePreviewClick}
                  >
                    Preview
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary active border-start"
                    onClick={() => {
                      setPreviewStatus(false);
                    }}
                  >
                    Edit
                  </button>
                </div>

                <button
                  type="button"
                  className={`btn btn-outline-secondary active border-start `}
                  onClick={generatePdf}
                >
                  Create Bill
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
                    className="py-1 px-2 w-50 border-2 border-secondary-subtle input-field rounded"
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
                      label="Number"
                      name="invoiceNumber"
                      placeholder="INV"
                      type="number"
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
                          className="py-2 px-2 border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <ItemRow
                  editData={editData}
                  onDataChange={handleTableDataChange}
                  onGrandTotalChange={handleGrandTotalChange}
                  isTaxApplicable={isTaxApplicable}
                  taxLabletChange={taxLabletChange}
                  taxpercentage={taxpercentage}
                  setTotalTax={handleCheckedPriceChange}
                />

                {/* <div className="row  mt-3">
                  <RowItem label="Subtotal" value={safeToFixed(grandTotal)} />

                  {isDiscountApplicable && (
                    <RowItem
                      label={`Discount ${
                        selectedOptionDiscount === "percent"
                          ? `(${discountpercentage}%)`
                          : selectedOptionDiscount === "flat amount"
                          ? `(Flat)`
                          : ""
                      }`}
                      value={`- ${safeToFixed(discountTotal)}`}
                    />
                  )}

                  {isTaxApplicable && selectedOptionTax === "CGST_SGST" && (
                    <>
                      <RowItem
                        label={`CGST (${parseFloat(taxpercentage) / 2}%)`}
                        value={safeToFixed(
                          ((grandTotal - discountTotal) *
                            (parseFloat(taxpercentage) / 2)) /
                            100
                        )}
                      />
                      <RowItem
                        label={`SGST (${parseFloat(taxpercentage) / 2}%)`}
                        value={safeToFixed(
                          ((grandTotal - discountTotal) *
                            (parseFloat(taxpercentage) / 2)) /
                            100
                        )}
                      />
                    </>
                  )}

                  {isTaxApplicable && selectedOptionTax === "other" && (
                    <RowItem
                      label={`${taxLabletChange} (${taxpercentage})`}
                      value={safeToFixed(
                        ((grandTotal - discountTotal) *
                          parseFloat(taxpercentage)) /
                          100
                      )}
                    />
                  )}

                  <RowItem label="Total" value={calculateTotal()} />
                  <RowItem label="Balance Due" value={calculateTotal()} />
                </div> */}
                <div className="row  mt-3">
                  <div className="col-12 justify-content-end d-flex ">
                    <div className="col-xl-2 col-sm-6 col-8">
                      <span className="fs-o8 fw-medium">Subtotal</span>
                    </div>
                    <div className="col-md-2 ">
                      <span className="fs-o8 fw-medium">
                        <i className="fa-solid fa-indian-rupee-sign me-1 "></i>
                        {grandTotal}
                        <input
                          type="hidden"
                          value={grandTotal}
                          name="subtotal"
                        />
                      </span>
                    </div>
                  </div>
                  {isDiscountApplicable && (
                    <div className="col-12 justify-content-end d-flex">
                      <div className="col-xl-2 col-sm-6 col-8">
                        <span className="fs-o8 fw-medium">
                          Discount
                          {selectedOptionDiscount === "percent" &&
                            discountpercentage ? (
                            <> ({parseFloat(discountpercentage)}%)</>
                          ) : selectedOptionDiscount === "flat amount" &&
                            discountAmountPercentage ? (
                            <> (Flat Amount)</>
                          ) : (
                            0
                          )}
                          <input
                            type="hidden"
                            name="discountLabel"
                            value={`Discount ${selectedOptionDiscount === "percent" &&
                              discountpercentage
                              ? `(${parseFloat(discountpercentage)}%)`
                              : selectedOptionDiscount === "flat amount" &&
                                discountAmountPercentage
                                ? "(Flat Amount)"
                                : ""
                              }`}
                          />
                        </span>
                      </div>
                      <div className="col-md-2">
                        <span className="fs-o8 fw-medium">
                          -{" "}
                          <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                          {safeToFixed(discountTotal)}
                          <input
                            type="hidden"
                            value={safeToFixed(discountTotal)}
                            name="discountTotal"
                          />
                        </span>
                      </div>
                    </div>
                  )}

                  {isTaxApplicable && (
                    <>
                      {selectedOptionTax === "CGST_SGST" && (
                        <>
                          <div className="col-12 justify-content-end d-flex">
                            <div className="col-xl-2 col-sm-6 col-8">
                              <span className="fs-o8 fw-medium">
                                CGST (
                                {safeToFixed(parseFloat(taxpercentage) / 2)}
                                %)
                              </span>
                              <input
                                type="hidden"
                                name="cgstLabel"
                                value={`CGST (${safeToFixed(
                                  parseFloat(taxpercentage) / 2
                                )}%)`}
                              />
                            </div>
                            <div className="col-md-2">
                              <span className="fs-o8 fw-medium">
                                <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                                {/* {safeToFixed(
                                  ((grandTotal - discountTotal) *
                                    (parseFloat(taxpercentage) / 2)) /
                                  100
                                )} */}
                                {/* {tax} */}

                                <input
                                  type="hidden"
                                  value={safeToFixed(
                                    ((grandTotal - discountTotal) *
                                      (parseFloat(taxpercentage) / 2)) /
                                    100
                                  )}
                                  name="cgstTax"
                                />
                              </span>
                            </div>
                          </div>

                          <div className="col-12 justify-content-end d-flex">
                            <div className="col-xl-2 col-sm-6 col-8">
                              <span className="fs-o8 fw-medium">
                                SGST (
                                {safeToFixed(parseFloat(taxpercentage) / 2)}
                                %)
                              </span>
                              <input
                                type="hidden"
                                name="sgstLabel"
                                value={`SGST (${safeToFixed(
                                  parseFloat(taxpercentage) / 2
                                )}%)`}
                              />
                            </div>
                            <div className="col-md-2">
                              <span className="fs-o8 fw-medium">
                                <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                                {safeToFixed(
                                  ((grandTotal - discountTotal) *
                                    (parseFloat(taxpercentage) / 2)) /
                                  100
                                )}

                                <input
                                  type="hidden"
                                  value={safeToFixed(
                                    ((grandTotal - discountTotal) *
                                      (parseFloat(taxpercentage) / 2)) /
                                    100
                                  )}
                                  name="sgstTax"
                                />
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {selectedOptionTax === "other" && (
                        <div className="col-12 justify-content-end d-flex">
                          <div className="col-xl-2 col-sm-6 col-8">
                            <span className="fs-o8 fw-medium">
                              {taxLabletChange} ({taxpercentage || ""})
                            </span>
                          </div>
                          <div className="col-md-2">
                            <span className="fs-o8 fw-medium">
                              <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                              {safeToFixed(
                                ((grandTotal - discountTotal) *
                                  parseFloat(taxpercentage)) /
                                100
                              )}

                              <input
                                type="hidden"
                                value={`${taxLabletChange} (${taxpercentage || ""
                                  })`}
                                name="taxLabelWithPercentage"
                              />

                              <input
                                type="hidden"
                                value={safeToFixed(
                                  ((grandTotal - discountTotal) *
                                    parseFloat(taxpercentage)) /
                                  100
                                )}
                                name="calculatedTaxValue"
                              />
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="col-12 justify-content-end d-flex">
                    <div className="col-xl-2 col-sm-6 col-8">
                      <span className="fs-o8 fw-medium">Total</span>
                    </div>
                    <div className="col-md-2">
                      <span className="fs-o8 fw-medium">
                        <i className="fa-solid fa-indian-rupee-sign me-1 "></i>
                        {calculateTotal()}
                        <input
                          type="hidden"
                          name="calculatedTotal"
                          value={calculateTotal()}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="col-12 justify-content-end d-flex">
                    <div className="col-xl-2 col-sm-6 col-8">
                      <span className="fs-o8 fw-bold">Balance Due</span>
                    </div>
                    <div className="col-md-2">
                      <span className="fs-o8 fw-bold">
                        <i className="fa-solid fa-indian-rupee-sign me-1 "></i>
                        {calculateTotal()}
                        <input
                          type="hidden"
                          name="calculatedTotal"
                          value={calculateTotal()}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-12 px-0">
                  <div className={`col-md-3 `}>
                    <label htmlFor="name" className="text-dark fs-o8">
                      Notes
                    </label>
                  </div>
                  <textarea
                    name="additionalDetails"
                    className="py-2 px-2 border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100 mt-2 resize-none"
                    placeholder="Notes - any relevant information not covered, additional terms and conditions"
                    rows="6"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                  />
                </div>
                <div className="w-auto">
                  <img
                    src={formData.signature_logo}
                    alt="signature"
                    className="image_width_signature"
                  />
                  <input
                    type="hidden"
                    value={formData.signature_logo}
                    name="signature_url"
                  />
                </div>
              </form>
            </div>

            <div className="col-md-3 ">
              {/* Tax Section */}
              <p className="fs-o8 border-bottom border-dark mt-2">
                Tax
              </p>

              <div className="row align-items-center mx-0 mt-3">
                <div className="col-md-3 px-0">
                  <label htmlFor="optionSelect" className="text-dark fs-o8">
                    Type
                  </label>
                </div>
                <div className="col-md-9 ps-2 pe-0">
                  <select
                    id="optionSelect"
                    value={selectedOptionTax}
                    onChange={handleSelectChangeTax}
                    className="py-2 px-2 border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                  >
                    <option value="none">None</option>
                    <option value="CGST_SGST">CGST & SGST</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Other Tax Options */}
              {selectedOptionTax === "other" && (
                <>
                  <div className="row align-items-center mx-0 mt-2">
                    <div className="col-md-3 px-0">
                      <label className="text-dark fs-o8">Label</label>
                    </div>
                    <div className="col-md-9 ps-2 pe-0">
                      <input
                        type="text"
                        value={taxLabletChange}
                        name="taxLabel"
                        onChange={handleTaxLableChange}
                        placeholder="Tax"
                        className="py-2 px-2 border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                      />
                    </div>
                  </div>

                  <div className="row align-items-center mx-0 mt-2">
                    <div className="col-md-3 px-0">
                      <label className="text-dark fs-o8">Rate</label>
                    </div>
                    <div className="col-md-9 ps-2 pe-0">
                      <input
                        type="text"
                        value={taxpercentage}
                        name="taxpercentage"
                        onChange={handleTaxpercentage}
                        placeholder="0.000%"
                        onFocus={handleFocus}
                        className="py-2 px-2 border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Discount Section */}
              <p className="fs-o8 border-bottom border-dark mt-4">
                Discount
              </p>

              <div className="row align-items-center mx-0 mt-3">
                <div className="col-md-3 px-0">
                  <label className="text-dark fs-o8">Type</label>
                </div>
                <div className="col-md-9 ps-2 pe-0">
                  <select
                    value={selectedOptionDiscount}
                    onChange={handleSelectChangeDicount}
                    className="py-2 px-2 border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                  >
                    <option value="none">None</option>
                    <option value="percent">Percent</option>
                    <option value="flat amount">Flat Amount</option>
                  </select>
                </div>
              </div>

              {selectedOptionDiscount === "percent" && (
                <div className="row align-items-center mx-0 mt-2">
                  <div className="col-md-3 px-0">
                    <label className="text-dark fs-o8">Percent</label>
                  </div>
                  <div className="col-md-9 ps-2 pe-0">
                    <input
                      type="number"
                      value={discountpercentage}
                      name="discountPercentage"
                      onChange={handleDiscountpercentage}
                      placeholder="0.000%"
                      className="py-2 px-2 border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                    />
                  </div>
                </div>
              )}

              {selectedOptionDiscount === "flat amount" && (
                <div className="row align-items-center mx-0 mt-2">
                  <div className="col-md-3 px-0">
                    <label className="text-dark fs-o8">Amount</label>
                  </div>
                  <div className="col-md-9 ps-2 pe-0">
                    <input
                      type="number"
                      value={discountAmountPercentage}
                      name="discountFlat"
                      onChange={handleDiscountAmountPercentage}
                      placeholder="0.00"
                      className="py-2 px-2 border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

    </div>
  );
}
