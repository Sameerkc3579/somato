import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Search, MapPin, ChevronDown, ShoppingBag, Utensils, Music, ChevronRight, 
  Linkedin, Instagram, Twitter, Youtube, Facebook, 
  LogOut, User as UserIcon // 1. Added Icons for Dropdown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// --- CITIES LIST ---
const cities = ["Hajipur", "Patna", "Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", "Chennai", "Kolkata"];

export default function Home({ city, setCity }) {
  const [location, setLocation] = useState(city || 'Hajipur');
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 2. State for Dropdown
  
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // 3. Get logout function

  // --- ANIMATIONS ---
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) navigate(`/delivery?search=${searchTerm}`);
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setLocation(newCity);
    if(setCity) setCity(newCity);
  };

  // 4. Handle Logout
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/"); // Refresh/Stay on home
  };

  // --- IMAGES & DATA ---
  const collections = [
    {
      title: 'Top Trending Spots',
      count: '1417 Places',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50fGVufDF8fHx8MTc2NTk5NTc1OHww&ixlib=rb-4.1.0&q=80&w=1080',
      link: '/collections/trending'
    },
    {
      title: 'Best of Nightlife',
      count: '740 Places',
      image: 'https://images.unsplash.com/photo-1683544599381-be284dbd9abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rJTIwYmFyfGVufDF8fHx8MTc2NTk5MDA4NXww&ixlib=rb-4.1.0&q=80&w=1080',
      link: '/collections/events'
    },
    {
      title: 'Newly Opened',
      count: '10 Places',
      image: 'https://images.unsplash.com/photo-1689789330285-18404b1b4b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nJTIwdGFibGV8ZW58MXx8fHwxNzY1OTgwNzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '/collections/new'
    },
    {
      title: 'Veggie Friendly',
      count: '8 Places',
      image: 'https://images.unsplash.com/photo-1757332334664-83bff99e7a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjU5NDk4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '/collections/veggie'
    }
  ];

  const features = [
    {
      icon: ShoppingBag,
      title: 'Order Online',
      description: 'Stay home and order to your doorstep',
      image: 'https://images.unsplash.com/photo-1628838463043-b81a343794d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzY1OTcwMjIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '/delivery'
    },
    {
      icon: Utensils,
      title: 'Dining',
      description: "View the city's favourite dining venues",
      image: 'https://images.unsplash.com/photo-1756397481872-ed981ef72a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBlbGVnYW50fGVufDF8fHx8MTc2NTk2MzcwNXww&ixlib=rb-4.1.0&q=80&w=1080',
      link: '/dining-out'
    },
    {
      icon: Music,
      title: 'Nightlife',
      description: "Explore the city's top nightlife outlets",
      image: 'https://images.unsplash.com/photo-1657208431551-cbf415b8ef26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGNsdWIlMjBwYXJ0eSUyMGxpZ2h0c3xlbnwxfHx8fDE3NjU5NTE2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      link: '/nightlife'
    }
  ];

  const socialMedia = [
    { icon: Linkedin, link: "#" },
    { icon: Instagram, link: "#" },
    { icon: Twitter, link: "#" },
    { icon: Youtube, link: "#" },
    { icon: Facebook, link: "#" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      
      {/* --- NAVBAR --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/">
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                    <span className="text-3xl italic text-red-600 font-bold">somato</span>
                </motion.div>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-700 cursor-pointer hover:text-red-600 transition-colors bg-slate-100/50 px-3 py-1.5 rounded-lg">
                <MapPin className="w-4 h-4 text-red-500" />
                <select 
                    value={location} 
                    onChange={handleCityChange}
                    className="bg-transparent focus:outline-none cursor-pointer text-sm font-medium appearance-none pr-4"
                >
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="w-3 h-3 -ml-3 pointer-events-none" />
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for restaurant, cuisine..."
                  className="pl-10 pr-4 py-2 w-64 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm bg-slate-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                />
              </div>
            </div>

            {/* --- 5. UPDATED USER BUTTON WITH DROPDOWN --- */}
            <div className="relative">
              {user ? (
                <>
                  <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle Dropdown
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-600 font-bold text-xs">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <span className="hidden md:inline font-medium text-sm">{user.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-1 z-50 animate-fade-in-up">
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <UserIcon className="w-4 h-4" />
                        <span className="font-medium text-sm">Profile</span>
                      </Link>
                      <div className="h-px bg-gray-100 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium text-sm">Log Out</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition shadow-sm font-medium"
                    >
                        Log in
                    </motion.button>
                </Link>
              )}
            </div>

          </div>
        </div>
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <motion.section 
        style={{ opacity: heroOpacity }}
        className="relative h-[600px] mt-16 overflow-hidden"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpbmluZ3xlbnwxfHx8fDE3NjU5MDkwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-110"
          />
        </motion.div>

        <div className="relative z-20 h-full flex items-center justify-center px-4">
          <div className="text-center space-y-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl italic text-white mb-4 drop-shadow-2xl font-bold">
                somato
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl md:text-4xl text-white drop-shadow-lg"
              >
                Discover the best food & drinks in <span className="text-yellow-400 font-semibold">{location}</span>
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row items-center gap-3 max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-r border-slate-200 w-full md:w-auto">
                <MapPin className="w-5 h-5 text-red-600" />
                <select 
                    value={location} 
                    onChange={handleCityChange}
                    className="bg-transparent focus:outline-none cursor-pointer text-slate-700 font-medium text-lg w-full appearance-none pr-4"
                >
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 -ml-2 pointer-events-none" />
              </div>
              
              <div className="flex-1 flex items-center gap-3 px-4 w-full">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for restaurant, cuisine or a dish"
                  className="flex-1 bg-transparent focus:outline-none text-slate-700 placeholder:text-slate-400 text-lg h-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                />
              </div>
              
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold w-full md:w-auto"
              >
                Search
              </motion.button>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-20 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-2xl opacity-60"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 left-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl opacity-50"
        />
      </motion.section>

      {/* --- FEATURES SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link to={feature.link} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer bg-white"
                >
                  <div className="absolute inset-0">
                    <img 
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>

                  <div className="relative h-full flex flex-col justify-end p-6 text-white">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                    >
                      <feature.icon className="w-7 h-7" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/90 mb-4">{feature.description}</p>
                    
                    <div className="flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
                      <span>Explore</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- COLLECTIONS SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="text-4xl text-slate-800 mb-3">Collections</h2>
            <p className="text-slate-600 text-lg">
              Explore curated lists of top restaurants, cafes, pubs, and bars in {location}, based on trends
            </p>
          </div>
          <Link to="/delivery">
            <motion.button
                whileHover={{ x: 5 }}
                className="text-red-600 flex items-center gap-2 hover:gap-3 transition-all text-lg"
            >
                All collections in {location} <ChevronRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <Link to={collection.link} key={collection.title}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                >
                  <div className="absolute inset-0">
                    <img 
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <div className="relative h-full flex flex-col justify-end p-6 text-white">
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl mb-2">{collection.title}</h3>
                      <div className="flex items-center gap-2 text-white/90">
                        <span>{collection.count}</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-1">
              <motion.h3 whileHover={{ scale: 1.05 }} className="text-3xl italic text-red-500 mb-4 font-bold">
                somato
              </motion.h3>
            </div>

            {[
                { title: 'About Somato', links: ['Who We Are', 'Blog', 'Work With Us', 'Investor Relations', 'Report Fraud'] },
                { title: 'Zomaverse', links: ['Somato', 'Quickbuy', 'FoodRescue India', 'HyperFresh'] },
                { title: 'For Restaurants', links: ['Partner With Us', 'Apps For You'] },
                { title: 'Learn More', links: ['Privacy', 'Security', 'Terms', 'Sitemap'] }
            ].map((section) => (
                <div key={section.title}>
                    <h4 className="mb-4 text-slate-300 font-semibold">{section.title}</h4>
                    <ul className="space-y-2 text-slate-400">
                        {section.links.map(link => (
                            <motion.li key={link} whileHover={{ x: 5, color: '#ef4444' }} className="cursor-pointer">
                                {link}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            ))}

            <div>
                <h4 className="mb-4 text-slate-300 font-semibold">Social Links</h4>
                <div className="flex gap-3 mb-6">
                    {socialMedia.map((social, index) => (
                        <motion.a 
                            key={index}
                            href={social.link}
                            whileHover={{ scale: 1.2, rotate: 5 }} 
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
                        >
                            <social.icon className="w-5 h-5 text-white" />
                        </motion.a>
                    ))}
                </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400 text-sm"
          >
            <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. 2024 © Somato Clone. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

    </div>
  );
}