
import React, { useEffect, useState } from 'react';
import { Users, User, Tent } from 'lucide-react';

const Groups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/groups')
            .then(res => res.json())
            .then(data => setGroups(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Grupos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <div key={group.id} className="bg-bg-card border border-gray-800 rounded-2xl p-6 hover:border-accent/50 transition-all group-card">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-900/20 text-blue-400 rounded-xl">
                                <Tent size={24} />
                            </div>
                            <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-lg">
                                ID: #{group.id}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{group.name}</h3>
                        <p className="text-text-muted text-sm mb-4">{group.description}</p>

                        <div className="pt-4 border-t border-gray-800 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <Users size={16} />
                                <span>{group._count?.participants || 0} Participantes</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <User size={16} />
                                <span>Monitor: {group.monitor ? group.monitor.name : 'Sin asignar'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Groups;
