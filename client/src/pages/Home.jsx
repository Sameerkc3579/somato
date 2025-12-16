import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- BIG LIST OF CITIES ---
const cities = [
  "Hajipur", "Patna", "Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", 
  "Chennai", "Kolkata", "Ahmedabad", "Chandigarh", "Jaipur", "Lucknow", "Indore", 
  "Gangtok", "Nashik", "Ooty", "Shimla", "Ludhiana", "Guwahati", "Amritsar", 
  "Kanpur", "Allahabad", "Ranchi", "Visakhapatnam", "Bhubaneswar", "Coimbatore", 
  "Mangalore", "Vadodara", "Nagpur", "Agra", "Dehradun", "Mysore", "Puducherry", 
  "Surat", "Varanasi", "Bhopal", "Srinagar", "Raipur", "Gorakhpur"
];

const Home = ({ city, setCity }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [counts, setCounts] = useState({ trending: 0, events: 0, new: 0, veggie: 0 });
  const navigate = useNavigate();

  // --- FETCH REAL COUNTS FOR COLLECTIONS ---
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [trending, events, newPlaces, veggie] = await Promise.all([
          fetch("/api/collections/trending").then(res => res.json()),
          fetch("/api/collections/events").then(res => res.json()),
          fetch("/api/collections/new").then(res => res.json()),
          fetch("/api/collections/veggie").then(res => res.json())
        ]);
        
        setCounts({
          trending: trending.length || 0,
          events: events.length || 0,
          new: newPlaces.length || 0,
          veggie: veggie.length || 0
        });
      } catch (error) {
        console.error("Failed to fetch collection counts", error);
      }
    };

    fetchCounts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate("/delivery");
    }
  };

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
      link: "/dining-out"
    },
    {
      title: "Nightlife",
      description: "Explore the city's top nightlife outlets",
      cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600",
      link: "/collections/events" // Direct link to events collection
    }
  ];

  return (
    <div className="pb-20">
      {/* --- HERO SECTION --- */}
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
            Discover the best food & drinks in <span className="font-bold">{city}</span>
          </p>

          <form 
            onSubmit={handleSearch} 
            className="bg-white p-3 rounded-xl flex flex-col md:flex-row items-center w-full max-w-2xl shadow-lg text-black"
          >
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

      {/* --- CATEGORY CARDS SECTION --- */}
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

      {/* --- COLLECTIONS SECTION --- */}
      <div className="max-w-6xl mx-auto px-4 mt-16 mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Collections</h2>
        <div className="flex justify-between items-end mb-6">
          <p className="text-gray-500 text-lg">
            Explore curated lists of top restaurants, cafes, pubs, and bars in {city}, based on trends
          </p>
          <span className="text-zomatoRed text-sm cursor-pointer hover:underline hidden md:block">
            All collections in {city} ▶
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* 1. Trending (High Rating) */}
            <Link to="/collections/trending" className="relative h-80 rounded-xl overflow-hidden cursor-pointer group">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" 
                  alt="Trending"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                    <h3 className="text-white text-xl font-bold">Top Trending Spots</h3>
                    <p className="text-white text-sm">{counts.trending} Places ▶</p>
                </div>
            </Link>

            {/* 2. Events (Nightlife/Bars) */}
            <Link to="/collections/events" className="relative h-80 rounded-xl overflow-hidden cursor-pointer group">
                <img 
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80" 
                  alt="Nightlife"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                    <h3 className="text-white text-xl font-bold">Best of Nightlife</h3>
                    <p className="text-white text-sm">{counts.events} Places ▶</p>
                </div>
            </Link>

            {/* 3. New Places */}
            <Link to="/collections/new" className="relative h-80 rounded-xl overflow-hidden cursor-pointer group">
                <img 
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80" 
                  alt="New"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                    <h3 className="text-white text-xl font-bold">Newly Opened</h3>
                    <p className="text-white text-sm">{counts.new} Places ▶</p>
                </div>
            </Link>

            {/* 4. Veggie Friendly */}
            <Link to="/collections/veggie" className="relative h-80 rounded-xl overflow-hidden cursor-pointer group">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80" 
                  alt="Veggie"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black via-black/50 to-transparent">
                    <h3 className="text-white text-xl font-bold">Veggie Friendly</h3>
                    <p className="text-white text-sm">{counts.veggie} Places ▶</p>
                </div>
            </Link>

        </div>
      </div>
    </div>
  );
};

export default Home;