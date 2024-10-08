"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function InternalHosting() {
  const cookie = getCookie("_a");

  const [lock, setLock] = useState(false);

  async function checkAdmin() {
    console.log(cookie);
    if (cookie) {
      if (cookie !== "552056964") {
        window.location.replace("/");
        setLock(true);
      }
    } else {
      window.location.replace("/");
      setLock(true);
    }
  }

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <>
      <div className={lock == false ? "block p-10" : "hidden"}>

        <div className="bg-white border-[.1em] p-10 rounded-md shadow-sm">
          <div className="grid grid-cols-5">
          <p className="font-semibold">Hosting Name</p>
            <p className="font-semibold">Hosting IP</p>
            <p className="font-semibold">Port</p>
            <p className="font-semibold">N/A</p>
            <p className="font-semibold">Status</p>
          </div>
          <div className="grid grid-cols-5 mt-5">
          <p>Odoo Hosting</p>
            <p>192.168.0.82</p>
            <p>8000</p>
            <p>N/A</p>
            <p className="text-green-500">Activated</p>
          </div>
        </div>
      </div>
    </>
  );
}
