import { useNavigate, useLocation } from "react-router-dom";
import ClientFormInputs from "../../component/ClientFormInputs";
import Swal from "sweetalert2";
import UseClientForm from "../../hooks/UseClientForm";

export default function ClientForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingClient = location.state?.client || null;

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
        navigate("/clients");
      }
    });
  };

  const { formData, handleChange, handleSubmit, loading } = UseClientForm({
    existingClient,
    navigate,
  });

  return (
    <div className="container">
      <div className="card my-4 border-0 previous-invoice w-100">
        <div className="card-header d-flex justify-content-between bg-white gap-3">
          <div>
            <i className="fas fa-table me-1"></i>{" "}
            {existingClient ? "Edit Client" : "New Client"}
          </div>
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
    </div>
  );
}
