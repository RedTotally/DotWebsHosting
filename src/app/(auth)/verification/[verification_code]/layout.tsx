"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getCookie } from "cookies-next";
import {
  getFirestore,
  updateDoc,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";

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

export default function Verification() {
  const lvc = useParams()?.verification_code;
  const [username, setUsername] = useState("");
  const cookie = getCookie("_a");

  console.log(username)

  async function matchValues() {
    if (!lvc) {
      console.log("Verification code is missing.");
      return;
    }

    try {
      const q = query(
        collection(db, "Users"),
        where("Verification_Code", "==", lvc)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Cannot find user with verification code.");
        return;
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUsername(data.Fixed_Username);

        if (data.Verified) {
          console.log("User already verified.");
        } else {
          console.log("User not verified. Verifying now...");
          updateDoc(doc.ref, { Verified: true });
          window.location.reload()
        }
      });
    } catch (error) {
      console.error("Error matching values: ", error);
    }
  }

  async function checkUser() {
    if (!cookie) {
      console.log("Cookie is missing.");
      return;
    }

    try {
      const q = query(collection(db, "Users"), where("Code", "==", Number(cookie)));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Cannot find user with cookie.");
        return;
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUsername(data.Fixed_Username);
        if (data.Verified) {
          console.log("User already verified.");
        } else {
          console.log("User not verified yet.");
        }
      });
    } catch (error) {
      console.error("Error checking user: ", error);
    }
  }

  useEffect(() => {
    async function verifyUser() {
      await checkUser();
      await matchValues();
    }

    verifyUser();
  }, []);

  return (
    <div className="p-10 mt-28">
      <div className="flex justify-center">
        <img className="w-[15em]" src="/undraw_agree_re_hor9.svg" alt="Illustration" />
      </div>
      <p className="text-center text-3xl font-bold mt-5">You are all set!</p>
      <p className="text-center text-sm mt-1">Now you may return back to using our service.</p>
      <p className="text-center text-sm mt-5">Verification ID: {lvc}</p>
    </div>
  );
}
