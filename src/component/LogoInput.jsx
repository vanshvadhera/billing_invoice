import React, { useState, useRef } from "react";
import axios from "axios";
import FileUploadModal from "./FileUploadModal";

export default function LogoInput({ onUploadSuccess, preview }) {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [statePreview, setStatePreview] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "/apiUrl/user/upload-file",
        formData
      );
      if (onUploadSuccess) {
        onUploadSuccess(response.data.data.file_url); // or response, depending on what you want
      }
      setStatePreview(URL.createObjectURL(file)); // Use the renamed state variable
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
    setStatePreview(null); // Use the renamed state variable
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <FileUploadModal
      modalId="logoModal"
      closeButtonId="closeLogoModalBtn"
      title="Upload Logo"
      fileName={fileName}
      setFile={setFile}
      handleChange={handleChange}
      handleUpload={handleUpload}
      isLoading={isLoading}
      buttonLabel="Logo"
      preview={statePreview || preview} // Pass statePreview first, then fall back to prop preview
      accept="image/*"
      fileInputRef={fileInputRef}
      handleDelete={handleDelete}
    />
  );
}
