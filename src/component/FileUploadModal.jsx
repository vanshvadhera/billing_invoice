// components/FileUploadModal.jsx
import React from "react";

export default function FileUploadModal({
  modalId,
  title,
  fileName,
  setFile,
  handleChange,
  handleUpload,
  isLoading,
  closeButtonId,
  buttonLabel,
  preview,
  accept = "*",
  handleDelete,
  fileInputRef,
}) {
  return (
    <>
      {preview && (
        <div className="mt-3 px-0 ">
          <img src={preview} alt="Preview" className="preview-size rounded-lg " />
        </div>
      )}
      <button
        type="button"
        className="btn btn-dark fs-o8 d-flex align-items-center my-2 add-image-btn"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        {preview ? `Edit ${buttonLabel}` : `Add ${buttonLabel}`}
        <i className={`fa ms-2 ${preview ? "fa-edit" : "fa-plus"}`}></i>
      </button>

      <div className="modal fade" id={modalId} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content logo-modal">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                id={closeButtonId}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">


                <label htmlFor="file" className="footer">
                  <svg
                    fill="#000000"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
                      <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
                    </g>
                  </svg>
                  <p className="mb-0">{fileName || "No file selected"}</p>
                </label>

                <input
                  id="file"
                  type="file"
                  accept={accept}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!fileName || isLoading}
                onClick={handleUpload}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
