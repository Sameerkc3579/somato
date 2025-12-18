// client/src/App.jsx

import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// --- CONTEXT ---
import { AuthProvider } from "./context/AuthContext"; 

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainLayout from "./components/MainLayout"; 

// --- PAGES ---
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

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("Hajipur");

  // 1. Get the current URL path
  const location = useLocation();

  // 2. Check if we are on the Home page
  const isHomePage = location.pathname === "/home" || location.pathname === "/";

  return (
    <AuthProvider> 
      
      {/* 3. Only show Global Navbar if NOT on Home Page */}
      {!isHomePage && (
        <Navbar 
          setSearchTerm={setSearchTerm} 
          city={city} 
          setCity={setCity} 
        /> 
      )}

      <Routes>
        {/* Redirect Root to Home */}
        <Route path="/" element={<Navigate to="/home" />} />
        
        {/* Home Page (Has its own internal Navbar/Footer now) */}
        <Route path="/home" element={<Home city={city} setCity={setCity} />} />
        
        {/* MAIN TAB ROUTES - Wrapped by MainLayout */}
        <Route path="/delivery" element={<MainLayout><Delivery searchTerm={searchTerm} city={city} /></MainLayout>} />
        <Route path="/dining-out" element={<MainLayout><DiningOut key={city} city={city} /></MainLayout>} />
        <Route path="/nightlife" element={<MainLayout><Nightlife key={city} city={city} /></MainLayout>} />
        
        {/* Other Routes */}
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/collections/:type" element={<Collection />} />
      </Routes>
      
      {/* 4. Only show Global Footer if NOT on Home Page */}
      {!isHomePage && <Footer />}
      
    </AuthProvider>
  );
}

export default App;