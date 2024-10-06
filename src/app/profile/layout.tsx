"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

export default function Profile() {
  var cookie = getCookie("_a");

  const [username, setUsername] = useState("");
  const [fixedUsername, setFixedUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [usernameEditVisibility, setUsernameEditVisibility] = useState(false);
  const [passwordEditVisibility, setPasswordEditVisibility] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [verificationCode, setVericationCode] = useState("");

  const [verified, setVerified] = useState();

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [popMessage, setPopMessage] = useState("");
  const [popMessage_2, setPopMessage_2] = useState("");
  const [popMessageColor, setPopMessageColor] = useState("");

  const [verificationSent, setVerificationSent] = useState(false);

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
      } else {
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
      setFixedUsername(data.Fixed_Username);
      setUsername(data.Username);
      setNewUsername(data.Username);
      setPassword(data.Password);
      setEmail(data.Email);
      setVerified(data.Verified);
      setVericationCode(data.Verification_Code);
      console.log("Data fetched.");

      if (data.Verified == false) {
      } else {
        console.log("User verified.");
      }
    });
  }

  useEffect(() => {
    checkStatus();
    checkUser();
  }, []);

  async function changeData() {
    const dataRef = doc(db, "Users", fixedUsername);

    var lock = false;

    if (
      newUsername.length <= 2 ||
      newUsername.length >= 15 ||
      /[!@#$%^&*()_+{}:"<>?=;',./ ]/.test(newUsername)
    ) {
      lock = true;
      console.log("Invalid username error R002");
      setPopMessage(
        "Please enter a valid username. It should be 3-16 characters long and special characters should not be included."
      );
      setPopMessageColor("#FF0000");
    }

    if (lock == false) {
      updateDoc(dataRef, {
        Username: newUsername,
      });
      if (password == oldPassword) {
        updateDoc(dataRef, {
          Password: newPassword,
        });
      }
      console.log("Data updated.");
      window.location.reload();
    }
  }

  async function sendMail() {
    if (verificationSent == false) {
      const emailData = {
        to: email,
        subject: "Your DotWebsHosting Verification is Readied.",
        message: `Greetings ${username},
  
You signed up for our DotWebsHosting service along with the GoDotWebs system.
  
Username: ${username}
Email: ${email}
  
It's a pleasure to see such a valuable user like you. Nevertheless, we have to verify your email identity to protect our user base. We hope for your understanding. Thus, please verify your email via the link below: 
http://localhost:3000/verification/${verificationCode}
  
By verifying your account, you will be officially recognized as a part of us and in our great GoDotWebs system. We are delighted to see you around and wish you the best.
        
Best Regards,
Ricky Chan
Founder
GoDotWebs
  `,
      };

      const response = await fetch("http://192.168.0.82:3001/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        setPopMessage_2(
          "Email successfully sent. Please check your precious mailbox. ✨"
        );
        setPopMessageColor("#00b300");
        setVerificationSent(true);
        setTimeout(() => {
          setVerificationSent(false);
        }, 25000);
      } else {
        console.error("Error sending email", response.statusText);
      }
    } else {
      console.log("Locked.");
    }
  }

  return (
    <>
      <div className="p-10 flex justify-center mt-10">
        <div className="w-full lg:w-[45em] lg:bg-white shadow-sm lg:border-[.1em] rounded-lg lg:p-20">
          <div>
            <img className="w-10" src="/account.svg"></img>
          </div>
          <div className="flex justify-between items-center mt-5">
            {" "}
            <div>
              <p className="text-xl">{username}</p>
              <p className="text-xs">
                Verify Status:{" "}
                <span
                  className={
                    verified == false ? "text-red-500" : "text-green-500"
                  }
                >
                  {verified == false ? "Not Verified" : "Verified"}
                </span>
              </p>
              <p className="text-xs">{email}</p>
            </div>
            <a
              onClick={() =>
                usernameEditVisibility == false
                  ? setUsernameEditVisibility(true)
                  : setUsernameEditVisibility(false)
              }
              className="underline cursor-pointer text-indigo-500"
            >
              Edit
            </a>
          </div>
          <input
            onChange={(event) => setNewUsername(event.target.value)}
            placeholder={username}
            className={
              usernameEditVisibility == true
                ? "outline-blue-200 border-[.1em] shadow-sm p-2 rounded-md w-full mt-2"
                : "hidden"
            }
          ></input>
          <p style={{ color: popMessageColor }} className="text-center mt-5">
            {popMessage}
          </p>
          <div className="flex justify-between items-center mt-2">
            {" "}
            <p className="text-xl">*********</p>
            <a
              onClick={() =>
                passwordEditVisibility == false
                  ? setPasswordEditVisibility(true)
                  : setPasswordEditVisibility(false)
              }
              className="underline cursor-pointer text-indigo-500"
            >
              Edit
            </a>
          </div>
          <input
            type={passwordVisibility == false ? "password" : ""}
            onChange={(event) => setOldPassword(event.target.value)}
            placeholder="Old Password"
            className={
              passwordEditVisibility == true
                ? "outline-blue-200 border-[.1em] shadow-sm p-2 rounded-md w-full mt-2"
                : "hidden"
            }
          ></input>
          <input
            type={passwordVisibility == false ? "password" : ""}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="New Password"
            className={
              passwordEditVisibility == true
                ? "outline-blue-200 border-[.1em] shadow-sm p-2 rounded-md w-full mt-2"
                : "hidden"
            }
          ></input>
          <p
            onClick={() => {
              passwordVisibility == false
                ? setPasswordVisibility(true)
                : setPasswordVisibility(false);
            }}
            className={
              passwordEditVisibility == true
                ? "text-sm mt-2 cursor-pointer underline"
                : "hidden"
            }
          >
            {passwordVisibility == false ? "Show Password" : "Hide Password"}
          </p>
          <hr className="mt-5"></hr>
          <div className="flex justify-center mt-5">
            <a
              onClick={sendMail}
              className={
                verified == false && verificationSent == false
                  ? "text-sm text-center bg-indigo-500 w-full p-3 text-white rounded-md cursor-pointer hover:brightness-[90%] duration-300"
                  : verified == false && verificationSent == true
                  ? "text-sm text-center bg-gray-500 w-full p-3 text-white rounded-md cursor-pointer hover:brightness-[90%] duration-300"
                  : "hidden"
              }
            >
              {verificationSent == false
                ? "Verify Your Account"
                : "Verify Your Account (On 25 Seconds Cooldown)"}
            </a>
          </div>
          <div className="flex justify-center mt-2">
            <a
              onClick={changeData}
              className="text-sm text-center bg-black w-full p-3 text-white rounded-md cursor-pointer hover:brightness-[90%] duration-300"
            >
              Save Changes
            </a>
          </div>
          <p style={{ color: popMessageColor }} className="mt-5 text-center">
            {popMessage_2}
          </p>
        </div>
      </div>
    </>
  );
}
