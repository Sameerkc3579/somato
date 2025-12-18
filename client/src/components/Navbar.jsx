import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaCaretDown,
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const cities = [
  "Hajipur","Patna","Delhi NCR","Mumbai","Bengaluru","Pune","Hyderabad",
  "Chennai","Kolkata","Ahmedabad","Chandigarh","Jaipur","Lucknow","Indore",
  "Agra","Shimla","Goa","Varanasi","Surat","Bhopal","Visakhapatnam"
];

const Navbar = ({ setSearchTerm, city, setCity }) => {
  const [localSearch, setLocalSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 1. New State for Profile Dropdown
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout, setUser } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(localSearch);
    navigate("/delivery");
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsProfileOpen(false); // Close dropdown on logout
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-[100] bg-[#F4F6FB] border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-[72px] flex items-center justify-between gap-6">

          {/* LOGO */}
          <Link to="/home">
            <h1 className="text-3xl font-bold italic text-[#EF4F5F]">
              somato
            </h1>
          </Link>

          {/* LOCATION + SEARCH */}
          <div className="hidden md:flex items-center w-[520px] bg-[#F8FAFC] border border-[#E8E8E8] rounded-lg px-4 py-2 gap-3 shadow-sm">
            {/* Location */}
            <div className="flex items-center gap-2 text-[#EF4F5F] font-medium">
              <FaMapMarkerAlt />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-sm text-[#333]"
              >
                {cities.sort().map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="h-5 w-px bg-[#E8E8E8]" />

            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1">
              <FaSearch className="text-[#828282]" />
              <input
                type="text"
                placeholder="Search for restaurant, cuisine..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-[#333]"
              />
            </form>
          </div>

          {/* USER PROFILE SECTION */}
          {user ? (
            <div className="relative">
              {/* 2. Added onClick to toggle state and cursor-pointer */}
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-[#EF4F5F] text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-[#e03e4e] transition-colors select-none"
              >
                <span className="bg-white text-[#EF4F5F] rounded-full px-2 py-1 text-xs font-bold">
                  {user.name?.[0] || "U"}
                </span>
                {user.name || "User"}
                <FaCaretDown className={`text-xs transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
              </div>

              {/* 3. The Actual Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#EF4F5F]"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#EF4F5F]"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex gap-4 text-[#696969] text-lg font-light">
              <Link to="/login" className="hover:text-[#EF4F5F]">Log in</Link>
              <Link to="/login" className="hover:text-[#EF4F5F]">Sign up</Link>
            </div>
          )}

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-xl text-[#696969]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 p-3 bg-[#F8FAFC] border border-[#E8E8E8] rounded-lg space-y-3 shadow-lg">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                className="flex-1 border border-[#E8E8E8] rounded-lg px-3 py-2 text-sm outline-none"
                placeholder="Search..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <button className="bg-[#EF4F5F] text-white px-4 rounded-lg">
                <FaSearch />
              </button>
            </form>

            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-[#E8E8E8] rounded-lg px-3 py-2 text-sm outline-none bg-white"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {user ? (
              <>
                <Link to="/profile" className="block text-gray-700 text-sm font-medium py-1">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 text-sm font-medium w-full text-left py-1"
                >
                  Log out
                </button>
              </>
            ) : (
                <div className="flex flex-col gap-2">
                    <Link to="/login" className="text-gray-600">Log in</Link>
                    <Link to="/signup" className="text-gray-600">Sign up</Link>
                </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;