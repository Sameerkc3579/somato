// client/src/App.jsx

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("Hajipur");

  return (
    <AuthProvider> 
      
      <Navbar 
        setSearchTerm={setSearchTerm} 
        city={city} 
        setCity={setCity} 
      /> 

      <Routes>
        {/* 🚨 FIX: Changed redirect from "/delivery" to "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />
        
        {/* 🚨 MAIN TAB ROUTES - Wrapped by MainLayout */}
        <Route path="/delivery" element={<MainLayout><Delivery searchTerm={searchTerm} city={city} /></MainLayout>} />
        <Route path="/dining-out" element={<MainLayout><DiningOut key={city} city={city} /></MainLayout>} />
        <Route path="/nightlife" element={<MainLayout><Nightlife key={city} city={city} /></MainLayout>} />
        
        {/* Home page Route */}
        <Route path="/home" element={<Home city={city} setCity={setCity} />} />
        
        {/* Other Routes (Do NOT wrap these) */}
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
      <Footer />
      
    </AuthProvider>
  );
}

export default App;