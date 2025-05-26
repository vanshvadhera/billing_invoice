import React, { useState, useRef } from "react";
import FileUploadModal from "./FileUploadModal";
import { uploadFile } from "./ApiFunction";

export default function LogoInput({ onUploadSuccess, preview, placeHolder }) {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [statePreview, setStatePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const selected = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png"];
    if (selected && validTypes.includes(selected.type)) {
      setFile(selected);
      setFileName(selected.name);
    } else {
      alert("Only JPG and PNG files are allowed.");
      setFile(null);
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);

    try {
      const fileUrl = await uploadFile(file);
      if (onUploadSuccess) {
        onUploadSuccess(fileUrl);
      }
      setStatePreview(URL.createObjectURL(file));
      document.getElementById("closeLogoModalBtn").click();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    setFile(null);
    setFileName("");
    setStatePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <FileUploadModal
      modalId="logoModal"
      closeButtonId="closeLogoModalBtn"
      title={`Upload ${placeHolder}`}
      fileName={fileName}
      setFile={setFile}
      handleChange={handleChange}
      handleUpload={handleUpload}
      isLoading={isLoading}
      buttonLabel={placeHolder}
      preview={statePreview || preview}
      accept="image/*"
      fileInputRef={fileInputRef}
      handleDelete={handleDelete}
    />
  );
}
