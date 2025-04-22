// hooks/useClientForm.js
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { addOrUpdateClient } from "../component/ApiFunction";

export default function UseClientForm({ existingClient, onSuccess, navigate, closeModal }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gst_no: "",
    email: "",
    mobile_number: "",
    address: "",
  });
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      address: "",
      mobile_number: "",
      gst_no: "",
    });
  };
  useEffect(() => {
    if (existingClient) {
      setFormData({
        ...formData,
        ...existingClient,
        client_id: existingClient.client_id || "",
      });
    }
  }, [existingClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const clientData = {
      user_id: Cookies.get("user_id"),
      status: "active",
      ...formData,
    };

    addOrUpdateClient(
      clientData,
      () => {
        setLoading(false);
        Swal.fire("Success", `Client ${existingClient ? "updated" : "added"} successfully!`, "success");
        onSuccess?.(); 
        resetForm();  
        closeModal?.();
        navigate?.("/clients");
      },
      () => {
        setLoading(false);
        Swal.fire("Error", "Failed to save client", "error");
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
