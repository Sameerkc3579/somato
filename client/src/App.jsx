import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"; // 1. Added useNavigate

// --- CONTEXT ---
import { AuthProvider } from "./context/AuthContext"; 

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainLayout from "./components/MainLayout"; 

// --- PAGES ---
import LandingPage from "./pages/LandingPage"; // 2. Import Landing Page
import Home from "./pages/Home";
import Delivery from "./pages/Delivery";
import DiningOut from "./pages/DiningOut"; 
import Nightlife from "./pages/Nightlife"; 
import RestaurantPage from "./pages/RestaurantPage";
import Login from "./pages/Login"; 
import Checkout from "./pages/Checkout";     
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile"; 
import Collection from "./pages/Collection";
import AdminUsers from "./pages/AdminUsers";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Initialize City from Local Storage or default to 'Hajipur'
  const [city, setCity] = useState(() => {
    return localStorage.getItem("userCity") || "Hajipur";
  });

  // Save City to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem("userCity", city);
  }, [city]);

  const location = useLocation();
  const navigate = useNavigate(); // 3. Hook for navigation

  // 4. Handler for Landing Page "Explore" button
  const handleGetStarted = () => {
    navigate('/home'); // Moves user from Landing Page -> Home Page
  };

  // Logic to hide Navbar (Hidden on Landing Page "/" and Home Page "/home")
  const isNavbarHidden = location.pathname === "/home" || location.pathname === "/";

  // Logic to hide Global Footer (Hidden ONLY on Landing Page "/")
  // Because Landing Page already has its own footer in the design
  const isLandingPage = location.pathname === "/";

  return (
    <AuthProvider> 
      
      {/* Only show Global Navbar if NOT on Home/Landing Page */}
      {!isNavbarHidden && (
        <Navbar 
          setSearchTerm={setSearchTerm} 
          city={city} 
          setCity={setCity} 
        /> 
      )}

      <Routes>
        {/* 5. Root Route is now Landing Page (was previously Navigate) */}
        <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} />} />
        
        <Route path="/admin/users" element={<AdminUsers />} />
        
        {/* Home Page */}
        <Route path="/home" element={<Home city={city} setCity={setCity} />} />
        
        {/* MAIN TAB ROUTES */}
        <Route path="/delivery" element={<MainLayout><Delivery searchTerm={searchTerm} city={city} /></MainLayout>} />
        <Route path="/dining-out" element={<MainLayout><DiningOut key={city} city={city} /></MainLayout>} />
        <Route path="/nightlife" element={<MainLayout><Nightlife key={city} city={city} /></MainLayout>} />
        
        {/* Other Routes */}
        <Route path="/restaurant/:id" element={<RestaurantPage city={city} />} />
        
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/collections/:type" element={<Collection />} />
      </Routes>
      
      {/* 6. Footer shows on all pages EXCEPT Landing Page */}
      {!isLandingPage && <Footer />}
      
    </AuthProvider>
  );
}

export default App;