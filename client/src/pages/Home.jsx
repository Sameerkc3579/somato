import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- BIG LIST OF CITIES (For the Hero Dropdown) ---
const cities = [
  "Hajipur", "Patna", "Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", 
  "Chennai", "Kolkata", "Ahmedabad", "Chandigarh", "Jaipur", "Lucknow", "Indore", 
  "Gangtok", "Nashik", "Ooty", "Shimla", "Ludhiana", "Guwahati", "Amritsar", 
  "Kanpur", "Allahabad", "Ranchi", "Visakhapatnam", "Bhubaneswar", "Coimbatore", 
  "Mangalore", "Vadodara", "Nagpur", "Agra", "Dehradun", "Mysore", "Puducherry", 
  "Surat", "Varanasi", "Bhopal", "Srinagar", "Raipur", "Gorakhpur"
];

// 🚨 ACCEPT PROPS (city, setCity) 🚨
const Home = ({ city, setCity }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate("/delivery");
    }
  };

  // --- 🚨 FIXED CARDS DATA (Replaces CategoryCard) 🚨 ---
  const cards = [
    {
      title: "Order Online",
      description: "Stay home and order to your doorstep",
      cover: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "/delivery"
    },
    {
      title: "Dining",
      description: "View the city's favourite dining venues",
      cover: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "/dining-out" // Note: Ensure you have a route for this or redirect to delivery
    },
    {
      title: "Live Events",
      description: "Discover India's best events & concerts",
      cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "/nightlife" // Note: Ensure you have a route for this or redirect to delivery
    }
  ];

  return (
    <div className="pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[500px]">
        {/* Background Image */}
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
            Discover the best food & drinks in <span className="font-bold">{city}</span>
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

      {/* --- 🚨 FIXED CATEGORY CARDS SECTION 🚨 --- */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {cards.map((card, index) => (
              <Link to={card.link} key={index} className="transform transition duration-300 hover:-translate-y-2 block">
                  <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 bg-white h-full">
                      <div className="h-48 overflow-hidden">
                          <img 
                            src={card.cover} 
                            alt={card.title} 
                            className="w-full h-full object-cover transition duration-500 hover:scale-110"
                          />
                      </div>
                      <div className="p-4">
                          <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                          <p className="text-gray-500 mt-1 text-sm">{card.description}</p>
                      </div>
                  </div>
              </Link>
           ))}
        </div>
      </div>

      {/* --- 🚨 COLLECTIONS SECTION (Integrated Directly) 🚨 --- */}
      <div className="max-w-6xl mx-auto px-4 mt-16 mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Collections</h2>
        <div className="flex justify-between items-end mb-6">
          <p className="text-gray-500 text-lg">
            Explore curated lists of top restaurants, cafes, pubs, and bars in your city, based on trends
          </p>
          <span className="text-zomatoRed text-sm cursor-pointer hover:underline hidden md:block">
            All collections in {city} ▶
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* CARD 1: Trending */}
            <Link to="/collections/trending" className="relative h-80 rounded-xl overflow-hidden cursor-pointer group">
                <img 
                  src="https://b.zmtcdn.com/data/collections/684397cd092de8a3631e121ca977bc47_1674241263.jpg" 
                  alt="Trending"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                    <h3 className="text-white text-xl font-bold">Top Trending Spots</h3>
                    <p className="text-white text-sm">29 Places ▶</p>
                </div>
            </Link>

            {/* CARD 2: Events */}
            <Link to="/collections/events" className="relative h-80 rounded-xl overflow-hidden cursor-pointer group">
                <img 
                  src="https://b.zmtcdn.com/data/collections/e001bf04fb209dc7b744434752b75a4d_1674241263.jpg" 
                  alt="Events"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                    <h3 className="text-white text-xl font-bold">Best of Live Events</h3>
                    <p className="text-white text-sm">15 Places ▶</p>
                </div>
            </Link>

            {/* CARD 3: New */}
            <Link to="/collections/new" className="relative h-80 rounded-xl overflow-hidden cursor-pointer group">
                <img 
                  src="https://b.zmtcdn.com/data/collections/77c1b9704985885cbe2cb094e9983eab_1682080027.jpg" 
                  alt="New"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                    <h3 className="text-white text-xl font-bold">Newly Opened</h3>
                    <p className="text-white text-sm">12 Places ▶</p>
                </div>
            </Link>

            {/* CARD 4: Veggie */}
            <Link to="/collections/veggie" className="relative h-80 rounded-xl overflow-hidden cursor-pointer group">
                <img 
                  src="https://b.zmtcdn.com/data/collections/a9362905a0378c767cf0bf1dce136a9a_1681987514.jpg" 
                  alt="Veggie"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                    <h3 className="text-white text-xl font-bold">Veggie Friendly</h3>
                    <p className="text-white text-sm">22 Places ▶</p>
                </div>
            </Link>

        </div>
      </div>

    </div>
  );
};

export default Home;