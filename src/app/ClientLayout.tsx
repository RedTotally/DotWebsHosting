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

    if (cookie) {
      if (cookie.length > 0) {
        console.log("Logged in");
        setLoggedIn(true);
      }
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

  return (
    <>
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
          <div className="mt-5 lg:mt-0"></div>
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
              optionsVisibility == false
                ? setOptionsVisibility(true)
                : setOptionsVisibility(false);
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
              <li className="mt-2">Login</li>
              <li className="mt-2">Register</li>
            </ul>

            <ul className="mt-10 md:mt-0">
              <li className="text-xl font-bold">Service</li>
              <li className="mt-2">Hosting Service</li>
            </ul>

            <ul className="mt-10 md:mt-0">
              <li className="text-xl font-bold">Information</li>
              <li className="mt-2">Our Company</li>
              <li className="mt-2">About Us</li>
              <li className="mt-2">Documentation</li>
            </ul>

            <ul className="mt-10 md:mt-0">
              <li className="text-xl font-bold">Legal</li>
              <li className="mt-2">Terms of Service</li>
              <li className="mt-2">Privacy Policies</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
