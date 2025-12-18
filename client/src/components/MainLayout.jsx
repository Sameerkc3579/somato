import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white">
            {/* 🚨 REMOVED <TabOptions /> here because it's now inside the pages 🚨 */}
            {children}
        </div>
    );
};

export default MainLayout;