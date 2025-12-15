import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import Collections from "../components/Collections";

// --- BIG LIST OF CITIES ---
const cities = [
  "Hajipur", "Patna", "Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", 
  "Chennai", "Kolkata", "Ahmedabad", "Chandigarh", "Jaipur", "Lucknow", "Indore", 
  "Gangtok", "Nashik", "Ooty", "Shimla", "Ludhiana", "Guwahati", "Amritsar", 
  "Kanpur", "Allahabad", "Ranchi", "Visakhapatnam", "Bhubaneswar", "Coimbatore", 
  "Mangalore", "Vadodara", "Nagpur", "Agra", "Dehradun", "Mysore", "Puducherry", 
  "Surat", "Varanasi", "Bhopal", "Srinagar", "Raipur", "Gorakhpur"
];

const Home = () => {
  const [city, setCity] = useState("Hajipur");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate("/delivery");
    }
  };

  return (
    <>
      <section className="relative w-full h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold italic font-sans mb-4">
            somato
          </h1>
          <p className="text-2xl md:text-4xl font-light mb-8">
            Discover the best food & drinks in your city
          </p>

          {/* --- SEARCH BAR --- */}
          <form 
            onSubmit={handleSearch} 
            className="bg-white p-3 rounded-xl flex flex-col md:flex-row items-center w-full max-w-2xl shadow-lg text-black"
          >
              {/* CITY DROPDOWN */}
              <div className="flex items-center gap-2 border-b md:border-b-0 md:border-r border-gray-300 pb-2 md:pb-0 md:pr-4 w-full md:w-1/3 mb-2 md:mb-0">
                  <span className="text-zomatoRed text-2xl">📍</span>
                  <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full outline-none text-gray-700 bg-transparent cursor-pointer text-lg"
                  >
                    {cities.sort().map((cityOption) => (
                      <option key={cityOption} value={cityOption}>{cityOption}</option>
                    ))}
                  </select>
              </div>

              {/* SEARCH INPUT */}
              <div className="flex items-center gap-2 md:pl-4 w-full md:w-2/3">
                  <span className="text-gray-400 text-xl">🔍</span>
                  <input 
                      type="text" 
                      placeholder="Search for restaurant, cuisine or a dish" 
                      className="w-full outline-none text-gray-700 text-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
          </form>
        </div>
      </section>

      <CategoryCard />
      <Collections />
    </>
  );
};

export default Home;