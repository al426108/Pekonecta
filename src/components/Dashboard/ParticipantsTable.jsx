import React from 'react';
import { MoreVertical, CheckCircle, AlertCircle, AlertTriangle, Home } from 'lucide-react';

const ParticipantsTable = ({ data = [] }) => {
    // Helpers
    const getStatusColor = (status) => {
        return status === 'Pagado'
            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
    };

    const getMedicalBadge = (info) => {
        if (!info || info === 'Ninguna') {
            return (
                <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-800/50 text-gray-400 text-xs border border-gray-700">
                    <CheckCircle size={14} /> Ninguna
                </span>
            );
        }
        if (info.includes('Alergia') || info.includes('Hipertensión') || info.includes('Asmático')) {
            return (
                <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-red-900/20 text-red-400 text-xs border border-red-900/30">
                    <AlertTriangle size={14} /> {info}
                </span>
            );
        }
        return (
            <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-900/20 text-cyan-400 text-xs border border-cyan-900/30">
                <AlertCircle size={14} /> {info}
            </span>
        );
    };

    const getRandomColor = (name) => {
        const colors = ['bg-blue-900 text-blue-200', 'bg-purple-900 text-purple-200', 'bg-cyan-900 text-cyan-200', 'bg-green-900 text-green-200'];
        const index = name.length % colors.length;
        return colors[index];
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    if (data.length === 0) {
        return <div className="p-8 text-center text-gray-500">No hay participantes registrados.</div>;
    }

    return (
        <div className="bg-bg-card rounded-2xl border border-gray-800 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-xs font-semibold text-text-muted uppercase tracking-wider">
                <div className="col-span-3 pl-2">Participante</div>
                <div className="col-span-2">Grupo</div>
                <div className="col-span-2">Info Médica</div>
                <div className="col-span-2">Fecha</div>
                <div className="col-span-2">Estado de Pago</div>
                <div className="col-span-1 text-center">Acciones</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-800/50">
                {data.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group">
                        {/* Participant */}
                        <div className="col-span-3 flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${getRandomColor(item.name)}`}>
                                {getInitials(item.name)}
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-medium">{item.name}</h4>
                                <p className="text-gray-500 text-xs">ID: #{item.id}</p>
                            </div>
                        </div>

                        {/* Group */}
                        <div className="col-span-2 flex items-center gap-2 text-gray-300 text-sm">
                            <Home size={16} className="text-gray-500" />
                            <span>{item.group ? item.group.name : 'Sin Grupo'}</span>
                        </div>

                        {/* Medical */}
                        <div className="col-span-2">
                            {getMedicalBadge(item.medicalInfo)}
                        </div>

                        {/* Date */}
                        <div className="col-span-2 text-gray-400 text-sm">
                            {new Date(item.date).toLocaleDateString()}
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                            <span className={`flex items-center justify-center w-max gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Pagado' ? 'bg-blue-400' : 'bg-cyan-400'}`}></span>
                                {item.status}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="col-span-1 flex justify-center">
                            <button className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-gray-700 transition-colors">
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination/Footer (Optional) */}
            <div className="p-4 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
                <span>Mostrando {data.length} participantes</span>
                <div className="flex gap-2">
                    <button className="hover:text-white">Anterior</button>
                    <button className="hover:text-white">Siguiente</button>
                </div>
            </div>
        </div>
    );
};

export default ParticipantsTable;
