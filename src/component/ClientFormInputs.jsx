import React from "react";

export default function ClientFormInputs({
  formData,
  handleChange,
  handleSubmit,
  handleClose,
  loading,
  isEditMode = false,
  modal = false,
}) {
  return (
    <form onSubmit={handleSubmit}>

      <div className="row justify-content-center">
        {/* Name Input */}
        <div className="">
          <label className="form-label mb-0">Client Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* GST No Input */}
        <div className="mt-3">
          <label className="form-label mb-0">GST No</label>
          <input
            type="text"
            className="form-control "
            name="gst_no"
            value={formData.gst_no}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email Input */}
        <div className="mt-3">
          <label className="form-label mb-0">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mobile Number Input */}
        <div className="mt-3">
          <label className="form-label mb-0">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
        </div>

        {/* Bill Amount Input */}
        <div className="mt-3">
          <label className="form-label mb-0">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Footer with buttons */}
      <div
        className={`mt-4 flex justify-end gap-2`}
      >
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : isEditMode ? "Update Client" : "Create Client"}
        </button>
      </div>
    </form>
  );
}
