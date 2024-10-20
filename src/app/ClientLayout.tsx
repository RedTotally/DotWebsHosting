"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie, setCookie } from "cookies-next";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = getCookie("_a");

  const [menuVisibility, setMenuVisibility] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [verified, setVerified] = useState();

  const [optionsVisibility, setOptionsVisibility] = useState(false);

  const [category, setCategory] = useState("");
  const [inputArea, setInputArea] = useState("");

  const [moreVisibility, setMoreVisibility] = useState(false);

  const [malfunctionCount, setMalfunctionCount] = useState<number>(0);

  const [lock, setLock] = useState(false);

  const [popMessage, setPopMessage] = useState("");
  const [popMessageColor, setPopMessageColor] = useState("");

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

  async function checkStatus() {
    console.log(cookie);

    if (cookie && cookie.length > 0) {
      console.log("Logged in");
      setLoggedIn(true);
    }
  }

  async function checkUser() {
    const q = query(
      collection(db, "Users"),
      where("Code", "==", Number(cookie))
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUsername(data.Username);
        setVerified(data.Verified);
        console.log("Data fetched.");
      });
    } else {
      console.log("No user found.");
    }
  }

  useEffect(() => {
    checkStatus();
    checkUser();
  }, []);

  async function logOut() {
    setCookie("_a", "");
    window.location.replace("/");
  }

  async function updateWebData_Malfunction() {
    const countDataRef = doc(db, "User_Count", "User_Count");
    const document = await getDoc(countDataRef);

    const data = document.data();
    if (data && data.User_Count !== null) {
      setMalfunctionCount(data.Malfunctions);
    }
  }

  useEffect(() => {
    updateWebData_Malfunction();
  }, []);

  async function recordData_Malfunction() {
    const countDataRef = doc(db, "User_Count", "User_Count");
    const document = await getDoc(countDataRef);

    const data = document.data();
    if (data && data.User_Count !== null) {
      const count = data.Malfunctions;
      updateDoc(countDataRef, {
        Malfunctions: count + 1,
      });
      setMalfunctionCount(data.Malfunctions + 1);
    }
  }

  async function sendMail() {
    setLock(true);

    if (lock == false) {
      setPopMessage("Delivering... ✨");
      setPopMessageColor("#00b300");

      const emailData = {
        to: "rickycandyred@gmail.com",
        subject: `From DotWebsHosting: A User Would Like to ${category}.`,
        message: `A message has been sent through the GoDotWebs website.
Category: ${category}
Content: 
${inputArea}
    `,
      };

      const response = await fetch("https://dotwebshosting.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        setPopMessage(
          "Message successfully sent. ✨"
        );
        setPopMessageColor("#00b300");
        if (
          category == "Report an account malfunction" ||
          "Report a service malfunction"
        ) {
          recordData_Malfunction();
        }
        setTimeout(() => {
          setLock(false);
        }, 1000);
      } else {
        console.error("Error sending email", response.statusText);
        setPopMessage("Error sending your message, please try again.");
        setPopMessageColor("#FF0000");
        setTimeout(() => {
          setLock(false);
        }, 1000);
      }
    } else {
      console.log("Locked.");
    }
  }

  return (
    <>
      <div className="relative z-[100] overflow-x-auto overflow-y-auto">
        <div
          className={
            moreVisibility == true
              ? "rounded-md fixed lg:w-[35em] lg:bottom-[7em] top-[1em] lg:top-auto left-[2em] lg:left-auto right-[2em] bg-white shadow-sm border-[.1em] p-10"
              : "hidden"
          }
        >
          <p className="text-xl font-semibold">Heya, I would like to...</p>
          <p className="text-xs mt-1">
            Is our service down? Current malfunction report:{" "}
            <span className="text-red-500 font-bold">{malfunctionCount}</span>
          </p>
          <div
            onClick={() => setCategory("Report an Account Malfunction")}
            className={
              category == "Report an Account Malfunction"
                ? "flex items-center mt-5 cursor-pointer p-5 rounded-md bg-indigo-100 duration-350"
                : "flex items-center mt-5 cursor-pointer p-5 rounded-md hover:bg-gray-100 duration-350"
            }
          >
            <img src="/malfunction.svg"></img>
            <div className="ml-5">
              <a className="block text-lg">Report an Account Malfunction</a>
              <p className="text-xs">
                Have a problem with a blank account profile, malfunctioning
                panel, or verification malfunction? Please write to us. We
                apologize for the inconvenience caused by such a problem.
              </p>
            </div>
          </div>

          <div
            onClick={() => setCategory("Report a Service Malfunction")}
            className={
              category == "Report a Service Malfunction"
                ? "flex items-center mt-2 cursor-pointer p-5 rounded-md bg-indigo-100 duration-350"
                : "flex items-center mt-2 cursor-pointer p-5 rounded-md hover:bg-gray-100 duration-350"
            }
          >
            <img src="/error.svg"></img>
            <div className="ml-5">
              <a className="block text-lg">Report a Service Malfunction</a>
              <p className="text-xs">
                Have a problem with panel upload malfunction, file listing
                malfunction, remove file malfunction, or file name editing
                malfunction? Please write to us. We are deeply sorry for causing
                such an inconvenience.
              </p>
            </div>
          </div>
          <div
            onClick={() => setCategory("Get in Touch With Us")}
            className={
              category == "Get in Touch With Us"
                ? "flex items-center mt-2 cursor-pointer p-5 rounded-md bg-indigo-100 duration-350"
                : "flex items-center mt-2 cursor-pointer p-5 rounded-md hover:bg-gray-100 duration-350"
            }
          >
            <img src="/chat.svg"></img>
            <div className="ml-5">
              <a className="block text-lg">Get in Touch With Us</a>
              <p className="text-xs">
                Want to tell us something? It is completely welcome. We will
                listen to your inquiries or literally anything. Send us
                something!
              </p>
            </div>
          </div>
          <textarea
            onChange={(event) => setInputArea(event.target.value)}
            placeholder="Write something..."
            className="border-[.1em] rounded-md w-full mt-5 p-5 outline-blue-200 text-sm"
          ></textarea>
          <a
            onClick={sendMail}
            className={
              lock == false
                ? "block text-sm mt-2 text-center bg-indigo-500 p-3 text-white rounded-md hover:brightness-[90%] duration-300 cursor-pointer"
                : "block text-sm mt-2 text-center bg-gray-500 p-3 text-white rounded-md hover:brightness-[90%] duration-300 cursor-pointer"
            }
          >
            Submit
          </a>
          <p
            style={{ color: popMessageColor }}
            className="mt-2 text-xs text-center"
          >
            {popMessage}
          </p>
        </div>
        <img
          onClick={() =>
            moreVisibility == false
              ? setMoreVisibility(true)
              : setMoreVisibility(false)
          }
          className="fixed bottom-[2em] right-[2em] bg-indigo-500 p-5 rounded-full shadow-md cursor-pointer"
          src="/more.svg"
        ></img>
      </div>
      <div className="bg-indigo-500 p-2">
        <p className="text-center text-white text-xs">
          Every registered account in 2024 will be counted as part of the early
          users, which will be guaranteed to have 8 years of free services from
          us.
        </p>
      </div>
      <div className={verified == false ? "bg-red-500" : "hidden"}>
        <p className="text-white p-3 text-center">
          Your account isn&apos;t verified yet. To unlock all the features,
          please go to your{" "}
          <Link href={"/profile"} className="underline cursor-pointer">
            profile
          </Link>{" "}
          to verify your account.
        </p>
      </div>
      <div
        onClick={() => setOptionsVisibility(false)}
        className={
          optionsVisibility == true ? "fixed w-full h-full z-[98]" : "hidden"
        }
      ></div>
      <div className="opacity-[50%] fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <nav className="bg-white py-5 p-10 lg:flex items-center justify-between">
        <div className="flex items-center justify-between">
          <Link
            onClick={() => setMenuVisibility(false)}
            href={"/"}
            className="flex items-center cursor-pointer text-xl font-bold"
          >
            <img className="w-10" src="/dotwebshosting.png"></img>DotWebsHosting
          </Link>
          <img
            onClick={() => setMenuVisibility(true)}
            className="cursor-pointer lg:hidden"
            src="/menu.svg"
          ></img>
        </div>
        <div
          className={
            menuVisibility == false
              ? "top-0 left-[100em] lg:left-0 py-5 p-10 lg:p-0 fixed lg:relative lg:flex items-center bg-white lg:bg-transparent w-full h-[100vh] lg:w-auto lg:h-auto z-[99] duration-300"
              : "top-0 left-[0] py-5 p-10 lg:p-0 fixed lg:relative lg:flex items-center bg-white lg:bg-transparent w-full h-[100vh] lg:w-auto lg:h-auto z-[99] duration-300"
          }
        >
          <div className="flex lg:hidden items-center justify-between">
            <Link
              onClick={() => setMenuVisibility(false)}
              href={"/"}
              className="flex items-center cursor-pointer text-xl font-bold"
            >
              <img className="w-10" src="/dotwebshosting.png"></img>
              DotWebsHosting
            </Link>
            <img
              onClick={() => setMenuVisibility(false)}
              className="cursor-pointer lg:hidden"
              src="/close.svg"
            ></img>
          </div>
          <div className="mt-10 lg:mt-0"></div>
          <Link
            onClick={() => setMenuVisibility(false)}
            href={"/about-us"}
            className="text-3xl lg:text-base cursor-pointer hover:before:scale-x-100 lg:hover:before:origin-left relative lg:before:w-full before:h-[.1em] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-500 before:absolute before:left-0 before:bottom-0"
          >
            About Us
          </Link>
          <div
            onClick={() => setMenuVisibility(false)}
            className="mt-5 lg:mt-0 lg:mx-4"
          ></div>
          <Link
            onClick={() => setMenuVisibility(false)}
            href={"/document"}
            className="text-3xl lg:text-base cursor-pointer hover:before:scale-x-100 lg:hover:before:origin-left relative lg:before:w-full before:h-[.1em] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-500 before:absolute before:left-0 before:bottom-0"
          >
            Document
          </Link>
          <div
            onClick={() => setMenuVisibility(false)}
            className={loggedIn == false ? "mt-5 lg:mt-0 lg:mx-4" : "hidden"}
          ></div>
          <Link
            onClick={() => setMenuVisibility(false)}
            href={"/login"}
            className={
              loggedIn == false
                ? "text-3xl lg:text-base cursor-pointer hover:before:scale-x-100 lg:hover:before:origin-left relative lg:before:w-full before:h-[.1em] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-500 before:absolute before:left-0 before:bottom-0"
                : "hidden"
            }
          >
            Login
          </Link>
          <div className="mt-10 lg:mt-0 lg:mx-4"></div>
          <Link
            onClick={() => setMenuVisibility(false)}
            href={"/register"}
            className={
              loggedIn == false
                ? "block text-sm cursor-pointer bg-black text-white px-5 py-5 lg:py-2 rounded-md hover:brightness-[90%] duration-300"
                : "hidden"
            }
          >
            Get DoWebsHosting Free
          </Link>
          <a
            onClick={() => {
              setOptionsVisibility(!optionsVisibility);
            }}
            className={
              loggedIn == true
                ? "flex items-center cursor-pointer text-2xl lg:text-base"
                : "hidden"
            }
          >
            <img className="w-10 lg:w-auto mr-2" src="/account.svg"></img>
            {username}
          </a>
          <div
            className={
              optionsVisibility == true
                ? "rounded-md absolute lg:right-0 z-[99] bg-white mt-2 lg:mt-44 shadow-sm border-[.1em]"
                : "hidden"
            }
          >
            <ul>
              <Link
                href={"/profile"}
                onClick={() => {
                  setOptionsVisibility(false);
                  setMenuVisibility(false);
                }}
                className="block px-12 p-3 hover:bg-gray-100 cursor-pointer duration-300 text-sm text-center"
              >
                Your Profile
              </Link>
              <Link
                href={"/panel/" + username}
                onClick={() => {
                  setOptionsVisibility(false);
                  setMenuVisibility(false);
                }}
                className="block px-12 p-3 hover:bg-gray-100 cursor-pointer duration-300 text-sm text-center"
              >
                Your Panel
              </Link>
              <li
                onClick={() => {
                  logOut();
                  setOptionsVisibility(false);
                  setMenuVisibility(false);
                }}
                className="px-12 p-3 bg-black rounded-b-md text-white hover:brightness-[90%] cursor-pointer duration-300 text-sm text-center"
              >
                Log Out
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr></hr>
      {children}
      <footer className="p-10 mb-10">
        <hr className="mt-20 mb-20"></hr>

        <div className="lg:flex justify-between">
          <div>
            <div className="flex items-center">
              <img className="w-[5em]" src="/dotwebshosting.png"></img>
              <p className="text-xl font-bold">DotWebsHosting</p>
            </div>
            <p className="text-sm">
              We appreciate every single user. Thank you.
            </p>
            <p className="text-sm">© 2024 DotWebsHosting</p>
            <p className="mt-5">A Service Under</p>
            <div className="mt-2 flex items-center">
              <img className="w-[1.5em]" src="/godotwebs.png"></img>
              <p className="ml-3 text-xl font-bold">GoDotWebs</p>
            </div>
            <p className="mt-2 text-sm">© 2023 – 2024 GoDotWebs</p>
          </div>

          <div className="mt-10 lg:mt-0 md:grid grid-cols-4 gap-10 xl:gap-20">
            <ul>
              <li className="text-xl font-bold">Registration</li>
              <Link
                href={username == "" ? "/login" : ""}
                className="mt-2 block"
              >
                Login
              </Link>
              <Link
                href={username == "" ? "/register" : ""}
                className="mt-2 block"
              >
                Register
              </Link>
            </ul>

            <ul className="mt-10 md:mt-0">
              <li className="text-xl font-bold">Service</li>
              <Link
                href={username == "" ? "/register" : ""}
                className="mt-2 block"
              >
                Hosting Service
              </Link>
            </ul>

            <ul className="mt-10 md:mt-0">
              <li className="text-xl font-bold">Information</li>
              <Link
                target="_blank"
                href={"https://godotwebs.com"}
                className="mt-2 block"
              >
                Our Company
              </Link>
              <Link
                target="_blank"
                href={"https://godotwebs.com/about-us"}
                className="mt-2 block"
              >
                About Us
              </Link>
              <Link href={"document"} className="mt-2 block">
                Documentation
              </Link>
            </ul>

            <ul className="mt-10 md:mt-0">
              <li className="text-xl font-bold">Legal</li>
              <Link href={"/terms-of-service"} className="mt-2 block">
                Terms of Service
              </Link>
              <Link href={"/privacy-policies"} className="mt-2 block">
                Privacy Policies
              </Link>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
