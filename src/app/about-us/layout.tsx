"use client"

import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      <div className="p-10">
        <div className="flex justify-center mt-10">
          <div className="lg:w-[50em]">
            <div className="lg:flex items-center">
              <div>
                <p className="lg:text-xl text-gray-600 font-semibold">
                  Product of the GoDotWebs.
                </p>
                <p className="text-2xl lg:text-4xl font-bold">
                  We bring hope to reality,<br></br> in <span className="text-indigo-500">Hong Kong.</span>
                </p>
                <p className="mt-3">
                  The idea of GoDotWebs was fostered in Hong Kong, we keep
                  getting improved. Websites that just work.
                </p>
                <div className="mt-6">
                  <Link target="_blank" href={"https://godotwebs.com/about-us"} className="text-sm bg-black text-white px-5 p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300">
                    Learn more about GoDotWebs
                  </Link>
                </div>
              </div>
              <img
                className="mt-10 lg:mt-0 lg:w-[20em]"
                src="/godotwebs-3d.png"
              ></img>
            </div>
          </div>
        </div>

        <img className="rounded-xl mt-10 lg:mt-20" src="/banner.png"></img>

        <div className="mt-20 flex justify-center">
          <div>
            <p className="text-xl lg:text-3xl lg:w-[15em] text-center font-semibold">
              We are a network, filled with potential & web apps.
            </p>
            <div className="flex justify-center">
              {" "}
              <img className="lg:w-[25em]" src="/brands-in-3d.png"></img>
            </div>
            <div className="flex justify-center mt-5"><Link target="_blank" href={"https://godotwebs.com/"} className="text-center text-xl underline cursor-pointer">Learn more about our company and services</Link></div>
          </div>
        </div>
      </div>
    </>
  );
}
