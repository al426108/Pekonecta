import React from 'react';
import { Home, FileText, Users, Activity, Briefcase, Banknote } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { icon: Home, label: 'Inicio', path: '/' },
        { icon: FileText, label: 'Inscripciones', path: '/inscripciones' },
        { icon: Users, label: 'Grupos', path: '/grupos' },
        { icon: Activity, label: 'Salud', path: '/salud' },
        { icon: Briefcase, label: 'Personal', path: '/personal' },
        { icon: Banknote, label: 'Finanzas', path: '/finanzas' },
        { icon: Activity, label: 'Eventos', path: '/eventos' },
        { icon: Briefcase, label: 'Inventario', path: '/inventario' },
    ];

    return (
        <div className="w-64 h-screen bg-bg-dark border-r border-gray-800 flex flex-col fixed left-0 top-0 z-50">
            {/* Brand */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-900/20">P</div>
                <div>
                    <h1 className="text-white font-bold text-lg leading-none tracking-tight">Pekonecta</h1>
                    <p className="text-text-muted text-xs mt-1">Gestión de Campamentos</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-blue-900/20'
                                : 'text-text-muted hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-800 bg-black/20">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border-2 border-gray-600">
                        <img src="https://ui-avatars.com/api/?name=Carlos+Director&background=1E40AF&color=fff" alt="User" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h4 className="text-white text-sm font-semibold truncate">Carlos Director</h4>
                        <p className="text-text-muted text-xs truncate">Campamento Valle Verde</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
