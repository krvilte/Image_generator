import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex justify-between self-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/" className="w-28 flex self-center">
        <span className="font-bold text-xl text-blue-500">Cape.ai</span>
      </Link>

      <Link
        to="/create-post"
        className="font-medium bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Create
      </Link>
    </nav>
  );
}

export default Navbar;
