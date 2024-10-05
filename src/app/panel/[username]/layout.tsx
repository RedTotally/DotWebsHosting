"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

export default function Panel() {
  const cookie = getCookie("_a");

  const [files, setFiles] = useState<File[]>([]);
  const [username, setUsername] = useState("");
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [totalSize, setTotalSize] = useState<string>("0 MB");
  const [rawSize, setRawSize] = useState<number>(0);

  const [serverRunning, setServerRunning] = useState<boolean | null>(null);

  const config = {
    apiKey: "AIzaSyCwKzycTLiWhHoHIeqUeLrVQXSQKLBowVQ",
    authDomain: "godotwebs.firebaseapp.com",
    projectId: "godotwebs",
    storageBucket: "godotwebs.appspot.com",
    messagingSenderId: "1000371246246",
    appId: "1:1000371246246:web:4a9de4906743aaf3611067",
  };

  const app = initializeApp(config);
  const db = getFirestore(app);

  console.log("Cookie: " + cookie);

  async function cookieChecker() {
    if (!cookie) {
      console.log("User not found. C001");
      window.location.replace("/");
    } else {
      if (cookie.length < 1) {
        console.log("User not found. C002");
        window.location.replace("/");
      }
    }
  }

  async function checkUser() {
    const q = query(
      collection(db, "Users"),
      where("Code", "==", Number(cookie))
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      setUsername(data.Username);
      console.log("Data fetched.");
    });
  }

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    cookieChecker();
  }, []);

  useEffect(() => {
    console.log(files);
  }, []);

  useEffect(() => {
    checkServerStatus();
  }, []);

  useEffect(() => {
    fetchStats();
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await fetch("http://192.168.0.82:3000/status");
      const data = await response.json();
      if (data.running) {
        setServerRunning(true);
      }
    } catch (error) {
      console.error("Error checking server status:", error);
      setServerRunning(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("http://192.168.0.82:3000/stats");
      const data = await response.json();
      setTotalFiles(data.totalFiles);
      setTotalSize(data.totalSize);
      setRawSize(data.rawSize);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(rawSize);
    if (rawSize < 10737418240) {
      console.log("Size verification passed.");
      const selectedFiles = Array.from(e.target.files || []);
      const selectedFilesSize = selectedFiles.reduce(
        (total, file) => total + file.size,
        0
      );

      if (selectedFilesSize < 1000000000) {
        if (selectedFiles.length > 0 && username) {
          setFiles(selectedFiles);
          handleUpload(selectedFiles);
        } else {
          alert("Please select files and enter a username to upload.");
        }
      } else {
        console.log("Size limit exceeded. 001");
      }
    } else {
      console.log("Size limit exceeded. 002");
    }
  };

  const handleUpload = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0 || !username) {
      alert("Please select files and enter a username to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    selectedFiles.forEach((file) => {
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

      const result = await response.text();
      console.log(result);
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
          <p className="text-3xl font-bold">{username}&apos;s Hosting Overview</p>
          <a className="text-sm bg-black text-white px-5 py-1 rounded-full cursor-pointer hover:brightness-[90%] duration-300">
            Download All Hosting Files
          </a>
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
              <p className="text-center text-3xl mt-5 font-bold">
                {totalFiles}
              </p>
              <p className="text-center text-gray-600">Hosting Files</p>
            </div>
            <div className="p-5 bg-white shadow-sm rounded-md border-[.1em]">
              <div className="flex justify-center">
                <img
                  className="bg-indigo-500 p-5 rounded-full"
                  src="/folder.svg"
                ></img>
              </div>
              <p className="text-center text-3xl mt-5 font-bold">{totalSize}</p>
              <p className="text-center text-gray-600">File Size</p>
            </div>
            <div className="p-5 bg-white shadow-sm rounded-md border-[.1em]">
              <div className="flex justify-center">
                <img
                  className="bg-indigo-500 p-5 rounded-full"
                  src="/verified.svg"
                ></img>
              </div>
              <p
                className={
                  serverRunning === false || serverRunning === null
                    ? "text-center text-3xl mt-5 font-bold text-red-500"
                    : "text-center text-3xl mt-5 font-bold text-green-500"
                }
              >
                {serverRunning === false || serverRunning === null
                  ? "Deactivate"
                  : "Activate"}
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
                <div className="flex justify-center">
                  <img
                    className="w-[15em]"
                    src="/undraw_my_files_swob.svg"
                  ></img>
                </div>
                <p className="text-xs mt-5">
                  Let us handle your files gently, drag them here. Or, you can
                  actually click here.
                </p>
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
