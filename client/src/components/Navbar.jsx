import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch, FaCaretDown, FaBars, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

// --- BIG LIST OF CITIES ---
const cities = [
    "Hajipur", "Patna", "Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", 
    "Chennai", "Kolkata", "Ahmedabad", "Chandigarh", "Jaipur", "Lucknow", "Indore", 
    "Agra", "Shimla", "Goa", "Varanasi", "Surat", "Bhopal", "Visakhapatnam"
];

const Navbar = ({ setSearchTerm, city, setCity }) => {
    const [localSearch, setLocalSearch] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
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
        navigate("/");
    };

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* --- 1. Logo --- */}
                    <Link to="/" className="flex-shrink-0">
                        <h1 className="text-3xl font-extrabold text-black italic tracking-tight">
                            somato
                        </h1>
                    </Link>

                    {/* --- 2. CENTER SEARCH BAR WITH LOCATION (Hidden on mobile) --- */}
                    <div className="hidden md:flex flex-grow max-w-2xl mx-8 shadow-sm border border-gray-200 rounded-lg bg-white h-12">
                        
                        {/* Location Selector Section */}
                        <div className="flex items-center w-1/3 border-r border-gray-200 px-3">
                            <FaMapMarkerAlt className="text-zomatoRed text-lg mr-2" />
                            <select 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full bg-transparent outline-none text-gray-700 cursor-pointer text-sm truncate"
                            >
                                {cities.sort().map((cityOption) => (
                                    <option key={cityOption} value={cityOption}>{cityOption}</option>
                                ))}
                            </select>
                        </div>

                        {/* Search Input Section */}
                        <form onSubmit={handleSearch} className="flex items-center w-2/3 px-3">
                            <FaSearch className="text-gray-400 text-lg mr-2" />
                            <input
                                type="text"
                                placeholder="Search for restaurant, cuisine..."
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                className="w-full bg-transparent outline-none text-gray-700 text-sm"
                            />
                        </form>
                    </div>

                    {/* --- 3. Right Section: Auth/Profile --- */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center text-gray-700 font-medium p-2 rounded-full hover:bg-gray-100 transition">
                                    <img src={user.image} alt="User" className="w-8 h-8 rounded-full mr-2 border border-gray-300" />
                                    <span className="text-lg hidden sm:inline">{user.name || "User"}</span>
                                    <FaCaretDown className="ml-1 text-xs" />
                                </button>
                                
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </Link>
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-lg text-gray-400 font-light hover:text-gray-600 transition">
                                    Log in
                                </Link>
                                <Link to="/login" className="text-lg text-gray-400 font-light hover:text-gray-600 transition">
                                    Sign up
                                </Link>
                            </div>
                        )}
                        
                        <button 
                            className="text-xl text-gray-700 md:hidden ml-2" 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                {/* --- 4. Mobile Menu --- */}
                {isMenuOpen && (
                    <div className="md:hidden pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                        {/* Mobile Location Selector */}
                        <div className="flex items-center border border-gray-300 rounded-lg p-2 mb-2 bg-white">
                            <FaMapMarkerAlt className="text-zomatoRed mr-2" />
                            <select 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full bg-transparent outline-none text-gray-700"
                            >
                                {cities.sort().map((cityOption) => (
                                    <option key={cityOption} value={cityOption}>{cityOption}</option>
                                ))}
                            </select>
                        </div>

                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="flex w-full mb-3 border border-gray-300 rounded-lg overflow-hidden bg-white">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                className="flex-grow p-2 text-sm focus:outline-none"
                            />
                             <button type="submit" className="bg-zomatoRed text-white px-3 hover:bg-red-600 transition">
                                <FaSearch />
                            </button>
                        </form>
                        
                        {user ? (
                            <>
                                <Link to="/profile" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                                    Profile
                                </Link>
                                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md">
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                                Log In / Sign Up
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;