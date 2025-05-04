
import { useEffect } from "react";
import UseClientForm from "../hooks/UseClientForm";
import ClientFormInputs from "./ClientFormInputs";

export default function ClientFormModal({ showClientModal, closeModal, onSuccess }) {
  const { formData, handleChange, handleSubmit, loading } = UseClientForm({
    onSuccess,
    closeModal,
  });
  useEffect(() => {
    if (showClientModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup in case component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showClientModal]);

  return (
    showClientModal && (
      <>
        <div className="custom-backdrop" onClick={closeModal}></div>
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Add New Client</h1>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="card">
                <ClientFormInputs
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
