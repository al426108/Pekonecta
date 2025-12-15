
import React, { useEffect, useState } from 'react';
import { UserCheck, Users, Shield } from 'lucide-react';

const Staff = () => {
    const [monitors, setMonitors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/monitors')
            .then(res => res.json())
            .then(data => setMonitors(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Personal</h2>

            <div className="bg-bg-card rounded-2xl border border-gray-800 overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    <div className="col-span-4 pl-2">Nombre</div>
                    <div className="col-span-3">Rol</div>
                    <div className="col-span-5">Grupos Asignados</div>
                </div>

                <div className="divide-y divide-gray-800/50">
                    {monitors.map((monitor, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors">
                            <div className="col-span-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                                    {monitor.name.charAt(0)}
                                </div>
                                <span className="text-white font-medium">{monitor.name}</span>
                            </div>

                            <div className="col-span-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${monitor.role === 'Director' ? 'bg-purple-900/20 text-purple-400 border-purple-900/50' :
                                        monitor.role === 'Enfermero' ? 'bg-green-900/20 text-green-400 border-green-900/50' :
                                            'bg-blue-900/20 text-blue-400 border-blue-900/50'
                                    }`}>
                                    {monitor.role}
                                </span>
                            </div>

                            <div className="col-span-5 flex flex-wrap gap-2">
                                {monitor.groups && monitor.groups.length > 0 ? (
                                    monitor.groups.map(g => (
                                        <span key={g.id} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                                            {g.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-600 text-xs italic">Sin asignación</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Staff;
