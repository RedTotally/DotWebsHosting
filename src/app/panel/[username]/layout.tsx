"use client";

import { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";

export default function Panel() {
  const cookie = getCookie("_a");
  const cookie_2 = getCookie("_p");

  type FileInfo = {
    name: string;
    size: number;
    uploadDate: string;
    isFile: boolean;
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

  const [search, setSearch] = useState("");

  const [domain, setDomain] = useState("");

  const [connectVisibility, setConnectVisibility] = useState(false);
  const [hostingOptionsVisibility, setHostingOptionsVisibility] =
    useState(false);

  const [popMessage, setPopMessage] = useState("");
  const [popColor, setPopColor] = useState("");

  const [selectedFolder, setSelectedFolder] = useState("files");

  const [folders, setFolders] = useState<string[]>([]);
  const [newFolderName, setNewFolderName] = useState<string>("TestFolder");

  const [addNewFolderVisibility, setAddNewFolderVisibility] = useState(false);

  const [folderPopText, setFolderPopText] = useState("");
  const [folderPopColor, setFolderPopColor] = useState("");

  const [confirm, setConfirm] = useState(false);
  const [confirmRename, setConfirmRename] = useState(false);

  const [chosenHost, setChosenHost] = useState("");

  const [gitHubLink, setGitHubLink] = useState("");

  const [hostPopText, setHostPopText] = useState("");
  const [hostPopTextColor, setHostPopTextColor] = useState("");

  const [step, setStep] = useState<number>(1);

  const [projectName, setProjectName] = useState("");

  const [port, setPort] = useState<number>(0);

  const [confirmUsername, setConfirmUsername] = useState("");
  const [breakVisibility, setBreakVisibility] = useState(false);

  const [breakPop, setBreakPop] = useState("");
  const [breakPopColor, setBreakPopColor] = useState("");

  const [secureVisibility, setSecureVisibility] = useState(false);

  const [pin1, setPin1] = useState<number>(-100);
  const [pin2, setPin2] = useState<number>(-100);
  const [pin3, setPin3] = useState<number>(-100);

  const [matchPin1, setMatchPin1] = useState<number>(-100);
  const [matchPin2, setMatchPin2] = useState<number>(-100);
  const [matchPin3, setMatchPin3] = useState<number>(-100);

  const [pinPopText, setPinPopText] = useState("");

  const [secureBannerVisibility, setSecureBannerVisibility] = useState(false);

  const [pinPopVisibility, setPinPopVisibility] = useState(false);

  const [pinLocked, setPinLocked] = useState(false);

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

  console.log("Cookie: " + cookie + " " + cookie_2);

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

  async function getPort() {
    const portRef = doc(db, "Port", "Port");
    const document = await getDoc(portRef);

    const data = document.data();
    if (data !== undefined) {
      setPort(data.Port);
    }
  }

  async function getPin() {
    if (cookie_2 !== undefined) {
      if (cookie_2.length > 0) {
        setPinLocked(true);
        setSecureBannerVisibility(true);
      } else {
        setPinLocked(false);
      }
    }
  }

  useEffect(() => {
    getPin();
  }, []);

  useEffect(() => {
    getPort();
  }, []);

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
      const response = await fetch("https://dotwebshosting.com/public/status");
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
        "https://dotwebshosting.com/public/stats/" + dynamicUser.toLowerCase()
      );
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
    formData.append("username", username.toLowerCase());
    if (selectedFolder !== "files") {
      formData.append("subfolder", selectedFolder);
    }
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      /*Please remember to add the /public/ back after the development.*/
      const response = await fetch(
        `https://dotwebshosting.com/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

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
        `https://dotwebshosting.com/uploads/${dynamicUser.toLowerCase()}/${selectedFolder}`
      );
      const data = await response.json();

      if (response.ok) {
        const filteredFiles = data.files
          .filter(
            (file: { name: string; isFile: boolean }) => file.name !== "files"
          )
          .map(
            (file: {
              name: string;
              size: number;
              uploadDate: string;
              isFile: boolean;
            }) => ({
              name: file.name,
              size: (file.size / (1024 * 1024)).toFixed(2),
              uploadDate: new Date(file.uploadDate).toLocaleDateString(),
              isFile: file.isFile,
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

  useEffect(() => {
    fetchFiles();
  }, [username, selectedFolder]);

  async function deleteFile(username: string, filename: string) {
    if (pinLocked == false) {
      const response = await fetch(
        `https://dotwebshosting.com/delete/${username.toLowerCase()}/${selectedFolder}/${filename}`,
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
    } else {
      setPinPopVisibility(true);
    }
  }

  async function editFileName(
    username: string,
    oldName: string,
    newName: string
  ) {
    if (pinLocked == false) {
      const response = await fetch(
        `https://dotwebshosting.com/rename/${username.toLowerCase()}/${selectedFolder}`,
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
    } else {
      setPinPopVisibility(true);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Connecting domain...");

    try {
      const response = await fetch("/api/connect-domain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, domain }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Domain ${domain} connected successfully.`);
        setPopMessage(
          "Domain connected successfully, keep in mind it might take 48 hours to take effect in some cases."
        );
        setPopColor("#00ff00");
      } else {
        console.log(`Error: ${data.message || "Failed to connect domain"}`);
        setPopMessage(
          "Error on connecting your domain, did you set up the CNAME record correctly?"
        );
        setPopColor("#ff0000");
      }
    } catch (error) {
      console.error("Error connecting domain:", error);
      console.log("An error occurred while connecting the domain.");
    }
  };

  const createFolder = async () => {
    try {
      const response = await fetch(
        `https://dotwebshosting.com/create-folder/${selectedFolder}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            folderName: newFolderName,
            username: username.toLowerCase(),
          }),
        }
      );

      console.log(username);

      if (response.ok) {
        setFolders([...folders, newFolderName]);
        setNewFolderName("");
        setFolderPopText("Creating the folder, please wait...");
        setFolderPopColor("#00b300");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const errorData = await response.json();
        console.error("Error creating folder:", errorData.message);
        setFolderPopText("Error creating folder, folder already exists.");
        setFolderPopColor("#ff0000");
      }
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  async function removeFolder() {
    const response = await fetch("https://dotwebshosting.com/remove-folder", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        subfolder: selectedFolder,
      }),
    });
    if (response.ok) {
    }
  }

  async function gitClone() {
    let finished = false;

    setHostPopText("Cloning is in progress...");
    setHostPopTextColor("#00b300");

    let loadValue = 0;

    for (let i = 0; i <= 1000; i++) {
      if (finished == false) {
        setTimeout(() => {
          loadValue = i;
          if (finished == false) {
            setHostPopText(
              "Cloning is in progress... " + "(" + loadValue + ")"
            );
          }
          if (i >= 900) {
            if (finished == false) {
              setHostPopText(
                "Please be patient... The system is working hard on that..."
              );
            }
          }
        }, i * 10);
      }
    }

    const response = await fetch("https://dotwebshosting.com/next-clone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        repoUrl: gitHubLink,
      }),
    });
    if (response.ok) {
      finished = true;
      setHostPopText("Repository cloned successfully.");
      setHostPopTextColor("#00b300");
      setStep(2);
    } else {
      finished = true;

      setHostPopText(
        "Error on cloning your repository, please check whether the link was correct."
      );
      setHostPopTextColor("#ff0000");
    }
  }

  async function nextBuild() {
    const finished = false;

    setHostPopText("Building is in progress...");
    setHostPopTextColor("#00b300");

    let loadValue = 0;

    for (let i = 0; i <= 1000; i++) {
      if (finished == false) {
        setTimeout(() => {
          loadValue = i;
          if (finished == false) {
            setHostPopText(
              "Building is in progress... " + "(" + loadValue + ")"
            );
          }
          if (i >= 900) {
            if (finished == false) {
              setHostPopText(
                "Please be patient... The system is working hard on that..."
              );
            }
          }
        }, i * 10);
      }
    }

    const response = await fetch("https://dotwebshosting.com/next-build", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        projectName: projectName,
        port: port.toString(),
        domainName: `${username.toLowerCase()}.dotwebshosting.com`,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      console.log(data.test);
      if (data.details) {
        console.log(data.details);
      } else {
        console.log("No details found in the response.");
      }
      setHostPopText("The Next.JS environment was established successfully.");
      setHostPopTextColor("#00b300");
      addPort();
      nextLink();
      setStep(3);
    } else {
      setHostPopText("Error on establishing your Next.JS environment.");
      setHostPopTextColor("#ff0000");
    }
  }

  async function addPort() {
    const portRef = doc(db, "Port", "Port");
    const document = await getDoc(portRef);

    const data = document.data();
    if (data && data.Port !== null) {
      const count = data.Port;
      updateDoc(portRef, {
        Port: count + 1,
      });
    }
  }

  async function nextLink() {
    const response = await fetch(
      "https://dotwebshosting.com/domain-connection",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.toLowerCase(),
          projectName: projectName,
          port: port.toString(),
          domainName: `${username.toLowerCase()}.dotwebshosting.com`,
        }),
      }
    );
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      console.log("OK");
    } else {
      console.log("BAD REQUEST");
    }
  }

  async function nextBreak() {
    if (confirmUsername.toLowerCase() == username.toLowerCase()) {
      const response = await fetch(
        "https://dotwebshosting.com/break-connection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.toLowerCase(),
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setBreakPopColor("#00b300");
        setBreakPop("Successfully broke the connection of your Next.JS site.");
      } else {
        setBreakPopColor("#ff0000");
        setBreakPop("Error on breaking the connection of your Next.JS site.");
      }
    } else {
      console.log("Username not match.");
    }
  }

  async function updatePin1(value: number) {
    if (value >= 0 && value <= 9) {
      setPin1(value);
      console.log(value);
      setPinPopText("");
    } else {
      setPinPopText(
        "Invalid input, please choose a number between 0-9 on each field."
      );
    }
  }

  async function updatePin2(value: number) {
    if (value >= 0 && value <= 9) {
      setPin2(value);
      console.log(value);
      setPinPopText("");
    } else {
      setPinPopText(
        "Invalid input, please choose a number between 0-9 on each field."
      );
    }
  }

  async function updatePin3(value: number) {
    if (value >= 0 && value <= 9) {
      setPin3(value);
      console.log(value);
      setPinPopText("");
    } else {
      setPinPopText(
        "Invalid input, please choose a number between 0-9 on each field."
      );
    }
  }

  async function updatePin() {
    if (pinLocked == false) {
      if (pin1 + pin2 + pin3 >= 0 * 3 && pin1 + pin2 + pin3 <= 9 * 3) {
        const combinedPin = pin1.toString() + pin2.toString() + pin3.toString();
        setCookie("_p", combinedPin, {
          maxAge: 604800,
        });

        setTimeout(() => {
          location.reload();
        }, 100);
      } else {
        setPinPopText(
          "Error on enabling the secure mode. Please consider re-checking your inputted pin."
        );
      }
    } else {
      setPinPopVisibility(true);
    }
  }

  async function matchPin() {
    if (pinLocked == true) {
      const pin =
        matchPin1.toString() + matchPin2.toString() + matchPin3.toString();

      if (pin == cookie_2) {
        console.log("matched");
        setPinPopVisibility(false);
        setPinLocked(false);
      } else {
        console.log("unmatched");
      }
    } else {
      console.log("Unlocked");
    }
  }

  /* Run Constantly */
  matchPin();

  async function disableSecureMode() {
    if (pinLocked == false) {
      deleteCookie("_p");
      location.reload();
    } else {
      setPinPopVisibility(true);
    }
  }

  return (
    <>
      <div
        className={
          pinPopVisibility == true
            ? "fixed bg-black bg-opacity-[10%] w-full h-full top-0 flex justify-center items-center z-[99]"
            : "hidden"
        }
      >
        <div className="bg-white p-5 rounded-lg">
          <p className="text-sm">
            Please enter your PIN code to unlock <strong>one</strong> action in
            total.
          </p>
          <div className="grid grid-cols-3 gap-5 mt-2">
            <input
              type="number"
              min="0"
              max="9"
              className="border-[.1em] p-2 outline-blue-200 rounded-lg"
              onChange={(event) =>
                event.target.value.length > 1
                  ? (event.target.value = "0")
                  : [setMatchPin1(Number(event.target.value))]
              }
            ></input>
            <input
              type="number"
              min="0"
              max="9"
              className="border-[.1em] p-2 outline-blue-200 rounded-lg"
              onChange={(event) =>
                event.target.value.length > 1
                  ? (event.target.value = "0")
                  : [setMatchPin2(Number(event.target.value))]
              }
            ></input>
            <input
              type="number"
              min="0"
              max="9"
              className="border-[.1em] p-2 outline-blue-200 rounded-lg"
              onChange={(event) =>
                event.target.value.length > 1
                  ? (event.target.value = "0")
                  : [setMatchPin3(Number(event.target.value))]
              }
            ></input>
          </div>
        </div>
      </div>
      <div
        className={
          secureBannerVisibility == true
            ? "bg-green-500 w-full top-0"
            : "hidden"
        }
      >
        <p className="text-white text-center p-1 z-[98] text-xs">
          Your panel is currently protected by the secure mode to prevent
          unconscious actions.{" "}
          <span
            onClick={disableSecureMode}
            className="underline cursor-pointer"
          >
            Disable
          </span>
        </p>
      </div>
      <div className="p-10">
        <div
          className={
            secureVisibility == true
              ? "px-10 fixed flex justify-center items-center top-0 left-0 bg-black bg-opacity-[10%] w-full h-full z-[98]"
              : "hidden"
          }
        >
          <div className="bg-white rounded-md shadow-sm border-[.1em] p-10 overflow-x-auto">
            <div className="w-[55em]">
              <p
                onClick={() => setSecureVisibility(false)}
                className="mb-5 bg-indigo-500 text-white px-5 p-2 rounded-md cursor-pointer hover:brightness-[90%] duration-300"
              >
                Close
              </p>
              <p className="font-semibold text-2xl">We build, and we shine.</p>
              <p className="text-xl text-gray-600">
                Prevent the consequence of unintended actions. 🔒
              </p>
              <hr className="mt-5 mb-5"></hr>
              <p className="text-sm">Set up a 7-days Secure PIN Code</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <input
                  type="number"
                  min="0"
                  max="9"
                  className="border-[.1em] p-2 outline-blue-200"
                  onChange={(event) =>
                    event.target.value.length > 1
                      ? (event.target.value = "0")
                      : updatePin1(Number(event.target.value))
                  }
                ></input>
                <input
                  type="number"
                  min="0"
                  max="9"
                  className="border-[.1em] p-2 outline-blue-200"
                  onChange={(event) =>
                    event.target.value.length > 1
                      ? (event.target.value = "0")
                      : updatePin2(Number(event.target.value))
                  }
                ></input>
                <input
                  type="number"
                  min="0"
                  max="9"
                  className="border-[.1em] p-2 outline-blue-200"
                  onChange={(event) =>
                    event.target.value.length > 1
                      ? (event.target.value = "0")
                      : updatePin3(Number(event.target.value))
                  }
                ></input>
              </div>
              <p className="text-red-500">{pinPopText}</p>
              <p className="text-xs mt-5 text-red-500">
                Please remember that the pin security lock CANNOT be unlocked
                until 7 days later. Please consider this before locking your
                panel.
              </p>
              <a
                onClick={updatePin}
                className="block text-center mt-2 bg-indigo-500 p-2 rounded-lg text-white cursor-pointer hover:brightness-[90%] duration-300"
              >
                Security Lock
              </a>
            </div>
          </div>
        </div>
        <div
          className={
            hostingOptionsVisibility == true
              ? "px-10 fixed flex justify-center items-center top-0 left-0 bg-black bg-opacity-[10%] w-full h-full z-[98]"
              : "hidden"
          }
        >
          <div className="bg-white rounded-md shadow-sm border-[.1em] p-10 overflow-x-auto">
            <div className="w-[55em]">
              <p
                onClick={() => setHostingOptionsVisibility(false)}
                className="mb-5 bg-indigo-500 text-white px-5 p-2 rounded-md cursor-pointer hover:brightness-[90%] duration-300"
              >
                Close
              </p>
              <p className="font-semibold text-2xl">We build, and we shine.</p>
              <p className="text-xl text-gray-600">
                Host your specific type of site, and shine with us. 🌐
              </p>

              <hr className="mt-5 mb-5"></hr>

              <p className="text-sm">Please choose one specific site type</p>

              <div
                onClick={() =>
                  pinLocked == false
                    ? setChosenHost("Next.JS")
                    : setPinPopVisibility(true)
                }
                className={
                  chosenHost == "Next.JS"
                    ? "border-indigo-500 flex items-center p-5 duration-150 cursor-pointer mt-5 rounded-lg shadow-sm border-[.1em]"
                    : "flex items-center p-5 hover:bg-gray-50 duration-150 cursor-pointer mt-5 rounded-lg shadow-sm border-[.1em]"
                }
              >
                <img className="w-5" src="/nextjs.svg"></img>
                <p className="ml-2">Next.JS</p>
              </div>
              <a
                onClick={() =>
                  pinLocked == false
                    ? breakVisibility == false
                      ? setBreakVisibility(true)
                      : setBreakVisibility(false)
                    : setPinPopVisibility(true)
                }
                className="text-xs underline cursor-pointer text-red-500"
              >
                Break Connection
              </a>
              <br></br>
              <div
                className={
                  breakVisibility == true
                    ? "grid grid-cols-5 items-center mt-2"
                    : "hidden"
                }
              >
                <input
                  onChange={(event) => setConfirmUsername(event.target.value)}
                  className="col-span-4 p-2 border-l-[.1em] border-y-[.1em] w-full rounded-l-lg outline-blue-200 text-sm"
                  placeholder="Enter your accout name..."
                ></input>{" "}
                <p
                  onClick={nextBreak}
                  className="p-2 text-center text-sm bg-red-500 rounded-r-lg text-white border-r-[.1em] border-y-[.1em] cursor-pointer hover:brightness-[90%] duration-300"
                >
                  Break
                </p>
              </div>
              <p style={{ color: breakPopColor }} className="text-sm">
                {breakPop}
              </p>

              <hr className="mt-5 mb-5"></hr>

              <div
                className={
                  chosenHost == "Next.JS" ? "grid grid-cols-4 gap-5" : "hidden"
                }
              >
                <div className="grid grid-rows-2 gap-2">
                  <div
                    onClick={() => setStep(1)}
                    className={
                      step == 1
                        ? "bg-indigo-50 p-2 rounded-lg cursor-pointer"
                        : "p-2 rounded-lg cursor-pointer hover:bg-gray-50 duration-300"
                    }
                  >
                    <p className="font-semibold">Step 1</p>
                    <p className="text-xs mt-1">
                      Provide us with your GitHub repository link
                    </p>
                  </div>
                  <div
                    onClick={() => setStep(2)}
                    className={
                      step == 2
                        ? "bg-indigo-50 p-2 rounded-lg cursor-pointer"
                        : "p-2 rounded-lg cursor-pointer hover:bg-gray-50 duration-300"
                    }
                  >
                    <p className="font-semibold">Step 2</p>
                    <p className="text-xs mt-1">
                      Setting up your Next.JS envorionment & Publish
                    </p>
                  </div>
                </div>

                <div className="col-span-3">
                  <div className={step == 1 ? "block" : "hidden"}>
                    <p className="text-sm mb-1">
                      Provide us your GitHub repository &#40;e.g.
                      https://github.com/YourUsername/ProjectName&#41;
                    </p>
                    <input
                      onChange={(event) => setGitHubLink(event.target.value)}
                      className="p-3 border-[.1em] w-full rounded-lg outline-blue-200"
                      placeholder="Enter your github project link..."
                    ></input>
                    <a
                      onClick={gitClone}
                      className="block mt-2 p-3 text-sm rounded-lg text-white w-full bg-indigo-500 hover:brightness-[90%] duration-300 cursor-pointer"
                    >
                      Next
                    </a>
                    <p style={{ color: hostPopTextColor }} className="mt-2">
                      {hostPopText}
                    </p>
                  </div>
                  <div className={step == 2 ? "block" : "hidden"}>
                    <p className="text-sm mb-1">
                      Please enter the name of your GitHub project &#40;e.g.
                      ProjectName&#41;
                    </p>
                    <input
                      onChange={(event) => setProjectName(event.target.value)}
                      className="p-3 border-[.1em] w-full rounded-lg outline-blue-200"
                      placeholder="Enter your github project name..."
                    ></input>
                    <a
                      onClick={nextBuild}
                      className="block mt-2 p-3 text-sm rounded-lg text-white w-full bg-indigo-500 hover:brightness-[90%] duration-300 cursor-pointer"
                    >
                      Publish
                    </a>
                    <p style={{ color: hostPopTextColor }} className="mt-2">
                      {hostPopText}
                    </p>
                  </div>
                  <div className={step == 3 ? "block" : "hidden"}>
                    <p className="text-sm mb-1">
                      Your site was published under our service, congrats!
                    </p>

                    <Link
                      href={`https://${username.toLowerCase()}.dotwebshosting.com`}
                      className="underline text-indigo-500 cursor-pointer"
                    >
                      {username.toLowerCase()}.dotwebshosting.com
                    </Link>

                    <p style={{ color: hostPopTextColor }} className="mt-2">
                      {hostPopText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            connectVisibility == true
              ? "px-10 fixed flex justify-center items-center top-0 left-0 bg-black bg-opacity-[10%] w-full h-full z-[98]"
              : "hidden"
          }
        >
          <div className="bg-white rounded-md shadow-sm border-[.1em] p-10 overflow-x-auto">
            <div className="w-[55em]">
              <p
                onClick={() => setConnectVisibility(false)}
                className="mb-5 bg-indigo-500 text-white px-5 p-2 rounded-md cursor-pointer hover:brightness-[90%] duration-300"
              >
                Close
              </p>
              <p className="font-semibold text-2xl">
                Work easy, work smoothly.
              </p>
              <p className="text-xl text-gray-600">
                Connect your domain to DotWebsHosting. 🌐
              </p>
              <hr className="mt-5 mb-3"></hr>
              <div className="flex items-center">
                <img
                  className="bg-indigo-500 p-2 rounded-full"
                  src="/domain.svg"
                ></img>
                <p className="ml-3 font-semibold">
                  Log in to your domain provider
                </p>
              </div>
              <div className="flex items-center mt-3">
                <img
                  className="bg-indigo-500 p-2 rounded-full"
                  src="/dns.svg"
                ></img>
                <p className="ml-3 font-semibold">
                  Open your domain DNS settings
                </p>
              </div>
              <div className="flex items-center mt-3">
                <img
                  className="bg-indigo-500 p-2 rounded-full"
                  src="/@.svg"
                ></img>
                <p className="ml-3 font-semibold">
                  Add a CNAME Record with @ in the Host section and your
                  DotWebHosting subdomain in the Value section.
                </p>
              </div>

              <p className="mt-5 text-sm">Make sure it looks like this</p>
              <div className="grid grid-cols-5 border-[.1em] p-5">
                <p>Type</p>
                <p>Host</p>
                <p className="col-span-2">Value</p>
                <p>TTL</p>
              </div>

              <div className="grid grid-cols-5 border-[.1em] border-t-0 p-5">
                <p className="text-sm">CNAME Record</p>
                <p className="text-sm">@</p>
                <p className="text-sm col-span-2">
                  <span className="font-bold">yourusername</span>
                  .dotwebshosting.com
                </p>
                <p className="text-sm">Automatic</p>
              </div>

              <input
                onChange={(event) => setDomain(event.target.value)}
                placeholder="Enter your domain..."
                className="mt-5 border-[.1em] outline-blue-200 p-2 w-full rounded-md"
              ></input>
              <a
                onClick={() =>
                  pinLocked == false ? handleSubmit : setPinPopVisibility(true)
                }
                className="block text-xs bg-indigo-500 w-full text-white text-center p-3 mt-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300"
              >
                Submit to Our Database
              </a>
              <p style={{ color: popColor }} className="mt-2">
                {popMessage}
              </p>
              <p className="mt-2 text-sm">
                Not quite understand? Go to our{" "}
                <Link
                  href={"/document"}
                  className="underline text-indigo-500 cursor-pointer"
                >
                  Document
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="mb-10 lg:flex items-center justify-between bg-white p-5 border-[.1em] rounded-md shadow-sm">
          <p className="lg:text-xl font-semibold">Your DotWebsHosting Domain</p>
          <p className="text-xs sm:text-base lg:text-xl text-green-500">
            {username.toLowerCase()}.dotwebshosting.com{" "}
          </p>
        </div>
        <div className="">
          <div className="lg:flex justify-between items-center">
            <p className="lg:text-3xl font-bold">
              {username}&apos;s Hosting Overview
            </p>
            <a className="font-semibold text-sm lg:px-5 py-1 rounded-full cursor-pointer hover:brightness-[90%] duration-300">
              DotWebsPanel v1.1
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
                <p className="text-center text-3xl mt-5 font-bold">
                  {totalSize}
                </p>
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
          <p className="lg:text-3xl font-bold">Quick Actions</p>
        </div>
        <hr className="mt-5 mb-5"></hr>

        <div className="grid lg:grid-cols-4 gap-5">
          <div>
            <div
              onClick={() => {
                setAddNewFolderVisibility(!addNewFolderVisibility);
              }}
              className="border-[.1em] p-10 bg-white rounded-md shadow-sm cursor-pointer hover:brightness-[90%] duration-300"
            >
              <div className="flex justify-center">
                <img src="/folder-icon.svg"></img>
              </div>
              <p className="text-center mt-2 text-sm">Add a Folder</p>
            </div>
            <div
              className={
                addNewFolderVisibility == true
                  ? "flex mt-3 items-center rounded-md"
                  : "hidden"
              }
            >
              <input
                onChange={(event) => setNewFolderName(event.target.value)}
                className="border-l-[.1em] border-t-[.1em] border-b-[.1em] w-full rounded-l-md p-2 outline-none text-sm"
                placeholder="Folder name..."
              ></input>
              <div
                onClick={() =>
                  pinLocked == false
                    ? createFolder()
                    : setPinPopVisibility(true)
                }
                className="border-t-[.1em] border-r-[.1em] border-b-[.1em] border-black p-2 bg-black text-white rounded-r-md cursor-pointer duration-300 hover:brightness-[90%]"
              >
                <img src="/add.svg"></img>
              </div>
            </div>
            <p
              style={{ color: folderPopColor }}
              className={
                addNewFolderVisibility == true ? "text-xs mt-1" : "hidden"
              }
            >
              {folderPopText}
            </p>
          </div>
          <div
            onClick={() => setConnectVisibility(true)}
            className="flex items-center justify-center border-[.1em] p-10 bg-white rounded-md shadow-sm cursor-pointer hover:brightness-[90%] duration-300"
          >
            <div>
              <div className="flex justify-center">
                <img src="/internet.svg"></img>
              </div>
              <p className="text-center mt-2 text-sm">Link Your Domain</p>
            </div>
          </div>
          <div
            onClick={() => setHostingOptionsVisibility(true)}
            className="flex justify-center items-center border-[.1em] p-10 bg-white rounded-md shadow-sm cursor-pointer hover:brightness-[90%] duration-300"
          >
            <div>
              <div className="flex justify-center">
                <img src="/code.svg"></img>
              </div>
              <p className="text-center mt-2 text-sm">Hosting Options</p>
            </div>
          </div>
          <div
            onClick={() =>
              secureVisibility == false
                ? setSecureVisibility(true)
                : setSecureVisibility(false)
            }
            className="flex justify-center items-center border-[.1em] p-10 bg-white rounded-md shadow-sm cursor-pointer hover:brightness-[90%] duration-300"
          >
            <div>
              <div className="flex justify-center">
                <img src="/shield.svg"></img>
              </div>
              <p className="text-center mt-2 text-sm">Secure Mode</p>
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

        <input
          onChange={(event) => setSearch(event.target.value)}
          className="mb-5 border-[.1em] p-3 w-full rounded-md outline-blue-200"
          placeholder="Search for something..."
        ></input>

        <div className="mb-3">
          <p className=" text-gray-600">
            /{username.toLowerCase()}/{selectedFolder}
          </p>
          <div
            onClick={() =>
              pinLocked == false
                ? [removeFolder(), setSelectedFolder("files")]
                : setPinPopVisibility(true)
            }
            className={
              selectedFolder !== "files"
                ? "w-[10em] text-sm text-red-500 flex items-center hover:underline cursor-pointer"
                : "hidden"
            }
          >
            <img src="/trash.svg"></img>
            <span className="ml-1">Remove Directory</span>
          </div>
        </div>

        <div className="border-[.1em] shadow-sm rounded-md bg-white overflow-x-auto">
          <div className="w-[113.8em]">
            <div className="border-b-[.1em] p-5 grid grid-cols-5 items-center hover:bg-gray-100 duration-300 cursor-pointer">
              <p className="text-sm text-gray-600">File Name</p>
              <p className="text-center text-sm text-gray-600">Upload ID</p>
              <p className="text-center text-sm text-gray-600">Upload Date</p>
              <p className="text-center text-sm text-gray-600">File Size</p>
              <p className="text-center text-sm text-gray-600">Server ID</p>
            </div>
            <div
              onClick={() => {
                setSelectedFolder("files");
              }}
              className={
                search == ""
                  ? "p-5 grid grid-cols-5 items-center hover:bg-gray-100 duration-300 cursor-pointer"
                  : "hidden"
              }
            >
              <div className="flex items-center">
                <img
                  className="p-3 rounded-full"
                  src={"/host.svg"}
                  alt="File icon"
                />
                <p className="ml-4">root</p>
              </div>
              <p className="text-center">-</p>
              <p className="text-center">-</p>
              <p className="text-center">-</p>
              <p className="text-center">S00001</p>
            </div>
            {listFiles
              .filter((file) => file.isFile == false)
              .map((file, index) => (
                <div key={index}>
                  <div
                    onClick={() => {
                      if (file.isFile) {
                        if (selectedFile === file.name) {
                          setSelectedFile("");
                        } else {
                          setSelectedFile(file.name);
                        }
                      } else {
                        if (selectedFolder !== "files") {
                          setSelectedFolder(selectedFolder + "/" + file.name);
                        } else {
                          setSelectedFolder(file.name);
                        }
                      }
                    }}
                    className={
                      file.name.toLowerCase().includes(search.toLowerCase()) ||
                      search == ""
                        ? "p-5 grid grid-cols-5 items-center hover:bg-gray-100 duration-300 cursor-pointer"
                        : "hidden"
                    }
                  >
                    <div className="flex items-center">
                      <img
                        className="p-3 rounded-full"
                        src={
                          file.isFile ? "/file-small.svg" : "/folder-black.svg"
                        }
                        alt="File icon"
                      />
                      <p className="ml-4">{file.name}</p>
                    </div>
                    <p className="text-center">-</p>
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
                    <div
                      onClick={() => {
                        if (confirm) {
                          setConfirm(false);
                          deleteFile(username, file.name);
                        } else {
                          setConfirm(true);
                        }
                      }}
                      className="hover:underline flex items-center px-3 py-2 text-red-500 rounded-md cursor-pointer duration-300 hover:brightness-[90%]"
                    >
                      <img src="/trash.svg"></img>
                      <span className="ml-2 text-sm">
                        {confirm == false ? "Delete File" : "Are you sure?"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <input
                        onChange={(event) => setNewFileName(event.target.value)}
                        placeholder="Enter a file name..."
                        className="text-sm outline-blue-200 border-[.1em] w-[25em] p-2 rounded-md"
                      ></input>
                      <div
                        onClick={() => {
                          if (confirmRename) {
                            editFileName(username, file.name, newFileName);
                            setConfirmRename(false);
                          } else {
                            setConfirmRename(true);
                          }
                        }}
                        className="hover:underline flex items-center px-10 py-1 rounded-md text-indigo-500 cursor-pointer duration-300 hover:brightness-[90%]"
                      >
                        <img src="/rename.svg"></img>
                        <span className="ml-2 text-sm">
                          {confirmRename == true
                            ? "Are you sure?"
                            : "Rename File"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {listFiles
              .filter((file) => file.isFile)
              .map((file, index) => (
                <div key={index}>
                  <div
                    onClick={() => {
                      if (file.isFile) {
                        if (selectedFile === file.name) {
                          setSelectedFile("");
                        } else {
                          setSelectedFile(file.name);
                        }
                      } else {
                        setSelectedFolder(file.name);
                      }
                    }}
                    className={
                      file.name.toLowerCase().includes(search.toLowerCase()) ||
                      search == ""
                        ? "p-5 grid grid-cols-5 items-center hover:bg-gray-100 duration-300 cursor-pointer"
                        : "hidden"
                    }
                  >
                    <div className="flex items-center">
                      <img
                        className="p-3 rounded-full"
                        src={
                          file.isFile ? "/file-small.svg" : "/folder-black.svg"
                        }
                        alt="File icon"
                      />
                      <p className="ml-4">{file.name}</p>
                    </div>
                    <p className="text-center">-</p>
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
                    <div
                      onClick={() =>
                        confirm
                          ? (setConfirm(false), deleteFile(username, file.name))
                          : setConfirm(true)
                      }
                      className="hover:underline flex items-center px-3 py-2 text-red-500 rounded-md cursor-pointer duration-300 hover:brightness-[90%]"
                    >
                      <img src="/trash.svg"></img>
                      <span className="ml-2 text-sm">
                        {confirm == false ? "Delete File" : "Are you sure?"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <input
                        onChange={(event) => setNewFileName(event.target.value)}
                        placeholder="Enter a file name..."
                        className="text-sm outline-blue-200 border-[.1em] w-[25em] p-2 rounded-md"
                      ></input>
                      <div
                        onClick={() => {
                          if (confirmRename) {
                            editFileName(username, file.name, newFileName);
                            setConfirmRename(false);
                          } else {
                            setConfirmRename(true);
                          }
                        }}
                        className="hover:underline flex items-center px-10 py-1 rounded-md text-indigo-500 cursor-pointer duration-300 hover:brightness-[90%]"
                      >
                        <img src="/rename.svg"></img>
                        <span className="ml-2 text-sm">
                          {confirmRename == true
                            ? "Are you sure?"
                            : "Rename File"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
