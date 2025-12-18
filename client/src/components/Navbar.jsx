import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaCaretDown,
  FaMapMarkerAlt,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const cities = [
  "Hajipur","Patna","Delhi NCR","Mumbai","Bengaluru","Pune","Hyderabad",
  "Chennai","Kolkata","Ahmedabad","Chandigarh","Jaipur","Lucknow","Indore",
  "Agra","Shimla","Goa","Varanasi","Surat","Bhopal","Visakhapatnam"
];

const Navbar = ({ setSearchTerm, city, setCity }) => {
  const [localSearch, setLocalSearch] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout, setUser } = useAuth();

  // Helper to get initials (e.g. "Sameer Choudhary" -> "SC")
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(localSearch);
    navigate("/delivery");
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsProfileOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-[#E8E8E8] shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="h-[72px] flex items-center justify-between gap-2 md:gap-6">

          {/* 1. LOGO (Shrinks slightly on mobile to make room) */}
          <Link to="/home" className="flex-shrink-0">
            <h1 className="text-3xl font-extrabold italic text-[#EF4F5F] tracking-lighter">
              somato
            </h1>
          </Link>

          {/* 2. SEARCH BAR & CITY (Visible on Mobile now - replaces Name space) */}
          <div className="flex-1 flex items-center bg-[#F8FAFC] border border-[#E8E8E8] rounded-lg px-2 py-1.5 md:px-4 md:py-2 gap-2 shadow-sm max-w-[65%] md:max-w-[520px]">
            
            {/* Location Selector */}
            <div className="flex items-center gap-1 text-[#EF4F5F] font-medium border-r border-[#E8E8E8] pr-2 w-[35%] md:w-auto relative">
              <FaMapMarkerAlt className="text-sm md:text-base flex-shrink-0" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-xs md:text-sm text-[#333] w-full appearance-none truncate font-medium"
              >
                {cities.sort().map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {/* Caret icon hidden on very small screens to save space */}
              <FaCaretDown className="hidden md:block text-xs text-gray-400" />
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 min-w-0">
              <FaSearch className="text-[#828282] text-sm md:text-base flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-xs md:text-sm text-[#333] placeholder:text-gray-400"
              />
            </form>
          </div>

          {/* 3. USER PROFILE SECTION (Replaces Hamburger Menu on Mobile) */}
          <div className="flex items-center">
            {user ? (
              <div className="relative">
                {/* Avatar Circle (Initials) - Click to toggle dropdown */}
                <div 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  {/* The Circle Avatar */}
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#EF4F5F] text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-md hover:bg-[#e03e4e] transition-colors border-2 border-white">
                    {getInitials(user.name)}
                  </div>

                  {/* Name Text (Visible ONLY on Desktop, Hidden on Mobile) */}
                  <div className="hidden md:flex items-center gap-1 text-gray-700 font-medium text-sm">
                    {user.name}
                    <FaCaretDown className={`transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                  </div>
                </div>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    {/* User Info Header in Dropdown (Mobile mostly) */}
                    <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                        <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500">View account</p>
                    </div>

                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#EF4F5F]"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaUser className="text-xs" /> Profile
                    </Link>
                    
                    <div className="h-px bg-gray-100 my-1"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#EF4F5F]"
                    >
                      <FaSignOutAlt className="text-xs" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login/Signup Links (Condensed on mobile)
              <div className="flex gap-2 md:gap-4 text-[#696969] text-sm md:text-lg font-light">
                <Link to="/login" className="hover:text-[#EF4F5F]">Log in</Link>
                <Link to="/signup" className="hidden md:block hover:text-[#EF4F5F]">Sign up</Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;