import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { addOrUpdateItem } from "../component/ApiFunction";

export default function UseItemForm({ existingItem, onSuccess, navigate, closeModal }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    item_name: "",
    item_code: "",
    unit: "",
    tax_rate: "",
    price: "",
  });

  const resetForm = () => {
    setFormData({
      item_name: "",
      item_code: "",
      unit: "",
      tax_rate: "",
      price: "",
    });
  };

  useEffect(() => {
    if (existingItem) {
      setFormData({
        ...formData,
        ...existingItem,
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
      Swal.fire("Success", `Item ${existingItem ? "updated" : "added"} successfully!`, "success");
      onSuccess?.(); // Assuming onSuccess is passed correctly
      resetForm();
      closeModal?.();
      navigate?.("/items");
    },
    () => {
      setLoading(false);
      Swal.fire("Error", "Failed to save item", "error");
    }
  );
};

  

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
  };
}
