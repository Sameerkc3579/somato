// client/src/components/MainLayout.jsx
import React from 'react';
import TabOptions from './TabOptions';

// This component wraps the content of Delivery, DiningOut, and Nightlife
const MainLayout = ({ children }) => {
    return (
        <div>
            {/* The TabOptions component is now rendered outside the specific page content.
                It will appear on /delivery, /dining-out, and /nightlife */}
            <TabOptions /> 
            
            <div className="pt-4 md:pt-8">
                {/* The child prop is the specific page content (Delivery, DiningOut, etc.) */}
                {children}
            </div>
        </div>
    );
};

export default MainLayout;