import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import ClientFormInputs from "../../component/ClientFormInputs";
import { addOrUpdateClient } from "../../component/ApiFunction";

export default function CreateClient({ onClose, fetchUserClients, existingClient, location, handleNewClient }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        gst_no: "",
        email: "",
        mobile_number: "",
        address: "",
    });

    useEffect(() => {
        if (existingClient) {
            setFormData({
                name: existingClient.name || "",
                gst_no: existingClient.gst_no || "",
                email: existingClient.email || "",
                mobile_number: existingClient.mobile_number || "",
                address: existingClient.address || "",
            });
        }
    }, [existingClient]);

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            address: "",
            mobile_number: "",
            gst_no: "",
        });
    };

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
            (clientData) => {
                onClose();
                setLoading(false);
                Swal.fire("Success", `Client ${existingClient ? "updated" : "added"} successfully!`, "success");
                resetForm();
                if (location === "clients") {
                    fetchUserClients();
                }
                if (location === "invoice") {
                    handleNewClient(clientData);
                }
                setFormData({
                    name: "",
                    email: "",
                    address: "",
                    mobile_number: "",
                    gst_no: "",
                });
            },
            () => {
                setLoading(false);
                Swal.fire("Error", "Failed to save client", "error");
            }
        );
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="w-[40vw]">
            <div className="mb-2" >
                <i className="fas fa-table me-1"></i>{" "}
                {existingClient ? "Edit Client" : "New Client"}
            </div>

            <ClientFormInputs
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleClose={handleClose}
                loading={loading}
                isEditMode={!!existingClient}
            />
        </div>
    );
}
