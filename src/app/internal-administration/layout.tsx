"use client";

import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { getCookie } from "cookies-next";

export default function InternalAdministration() {
  const cookie = getCookie("_a");

  const [username, setUsername] = useState("");
  const [verified, setVerified] = useState();

  const [name, setName] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const [massActivation, setMassActivation] = useState(false);

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
        if (data.Username !== "TheRickyTotallyRed") {
          window.location.replace("https://grabify.link/T4WCJ5");
        }
      });
    } else {
      console.log("No user found.");
      window.location.replace("https://grabify.link/T4WCJ5");
    }
  }

  useEffect(() => {
    checkUser();
    /*Removable*/
    console.log(username);
    console.log(verified);
  }, []);

  async function sendMail(who: string, user: string) {
    const emailData = {
      to: who,
      subject: subject,
      message: `<p style="font-size: 1.5em;">Dear ${user},</p>` + content,
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
    } else {
      console.error("Error sending email", response.statusText);
    }
  }

  async function bunkSendMail() {
    const querySnapshot = await getDocs(collection(db, "Users"));
    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      Email: doc.data().Email,
    }));

    for (const user of usersData) {
      try {
        await sendMail(user.Email, user.id);
        console.log(`Email sent to ${user.Email}`);
      } catch (error) {
        console.error(`Error sending email to ${user.Email}:`, error);
      }
    }
  }

  return (
    <>
      <div className="flex justify-center items-center mt-[10em] mb-[10em] px-10 w-full">
        <div className="xl:grid grid-cols-5 gap-10 w-full xl:w-auto">
          <div className="col-span-2 w-full xl:w-[25em]">
            <p className="text-xl">Internal Mailing System</p>
            <p className="text-xs text-gray-600 mt-3">Name</p>
            <input
              placeholder="e.g. Dear who"
              onChange={(event) => setName(event.target.value)}
              className="text-sm mt-2 block border-[.1em] rounded-md p-3 outline-blue-200 w-full"
            ></input>
            <p className="text-xs text-gray-600 mt-3">Email</p>
            <div className="flex items-center mt-2">
              <input
                placeholder="username@gmail.com"
                onChange={(event) => setTo(event.target.value)}
                className="mr-3 text-sm block border-[.1em] rounded-md p-3 outline-blue-200 w-full"
              ></input>
              <div className="group">
                <p className="text-xs absolute bg-indigo-500 p-2 text-white rounded-md mt-[-3.5em] ml-[-11em] 2xl:ml-[-5.5em] opacity-0 group-hover:opacity-100 duration-300">
                  Import Emails from the Database
                </p>
                <img
                  onClick={() =>
                    massActivation == false
                      ? setMassActivation(true)
                      : setMassActivation(false)
                  }
                  className={
                    massActivation == false
                      ? "border-[.1em] p-[.9em] rounded-md cursor-pointer duration-300 bg-white"
                      : "border-[.1em] p-[.9em] rounded-md bg-indigo-500 cursor-pointer duration-300"
                  }
                  src={
                    massActivation == false ? "/check.svg" : "/check-white.svg"
                  }
                ></img>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3">Subject</p>
            <input
              placeholder="e.g. What happened"
              onChange={(event) => setSubject(event.target.value)}
              className="text-sm mt-2 block border-[.1em] rounded-md p-3 outline-blue-200 w-full"
            ></input>
            <p className="text-xs text-gray-600 mt-3">Content</p>
            <textarea
              placeholder="e.g. Something important"
              onChange={(event) => setContent(event.target.value)}
              className="text-sm mt-2 block border-[.1em] rounded-md p-3 outline-blue-200 h-[10em] w-full"
            ></textarea>
            <p
              onClick={() =>
                massActivation == true ? bunkSendMail() : sendMail(to, name)
              }
              className="cursor-pointer mt-3 bg-indigo-500 text-white p-3 text-center rounded-md text-xs"
            >
              Send Out the Fucking Email
            </p>
          </div>

          <div className="bg-white p-5 border-[.1em] rounded-md col-span-3 overflow-x-auto overflow-y-auto w-full xl:w-[35em] mt-5 xl:mt-0">
            <p className="text-xs">
              To:{" "}
              <span className="text-indigo-500">
                {massActivation == false ? to : "All"}
              </span>
            </p>
            <p className="text-xs">
              Subject: <span className="text-indigo-500">{subject}</span>
            </p>

            <p className="mt-2">HTML Preview: </p>
            <p className="text-[1.5em] mt-5">Dear {name}, </p>
            <div
              className="mt-3"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
