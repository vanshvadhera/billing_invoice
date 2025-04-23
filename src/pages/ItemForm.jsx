import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import ItemFormInputs from "../component/ItemFormInputs";
import UseItemForm from "../hooks/UseItemForm";

export default function ItemForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingItem = location.state?.item || null;

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

  const { formData, handleChange, handleSubmit, loading } = UseItemForm({
    existingItem,
  });

  return (
    <div className="container">
      <div className="card my-4 border-0 previous-invoice w-100">
        <div className="card-header d-flex justify-content-between bg-white gap-3">
          <div>
            <i className="fas fa-table me-1"></i> {existingItem ? "Edit Item" : "New Item"}
          </div>
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
    </div>
  );
}
