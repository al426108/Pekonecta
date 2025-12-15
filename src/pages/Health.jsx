
import React, { useEffect, useState } from 'react';
import { HeartPulse, Activity } from 'lucide-react';
import ParticipantsTable from '../components/Dashboard/ParticipantsTable';

const Health = () => {
    const [medicalCases, setMedicalCases] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/participants')
            .then(res => res.json())
            .then(data => {
                // Filter participants with medical info
                const cases = data.filter(p => p.medicalInfo && p.medicalInfo !== 'Ninguna');
                setMedicalCases(cases);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Salud e Incidencias</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-bg-card rounded-2xl p-6 border border-gray-800">
                    <span className="text-text-muted text-xs font-semibold uppercase">Casos Médicos Activos</span>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-3xl font-bold text-white">{medicalCases.length}</span>
                        <div className="p-1 rounded bg-red-500/10 text-red-500">
                            <HeartPulse size={16} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-bg-card rounded-2xl border border-gray-800 p-4">
                <h3 className="text-xl font-bold text-white mb-4 px-2">Participantes con Condiciones Médicas</h3>
                <ParticipantsTable data={medicalCases} />
            </div>
        </div>
    );
};

export default Health;
