import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    
    // 🔥 THE FIX: Check Local Storage first. Default to NULL if empty.
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 3. Update Local Storage whenever the user state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
        // (The useEffect above handles saving to localStorage automatically)
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); // Clear user data
        localStorage.removeItem("cart"); // Optional: Clear cart on logout
    };

    const value = {
        user,
        setUser,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom Hook
export const useAuth = () => {
    return useContext(AuthContext);
};