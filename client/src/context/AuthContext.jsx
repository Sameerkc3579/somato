import React, { createContext, useContext, useState } from "react";

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    // ✅ PRE-FILLED USER (Matches your Screenshot)
    // This allows you to see the Profile page immediately without logging in.
    const [user, setUser] = useState({
        name: "Sameer choudhary",
        email: "imexperiment4@gmail.com",
        image: "https://ui-avatars.com/api/?name=Sameer+Choudhary&background=6336a8&color=fff&size=128" // Generates the Purple 'S' Avatar
    });

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
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

// 3. Custom Hook to consume the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};