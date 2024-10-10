"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

export default function Panel() {
  const cookie = getCookie("_a");

  type FileInfo = {
    name: string;
    size: number;
    uploadDate: string;
  };

  const [listFiles, setListFiles] = useState<FileInfo[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [username, setUsername] = useState("");
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [totalSize, setTotalSize] = useState<string>("0 MB");
  const [rawSize, setRawSize] = useState<number>(0);

  const [verified, setVerified] = useState();

  const [serverRunning, setServerRunning] = useState<boolean | null>(null);

  const [selectedFile, setSelectedFile] = useState("");

  const [newFileName, setNewFileName] = useState("");

  const [search, setSearch] = useState("")

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
      setVerified(data.Verified);
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
      const response = await fetch("https://dotwebshosting.com/uploads/status");
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
    let dynamicUser = "";

    const q = query(
      collection(db, "Users"),
      where("Code", "==", Number(cookie))
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      dynamicUser = data.Username;
      console.log("Data fetched.");
    });

    try {
      const response = await fetch(
        "https://dotwebshosting.com/uploads/stats/" + dynamicUser
      );
      const data = await response.json();
      setTotalFiles(data.totalFiles - 1);
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
          if (verified == true) {
            setFiles(selectedFiles);
            handleUpload(selectedFiles);
          } else {
            console.log("Account not verified.");
          }
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
      const response = await fetch("https://dotwebshosting.com/uploads/upload", {
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
      window.location.reload();
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files. Please try again.");
    }
  };

  useEffect(() => {
    
    const fetchFiles = async () => {
      let dynamicUser = "";

    const q = query(
      collection(db, "Users"),
      where("Code", "==", Number(cookie))
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      dynamicUser = data.Username;
      console.log("Data fetched.");
    });

      try {
        const response = await fetch(
          `https://dotwebshosting.com/uploads/uploads/${dynamicUser}/files`
        );
        const data = await response.json();

        if (response.ok) {
          const filteredFiles = data.files
            .filter((file: { name: string }) => file.name !== "files")
            .map(
              (file: { name: string; size: number; uploadDate: string }) => ({
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2),
                uploadDate: new Date(file.uploadDate).toLocaleDateString(),
              })
            );

          setListFiles(filteredFiles);
        } else {
          console.error("Error fetching files:", data.error);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [username]);

  async function deleteFile(username: string, filename: string) {
    const response = await fetch(
      `https://dotwebshosting.com/uploads/delete/${username}/${filename}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log("File deleted successfully.");
      window.location.reload();
    } else {
      console.error("Failed to delete file");
    }
  }

  async function editFileName(
    username: string,
    oldName: string,
    newName: string
  ) {
    const response = await fetch(
      `https://dotwebshosting.com/uploads/rename/${username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldName, newName }),
      }
    );

    if (response.ok) {
      console.log("File renamed successfully.");
      window.location.reload();
    } else {
      console.error("Failed to rename file");
    }
  }

  return (
    <div className="p-10">
      <div className="">
        <div className="lg:flex justify-between items-center">
          <p className="lg:text-3xl font-bold">
            {username}&apos;s Hosting Overview
          </p>
          <a className="font-semibold text-sm lg:px-5 py-1 rounded-full cursor-pointer hover:brightness-[90%] duration-300">
            DoWebsPanel v1.0
          </a>
        </div>
        <hr className="mt-5 mb-5"></hr>
        <div className="lg:grid grid-cols-4 gap-5 mt-5">
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
              <p className="text-xs text-center text-gray-600">/ Unlimited</p>
              <p className="text-center text-gray-600 mt-2">Hosting Files</p>
            </div>
            <div className="p-5 bg-white shadow-sm rounded-md border-[.1em]">
              <div className="flex justify-center">
                <img
                  className="bg-indigo-500 p-5 rounded-full"
                  src="/folder.svg"
                ></img>
              </div>
              <p className="text-center text-3xl mt-5 font-bold">{totalSize}</p>
              <p className="text-xs text-center text-gray-600">/ 10000 MB</p>
              <p className="text-center text-gray-600 mt-2">File Size</p>
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
                {serverRunning === false
                  ? "Deactivate"
                  : serverRunning === null
                  ? "Loading"
                  : "Activate"}
              </p>
              <p className="text-xs text-center text-gray-600">
                Secure Connected
              </p>
              <p className="text-center text-gray-600 mt-2">Hosting Status</p>
            </div>
          </div>
          <div className="h-[45em] lg:h-auto mt-5 lg:mt-0 col-span-3 hover:brightness-[90%] duration-300">
            <div className="bg-white flex items-center justify-center border-[.1em] shadow-sm rounded-md w-full h-full">
              <input
                className="w-full h-full bg-black rounded-md opacity-0 relative z-[50] cursor-pointer"
                type="file"
                onChange={handleFileChange}
                multiple
              />
              <div className="absolute p-14">
                <div className="flex justify-center">
                  <img
                    className="w-[15em]"
                    src="/undraw_my_files_swob.svg"
                  ></img>
                </div>
                <p className="text-xs text-center mt-5">
                  Let us handle your files gently, drag them here. Or, you can
                  actually click here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <p className="lg:text-3xl font-bold">Hosting Files</p>
        <a
          onClick={() => {
            window.location.reload();
          }}
          className="text-sm bg-black text-white px-5 py-1 rounded-full cursor-pointer hover:brightness-[90%] duration-300"
        >
          Refresh
        </a>
      </div>
      <hr className="mt-5 mb-5"></hr>

      <input onChange={(event) => setSearch(event.target.value)} className="mb-5 border-[.1em] p-5 w-full rounded-md outline-blue-200" placeholder="Search for something..."></input>

      <div className="border-[.1em] shadow-sm rounded-md bg-white overflow-x-auto">
        <div className="w-[113.8em]">
          <div className="p-5 grid grid-cols-5 items-center hover:bg-gray-100 duration-300 cursor-pointer">
            <p className="font-semibold">File Name</p>
            <p className="text-center font-semibold">Upload ID</p>
            <p className="text-center font-semibold">Upload Date</p>
            <p className="text-center font-semibold">File Size</p>
            <p className="text-center font-semibold">Server ID</p>
          </div>
          {listFiles.map((file, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  if (selectedFile === file.name) {
                    setSelectedFile("");
                  } else {
                    setSelectedFile(file.name);
                  }
                }}
                className={file.name.toLowerCase().includes(search.toLowerCase()) || search == "" ? "p-5 grid grid-cols-5 items-center hover:bg-gray-100 duration-300 cursor-pointer" : "hidden"}
              >
                <div className="flex items-center">
                  <img
                    className="bg-indigo-500 p-3 rounded-full"
                    src="/file.svg"
                    alt="File icon"
                  />
                  <p className="ml-4">{file.name}</p>
                </div>
                <p className="text-center">N/A</p>
                <p className="text-center">{file.uploadDate}</p>
                <p className="text-center">{file.size} MB</p>
                <p className="text-center">S00001</p>
              </div>
              <div
                className={
                  selectedFile == file.name
                    ? "flex items-center justify-between p-5"
                    : "hidden"
                }
              >
                <a
                  onClick={() => deleteFile(username, file.name)}
                  className="px-16 py-2 bg-red-500 text-white rounded-md cursor-pointer duration-300 hover:brightness-[90%]"
                >
                  Delete File
                </a>
                <div className="flex items-center">
                  <input
                    onChange={(event) => setNewFileName(event.target.value)}
                    placeholder="Enter a file name..."
                    className="outline-blue-200 border-[.1em] w-[25em] p-2 rounded-md"
                  ></input>
                  <a
                    onClick={() =>
                      editFileName(username, file.name, newFileName)
                    }
                    className="ml-2 px-10 py-2 bg-indigo-500 rounded-md text-white cursor-pointer duration-300 hover:brightness-[90%]"
                  >
                    Rename File
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
