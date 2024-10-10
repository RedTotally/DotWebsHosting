"use client";

import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
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

import { getCookie, setCookie } from "cookies-next";

export default function Register() {
  const  cookie = getCookie("_a");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [popMessage, setPopMessage] = useState("");
  const [popMessageColor, setPopMessageColor] = useState("");

  const [generatedCode, setGeneratedCode] = useState("");
  const [generatedCode_2, setGeneratedCode_2] = useState("");

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

  async function generateVerificationCode() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setGeneratedCode(result);
  }

  async function generateVerificationCode_2() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setGeneratedCode_2(result);
  }

  async function dataSubmit() {
    let lock = false;

    if (email == "" || username == "" || password == "") {
      lock = true;
      console.log("Information error R001");
      setPopMessage("Please fill in all the corresponding fields.");
      setPopMessageColor("#FF0000");
    }

    if (!email.includes("@")) {
      lock = true;
      console.log("Invalid email error R002");
      setPopMessage("Please enter a valid email.");
      setPopMessageColor("#FF0000");
    }

    if (
      username.length <= 13 ||
      username.length >= 30 ||
      /[!@#$%^&*()_+{}:"<>?=;',./ ]/.test(username)
    ) {
      lock = true;
      console.log("Invalid username error R002");
      setPopMessage(
        "Please enter a valid username. It should be 14-29 characters long and special characters should not be included."
      );
      setPopMessageColor("#FF0000");
    }

    const dataRef = doc(db, "Users", username);

    const generatedCookieCode = Math.floor(
      Math.random() * (1000000000 - 100000000) + 100000000
    );

    const qUsername = query(
      collection(db, "Users"),
      where("Username", "==", username)
    );

    const qEmail = query(collection(db, "Users"), where("Email", "==", email));

    const querySnapshotUsername = await getDocs(qUsername);
    const querySnapshotEmail = await getDocs(qEmail);

    querySnapshotUsername.forEach((doc) => {
      const data = doc.data();
      if (data.Username == username) {
        console.log("Same username detected.");
        setPopMessage("Please consider choosing another username, thank you.");
        setPopMessageColor("#FF0000");
        lock = true;
      }
    });

    querySnapshotEmail.forEach((doc) => {
      const data = doc.data();
      if (data.Email == email) {
        console.log("Same email detected.");
        setPopMessage("The same email was registered to our system.");
        setPopMessageColor("#FF0000");
        lock = true;
      }
    });

    if (lock === false) {
      setDoc(dataRef, {
        Email: email,
        Username: username,
        Fixed_Username: username,
        Password: password,
        Code: generatedCookieCode,
        Verified: false,
        Product: "DotWebsHosting",
        Verification_Code: generatedCode,
        Password_Reset_Code: generatedCode_2,
      });
      registrationSetUp();
      setCookie("_a", generatedCookieCode);
      console.log("Account created.");
      setPopMessage("Account created, please wait.");
      setPopMessageColor("#00b300");
      window.location.replace("profile");
    } else {
      console.log("Locked.");
    }

    recordData();
  }

  async function recordData() {
    const countDataRef = doc(db, "User_Count", "User_Count");
    const document = await getDoc(countDataRef);

    const data = document.data();
    if (data && data.User_Count !== null) {
      const count = data.User_Count;
      setDoc(countDataRef, {
        User_Count: count + 1,
      });
    }
  }

  async function loggedInCheck() {
    if (cookie) {
      if (cookie.length > 0) {
        window.location.replace("/");
      }
    }
  }

  useEffect(() => {
    loggedInCheck();
    generateVerificationCode();
    generateVerificationCode_2();
  }, []);

  async function registrationSetUp() {
    const response = await fetch('http://192.168.0.82:3000/create-directory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      console.log('User registered and directories created successfully.');
    } else {
      console.error('Failed to create directories.');
    }
  }

  return (
    <>
      <div className="mt-10 p-10 flex justify-center">
        <div className="lg:w-[30em]">
          <div className="lg:p-10">
            <p className="text-xl lg:text-2xl font-semibold">
              Work easy, work smoothly.
            </p>
            <p className="lg:text-xl text-gray-600">
              We are very pleased to see you here. 💖
            </p>
            <div className="mt-5">
              <div
                onClick={() => [
                  setPopMessage("Sorry, this option is currently unavailable."),
                  setPopMessageColor("#FF0000"),
                ]}
                className="flex justify-center rounded-md w-full bg-black cursor-pointer hover:brightness-[90%] duration-300"
              >
                <img className="w-5" src="/google.svg"></img>
                <a className="block items-center text-center text-white p-3 rounded-md text-sm">
                  Continue with Google
                </a>
              </div>
              <hr className="mt-5 mb-5"></hr>
              <p className="text-gray-600 text-xs">Email Address</p>
              <input
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address..."
                className="outline-blue-300 border-[.1em] w-full mt-2 p-2 rounded-md"
              ></input>
              <p className="text-gray-600 text-xs mt-5">Username</p>
              <input
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter your username..."
                className="outline-blue-300 border-[.1em] w-full mt-2 p-2 rounded-md"
              ></input>
              <p className="text-gray-600 text-xs mt-5">Password</p>
              <input
                onChange={(event) => setPassword(event.target.value)}
                type={passwordVisibility == false ? "password" : ""}
                placeholder="Enter your password..."
                className="outline-blue-300 border-[.1em] w-full mt-2 p-2 rounded-md"
              ></input>
              <a
                onClick={() =>
                  passwordVisibility == false
                    ? setPasswordVisibility(true)
                    : setPasswordVisibility(false)
                }
                className="text-sm underline cursor-pointer mt-2"
              >
                {passwordVisibility == false
                  ? "Show Password"
                  : "Hide Password"}
              </a>
              <p className="mt-5 text-xs text-gray-600">
                By registering or logging in, you acknowledge our{" "}
                <span className="underline cursor-pointer">
                  terms of service
                </span>{" "}
                and{" "}
                <span className="underline cursor-pointer">
                  privacy policies
                </span>
                . We wish you a smooth experience with full protection.
              </p>
              <a
                onClick={dataSubmit}
                className="mt-5 block text-xs bg-indigo-500 text-white text-center p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300"
              >
                Register to the GoDotWebs System
              </a>
              <p
                style={{ color: popMessageColor }}
                className="text-center mt-5"
              >
                {popMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
