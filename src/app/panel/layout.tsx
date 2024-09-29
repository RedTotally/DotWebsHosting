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
        <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">Hosting Overview</p>
        <a className="text-sm bg-black text-white px-5 py-1 rounded-full cursor-pointer hover:brightness-[90%] duration-300">Download All Hosting Files</a>
        </div>
        <hr className="mt-5 mb-5"></hr>
        <div className="grid grid-cols-4 gap-5 mt-5">
          <div className="grid grid-rows-3 gap-5">
            <div className="p-5 bg-white shadow-sm rounded-md border-[.1em]">
              <div className="flex justify-center">
                <img
                  className="bg-indigo-500 p-5 rounded-full"
                  src="/doc.svg"
                ></img>
              </div>
              <p className="text-center text-3xl mt-5 font-bold">2</p>
              <p className="text-center text-gray-600">Hosting Files</p>
            </div>
            <div className="p-5 bg-white shadow-sm rounded-md border-[.1em]">
              <div className="flex justify-center">
                <img
                  className="bg-indigo-500 p-5 rounded-full"
                  src="/folder.svg"
                ></img>
              </div>
              <p className="text-center text-3xl mt-5 font-bold">205MB</p>
              <p className="text-center text-gray-600">File Size</p>
            </div>
            <div className="p-5 bg-white shadow-sm rounded-md border-[.1em]">
              <div className="flex justify-center">
                <img
                  className="bg-indigo-500 p-5 rounded-full"
                  src="/verified.svg"
                ></img>
              </div>
              <p className="text-center text-3xl mt-5 font-bold text-green-500">
                Active
              </p>
              <p className="text-center text-gray-600">Website Status</p>
            </div>
          </div>
          <div className="col-span-3 hover:brightness-[90%] duration-300">
            <div className="bg-white flex items-center justify-center border-[.1em] shadow-sm rounded-md w-full h-full">
              <input
                className="w-full h-full bg-black rounded-md opacity-0 relative z-[50] cursor-pointer"
                type="file"
                onChange={handleFileChange}
                multiple
              />
              <div className="absolute">
                <div className="flex justify-center"><img className="w-[15em]" src="/undraw_my_files_swob.svg"></img></div>
              <p className="text-xs mt-5">Let us handle your files gently, drag them here. Or, you can actually click here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <p className="text-3xl font-bold">Hosting Files</p>
        </div>
        <hr className="mt-5 mb-5"></hr>
    </div>
  );
}
