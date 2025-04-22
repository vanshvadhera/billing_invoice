import { useState } from "react";

const AdditionalPhoto = ({ imageDetails, setImageDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [confirmationStates, setConfirmationStates] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          id: Date.now(), 
          image: reader.result,
          description: "",
          additionalDetails: "",
        };
        setCurrentImage(newImage); 
        setShowModal(true); 
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null; 
  };

  const handleAddPhoto = () => {
    if (currentImage) {
      const existingIndex = imageDetails.findIndex(
        (image) => image.id === currentImage.id
      );
      if (existingIndex !== -1) {
        const updatedImages = [...imageDetails];
        updatedImages[existingIndex] = currentImage;
        setImageDetails(updatedImages);
      } else {
        setImageDetails([...imageDetails, currentImage]);
        setConfirmationStates((prev) => ({
          ...prev,
          [currentImage.id]: false, 
        }));
      }
      setCurrentImage(null);
    }
    setShowModal(false); 
  };

  const handleCancel = () => {
    setCurrentImage(null);
    setShowModal(false); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentImage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditImage = (index) => {
    setCurrentImage({ ...imageDetails[index] }); 
    setShowModal(true); 
  };

  const handleRemoveImage = (id) => {
    const updatedImages = imageDetails.filter((image) => image.id !== id);
    setImageDetails(updatedImages); 
    setConfirmationStates((prev) => {
      const newStates = { ...prev };
      delete newStates[id]; 
      return newStates;
    });
  };

  return (
    <div className="container mt-3">
     

      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
        {imageDetails.map((imageDetail, index) => (
          <div
            key={imageDetail.id}
            className=" mt-3 ms-2  border d-flex justify-content-center flex-column py-3"
          >
            <div className="d-flex justify-content-center ">
              <img
                src={imageDetail.image}
                alt="User Uploaded"
                width={100}
                style={{ objectFit: "cover", height: "100px" }}
                className="object-fit-contain "
              />
            </div>
            <div className="bg-white">
              {imageDetail.description && (
                <p className="fs-o8">{imageDetail.description}</p>
              )}
              {imageDetail.additionalDetails && (
                <p className="fs-o7">{imageDetail.additionalDetails}</p>
              )}
              <div
                style={{ display: "flex", gap: "10px" }}
                className="justify-content-end"
              >
                {!confirmationStates[imageDetail.id] ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => handleEditImage(index)}
                    >
                      <i className="fa fa-pen text-dark"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() =>
                        setConfirmationStates((prev) => ({
                          ...prev,
                          [imageDetail.id]: true,
                        }))
                      }
                    >
                      <i className="fa fa-close text-dark fs-5"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn text-dark border-0 fs-o8 fw-medium"
                      onClick={() =>
                        setConfirmationStates((prev) => ({
                          ...prev,
                          [imageDetail.id]: false,
                        }))
                      }
                    >
                      Cancel
                    </button>
                    <button
                      className="btn text-danger border-0 fs-o8 px-1 fw-medium"
                      onClick={() => handleRemoveImage(imageDetail.id)}
                    >
                      Confirm
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        <div
          className="border mt-3 d-flex justify-content-center align-items-center py-5"
          style={{ cursor: "pointer" }}
          onClick={() => document.getElementById("hiddenFileInput").click()}
        >
          <p>
            <i className="fa fa-image me-2"></i>Add Photo
          </p>
          <input
            type="file"
            accept="image/*"
            id="hiddenFileInput"
            style={{ display: "none" }} // Hide the input
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Modal for image details */}
      {showModal && currentImage && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header ">
                <h5 className="modal-title">Edit Image Details</h5>
                <button
                  type="button"
                  className="close bg-transparent border-0 fs-4 ms-auto"
                  onClick={handleCancel}
                >
                  <i className="fa fa-close"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-center">
                  <img
                    src={currentImage.image}
                    alt="Uploaded"
                    className="w-50 "
                  />
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    className="py-1 px-2 w-100 border border-2 border-secondary-subtle input-field rounded"
                    placeholder="Description"
                    name="description"
                    value={currentImage.description}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    className="py-1 px-2 w-100 mt-2 border border-2 border-secondary-subtle input-field rounded"
                    placeholder="Additional Details"
                    name="additionalDetails"
                    value={currentImage.additionalDetails}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-dark fs-o8 d-flex align-items-center"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-success fs-o8 d-flex align-items-center"
                  onClick={handleAddPhoto}
                >
                  Add Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalPhoto;
