import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Delivery from "./pages/Delivery";
import DiningOut from "./pages/DiningOut";
import Nightlife from "./pages/Nightlife";
import RestaurantPage from "./pages/RestaurantPage";
import Checkout from "./pages/Checkout"; 
import UserProfile from "./pages/UserProfile"; 
import Login from "./pages/Login"; 

import { AuthProvider } from "./context/AuthContext"; 

// --- Initial hardcoded order data ---
const initialOrders = [
    {
        id: "ORD-98765",
        restaurant: "The Royal Table",
        date: "12 Dec 2023, 08:30 PM",
        total: "₹459",
        status: "Delivered",
        items: ["Farmhouse Pizza (Medium)", "Pepsi (500ml)"]
    },
    {
        id: "ORD-12345",
        restaurant: "Green Leaf Pure Veg",
        date: "05 Nov 2023, 01:15 PM",
        total: "₹629",
        status: "Delivered",
        items: ["Hot & Crispy Bucket", "French Fries"]
    }
];

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    
    // 🚨 GLOBAL CITY STATE (Source of Truth) 🚨
    const [city, setCity] = useState("Hajipur"); 

    const [user, setUser] = useState(null); 
    const [userOrders, setUserOrders] = useState(initialOrders);

    // --- DEFINING AUTH FUNCTIONS ---
    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    // --- PASSING FUNCTIONS TO CONTEXT ---
    const authContextValue = {
        user, 
        setUser, 
        login, 
        logout 
    };

    return (
        <AuthProvider value={authContextValue}> 
            {/* 🚨 PASS CITY PROPS TO NAVBAR 🚨 */}
            <Navbar 
                setSearchTerm={setSearchTerm} 
                city={city} 
                setCity={setCity} 
            /> 
            
            <Routes>
                {/* 🚨 PASS CITY PROPS TO HOME 🚨 */}
                <Route path="/" element={<Home city={city} setCity={setCity} />} /> 
                
                {/* 🚨 PASS CITY PROPS TO DELIVERY (For Filtering) 🚨 */}
                <Route path="/delivery" element={<Delivery searchTerm={searchTerm} city={city} />} />
                
                <Route path="/dining" element={<DiningOut />} />
                <Route path="/nightlife" element={<Nightlife />} />
                
                {/* 🚨 PASS CITY PROPS TO RESTAURANT PAGE (For Map/Address) 🚨 */}
                <Route path="/restaurant/:id" element={<RestaurantPage city={city} />} />
                
                <Route path="/login" element={<Login />} />
                
                <Route 
                    path="/checkout" 
                    element={<Checkout user={user} userOrders={userOrders} setUserOrders={setUserOrders} />} 
                />
                
                <Route 
                    path="/profile" 
                    element={<UserProfile user={user} userOrders={userOrders} setUser={setUser} />} 
                />
            </Routes>
            
            <Footer />
        </AuthProvider>
    );
}

export default App;