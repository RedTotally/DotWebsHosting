"use client";

import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";

import { setCookie, getCookie } from 'cookies-next';

export default function Login() {
  var cookie = getCookie("_a");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(false);

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

  async function scanData() {
    const q = query(collection(db, "Users"), where("Username", "==", username));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.Password == password) {
        console.log("The username and password are matched.");
      } else {
        console.log("The username and password are not matched.");
      }

      setCookie('_a', data.Code)
      window.location.replace("/")

    });
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
  }, []);

  return (
    <>
      <div className="mt-10 p-10 flex justify-center">
        <div className="lg:w-[30em]">
          <div className="lg:p-10">
            <p className="text-xl lg:text-2xl font-semibold">
              Work easy, work smoothly.
            </p>
            <p className="lg:text-xl text-gray-600">
              We are very pleased to see you again. 💖
            </p>
            <div className="mt-5">
              <div className="flex justify-center rounded-md w-full bg-black cursor-pointer hover:brightness-[90%] duration-300">
                <img className="w-5" src="/google.svg"></img>
                <a className="block items-center text-center text-white p-3 rounded-md text-sm">
                  Continue with Google
                </a>
              </div>
              <hr className="mt-5 mb-5"></hr>
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
              <a onClick={scanData} className="mt-5 mb-2 block text-xs bg-indigo-500 text-white text-center p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300">
                Login to the GoDotWebs System
              </a>
              <a className="tex-sm underline cursor-pointer">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
