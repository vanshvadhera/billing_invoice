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
      <div className="card-body">
        <div className="row justify-content-center">
          {/* Name Input */}
          <div className="col-md-9">
            <label className="form-label mb-0">Client Name</label>
            <input
              type="text"
              className="form-control border border-1 border-black"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* GST No Input */}
          <div className="col-md-9 mt-3">
            <label className="form-label mb-0">GST No</label>
            <input
              type="text"
              className="form-control border border-1 border-black"
              name="gst_no"
              value={formData.gst_no}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="col-md-9 mt-3">
            <label className="form-label mb-0">Email</label>
            <input
              type="email"
              className="form-control border border-1 border-black"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile Number Input */}
          <div className="col-md-9 mt-3">
            <label className="form-label mb-0">Mobile Number</label>
            <input
              type="text"
              className="form-control border border-1 border-black"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />
          </div>

          {/* Bill Amount Input */}
          <div className="col-md-9 mt-3">
            <label className="form-label mb-0">Address</label>
            <input
              type="text"
              className="form-control border border-1 border-black"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Footer with buttons */}
      <div
        className={`card-footer d-flex justify-content-between`}
      >
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClose}
        >
          Close
        </button>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Saving..." : isEditMode ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
