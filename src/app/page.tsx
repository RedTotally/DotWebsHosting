export default function Home() {
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
            <a className="cursor-pointer block bg-black text-white p-5 rounded-md hover:brightness-[90%] duration-300">
              Get DoWebsHosting Free
            </a>
            <a className="block py-5 lg:p-5 ml-5 cursor-pointer hover:before:scale-x-100 lg:hover:before:origin-left relative lg:before:w-full before:h-[.1em] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-500 before:absolute before:left-0 before:bottom-0">
              Learn About GoDotWebs
            </a>
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
            <p className="mt-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum,
              consequatur debitis? Necessitatibus eum quam corrupti dicta,
              consequatur eligendi voluptatibus officiis, doloremque deleniti
              explicabo ratione sequi!
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <img className="w-[5em]" src="/web.svg"></img>
            <p className="text-3xl xl:text-5xl">Simplified UI</p>
            <p className="mt-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum,
              consequatur debitis? Necessitatibus eum quam corrupti dicta,
              consequatur eligendi voluptatibus officiis, doloremque deleniti
              explicabo ratione sequi!
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <img className="w-[5em]" src="/server.svg"></img>
            <p className="text-3xl xl:text-5xl">Stable Server</p>
            <p className="mt-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum,
              consequatur debitis? Necessitatibus eum quam corrupti dicta,
              consequatur eligendi voluptatibus officiis, doloremque deleniti
              explicabo ratione sequi!
            </p>
          </div>
        </div>



      </div>
    </>
  );
}
