import { useState, useEffect, useMemo } from "react";
import { getUserItems } from "./ApiFunction";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const ItemRow = ({
  onDataChange,
  onGrandTotalChange,
  isTaxApplicable,
  taxLabletChange,
  taxpercentage,
  setTotalTax,
  editData,
}) => {
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

  const [showItemModal, setShowItemModal] = useState(false);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const grandTotal = useMemo(() => {
    return itemRow.reduce((acc, row) => acc + row.total, 0).toFixed(2);
  }, [itemRow]);

  useEffect(() => {
    getUserItems(setItems, setLoading);
  }, []);

  useEffect(() => {
    if (editData?.items?.length && items.length) {
      const restoredRows = editData.items.map((item, index) => {
        const matchingItem = items.find((it) => it.item_name === item.select);

        return {
          id: index + 1,
          selectedItemId: matchingItem?.item_id || "",
          selectedItemName: item.select,
          selectedOption: matchingItem
            ? {
                value: matchingItem.item_id,
                label: matchingItem.item_name,
                item: matchingItem,
              }
            : null,
          description: item.select || "",
          details: item.details || "",
          hsnCode: item.hsncode || "",
          rate: parseFloat(item.rate) || 0,
          quantity: parseFloat(item.quantity) || 1,
          total: parseFloat(item.total) || 0,
          isChecked: item.isChecked || false,
        };
      });

      setItemRow(restoredRows);
    }
  }, [editData, items]);

  useEffect(() => {
    if (onDataChange) onDataChange(itemRow);
    if (onGrandTotalChange) onGrandTotalChange(grandTotal);
  }, [itemRow, onDataChange, onGrandTotalChange, grandTotal]);

  useEffect(() => {
    const validTaxPercentage = parseFloat(
      String(taxpercentage).replace("%", "").trim()
    );
    if (isNaN(validTaxPercentage)) return;

    const taxAmounts = itemRow
      .filter((row) => row.isChecked)
      .map((row) => parseFloat(row.total) * (validTaxPercentage / 100) || 0);

    const totalTaxAmount = taxAmounts
      .reduce((acc, tax) => acc + tax, 0)
      .toFixed(2);

    setTotalTax(totalTaxAmount);
  }, [itemRow, taxpercentage, setTotalTax]);

  const addRow = () => {
    const newRow = {
      id: itemRow.length + 1,
      selectedItemId: "",
      selectedItemName: "",
      description: "",
      details: "",
      hsnCode: "",
      rate: "",
      quantity: "1",
      total: 0,
      isChecked: false,
    };
    setItemRow((prev) => [...prev, newRow]);
  };

  const deleteRow = (id) => {
    setItemRow((prev) => prev.filter((row) => row.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setItemRow((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value,
              total:
                field === "rate" || field === "quantity"
                  ? (field === "rate" ? value : row.rate) *
                    (field === "quantity" ? value : row.quantity)
                  : row.total,
            }
          : row
      )
    );
  };

  const handleCheckboxChange = (id) => {
    setItemRow((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, isChecked: !row.isChecked } : row
      )
    );
  };

  const handleItemSelect = (id, selectedOption) => {
    if (selectedOption.value === "new-item") {
      setShowItemModal(true);
      return;
    }

    const { item } = selectedOption;

    setItemRow((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              selectedOption,
              selectedItemId: selectedOption.value,
              selectedItemName: selectedOption.label,
              description: item?.item_name || "",
              details: item?.item_category || "",
              hsnCode: item?.item_code || "",
              rate: parseFloat(item?.item_price) || 0,
              quantity: 1,
              total: parseFloat(item?.item_price) || 0,
            }
          : row
      )
    );
  };

  const itemOptions = [
    ...items.map((item) => ({
      value: item.item_id,
      label: item.item_name,
      item,
    })),
    {
      value: "new-item",
      label: (
        <span>
          <i className="fa fa-plus me-2" />
          Add New Item
        </span>
      ),
      item: null,
    },
  ];

  return (
    <>
      <div className="row d-none d-md-block d-lg-block">
        <table className="table mb-0">
          <thead className="border-top border-bottom border-dark">
            <tr>
              <th></th>
              <th style={{ width: "40%" }}>DESCRIPTION</th>
              <th className="text-end">HSN</th>
              <th className="text-end">Rate</th>
              <th className="text-end">QTY</th>
              <th className="text-end">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {itemRow.map((row, index) => (
              <tr key={row.id}>
                <td>
                  <i
                    className="btn fa fa-trash bg-danger text-white p-2 rounded"
                    onClick={() => deleteRow(row.id)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </td>
                <td>
                  <Select
                    options={itemOptions}
                    onChange={(option) => handleItemSelect(row.id, option)}
                    value={row.selectedOption || null}
                    placeholder="Select Item"
                  />

                  <input
                    type="hidden"
                    name={`Itemselect[${index}]`}
                    value={row.selectedItemName || ""}
                  />
                  <textarea
                    name={`Itemdetails[${index}]`}
                    className="form-control mt-2"
                    rows="2"
                    placeholder="Additional Details"
                    value={row.details}
                    onChange={(e) =>
                      handleInputChange(row.id, "details", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name={`ItemhsnCode[${index}]`}
                    placeholder="HSN Code"
                    value={row.hsnCode || ""}
                    onChange={(e) =>
                      handleInputChange(row.id, "hsnCode", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    name={`Itemrate[${index}]`}
                    placeholder="Price"
                    value={row.rate}
                    onChange={(e) =>
                      handleInputChange(
                        row.id,
                        "rate",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    name={`Itemquantity[${index}]`}
                    placeholder="Qty"
                    value={row.quantity}
                    onChange={(e) =>
                      handleInputChange(
                        row.id,
                        "quantity",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td className="text-end">
                  <p className="mt-2">
                    ₹{!isNaN(row.total) ? row.total.toFixed(2) : "0.00"}
                    <input
                      type="hidden"
                      name={`Itemtotal[${index}]`}
                      value={!isNaN(row.total) ? row.total.toFixed(2) : "0.00"}
                    />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="card-footer py-2 px-2 border-bottom border-1">
          <i
            className="fa-solid fa-plus bg-dark text-white p-2 rounded"
            onClick={addRow}
            style={{ cursor: "pointer" }}
          ></i>
        </div>
      </div>

      {/* Mobile View */}
      {itemRow.map((row, index) => (
        <div
          key={index}
          className="d-block d-md-none d-lg-none border p-2 mb-2 rounded"
        >
          <div className="mb-2">
            <Select
              options={itemOptions}
              onChange={(option) => handleItemSelect(row.id, option)}
              value={row.selectedOption || null}
              placeholder="Select Item"
            />
            <input
              type="hidden"
              name={`Itemselect[${index}]`}
              value={row.selectedItemName || ""}
            />
          </div>

          <div className="mb-2">
            <textarea
              name={`Itemdetails[${index}]`}
              className="form-control"
              placeholder="Additional Details"
              value={row.details}
              onChange={(e) =>
                handleInputChange(row.id, "details", e.target.value)
              }
              rows="3"
            />
          </div>

          <div className="d-flex flex-wrap justify-content-between">
            <input
              type="text"
              name={`ItemhsnCode[${index}]`}
              className="form-control mb-2 me-2"
              style={{ width: "32%" }}
              placeholder="HSN Code"
              value={row.hsnCode}
              onChange={(e) =>
                handleInputChange(row.id, "hsnCode", e.target.value)
              }
            />
            <input
              type="number"
              name={`Itemrate[${index}]`}
              className="form-control mb-2 me-2"
              style={{ width: "32%" }}
              placeholder="Rate"
              value={row.rate}
              onChange={(e) =>
                handleInputChange(
                  row.id,
                  "rate",
                  parseFloat(e.target.value) || 0
                )
              }
            />
            <input
              type="number"
              name={`Itemquantity[${index}]`}
              className="form-control mb-2"
              style={{ width: "32%" }}
              placeholder="Qty"
              value={row.quantity}
              onChange={(e) =>
                handleInputChange(
                  row.id,
                  "quantity",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <p className="fw-bold text-dark">
              Total: ₹{row.total.toFixed(2)}
              <input
                type="hidden"
                name={`Itemtotal[${index}]`}
                value={row.total.toFixed(2)}
              />
            </p>
            <div>
              {isTaxApplicable && (
                <label className="me-2">
                  <input
                    type="checkbox"
                    className="form-check-input me-1"
                    checked={row.isChecked}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                  Tax
                </label>
              )}
              <i
                className="fa fa-trash text-danger ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => deleteRow(row.id)}
              ></i>
            </div>
          </div>

          {index === itemRow.length - 1 && (
            <div className="text-end mt-2">
              <i
                className="fa-solid fa-plus bg-dark text-white p-2 rounded"
                onClick={addRow}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ItemRow;
