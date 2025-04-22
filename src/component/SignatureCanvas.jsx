import { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

export default function SignatureCanvas({onUploadSuccess ,preview}) {
  const canvasRef = useRef();
  const [signature, setSignature] = useState(null);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const base64 = await canvasRef.current.exportImage("png");
      const res = await fetch(base64);
      const blob = await res.blob();

      const formData = new FormData();
      formData.append("file", blob, "signature.png");

      const response = await fetch(
        "/apiUrl/user/upload-file",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json(); 

        if (onUploadSuccess && result?.data?.file_url) {
          onUploadSuccess(result.data.file_url); 
        }
        setSignature(URL.createObjectURL(blob));
        canvasRef.current.clearCanvas();
        setIsCanvasEmpty(true);
        document.getElementById("closeSignatureModalBtn").click();
      }
    } catch (err) {
      console.error("Signature upload failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Monitor canvas changes
  const handleStroke = () => {
    setIsCanvasEmpty(false);
  };

  // Clear canvas when modal is closed
  useEffect(() => {
    const modalEl = document.getElementById("signatureModal");

    const onClose = () => {
      if (canvasRef.current) {
        canvasRef.current.clearCanvas();
        setIsCanvasEmpty(true);
      }
    };

    modalEl?.addEventListener("hidden.bs.modal", onClose);

    return () => {
      modalEl?.removeEventListener("hidden.bs.modal", onClose);
    };
  }, []);

  return (
    <div className="px-0">
      {(preview || signature) && (
        <img
          src={preview || signature}
          alt="Signature Preview"
          className="mt-3 preview-size"
        />
      )}
      <button
        type="button"
        className="btn btn-dark fs-o8 d-flex align-items-center my-2"
        data-bs-toggle="modal"
        data-bs-target="#signatureModal"
      >
        {(preview || signature) ? "Edit Signature" : "Signature"}
        <i className={`fa ms-2 ${(preview || signature) ? "fa-edit" : "fa-plus"}`}></i>
      </button>

      <div className="modal fade" id="signatureModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Draw Signature</h5>
              <button
                id="closeSignatureModalBtn"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <ReactSketchCanvas
                ref={canvasRef}
                width="100%"
                height="200"
                strokeWidth={4}
                strokeColor="black"
                onStroke={handleStroke}
                style={{ border: "1px solid #ccc", borderRadius: "5px" }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                type="button"
                disabled={isCanvasEmpty || isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
