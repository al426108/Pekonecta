import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-bg-dark text-text-main font-sans">
            <Sidebar />
            <div className="flex-1 ml-64 min-h-screen bg-bg-dark">
                {/* Main Content Area */}
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
