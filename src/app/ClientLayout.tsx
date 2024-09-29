"use client";

import { useState } from "react";
import Link from "next/link";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuVisibility, setMenuVisibility] = useState(false);

  return (
    <>
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
            src="menu.svg"
          ></img>
        </div>
        <div
          className={
            menuVisibility == false
              ? "top-0 left-[100em] lg:left-0 py-5 p-10 lg:p-0 fixed lg:relative lg:flex items-center bg-white lg:bg-transparent w-full h-full lg:w-auto lg:h-auto z-[99] duration-300"
              : "top-0 left-[0] py-5 p-10 lg:p-0 fixed lg:relative lg:flex items-center bg-white lg:bg-transparent w-full h-full lg:w-auto lg:h-auto z-[99] duration-300"
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
              src="close.svg"
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
            className="mt-5 lg:mt-0 lg:mx-5"
          ></div>
          <Link
            onClick={() => setMenuVisibility(false)}
            href={"/document"}
            className="text-3xl lg:text-base cursor-pointer hover:before:scale-x-100 lg:hover:before:origin-left relative lg:before:w-full before:h-[.1em] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-500 before:absolute before:left-0 before:bottom-0"
          >
            Document
          </Link>
          <div className="mt-5 lg:mt-0 lg:mx-5"></div>
          <Link
            onClick={() => setMenuVisibility(false)}
            href={"/"}
            className="block text-sm cursor-pointer bg-black text-white px-5 py-5 lg:py-2 rounded-md hover:brightness-[90%] duration-300"
          >
            Get DoWebsHosting Free
          </Link>
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
