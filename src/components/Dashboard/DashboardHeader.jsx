import React from 'react';
import { Bell } from 'lucide-react';

const DashboardHeader = () => {
    return (
        <div className="flex justify-between items-start mb-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-1">Dashboard del Director</h2>
                <p className="text-text-muted">Visión general de operaciones y estado de participantes</p>
            </div>

            <button className="p-2 rounded-full bg-bg-card hover:bg-gray-800 text-gray-400 hover:text-white transition-colors relative group">
                <Bell size={24} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-bg-card"></span>
            </button>
        </div>
    );
};

export default DashboardHeader;
