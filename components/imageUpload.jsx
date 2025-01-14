"use client";

import React, { useState } from "react";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadUrl(data.url); // Set the uploaded file URL
      } else {
        console.error("Failed to upload image:", await response.text());
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col items-center">
      <div
        className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{ cursor: "pointer" }}
      >
        <p className="text-sm text-gray-500 text-center w-full">
          Drag and drop an image file here, or click to browse.
        </p>
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            className="absolute opacity-0 cursor-pointer w-full "
            onChange={handleFileChange}
          />
        </div>
      </div>

      {file && (
        <div className="mt-4">
          <p>Selected File: {file.name}</p>
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover"
          />
        </div>
      )}

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleUpload}
      >
        Upload
      </button>

      {uploadUrl && (
        <div className="mt-4">
          <p>Uploaded Image URL:</p>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
            {uploadUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
