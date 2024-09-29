export default function Home() {
  return (
    <>
      <div className="p-10 lg:p-20 xl:flex items-center justify-between">
        <div>
          <p className="text-5xl lg:text-8xl font-bold">
            Work Easy,<br></br> Work Smoothly.
          </p>
          <p className="mt-5 text-xl">
            The Best Hosting Service Ever Created for Newbie Developers.   
          </p>
          <div className="lg:flex items-center mt-5"><a className="cursor-pointer block bg-black text-white p-5 rounded-md hover:brightness-[90%] duration-300">Get DoWebsHosting Free</a><a className="block py-5 lg:p-5 ml-5 cursor-pointer hover:before:scale-x-100 lg:hover:before:origin-left relative lg:before:w-full before:h-[.1em] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-500 before:absolute before:left-0 before:bottom-0">Learn About GoDotWebs</a></div>
        </div>
        <div>
          <img className="mt-10 lg:mt-0 xl:w-[55em]" src="/3d.png"></img>
        </div>
      </div>
    </>
  );
}
