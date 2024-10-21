import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md px-2">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Estate</span>
            <span className="text-slate-700">Agency</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <nav className="flex gap-4   sm:flex">
          <Link
            to="/"
            className="cursor-pointer text-slate-700 hover:underline"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="cursor-pointer text-slate-700 hover:underline"
          >
            About
          </Link>
          <Link
            to="/signin"
            className="cursor-pointer text-slate-700 hover:underline"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
