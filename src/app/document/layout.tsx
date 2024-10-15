"use client"

import { useState } from "react";

export default function Document() {
const [section, setSection] = useState(1)
const [search, setSearch] = useState("")

  return (
    <>
      <div className="lg:grid grid-cols-6 border-b-[.1em]">
        <div className="col-span-2 2xl:col-span-1 p-10 bg-gray-50 w-full h-full border-r-[.1em]">
        <p className="text-xl font-semibold">DotWebsHosting Document</p>
        <input onChange={(event) => setSearch(event.target.value.toLowerCase())} placeholder="Search for something..." className="outline-blue-200 rounded-md text-sm mt-5 border-[.1em] w-full p-2"></input>
        <ul className="mt-5">
        <li className="mb-2 text-sm font-semibold text-gray-600">Introduction</li>
        <div className={search.includes("introduction") || search == "" ? "block" : "hidden"}><li onClick={() => setSection(1)} className={section == 1 ? "text-sm bg-indigo-500 p-3 text-white rounded-md cursor-pointer hover:brightness-[90%] duration-300" : "text-sm p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300"}>📖 Introduction</li></div>
        <li className="mt-5 mb-2 text-sm font-semibold text-gray-600">Features</li>
        <div className={/hosting|panel/i.test(search) || search == "" ? "block" : "hidden"}><li onClick={() => setSection(2)} className={section == 2 ? "text-sm bg-indigo-500 p-3 text-white rounded-md cursor-pointer hover:brightness-[90%] duration-300" : "text-sm p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300"}>🖥️ Hosting Panel</li></div>
        <div className={/upload|files/i.test(search) || search == "" ? "block" : "hidden"}><li onClick={() => setSection(3)} className={section == 3 ? "text-sm bg-indigo-500 p-3 text-white rounded-md cursor-pointer hover:brightness-[90%] duration-300" : "text-sm p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300"}>📄 Upload Files</li></div>
        <div className={/accessing|website/i.test(search) || search == "" ? "block" : "hidden"}><li onClick={() => setSection(4)} className={section == 4 ? "text-sm bg-indigo-500 p-3 text-white rounded-md cursor-pointer hover:brightness-[90%] duration-300" : "text-sm p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300"}>🚪 Accessing Website</li></div>
        <li className="mt-5 mb-2 text-sm font-semibold text-gray-600">Domain</li>
        <div className={/connecting|domain/i.test(search) || search == "" ? "block" : "hidden"}><li onClick={() => setSection(5)} className={section == 5 ? "text-sm bg-indigo-500 p-3 text-white rounded-md cursor-pointer hover:brightness-[90%] duration-300" : "text-sm p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300"}>🌐 Connecting Domain</li></div>
        </ul>
        </div>
        <div className={section == 1 ? "col-span-4 2xl:col-span-5 p-10 bg-white w-full h-[150em]" : "hidden"}>
          <p className="text-3xl font-bold">Introduction</p>
          <p className="mt-5 text-gray-600">This will be the document explaining every necessary thing when using our hosting service.</p>
          <a onClick={() => setSection(2)} className="mt-10 block p-10 shadow-sm border-[.1em] rounded-xl font-semibold text-gray-600 cursor-pointer hover:brightness-[90%] duration-300">🖥️ Visit the next page — Hosting Panel</a>
        </div>
        <div className={section == 2 ? "col-span-4 2xl:col-span-5 p-10 bg-white w-full h-[150em]" : "hidden"}>
          <p className="text-3xl font-bold">Hosting Panel</p>
          <p className="mt-5 text-gray-600">This section will bring you a brief introduction to our Hosting panel.</p>
          <img className="border-[.1em] rounded-xl mt-5" src="/domain.png"></img>
          <p className="mt-5 text-xl font-semibold">The Domain Section</p>
          <p className="text-gray-600 mt-5">Every newly registered user will be given a free domain. The usage of the domain can be general like demonstrating the content as you want, running tests, or connecting it to your own custom domain linked with our hosting service. Your given domain may or may not work immediately. In some cases, it might take up to 48 hours for it to take effect.</p>
          <img className="border-[.1em] rounded-xl mt-5" src="/file.png"></img>
          <p className="mt-5 text-xl font-semibold">The Functionality Section</p>
          <p className="text-gray-600 mt-5">The functionality section includes two main parts, the stats zone and the upload zone. The stats zone demonstrates all the stats associated with the host service provided to the particular user, including hosted file count, total file size, and hosting status. The upload zone allows the user to upload files to our servers for the sake of hosting them.</p>
          <img className="border-[.1em] rounded-xl mt-5" src="/list.png"></img>
          <p className="mt-5 text-xl font-semibold">The List Section</p>
          <p className="text-gray-600 mt-5">This particular section shows all the hosted files that are uploaded to us. The user can see all the hosted files, remove particular files, or edit the names of particular files in this section. A search bar is also provided as a way to search for specific files.</p>
          <a onClick={() => setSection(3)} className="mt-10 block p-10 shadow-sm border-[.1em] rounded-xl font-semibold text-gray-600 cursor-pointer hover:brightness-[90%] duration-300">📄 Visit the next page — Upload Files</a>
        </div>
        <div className={section == 3 ? "col-span-4 2xl:col-span-5 p-10 bg-white w-full h-[150em]" : "hidden"}>
          <p className="text-3xl font-bold">Upload Files</p>
          <p className="mt-5 text-gray-600">It is very easy and straightforward to upload your files into our panel.</p>
          <img className="border-[.1em] rounded-xl mt-5" src="/file.png"></img>
          <p className="mt-5 text-xl font-semibold">Drag or Click</p>
          <p className="text-gray-600 mt-5">There is a huge box that includes the text &quot;Let us handle your files gently, drag them here. Or, you can actually click here.&quot;. The box allows the user to upload files by clicking the box and selecting hosting-wanted files or by dragging particular files into the box.</p>
          <a onClick={() => setSection(4)} className="mt-10 block p-10 shadow-sm border-[.1em] rounded-xl font-semibold text-gray-600 cursor-pointer hover:brightness-[90%] duration-300">🚪 Visit the next page — Accessing Website</a>
        </div>
        <div className={section == 4 ? "col-span-4 2xl:col-span-5 p-10 bg-white w-full h-[150em]" : "hidden"}>
          <p className="text-3xl font-bold">Accessing Website</p>
          <p className="mt-5 text-gray-600">Every single user will be given a free domain on registration.</p>
          <img className="border-[.1em] rounded-xl mt-5" src="/domain.png"></img>
          <p className="mt-5 text-xl font-semibold">Go to Your Given Domain</p>
          <p className="text-gray-600 mt-5">You can access your given domain by typing it in your search bar.</p>
          <a onClick={() => setSection(5)} className="mt-10 block p-10 shadow-sm border-[.1em] rounded-xl font-semibold text-gray-600 cursor-pointer hover:brightness-[90%] duration-300">🌐 Visit the next page — Connecting Domain</a>
        </div>
        <div className={section == 5 ? "col-span-4 2xl:col-span-5 p-10 bg-white w-full h-[500em]" : "hidden"}>
          <p className="text-3xl font-bold">Connecting Domain</p>
          <p className="mt-5 text-gray-600">It is possible to connect your own custom domain to your hosted site on DotWebsHosting. However, it might take some additional steps.</p>
          <img className="border-[.1em] rounded-xl mt-5" src="/domain.png"></img>
          <p className="mt-5 text-xl font-semibold">Open the Interface</p>
          <p className="text-gray-600 mt-5">To begin with, you might want to open the Connect to Custom Domain interface by clicking the &#34;Connect Your Own Domain&#34; text on the right side of the domain section of the panel.</p>
          <img className="border-[.1em] rounded-xl mt-5" src="/custom-domain.png"></img>
          <p className="mt-5 text-xl font-semibold">Overview</p>
          <p className="text-gray-600 mt-5">After you open the interface,<strong> you can submit the domain you would like to connect to us via the &#34;Submit to Our Database&#34; button with your domain submitted in the input field</strong>, and you might want to start following the steps. In this document, you will find all the necessary steps in detail.</p>
          <img className="border-[.1em] rounded-xl mt-5" src="/namecheap-1.png"></img>
          <p className="mt-5 text-xl font-semibold">Log in to Your Domain Provider</p>
          <p className="text-gray-600 mt-5">In this case, I will be using Namecheap as an example of connecting your custom domain to our hosting service. It is surely welcome to use other providers. It depends on you.</p>
          <img className="border-[.1em] rounded-xl mt-5" src="/namecheap-2.png"></img>
          <p className="mt-5 text-xl font-semibold">Open Your Domain DNS Settings</p>
          <p className="text-gray-600 mt-5">If you see options like &#34;Advanced DNS&#34; or &#34;DNS Settings&#34;. It might indicate that it is the correct place for you to link your custom domain to us.</p>
          <img className="border-[.1em] rounded-xl mt-5" src="/namecheap-3.png"></img>
          <p className="mt-5 text-xl font-semibold">Add A CNAME Record with @ in the Host section and Your DotWebsHosting subdomain in the Value section</p>
          <p className="text-gray-600 mt-5">You might want to add a new type of CNAME record regarding how your domain provider lets you do the current step. As shown in the photo, the record should be in the form of CNAME, the host value should be &#34;@&#34;, and the value of the record should be entered according to your given domain. TTL will be up to you, it depends on how long until you want to make your domain work.</p>
          <img className="border-[.1em] rounded-xl mt-5" src="/http.png"></img>
          <p className="mt-5 text-xl font-semibold">HTTP</p>
          <p className="text-gray-600 mt-5">At this point, you should be able to access your website via your custom domain with HTTP access.</p>
          <hr className="mt-10 mb-10"></hr>
          <p className="mt-5 text-xl font-semibold">HTTPS Solution</p>
          <p className="text-gray-600 mt-5">As we are still working on the HTTPS certification feature for our users, you might consider an alternative way to secure your site with HTTPS using Cloudflare along with our hosting service.</p>
          <a onClick={() => setSection(1)} className="mt-10 block p-10 shadow-sm border-[.1em] rounded-xl font-semibold text-gray-600 cursor-pointer hover:brightness-[90%] duration-300">📖 Visit the next page — Introduction</a>
        </div>
      </div>
    </>
  );
}
