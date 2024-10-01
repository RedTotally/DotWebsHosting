export default function Document() {
  return (
    <>
      <div className="lg:grid grid-cols-6 border-b-[.1em]">
        <div className="col-span-2 2xl:col-span-1 p-10 bg-gray-50 w-full h-full border-r-[.1em]">
        <p className="text-xl font-semibold">DotWebsHosting Document</p>
        <input placeholder="Search for something..." className="outline-blue-200 rounded-md text-sm mt-5 border-[.1em] w-full p-2"></input>
        <ul className="mt-5">
        <li className="mb-2 text-sm font-semibold text-gray-600">Introduction</li>
        <li className="text-sm bg-indigo-500 p-3 text-white rounded-md cursor-pointer hover:brightness-[90%] duration-300">📖 Introduction</li>
        <li className="mt-5 mb-2 text-sm font-semibold text-gray-600">Features</li>
        <li className="text-sm p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300">🖥️ Hosting Panel</li>
        <li className="text-sm p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300">📄 Upload Files</li>
        <li className="text-sm p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300">🚪 Accessing Website</li>
        <li className="mt-5 mb-2 text-sm font-semibold text-gray-600">Domain</li>
        <li className="text-sm p-3 rounded-md cursor-pointer hover:brightness-[90%] duration-300">🌐 Connecting Domain</li>
        </ul>
        </div>
        <div className="col-span-4 2xl:col-span-5 p-10 bg-white w-full h-[150em]">
          <p className="text-3xl font-bold">Introduction</p>
          <p className="mt-5 text-gray-600">This will be the document explaining every necessary thing when using our hosting service.</p>
          <a className="mt-10 block p-10 shadow-sm border-[.1em] rounded-xl font-semibold text-gray-600 cursor-pointer hover:brightness-[90%] duration-300">🖥️ Visit the next page — Hosting Panel</a>
        </div>
      </div>
    </>
  );
}
