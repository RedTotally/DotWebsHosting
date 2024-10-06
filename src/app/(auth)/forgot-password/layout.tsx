"use client";

import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

export default function ForgotPassword() {
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [username, setUsername] = useState("");

  const [popMessage, setPopMessage] = useState("");
  const [popMessageColor, setPopMessageColor] = useState("");

  const [emailSent, setEmailSent] = useState(false);

  const [resetCode, setResetCode] = useState("");

  console.log(username, resetCode)

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

  async function sendMail() {
    var emailChecked = false;
    var dynamicUsername = "";
    var dynamicResetCode = "";

    const q = query(
      collection(db, "Users"),
      where("Email", "==", submittedEmail)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.Email == submittedEmail) {
        emailChecked = true;
        setUsername(data.Username);
        setResetCode(data.Password_Reset_Code);
        dynamicUsername = data.Username;
        dynamicResetCode = data.Password_Reset_Code;
      }
    });

    if (emailSent == false && emailChecked) {
      const emailData = {
        to: submittedEmail,
        subject: "Reset Your Password to Continue Your Journey.",
        message: `Greetings The Lost Adventurer,
  
Here's who you are: 
Username: ${dynamicUsername}
Email: ${submittedEmail}
  
Your journey has been stopped because you forgot which path you stepped. You're lost, yet eager to continue. It's our responsibility to trace you back to the path you've been going, but it's time to set a new path you tend to remember. Here's a link for you to reset your password, be well: 
http://localhost:3000/reset-password/${dynamicResetCode}
  
We appreciate your effort in continuing to use our product. We will be delighted to see your return. Wish you the best.
        
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
        setPopMessage(
          "Email successfully sent. Please check your precious mailbox. ✨"
        );
        setPopMessageColor("#00b300");
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
        }, 25000);
      } else {
        console.error("Error sending email", response.statusText);
      }
    } else {
      console.log("Locked.");
      setPopMessage("The email was not found in our database. / On cooldown");
      setPopMessageColor("#FF0000");
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
              Replace your forgotten memory. 🧠
            </p>
            <div className="mt-5">
              <p className="text-gray-600 text-xs mt-5">Email Address</p>
              <input
                onChange={(event) => setSubmittedEmail(event.target.value)}
                placeholder="Enter your email address..."
                className="outline-blue-300 border-[.1em] w-full mt-2 p-2 rounded-md"
              ></input>
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
                onClick={sendMail}
                className={
                  emailSent == false
                    ? "mt-5 mb-2 block text-xs bg-indigo-500 text-white text-center p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300"
                    : "mt-5 mb-2 block text-xs bg-gray-500 text-white text-center p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300"
                }
              >
                {emailSent == false
                  ? "Verify Your Account"
                  : "Verify Your Account (On 25 Seconds Cooldown)"}
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
