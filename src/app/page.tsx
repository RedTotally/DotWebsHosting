"use client"

import Link from "next/link";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Home() {

  const [loggedIn, setLoggedIn] = useState(false)
  const cookie = getCookie("_a")

  async function checkLoggedIn() {
    if(cookie){
      if(cookie.length > 0){
        setLoggedIn(true)
      }
    }
  }

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <>
      <div className="p-10 lg:p-20 xl:flex items-center justify-between">
        <div>
          <p className="text-5xl lg:text-8xl font-bold">
            Work Easy,<br></br> Work Smoothly.
          </p>
          <p className="mt-5 text-xl text-gray-600">
            The Best Hosting Service Ever Created for Newbie Developers.
          </p>
          <div className="lg:flex items-center mt-5">
            <Link href={loggedIn == false ? "/register" : "/"} className="cursor-pointer block bg-black text-white p-5 rounded-md hover:brightness-[90%] duration-300">
              Get DoWebsHosting Free
            </Link>
            <Link target="_blank" href={"https://godotwebs.com"} className="block py-5 lg:p-5 ml-5 cursor-pointer hover:before:scale-x-100 lg:hover:before:origin-left relative lg:before:w-full before:h-[.1em] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-500 before:absolute before:left-0 before:bottom-0">
              Learn About GoDotWebs
            </Link>
          </div>
        </div>
        <div>
          <img className="mt-10 lg:mt-0 xl:w-[55em]" src="/3d.png"></img>
        </div>
      </div>

      <div className="p-10 lg:p-20">
        <div>
          <img
            className="border-[.1em] shadow-sm rounded-xl"
            src="/overview.png"
          ></img>
        </div>

        <div className="mt-20">
          <p className="text-3xl lg:text-7xl font-bold">
            It is as simple<br></br> as it could be.
          </p>
          <p className="mt-5 lg:text-xl text-gray-600">
            Host your website by a drag or a simple upload.
          </p>
          <p className="mt-1 lg:text-xl text-gray-600">
            We are clearing all the murky fog &#x2768; Complicated Hosting Steps
            &#x2769; that newbie developers will face.
          </p>
        </div>

        <div className="mt-10 lg:grid grid-cols-3 gap-10">
          <div>
            <img className="w-[5em]" src="/speed.svg"></img>
            <p className="text-3xl xl:text-5xl">Extreme Speed</p>
            <p className="mt-5 text-gray-600">
            Extreme speed from any aspect is guaranteed. As for calculation and recordings, transferring files of a GB size only costs 2 minutes; small files do not even take time to transfer.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <img className="w-[5em]" src="/web.svg"></img>
            <p className="text-3xl xl:text-5xl">Simplified UI</p>
            <p className="mt-5 text-gray-600">
            As we are dedicated to providing the best service for newbie developers, a neat and clean control panel will be provided by us. It takes no time to learn. With a few clicks, your website will be done hosting.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <img className="w-[5em]" src="/server.svg"></img>
            <p className="text-3xl xl:text-5xl">Stable Server</p>
            <p className="mt-5 text-gray-600">
            Our servers run 24/7 and there is a fixed status check on it. There will not be any severe damage caused to your hosted site at any time and with any possibility. Your website and files are in a safe circumstance.
            </p>
          </div>
        </div>

        <p className="text-3xl xl:text-6xl mt-20 font-bold">
          A document teaching all the necessary things.
        </p>
        <img
          className="border-[.1em] shadow-sm rounded-xl mt-20"
          src="/placeholder.png"
        ></img>

        <div>
          <p className="font-bold text-3xl xl:text-6xl mt-20 lg:w-[15em]">
          What's the purpose of the DotWebsHosting?
          </p>
        </div>
        <p className="mt-5 lg:text-xl text-gray-600">
        Dedicated to assisting newbie developers who just finished their tutorial.
        </p>

        <iframe className="border-[.1em] shadow-sm rounded-xl mt-10 w-full h-[60em]"
src="https://www.youtube.com/embed/C5STXQvnPmk">
</iframe>

        <div className="flex justify-center mt-20"><img className="lg:w-[15em]" src="/godotwebs.png"></img></div>
        <p className="text-center mt-5 text-2xl">Service Under The GoDotWebs System.</p>
        <div className="flex justify-center mt-5 text-gray-600"><p className="text-sm lg:w-[50em] text-center">GoDotWebs is our main brand and company. The GoDotWebs system stores all the accounts associated with our services when you register an account on any platform under the GoDotWebs system. It means that with one single account stored in our main database, you can access the services we provide. That cut out so much time and was more efficient and safe. As we value every single one of our users, we wish you to be one of us too.</p></div>
      
      <div className="flex justify-center"><p className="text-3xl lg:text-6xl mt-20 text-center lg:w-[15em]">Want to have a taste of our hosting service?</p></div>
      <div className="flex justify-center mt-10"><Link href={loggedIn == false ? "/register" : "/"} className="text-center bg-black px-10 p-5 text-white rounded-md cursor-pointer hover:brightness-[90%] duration-300">Get DotWebsHosting Free</Link></div>
      </div>
    </>
  );
}
