import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

const SearchFilter = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Buscar participantes por nombre..."
                    className="w-full bg-bg-card border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent placeholder-gray-600"
                />
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex items-center gap-2 px-4 py-3 bg-bg-card hover:bg-gray-800 text-text-muted hover:text-white rounded-xl border border-gray-800 transition-colors">
                    <Filter size={18} />
                    <span>Filtros</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-3 bg-bg-card hover:bg-gray-800 text-text-muted hover:text-white rounded-xl border border-gray-800 transition-colors">
                    <Download size={18} />
                    <span>Exportar</span>
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;
