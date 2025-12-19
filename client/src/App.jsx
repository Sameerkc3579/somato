import React, { useState, useEffect } from "react";
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
import AdminUsers from "./pages/AdminUsers";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. UPDATED: Initialize City from Local Storage or default to 'Hajipur'
  const [city, setCity] = useState(() => {
    return localStorage.getItem("userCity") || "Hajipur";
  });

  // 2. ADDED: Save City to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem("userCity", city);
  }, [city]);

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
        <Route path="/admin/users" element={<AdminUsers />} />
        {/* Home Page */}
        <Route path="/home" element={<Home city={city} setCity={setCity} />} />
        
        {/* MAIN TAB ROUTES */}
        <Route path="/delivery" element={<MainLayout><Delivery searchTerm={searchTerm} city={city} /></MainLayout>} />
        <Route path="/dining-out" element={<MainLayout><DiningOut key={city} city={city} /></MainLayout>} />
        <Route path="/nightlife" element={<MainLayout><Nightlife key={city} city={city} /></MainLayout>} />
        
        {/* Other Routes */}
        {/* 👇 UPDATED: Passing 'city' prop here 👇 */}
        <Route path="/restaurant/:id" element={<RestaurantPage city={city} />} />
        
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/collections/:type" element={<Collection />} />
      </Routes>
      
      {/* 4. Footer shows on ALL pages */}
      <Footer />
      
    </AuthProvider>
  );
}

export default App;