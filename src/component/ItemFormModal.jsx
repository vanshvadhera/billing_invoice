import { useEffect } from "react";
import UseItemForm from "../hooks/UseItemForm";
import ItemFormInputs from "./ItemFormInputs";

export default function ItemFormModal({ showItemModal, closeModal, onSuccess }) {
  const { formData, handleChange, handleSubmit, loading } = UseItemForm({
    onSuccess,
    closeModal,
  });

  useEffect(() => {
    document.body.style.overflow = showItemModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showItemModal]);

  return (
    showItemModal && (
      <>
        <div className="custom-backdrop" onClick={closeModal}></div>
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Add New Item</h1>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="card">
                <ItemFormInputs
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleClose={closeModal}
                  loading={loading}
                  isEditMode={false}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
