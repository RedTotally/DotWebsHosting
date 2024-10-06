"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

export default function Reset() {
  const [submittedPassword, setSubmittedPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [popMessage, setPopMessage] = useState("");
  const [popMessageColor, setPopMessageColor] = useState("");

  const [emailSent, setEmailSent] = useState(false);

  const [resetCode, setResetCode] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [generatedCode, setGeneratedCode] = useState("");

  const lrc = useParams()?.reset_code;

  console.log(email, username, resetCode)

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

  async function resetPassword() {

    var dynamicUser = ""
    var dynamicEmail = ""
    
    const q = query(
      collection(db, "Users"),
      where("Password_Reset_Code", "==", lrc)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Cannot find user with verification code.");
      window.location.replace("/");
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      setUsername(data.Username);
      setEmail(data.Email);
      dynamicUser = data.Username
      dynamicEmail = data.Email


      if (submittedPassword !== "") {
        updateDoc(doc.ref, {
          Password: submittedPassword,
          Password_Reset_Code: generatedCode,
        });
        setPopMessage("Password updated, you may now log in to your account.");

        setPopMessageColor("#00b300");
        sendMail(dynamicEmail, dynamicUser);
      } else {
        setPopMessage("Please enter a valid password.");
        setPopMessageColor("#FF0000");
      }
    });
  }

  async function sendMail(toMail: string, toUsername: string) {
    if (emailSent == false) {
      const emailData = {
        to: toMail,
        subject: "Your Password Has Been Updated.",
        message: `Greetings ${toUsername},

This email is to inform you that your DotWebsHosting account password has been changed.

You may now log in with your new password via this link: 
http://localhost:3000/login

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
        setEmailSent(true);
        setTimeout(() => {
          window.location.replace("/login");
        }, 2000);
      } else {
        console.error("Error sending email", response.statusText);
      }
    } else {
      console.log("Locked.");
    }
  }

  useEffect(() => {
    generateVerificationCode();
  }, []);

  return (
    <>
      <div className="mt-10 p-10 flex justify-center">
        <div className="lg:w-[30em]">
          <div className="lg:p-10">
            <p className="text-xl lg:text-2xl font-semibold">
              Work easy, work smoothly.
            </p>
            <p className="lg:text-xl text-gray-600">Reset your password. 🔑</p>

            <div className="mt-5">
              <p className="text-gray-600 text-xs mt-5">New Password</p>
              <input
                onChange={(event) => setSubmittedPassword(event.target.value)}
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
                By submitting, you acknowledge our{" "}
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
                onClick={resetPassword}
                className={
                  emailSent == false
                    ? "mt-5 mb-2 block text-xs bg-indigo-500 text-white text-center p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300"
                    : "mt-5 mb-2 block text-xs bg-gray-500 text-white text-center p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300"
                }
              >
                Reset your Password
              </a>

              <p
                style={{ color: popMessageColor }}
                className="mt-5 text-center"
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
