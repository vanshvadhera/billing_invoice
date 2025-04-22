import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ExpenseForm() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to close this page?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, close it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      navigate("/expenses");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setShowConfirmation(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setShowConfirmation(false);
  };
  return (
    <div className="container">
      <div className="card my-4 border-0 previous-invoice w-100">
        <div className="card-header d-flex justify-content-between flex-lg-row flex-md-row flex-column align-items-center bg-white gap-3">
          <div>
            <i className="fas fa-table me-1"></i> New Item
          </div>
        </div>
        <form>
          <div className="card-body">
            <div className="p-4 row justify-content-center align-items-center">
              <div className="col-md-2">
                <label className="form-label mb-0">Description</label>
              </div>
              <div className="col-md-9">
                <div className="custom-file-upload text-center">
                  <input
                    type="file"
                    id="file"
                    name="logoImage"
                    onChange={handleFileChange}
                    className="d-none"
                  />
                  <div className="icon" style={{ cursor: "pointer" }}>
                    {imagePreview ? (
                      <div className="position-relative">
                        <img
                          src={imagePreview}
                          alt="Uploaded"
                          width="100%"
                          style={{ objectFit: "contain", height: "100px" }}
                        />
                        <div className="action-icons">
                          {!showConfirmation ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-link p-0 mx-1"
                              >
                                <label htmlFor="file">
                                  <i className="fa fa-pen text-dark"></i>
                                </label>
                              </button>
                              <button
                                type="button"
                                className="btn btn-link p-0 mx-1"
                                onClick={() => setShowConfirmation(true)}
                              >
                                <i className="fa fa-close text-dark fs-5"></i>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn text-dark border-0"
                                onClick={() => setShowConfirmation(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="btn text-danger border-0"
                                onClick={handleRemoveImage}
                              >
                                Confirm
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="file"
                        className="d-flex flex-column align-items-center justify-content-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className=""
                        >
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fill=""
                              d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            ></path>
                          </g>
                        </svg>
                        <span>Click to upload Logo</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Merchant Name */}
              <div className="col-md-2 mt-3">
                <label className="form-label mb-0">Merchant</label>
              </div>
              <div className="col-md-9 mt-0 mt-lg-3 mt-md-3">
                <input
                  type="text"
                  className="form-control border border-1 border-black"
                  name="merchant"
                  placeholder="Merchant Name"
                />
              </div>

              {/* Category Name */}
              <div className="col-md-2 mt-3">
                <label className="form-label mb-0">Category</label>
              </div>
              <div className="col-md-9 mt-0 mt-lg-3 mt-md-3">
                <input
                  type="text"
                  className="form-control border border-1 border-black"
                  name="category"
                  placeholder="Category Name"
                />
              </div>

              {/* Date */}
              <div className="col-md-2 mt-3">
                <label className="form-label mb-0">Date</label>
              </div>
              <div className="col-md-9 mt-0 mt-lg-3 mt-md-3">
                <input
                  type="date"
                  className="form-control border border-1 border-black"
                  name="date"
                />
              </div>

              {/* Total */}
              <div className="col-md-2 mt-3">
                <label className="form-label mb-0">Total</label>
              </div>
              <div className="col-md-9 mt-0 mt-lg-3 mt-md-3">
                <input
                  type="text"
                  className="form-control border border-1 border-black"
                  name="total"
                  placeholder="0.00"
                />
              </div>

              {/* Tax */}
              <div className="col-md-2 mt-3">
                <label className="form-label mb-0">Tax</label>
              </div>
              <div className="col-md-9 mt-0 mt-lg-3 mt-md-3">
                <input
                  type="text"
                  className="form-control border border-1 border-black"
                  name="tax"
                  placeholder="0.00"
                />
              </div>

              {/* Description */}
              <div className="col-md-2 mt-3">
                <label className="form-label mb-0">Description</label>
              </div>
              <div className="col-md-9 mt-0 mt-lg-3 mt-md-3">
                <textarea
                  name="description"
                  placeholder="Description of the expense"
                  rows="4"
                  className="form-control border border-1 border-black"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="card-footer bg-none">
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={handleClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-success me-2">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
