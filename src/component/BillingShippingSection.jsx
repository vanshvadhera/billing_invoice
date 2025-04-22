import { useEffect, useState } from "react";
import Select from "react-select";
import NewPageInput from "./NewPageInput";

export default function BillingShippingSection({
  clientOptions,
  handleClientSelect,
  selectedClient,
  isShipTo,
  setIsShipTo,
  copyBilling,
  setCopyBilling,
  shipToFields,
  setShipToFields,
}) {
  const handleSwitchChange = () => {
    setIsShipTo((prev) => !prev);
  };

  const handleShipToChange = (e) => {
    const { name, value } = e.target;
    setShipToFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (copyBilling === "yes") {
      setShipToFields({
        shipToName: "",
        shipToEmail: "",
        shipToAddress: "",
        shipToMobile: "",
        shipToGst: "",
      });
    }
  }, [copyBilling, setShipToFields]);
  return (
    <div className="col-md-6 mt-3">
      {/* Toggle: Bill To vs Ship To */}
      <div className="d-flex align-items-center gap-3">
        <h5 className="text-secondary mb-0">Bill To</h5>
        <div className="form-check form-switch text-center">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="switchCheckDefault"
            checked={isShipTo}
            onChange={handleSwitchChange}
          />
        </div>
        <h5 className="text-secondary mb-0">Ship To</h5>
      </div>

      <div className="d-flex flex-column my-3 gap-3">
        {/* === BILL TO SECTION === */}
        {!isShipTo && (
          <>
            <div className="row align-items-center">
              <div className="col-md-3">
                <label className="text-dark fs-08">Client Name</label>
              </div>
              <div className="col-md-9">
                <Select
                  options={clientOptions}
                  onChange={handleClientSelect}
                  placeholder="Select Client"
                  name="clientName"
                />
              </div>
            </div>

            {selectedClient && (
              <>
                <NewPageInput
                  label="Name"
                  name="billName"
                  value={selectedClient.name}
                  placeholder="Client Name"
                  type="text"
                  readOnly
                />
                <NewPageInput
                  label="Email"
                  name="billEmail"
                  value={selectedClient.email}
                  placeholder="name@client.com"
                  type="email"
                  readOnly
                />
                <NewPageInput
                  label="Address"
                  name="billAddress"
                  value={selectedClient.address || ""}
                  placeholder="Street"
                  type="text"
                  readOnly
                />
                <NewPageInput
                  label="Mobile"
                  name="billMobile"
                  value={selectedClient.mobile_number || ""}
                  placeholder="123-456-789"
                  type="number"
                  readOnly
                />
                <NewPageInput
                  label="GST"
                  name="gst_no"
                  value={selectedClient.gst_no || ""}
                  placeholder="GST Number"
                  type="text"
                  readOnly
                />
              </>
            )}
          </>
        )}

        {/* === SHIP TO SECTION === */}
        {isShipTo && (
          <>
            <div className="row align-items-center">
              <div className="col-md-3">
                <label className="text-dark fs-08">Same as Bill to</label>
              </div>
              <div className="col-md-9">
                <select
                  className="form-select"
                  value={copyBilling}
                  onChange={(e) => setCopyBilling(e.target.value)}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            {copyBilling === "no" && (
              <>
                <NewPageInput
                  label="Name"
                  name="shipToName"
                  value={shipToFields.shipToName}
                  placeholder="Client Name"
                  type="text"
                  change={handleShipToChange}
                />
                <NewPageInput
                  label="Email"
                  name="shipToEmail"
                  value={shipToFields.shipToEmail}
                  placeholder="name@client.com"
                  type="email"
                  change={handleShipToChange}
                />
                <NewPageInput
                  label="Address"
                  name="shipToAddress"
                  value={shipToFields.shipToAddress}
                  placeholder="Street"
                  type="text"
                  change={handleShipToChange}
                />
                <NewPageInput
                  label="Mobile"
                  name="shipToMobile"
                  value={shipToFields.shipToMobile}
                  placeholder="123-456-789"
                  type="number"
                  change={handleShipToChange}
                />
                <NewPageInput
                  label="GST"
                  name="shipToGst"
                  value={shipToFields.shipToGst}
                  placeholder="GST Number"
                  type="text"
                  change={handleShipToChange}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
