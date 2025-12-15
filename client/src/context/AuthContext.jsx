import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    // You can manage complex authentication state here if needed.
    // For now, we will use the state passed from App.jsx, but define
    // mock functions for the Navbar to use.
    
    // We will use a mock user state here for demonstration,
    // though the real user state is managed in App.jsx and passed down.
    // In a real app, 'user' and 'setUser' would be managed fully here.
    const [user, setUser] = useState(null); 

    const login = (userData) => {
        // Mock login: set user data
        setUser(userData);
    };

    const logout = () => {
        // Mock logout: clear user
        setUser(null);
        // Optional: clear Google session if you were using Google client
    };

    const value = {
        user,
        setUser, // We expose setUser so App.jsx can control it (for now)
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