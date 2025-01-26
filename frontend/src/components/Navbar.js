import React from "react";
import { Link } from "react-router-dom";
import { FaSun, FaRegMoon, FaHistory } from "react-icons/fa"; 

function Navbar({ toggleTheme, isDarkMode }) {
    return (
        <nav className={`px-4 py-5 flex justify-between items-center ${isDarkMode ? "text-white" : "text-gray-700"}`}>
        <div className="text-lg font-bold">
            <Link to="/" className="hover:text-green-300">
            TextScorer
            </Link>
        </div>
        <div className="space-x-4 flex">
            <Link to="/" className="hover:text-green-300 hover:scale-105 duration-200">
            Home
            </Link>
            <Link to="/analyze" className="hover:text-green-300 hover:scale-105 duration-200">
            Analyze
            </Link>
            <Link to="/history" className="hover:text-green-300 mt-1 hover:scale-105 duration-200">
            <FaHistory  size={16} />
            </Link>
            <button
            onClick={toggleTheme}
            className=" text-white px-3 py-1 rounded transition flex items-center hover:scale-105 duration-200"
            >
            {isDarkMode ? (
                <FaSun size={18} className="text-yellow-300" />
            ) : (
                <FaRegMoon size={18} className="text-gray-300" />
            )}
        </button>
        </div>
        </nav>
    );
    }

export default Navbar;
