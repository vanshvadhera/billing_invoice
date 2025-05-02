import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import ItemFormInputs from "../../component/ItemFormInputs";
import { addOrUpdateItem } from "../../component/ApiFunction";

export default function CreateItem() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingItem = location.state?.item || null;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    item_name: "",
    item_code: "",
    unit: "",
    tax_rate: "",
    price: "",
  });

  // Populate form if editing
  useEffect(() => {
    if (existingItem) {
      setFormData({
        item_name: existingItem.item_name || "",
        item_code: existingItem.item_code || "",
        unit: existingItem.unit || "",
        tax_rate: existingItem.tax_rate || "",
        price: existingItem.price || "",
        item_id: existingItem.item_id || "",
      });
    }
  }, [existingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const itemData = {
      user_id: Cookies.get("user_id"),
      status: "active",
      ...formData,
    };

    addOrUpdateItem(
      itemData,
      () => {
        setLoading(false);
        Swal.fire(
          "Success",
          `Item ${existingItem ? "updated" : "added"} successfully!`,
          "success"
        );
        setFormData({
          item_name: "",
          item_code: "",
          unit: "",
          tax_rate: "",
          price: "",
        });
        navigate("/items");
      },
      () => {
        setLoading(false);
        Swal.fire("Error", "Failed to save item", "error");
      }
    );
  };

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
    <div className="w-50vw">
      <div>
        <i className="fas fa-table me-1"></i>
        {existingItem ? "Edit Item" : "New Item"}
      </div>

      <ItemFormInputs
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        loading={loading}
        isEditMode={!!existingItem}
      />
    </div>
  );
}
