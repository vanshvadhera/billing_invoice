import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import ItemFormInputs from "../../component/ItemFormInputs";
import { addOrUpdateItem } from "../../component/ApiFunction";

export default function CreateItem({ onClose, fetchUserItems, existingItem, location, handleAddNewItem }) {

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
        unit_measure: existingItem.unit_measure || "",
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
        onClose();
        Swal.fire(
          "Success",
          `Item ${existingItem ? "updated" : "added"} successfully!`,
          "success"
        );
        if (location === "items") {
          fetchUserItems();
        }
        if (location === "invoice") {
          handleAddNewItem(itemData);
        }
        setFormData({
          item_name: "",
          item_code: "",
          unit: "",
          tax_rate: "",
          price: "",
        });
      },
      () => {
        setLoading(false);
        Swal.fire("Error", "Failed to save item", "error");
      }
    );
  };

  return (
    <div className="w-[30vw]">
      <div className="mb-2" >
        <i className="fas fa-table me-1"></i>
        {existingItem ? "Edit Item" : "New Item"}
      </div>

      <ItemFormInputs
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClose={onClose}
        loading={loading}
        isEditMode={!!existingItem}
      />
    </div>
  );
}
