// Copied and modified from here: https://dev.to/andrewespejo/how-to-design-a-simple-and-beautiful-navbar-using-nextjs-and-tailwindcss-26p1

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="flex items-center flex-wrap bg-gray-700 p-3">
        <Link href="/" className="inline-flex items-center p-2 mr-4">
          <Image src="/images/logo.png" alt="" width="150" height="25" />
        </Link>
        <button
          className=" inline-flex p-3 hover:bg-gray-900 rounded lg:hidden text-gray-100 ml-auto hover:text-gray-100 outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link
              href="/"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-100 font-bold items-center justify-center hover:bg-gray-900 hover:text-gray-100 "
            >
              Home
            </Link>
            <Link
              href="/schedule"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-100 font-bold items-center justify-center hover:bg-gray-900 hover:text-gray-100"
            >
              Schedule
            </Link>
            <Link
              href="/about"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-100 font-bold items-center justify-center hover:bg-gray-900 hover:text-gray-100"
            >
              About
            </Link>
            <Link
              href="/"
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-100 font-bold items-center justify-center hover:bg-gray-900 hover:text-gray-100"
            >
              Contact us
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
