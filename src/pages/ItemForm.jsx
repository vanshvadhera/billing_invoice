import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { addOrUpdateItem } from "../component/ApiFunction";

export default function ItemForm() {
  const navigate = useNavigate();
  const location = useLocation(); // Use location to get state
  const existingItem = location.state?.item || null; // Get item from location state
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    item_name: "",
    item_price: "",
    item_quantity: "",
    item_category: "",
    unit_measurement: "",
    item_code: "",
    taxable: false,
  });

  useEffect(() => {
    if (existingItem) {
      setFormData({
        item_name: existingItem.item_name || "",
        item_price: existingItem.item_price || "",
        item_quantity: existingItem.item_quantity || "",
        item_category: existingItem.item_category || "",
        unit_measurement: existingItem.unit_measurement || "",
        item_code: existingItem.item_code || "",
        taxable: existingItem.taxable === 1,
      });
    }
  }, [existingItem]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const itemData = {
      user_id: Cookies.get("user_id") || null,
      item_id: existingItem?.id || null, // Handle existingItem id or create new item if no id
      ...formData,
      item_price: parseFloat(formData.item_price) || 0,
      item_quantity: parseInt(formData.item_quantity) || 0,
      taxable: formData.taxable ? 1 : 0,
      status: "active",
    };
    addOrUpdateItem(itemData, navigate, setLoading);
  };

  // ✅ SweetAlert on Close Button
  const handleClose = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Any unsaved changes will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Close",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/items");
      }
    });
  };

  return (
    <div className="container">
      <div className="card my-4 border-0 previous-invoice w-100">
        <div className="card-header d-flex justify-content-between bg-white gap-3">
          <div>
            <i className="fas fa-table me-1"></i>{" "}
            {existingItem ? "Edit Item" : "New Item"}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row justify-content-center">
              {[ 
                { label: "Item Name", name: "item_name", type: "text" },
                { label: "Price", name: "item_price", type: "number" },
                { label: "Quantity", name: "item_quantity", type: "number" },
                { label: "Item Category", name: "item_category", type: "text" },
                { label: "Unit Measurement", name: "unit_measurement", type: "text" },
                { label: "Item Code", name: "item_code", type: "textarea" },
              ].map(({ label, name, type }) => (
                <div className="col-md-9 mt-3" key={name}>
                  <label className="form-label mb-0">{label}</label>
                  {type === "textarea" ? (
                    <textarea
                      className="form-control border border-1 border-black"
                      name={name}
                      rows="3"
                      value={formData[name]}
                      onChange={handleChange}
                      required
                    ></textarea>
                  ) : (
                    <input
                      type={type}
                      className="form-control border border-1 border-black"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                    />
                  )}
                </div>
              ))}
              <div className="col-md-9 mt-3">
                <input
                  className="form-check-input border-dark"
                  type="checkbox"
                  id="flexCheckChecked"
                  name="taxable"
                  checked={formData.taxable}
                  onChange={handleChange}
                />
                <label className="form-label mb-0">Taxable</label>
              </div>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
