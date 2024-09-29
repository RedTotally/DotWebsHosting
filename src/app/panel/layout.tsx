"use client";

import { useState } from "react";

export default function Panel() {
  const [files, setFiles] = useState<File[]>([]);
  const [username, setUsername] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0 || !username) {
      alert("Please select files and enter a username to upload");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://192.168.0.82:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      alert("Files uploaded successfully!");
      setFiles([]);
      setUsername("");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files. Please try again.");
    }
  };

  return (
    <div className="p-10">
      <div className="">
        <p className="text-3xl font-bold">Hosting Overview</p>
        <div className="grid grid-cols-3 gap-5 mt-5">
          <div className="p-10 bg-white shadow-sm rounded-md border-[.1em] border-black">
            <img
              className="bg-indigo-500 p-5 rounded-full"
              src="/doc.svg"
            ></img>
            <p className="text-6xl mt-5 font-bold">2</p>
            <p className="text-gray-600">Hosting Files</p>
          </div>
          <div className="p-10 bg-white shadow-sm rounded-md border-[.1em] border-black">
            <img
              className="bg-indigo-500 p-5 rounded-full"
              src="/folder.svg"
            ></img>
            <p className="text-6xl mt-5 font-bold">205MB</p>
            <p className="text-gray-600">File Size</p>
          </div>
          <div className="p-10 bg-white shadow-sm rounded-md border-[.1em] border-black">
            <img
              className="bg-indigo-500 p-5 rounded-full"
              src="/folder.svg"
            ></img>
            <p className="text-6xl mt-5 font-bold text-green-500">Active</p>
            <p className="text-gray-600">Website Status</p>
          </div>
        </div>
        <input type="file" onChange={handleFileChange} multiple />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}
